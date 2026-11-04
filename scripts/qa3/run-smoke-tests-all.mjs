import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";
import fs from "node:fs";

async function runSmokeTests() {
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const routeInv = JSON.parse(fs.readFileSync("scripts/qa3/route-inventory.json", "utf8"));
  
  // All 125 tools minus the tested ones
  const allToolPages = routeInv.filter(r => r.pageType === "Tool Page");
  console.log(`Starting automated smoke test of all ${allToolPages.length} tool pages...\n`);

  const results = {
    total: allToolPages.length,
    passed: 0,
    failed: 0,
    tools: []
  };

  let consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  for (let i = 0; i < allToolPages.length; i++) {
    const t = allToolPages[i];
    const url = `http://localhost:4321${t.urlPath}`;
    consoleErrors = [];
    const start = Date.now();
    let status = "PASSED";
    let errorDetail = "";

    try {
      const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 8000 });
      if (!res || res.status() !== 200) {
        status = "FAILED";
        errorDetail = `HTTP ${res ? res.status() : "no-response"}`;
      } else {
        const hasMain = await page.locator("main").first().isVisible();
        if (!hasMain) {
          status = "FAILED";
          errorDetail = "Missing main container";
        } else if (consoleErrors.length > 0) {
          status = "FAILED";
          errorDetail = consoleErrors[0];
        }
      }
    } catch (e) {
      status = "FAILED";
      errorDetail = e.message;
    }

    const duration = Date.now() - start;
    if (status === "PASSED") results.passed++;
    else results.failed++;

    results.tools.push({
      tool: t.urlPath,
      status,
      durationMs: duration,
      error: errorDetail || null
    });

    if ((i + 1) % 25 === 0 || i === allToolPages.length - 1) {
      console.log(`Progress: ${i + 1}/${allToolPages.length} tools tested (${results.passed} passed, ${results.failed} failed)`);
    }
  }

  await browser.close();
  server.close();

  fs.writeFileSync("scripts/qa3/smoke-test-results.json", JSON.stringify(results, null, 2));
  console.log(`\nSmoke tests finished! ${results.passed}/${results.total} passed. Saved to scripts/qa3/smoke-test-results.json`);
}

runSmokeTests();
