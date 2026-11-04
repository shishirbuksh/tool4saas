import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';
import { PDFDocument } from 'pdf-lib';

const TARGET_DOMAIN = process.env.TARGET_DOMAIN || 'https://tool4saas.com';

console.log(`====================================================================`);
console.log(` Tool4SaaS Production Post-Deployment Verification Suite`);
console.log(` Target Domain: ${TARGET_DOMAIN}`);
console.log(`====================================================================\n`);

async function testFetch(url, options = {}) {
  const res = await fetch(url, options);
  return res;
}

const testResults = [];

function record(name, pass, evidence, details = '') {
  testResults.push({ name, status: pass ? 'PASS' : 'FAIL', evidence, details });
  const badge = pass ? '\x1b[32m[PASS]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
  console.log(`${badge} ${name}: ${evidence}`);
}

async function run() {
  // 1. Homepage Verification
  try {
    const res = await testFetch(`${TARGET_DOMAIN}/`, { redirect: 'manual' });
    const text = await res.text();
    const is200 = res.status === 200;
    const hasCanonical = text.includes('rel="canonical"') && text.includes('href="https://tool4saas.com"');
    const hasHero = text.includes('Tool4SaaS') && text.includes('<h1');
    record('Homepage HTTP 200 & Canonical', is200 && hasCanonical && hasHero, `Status: ${res.status}, Canonical present: ${hasCanonical}`);
  } catch (e) {
    record('Homepage HTTP 200 & Canonical', false, e.message);
  }

  // 2. Robots.txt Verification
  try {
    const res = await testFetch(`${TARGET_DOMAIN}/robots.txt`);
    const text = await res.text();
    const is200 = res.status === 200;
    const hasProbeDisallow = text.includes('Disallow: /probe');
    const hasSitemap = text.includes('Sitemap: https://tool4saas.com/sitemap.xml');
    record('robots.txt /probe Disallowed', is200 && hasProbeDisallow && hasSitemap, `HTTP ${res.status}, Disallow /probe: ${hasProbeDisallow}, Sitemap: ${hasSitemap}`);
  } catch (e) {
    record('robots.txt /probe Disallowed', false, e.message);
  }

  // 3. Security Headers Verification
  try {
    const res = await testFetch(`${TARGET_DOMAIN}/`, { method: 'HEAD' });
    const h = res.headers;
    const ctOptions = h.get('x-content-type-options') || '';
    const frameOptions = h.get('x-frame-options') || '';
    const csp = h.get('content-security-policy') || '';
    const permPolicy = h.get('permissions-policy') || '';

    const noDuplicateNosniff = ctOptions === 'nosniff';
    const noDuplicateFrame = frameOptions.toUpperCase() === 'SAMEORIGIN';
    const hasMicrophoneSelf = permPolicy.includes('microphone=(self)');
    const hasCsp = csp.length > 0;

    record('X-Content-Type-Options: nosniff (no duplicates)', noDuplicateNosniff, `Actual: "${ctOptions}"`);
    record('X-Frame-Options: SAMEORIGIN (no duplicates)', noDuplicateFrame, `Actual: "${frameOptions}"`);
    record('Permissions-Policy includes microphone=(self)', hasMicrophoneSelf, `Actual: "${permPolicy}"`);
    record('Content-Security-Policy active', hasCsp, `CSP Length: ${csp.length} bytes`);
  } catch (e) {
    record('Security Headers Verification', false, e.message);
  }

  // 4. Sample Legacy Redirects Verification (Nginx HTTP 301)
  const sampleRedirects = [
    { original: '/tools/pdf-merge', expected: '/pdf-merge' },
    { original: '/tools/json-formatter', expected: '/json-formatter' },
    { original: '/tools/percentage-calculator', expected: '/percentage-calculator' },
    { original: '/es/invoice-generator', expected: '/invoice-generator' },
    { original: '/fr/qr-code-generator', expected: '/qr-code-generator' },
  ];

  for (const r of sampleRedirects) {
    try {
      const res = await testFetch(`${TARGET_DOMAIN}${r.original}`, { redirect: 'manual' });
      const loc = res.headers.get('location') || '';
      const is301 = res.status === 301;
      const isExpected = loc.endsWith(r.expected);
      record(`Redirect ${r.original} -> ${r.expected}`, is301 && isExpected, `Status: ${res.status}, Location: "${loc}"`);
    } catch (e) {
      record(`Redirect ${r.original}`, false, e.message);
    }
  }

  // 5. Playwright Browser E2E Tests: PDF Merge & PDF Split
  console.log('\n--- LAUNCHING PLAYWRIGHT BROWSER E2E TESTS ---');
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Helper: generate mock 1-page and 2-page PDFs in memory
    const doc1 = await PDFDocument.create();
    doc1.addPage([300, 400]);
    const pdf1Bytes = await doc1.save();

    const doc2 = await PDFDocument.create();
    doc2.addPage([300, 400]);
    doc2.addPage([300, 400]);
    const pdf2Bytes = await doc2.save();

    // A. PDF Merge Browser Test
    console.log(`Testing PDF Merge at ${TARGET_DOMAIN}/pdf-merge ...`);
    await page.goto(`${TARGET_DOMAIN}/pdf-merge`, { waitUntil: 'networkidle' });

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      { name: 'test-1p.pdf', mimeType: 'application/pdf', buffer: Buffer.from(pdf1Bytes) },
      { name: 'test-2p.pdf', mimeType: 'application/pdf', buffer: Buffer.from(pdf2Bytes) },
    ]);

    const mergeBtn = page.getByRole('button', { name: /merge/i }).first();
    const [downloadMerge] = await Promise.all([
      page.waitForEvent('download', { timeout: 15000 }),
      mergeBtn.click(),
    ]);

    const mergeStream = await downloadMerge.createReadStream();
    const mergeChunks = [];
    for await (const chunk of mergeStream) mergeChunks.push(chunk);
    const mergedBuf = Buffer.concat(mergeChunks);
    const parsedMergeDoc = await PDFDocument.load(mergedBuf);
    const mergedPagesCount = parsedMergeDoc.getPageCount();

    record('PDF Merge End-to-End Download & Verification', mergedPagesCount === 3, `Merged page count: ${mergedPagesCount} (expected 3)`);

    // B. PDF Split Browser Test
    console.log(`Testing PDF Split at ${TARGET_DOMAIN}/pdf-split ...`);
    await page.goto(`${TARGET_DOMAIN}/pdf-split`, { waitUntil: 'networkidle' });

    const splitInput = page.locator('input[type="file"]');
    // Create a 3-page doc for split
    const doc3 = await PDFDocument.create();
    doc3.addPage([300, 400]);
    doc3.addPage([300, 400]);
    doc3.addPage([300, 400]);
    const pdf3Bytes = await doc3.save();

    await splitInput.setInputFiles([
      { name: 'test-3p.pdf', mimeType: 'application/pdf', buffer: Buffer.from(pdf3Bytes) },
    ]);

    const rangeInput = page.locator('input[placeholder*="1-3"], input[type="text"]').first();
    await rangeInput.fill('1-2');

    const splitBtn = page.getByRole('button', { name: /split/i }).first();
    const [downloadSplit] = await Promise.all([
      page.waitForEvent('download', { timeout: 15000 }),
      splitBtn.click(),
    ]);

    const splitStream = await downloadSplit.createReadStream();
    const splitChunks = [];
    for await (const chunk of splitStream) splitChunks.push(chunk);
    const splitBuf = Buffer.concat(splitChunks);
    const parsedSplitDoc = await PDFDocument.load(splitBuf);
    const splitPagesCount = parsedSplitDoc.getPageCount();

    record('PDF Split End-to-End Download & Verification', splitPagesCount === 2, `Split page count: ${splitPagesCount} (expected 2 for range 1-2)`);

    record('Browser Console Cleanliness (0 uncaught errors)', consoleErrors.length === 0, `Errors captured: ${consoleErrors.length}`);
  } catch (err) {
    record('Playwright Browser E2E Tests', false, err.message);
  } finally {
    if (browser) await browser.close();
  }

  // Summary
  console.log(`\n====================================================================`);
  const total = testResults.length;
  const passed = testResults.filter((r) => r.status === 'PASS').length;
  console.log(` Post-Deployment Verification Summary: ${passed}/${total} Passed (${Math.round((passed / total) * 100)}%)`);
  console.log(`====================================================================`);

  fs.writeFileSync('deploy/post-deployment-results.json', JSON.stringify(testResults, null, 2));
}

run();
