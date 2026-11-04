import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";
import fs from "node:fs";

const PAGES = [
  { name: "Homepage", path: "/" },
  { name: "Category Page", path: "/category/calculators" },
  { name: "JSON Formatter", path: "/json-formatter" },
  { name: "PDF Merge", path: "/pdf-merge" },
  { name: "Image Compressor", path: "/image-compressor" },
  { name: "SEO Analyzer", path: "/seo-analyzer" },
  { name: "EMI Calculator", path: "/emi-calculator" }
];

const CONFIGS = [
  {
    type: "Desktop",
    device: "Desktop Chrome (1280x800)",
    viewport: { width: 1280, height: 800 },
    isMobile: false,
    throttling: "Broadband Unthrottled",
    cpuThrottlingRate: 1,
    networkThrottling: null,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
  },
  {
    type: "Mobile",
    device: "Moto G Power / Pixel emulation (390x844, 3x DPR)",
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    throttling: "Simulated Mobile Fast 4G (150ms RTT, 1.6Mbps down, 750kbps up, 4x CPU Slowdown)",
    cpuThrottlingRate: 4,
    networkThrottling: {
      offline: false,
      latency: 150,
      downloadThroughput: Math.floor((1.6 * 1024 * 1024) / 8),
      uploadThroughput: Math.floor((750 * 1024) / 8)
    },
    userAgent: "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"
  }
];

async function measurePage(browser, pageUrl, config, runs = 3) {
  const runResults = [];

  for (let i = 0; i < runs; i++) {
    const context = await browser.newContext({
      viewport: config.viewport,
      isMobile: config.isMobile,
      hasTouch: config.hasTouch,
      userAgent: config.userAgent
    });

    const page = await context.newPage();

    if (config.networkThrottling || config.cpuThrottlingRate > 1) {
      const client = await context.newCDPSession(page);
      if (config.networkThrottling) {
        await client.send("Network.emulateNetworkConditions", config.networkThrottling);
      }
      if (config.cpuThrottlingRate > 1) {
        await client.send("Emulation.setCPUThrottlingRate", { rate: config.cpuThrottlingRate });
      }
    }

    const consoleLogs = [];
    page.on("console", msg => {
      if (msg.type() === "error") consoleLogs.push(msg.text());
    });

    let totalTransferBytes = 0;
    let jsTransferBytes = 0;
    let cssTransferBytes = 0;
    let htmlTransferBytes = 0;

    page.on("response", async (res) => {
      try {
        const headers = res.headers();
        const size = Number(headers["content-length"]) || 0;
        totalTransferBytes += size;
        const ct = headers["content-type"] || "";
        const url = res.url();
        if (url.includes(".js") || ct.includes("javascript")) {
          jsTransferBytes += size;
        } else if (url.includes(".css") || ct.includes("css")) {
          cssTransferBytes += size;
        } else if (url.endsWith(".html") || ct.includes("html")) {
          htmlTransferBytes += size;
        }
      } catch {}
    });

    await page.addInitScript(() => {
      window.__perf = {
        fcp: 0,
        lcp: 0,
        lcpElement: "None",
        cls: 0,
        clsEntries: [],
        longTasks: []
      };

      try {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === "first-contentful-paint") {
              window.__perf.fcp = entry.startTime;
            }
          }
        }).observe({ type: "paint", buffered: true });

        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            window.__perf.lcp = lastEntry.startTime;
            let elDesc = "Unknown";
            if (lastEntry.element) {
              const el = lastEntry.element;
              elDesc = `<${el.tagName.toLowerCase()}${el.id ? ' id="' + el.id + '"' : ''}${el.className ? ' class="' + (typeof el.className === 'string' ? el.className.slice(0, 40) : '') + '"' : ''}> "${(el.textContent || '').trim().slice(0, 50)}"`;
            }
            window.__perf.lcpElement = elDesc;
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });

        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              window.__perf.cls += entry.value;
              window.__perf.clsEntries.push({
                value: entry.value,
                sources: (entry.sources || []).map(s => s.node?.nodeName || "anonymous")
              });
            }
          }
        }).observe({ type: "layout-shift", buffered: true });

        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            window.__perf.longTasks.push({ duration: entry.duration, startTime: entry.startTime });
          }
        }).observe({ type: "longtask", buffered: true });
      } catch (e) {}
    });

    const start = Date.now();
    await page.goto(pageUrl, { waitUntil: "networkidle", timeout: 30000 });
    const loadDuration = Date.now() - start;

    await page.waitForTimeout(600);

    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      return {
        domContentLoaded: nav ? nav.domContentLoadedEventEnd : 0,
        loadEventEnd: nav ? nav.loadEventEnd : 0,
        perf: window.__perf
      };
    });

    runResults.push({
      fcp: Math.round(metrics.perf.fcp),
      lcp: Math.round(metrics.perf.lcp),
      lcpElement: metrics.perf.lcpElement,
      cls: Number(metrics.perf.cls.toFixed(4)),
      clsSources: metrics.perf.clsEntries.length,
      domContentLoaded: Math.round(metrics.domContentLoaded),
      loadTime: loadDuration,
      totalTransferKB: +(totalTransferBytes / 1024).toFixed(1),
      jsTransferKB: +(jsTransferBytes / 1024).toFixed(1),
      cssTransferKB: +(cssTransferBytes / 1024).toFixed(1),
      htmlTransferKB: +(htmlTransferBytes / 1024).toFixed(1),
      longTasksCount: metrics.perf.longTasks.length,
      maxLongTaskMs: metrics.perf.longTasks.reduce((max, t) => Math.max(max, t.duration), 0),
      errors: consoleLogs
    });

    await context.close();
  }

  // Median run selection based on LCP
  runResults.sort((a, b) => a.lcp - b.lcp);
  const median = runResults[Math.floor(runResults.length / 2)];
  return { median, allRuns: runResults };
}

async function runAll() {
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });

  const auditReport = [];

  console.log("\nStarting Performance Test Matrix across 7 pages (Desktop broadband & Mobile 4G, 3 runs each)...\n");

  for (const p of PAGES) {
    for (const c of CONFIGS) {
      const url = `http://localhost:4321${p.path}`;
      process.stdout.write(`Testing ${p.name} [${c.type}]... `);
      const res = await measurePage(browser, url, c, 3);
      console.log(`LCP: ${res.median.lcp}ms | CLS: ${res.median.cls} | FCP: ${res.median.fcp}ms | JS: ${res.median.jsTransferKB}KB | Total: ${res.median.totalTransferKB}KB | LCP El: ${res.median.lcpElement}`);
      auditReport.push({
        page: p.name,
        path: p.path,
        device: c.type,
        deviceDetails: c.device,
        throttling: c.throttling,
        viewport: `${c.viewport.width}x${c.viewport.height}`,
        runs: 3,
        median: res.median,
        rawRuns: res.allRuns
      });
    }
  }

  await browser.close();
  server.close();

  fs.writeFileSync("scripts/qa3/performance-results.json", JSON.stringify(auditReport, null, 2));
  console.log("\nSaved performance data to scripts/qa3/performance-results.json");
}

runAll();
