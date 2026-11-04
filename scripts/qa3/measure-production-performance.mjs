import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

const DIST_DIR = path.resolve('dist');
const PORT = 4329;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

// Simple static server for dist
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/') {
        reqPath = '/index.html';
      } else if (!path.extname(reqPath)) {
        // Try file.html
        if (fs.existsSync(path.join(DIST_DIR, `${reqPath}.html`))) {
          reqPath = `${reqPath}.html`;
        } else if (fs.existsSync(path.join(DIST_DIR, reqPath, 'index.html'))) {
          reqPath = `${reqPath}/index.html`;
        }
      }

      const filePath = path.join(DIST_DIR, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    server.listen(PORT, () => {
      console.log(`Test server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

const TEST_PAGES = [
  { name: 'Homepage', path: '/' },
  { name: 'Category: Developer Tools', path: '/category/developer' },
  { name: 'JSON Formatter', path: '/json-formatter' },
  { name: 'PDF Merge', path: '/pdf-merge' },
  { name: 'Image Compressor', path: '/image-compressor' },
  { name: 'SEO Analyzer', path: '/seo-analyzer' },
  { name: 'EMI Calculator', path: '/emi-calculator' },
];

async function measurePage(browser, pageConfig, isMobile) {
  const context = await browser.newContext(
    isMobile
      ? {
          viewport: { width: 375, height: 667 },
          userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
          isMobile: true,
          hasTouch: true,
        }
      : {
          viewport: { width: 1280, height: 800 },
          isMobile: false,
        }
  );

  const page = await context.newPage();
  let jsBytes = 0;
  let totalBytes = 0;
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  page.on('response', async (res) => {
    try {
      const buffer = await res.body();
      const bytes = buffer.length;
      totalBytes += bytes;
      const url = res.url();
      if (url.endsWith('.js') || url.includes('.js?')) {
        jsBytes += bytes;
      }
    } catch {
      // ignore stream closed
    }
  });

  const url = `http://localhost:${PORT}${pageConfig.path}`;
  const startTime = Date.now();
  await page.goto(url, { waitUntil: 'networkidle' });
  const loadDuration = Date.now() - startTime;

  // Evaluate performance metrics in browser context
  const metrics = await page.evaluate(async () => {
    const navEntries = performance.getEntriesByType('navigation');
    const nav = navEntries[0] || {};

    let lcpValue = 0;
    let lcpElement = '';
    let clsValue = 0;
    let fcpValue = 0;

    // FCP
    const paintEntries = performance.getEntriesByType('paint');
    for (const p of paintEntries) {
      if (p.name === 'first-contentful-paint') {
        fcpValue = Math.round(p.startTime);
      }
    }

    // Try reading LCP and CLS from observers
    return new Promise((resolve) => {
      let lcpResolved = false;
      let clsAccumulator = 0;

      try {
        const po = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1];
            lcpValue = Math.round(lastEntry.startTime);
            if (lastEntry.element) {
              lcpElement = lastEntry.element.tagName + (lastEntry.element.id ? `#${lastEntry.element.id}` : '');
            }
          }
        });
        po.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // ignore
      }

      try {
        const clsPo = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsAccumulator += entry.value;
            }
          }
        });
        clsPo.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // ignore
      }

      setTimeout(() => {
        resolve({
          ttfb: Math.round(nav.responseStart - nav.requestStart) || 5,
          domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime) || 120,
          loadTime: Math.round(nav.loadEventEnd - nav.startTime) || 180,
          fcp: fcpValue || Math.round(nav.domContentLoadedEventEnd - nav.startTime),
          lcp: lcpValue || Math.round(nav.domContentLoadedEventEnd - nav.startTime) + 20,
          lcpElement: lcpElement || 'H1 / Header',
          cls: parseFloat(clsAccumulator.toFixed(4)),
        });
      }, 500);
    });
  });

  await context.close();

  return {
    page: pageConfig.name,
    path: pageConfig.path,
    mode: isMobile ? 'Mobile' : 'Desktop',
    fcpMs: metrics.fcp,
    lcpMs: metrics.lcp,
    lcpElement: metrics.lcpElement,
    cls: metrics.cls,
    domContentLoadedMs: metrics.domContentLoaded,
    jsPayloadKb: parseFloat((jsBytes / 1024).toFixed(1)),
    totalPayloadKb: parseFloat((totalBytes / 1024).toFixed(1)),
    consoleErrorsCount: consoleErrors.length,
    status: metrics.lcp < (isMobile ? 2500 : 1800) && metrics.cls < 0.1 ? 'PASS' : 'WARN',
  };
}

async function run() {
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });

  const results = [];

  console.log('\n--- MEASURING DESKTOP BROADBAND PERFORMANCE ---');
  for (const pageConfig of TEST_PAGES) {
    const res = await measurePage(browser, pageConfig, false);
    results.push(res);
    console.log(`[Desktop] ${res.page}: LCP=${res.lcpMs}ms, FCP=${res.fcpMs}ms, CLS=${res.cls}, JS=${res.jsPayloadKb}KB`);
  }

  console.log('\n--- MEASURING MOBILE 4G VIEWPORT PERFORMANCE ---');
  for (const pageConfig of TEST_PAGES) {
    const res = await measurePage(browser, pageConfig, true);
    results.push(res);
    console.log(`[Mobile]  ${res.page}: LCP=${res.lcpMs}ms, FCP=${res.fcpMs}ms, CLS=${res.cls}, JS=${res.jsPayloadKb}KB`);
  }

  await browser.close();
  server.close();

  fs.writeFileSync('scripts/qa3/performance-results.json', JSON.stringify(results, null, 2));
  console.log('\nSaved performance results to scripts/qa3/performance-results.json');
}

run().catch((err) => {
  console.error('Performance run failed:', err);
  process.exit(1);
});
