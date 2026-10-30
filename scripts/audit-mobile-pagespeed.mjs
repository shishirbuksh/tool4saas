import { chromium, devices } from '@playwright/test';

const TARGETS = [
  { url: 'https://tool4saas.com/', label: 'Homepage' },
  { url: 'https://tool4saas.com/invoice-generator', label: 'Tool Page (Invoice Generator)' },
  { url: 'https://tool4saas.com/blog/invoice-generator-guide', label: 'Blog Guide' }
];

const VIEWPORTS = [
  { name: 'iPhone 13 / 14 (390x844)', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'Small Phone - iPhone SE (375x667)', width: 375, height: 667, isMobile: true, hasTouch: true },
  { name: 'Tablet - iPad (768x1024)', width: 768, height: 1024, isMobile: true, hasTouch: true }
];

async function auditPage(browser, target) {
  console.log(`\n======================================================`);
  console.log(` AUDITING: ${target.label} (${target.url})`);
  console.log(`======================================================`);

  // Test across viewports for responsiveness
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
    });
    const page = await context.newPage();

    let requestCount = 0;
    let totalBytes = 0;
    const resourceTypes = {};
    const failedRequests = [];

    page.on('response', async (response) => {
      requestCount++;
      const status = response.status();
      const url = response.url();
      if (status >= 400) {
        failedRequests.push(`${status} ${url}`);
      }
      try {
        const headers = response.headers();
        const len = parseInt(headers['content-length'] || '0', 10);
        const type = headers['content-type']?.split(';')[0] || 'other';
        totalBytes += len;
        resourceTypes[type] = (resourceTypes[type] || 0) + len;
      } catch {}
    });

    // Inject Performance Observer for CWV (LCP, CLS) before navigation
    await page.addInitScript(() => {
      window.__cwv = { lcp: 0, cls: 0 };
      try {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            window.__cwv.lcp = entry.startTime;
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              window.__cwv.cls += entry.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
      } catch {}
    });

    const startNav = Date.now();
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 });
    const wallClockLoad = Date.now() - startNav;

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const scrollWidth = doc.scrollWidth;
      const clientWidth = doc.clientWidth;
      const diff = scrollWidth - clientWidth;

      // Find any element wider than viewport
      const culprits = [];
      document.querySelectorAll('*').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > clientWidth + 2) {
          culprits.push({
            tag: el.tagName,
            id: el.id,
            className: typeof el.className === 'string' ? el.className.slice(0, 50) : '',
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          });
        }
      });
      return { diff, culprits: culprits.slice(0, 3) };
    });

    // Check Mobile Menu on mobile viewports
    let mobileNavWorks = 'N/A';
    if (vp.width <= 768) {
      try {
        const menuBtn = page.getByRole('button', { name: /menu/i });
        if (await menuBtn.isVisible()) {
          await menuBtn.click();
          await page.waitForTimeout(300);
          const drawer = page.locator('[role="dialog"], .MuiDrawer-root');
          const isDrawerVisible = await drawer.isVisible();
          mobileNavWorks = isDrawerVisible ? 'PASS (Drawer opens correctly)' : 'FAIL';
          // Close drawer
          const closeBtn = page.getByRole('button', { name: /close|menu/i });
          if (await closeBtn.isVisible()) await closeBtn.click();
        } else {
          mobileNavWorks = 'Menu button not found';
        }
      } catch (e) {
        mobileNavWorks = `Error: ${e.message}`;
      }
    }

    // Check input font-size >= 16px (iOS auto-zoom prevention)
    const smallInputs = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      return inputs
        .map((el) => ({
          tag: el.tagName,
          name: el.getAttribute('name') || el.getAttribute('placeholder') || 'input',
          fontSize: parseFloat(window.getComputedStyle(el).fontSize)
        }))
        .filter((i) => i.fontSize < 16);
    });

    // Performance metrics
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      const fcpEntry = paint.find((p) => p.name === 'first-contentful-paint');

      return {
        dns: nav ? Math.round(nav.domainLookupEnd - nav.domainLookupStart) : 0,
        tcp: nav ? Math.round(nav.connectEnd - nav.connectStart) : 0,
        ttfb: nav ? Math.round(nav.responseStart - nav.requestStart) : 0,
        download: nav ? Math.round(nav.responseEnd - nav.responseStart) : 0,
        dcl: nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : 0,
        domComplete: nav ? Math.round(nav.domComplete - nav.startTime) : 0,
        fcp: fcpEntry ? Math.round(fcpEntry.startTime) : 0,
        lcp: Math.round(window.__cwv?.lcp || 0),
        cls: Number((window.__cwv?.cls || 0).toFixed(4))
      };
    });

    console.log(`\n--- Viewport: ${vp.name} ---`);
    console.log(`- Horizontal Overflow: ${overflow.diff === 0 ? 'PASS (0px overflow - perfectly responsive)' : 'FAIL (' + overflow.diff + 'px overflow)'}`);
    if (overflow.diff > 0) console.log(`  Culprits:`, overflow.culprits);
    if (vp.width <= 768) console.log(`- Mobile Navigation Drawer: ${mobileNavWorks}`);
    console.log(`- iOS Auto-Zoom Risk (<16px inputs): ${smallInputs.length === 0 ? 'PASS (All inputs >= 16px)' : 'WARN (' + smallInputs.length + ' inputs < 16px)'}`);
    if (smallInputs.length > 0) console.log(`  Small inputs:`, smallInputs.slice(0, 3));
    
    console.log(`- Speed & Core Web Vitals:`);
    console.log(`    TTFB (Time to First Byte): ${metrics.ttfb} ms ${metrics.ttfb < 800 ? '(Good)' : '(Needs caching)'}`);
    console.log(`    FCP (First Contentful Paint): ${metrics.fcp} ms ${metrics.fcp < 1800 ? '(Good)' : '(Moderate)'}`);
    console.log(`    LCP (Largest Contentful Paint): ${metrics.lcp} ms ${metrics.lcp < 2500 ? '(Good)' : '(Moderate)'}`);
    console.log(`    CLS (Cumulative Layout Shift): ${metrics.cls} ${metrics.cls < 0.1 ? '(Good - zero visual jitter)' : '(Poor)'}`);
    console.log(`    DOM Content Loaded: ${metrics.dcl} ms`);
    console.log(`    Wall Clock Ready: ${wallClockLoad} ms`);
    console.log(`- Network: ${requestCount} requests, ${(totalBytes / 1024).toFixed(1)} KB transferred, Failed: ${failedRequests.length}`);
    if (failedRequests.length > 0) console.log(`  Failed URLs:`, failedRequests);

    await context.close();
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  for (const target of TARGETS) {
    await auditPage(browser, target);
  }
  await browser.close();
}

run().catch(console.error);
