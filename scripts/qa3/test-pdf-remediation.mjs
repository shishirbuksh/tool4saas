import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import { startServer } from "./static-server.mjs";
import fs from "node:fs";

async function createValidPdf(pages = 1) {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) {
    const p = doc.addPage([300, 300]);
    p.drawText(`Remediation Page ${i + 1}`);
  }
  return Buffer.from(await doc.save());
}

async function runPdfRemediationTests() {
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const testReport = {
    testDate: new Date().toISOString(),
    tests: [],
    overallStatus: "PASSED"
  };

  const uncaughtErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      uncaughtErrors.push(msg.text());
    }
  });

  async function triggerHydration() {
    await page.evaluate(() => window.dispatchEvent(new PointerEvent("pointerdown")));
    await page.waitForTimeout(600);
  }

  console.log("\n=======================================================");
  console.log("PHASE 1: RIGOROUS BROWSER TESTING OF REMEDIATED PDF TOOLS");
  console.log("=======================================================\n");

  // -----------------------------------------------------------------
  // 1. PDF MERGE - VALID MERGE WORKFLOW & DOWNLOAD VALIDATION
  // -----------------------------------------------------------------
  console.log("TEST 1.1: PDF Merge - Valid 2-file concatenation and output verification...");
  await page.goto("http://localhost:4321/pdf-merge", { waitUntil: "networkidle" });
  await triggerHydration();

  const pdfBuf1 = await createValidPdf(1);
  const pdfBuf2 = await createValidPdf(2);

  const mergeInput = page.locator('input[type="file"]').first();
  await mergeInput.setInputFiles([
    { name: "file1_1p.pdf", mimeType: "application/pdf", buffer: pdfBuf1 },
    { name: "file2_2p.pdf", mimeType: "application/pdf", buffer: pdfBuf2 }
  ]);
  await page.waitForTimeout(600);

  // Catch download event
  const [mergeDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 10000 }),
    page.locator('button:has-text("Merge 2 PDFs")').first().click()
  ]);

  const mergeDownloadPath = await mergeDownload.path();
  const mergedBytes = fs.readFileSync(mergeDownloadPath);
  
  // Verify that the downloaded file is a valid PDF and opens successfully
  let mergedPageCount = 0;
  let mergeValidPdf = false;
  try {
    const loadedMerged = await PDFDocument.load(mergedBytes);
    mergedPageCount = loadedMerged.getPageCount();
    mergeValidPdf = mergedPageCount === 3; // 1 + 2 = 3 pages
  } catch (e) {
    mergeValidPdf = false;
  }

  const mergeSuccessBanner = await page.getByText(/Merged 2 file\(s\), 3 page\(s\)/i).first().isVisible();
  const test1Passed = mergeValidPdf && mergeSuccessBanner && uncaughtErrors.length === 0;

  testReport.tests.push({
    testName: "PDF Merge Valid Workflow",
    expectedResult: "Merged PDF downloads, opens cleanly via PDFDocument.load(), pageCount === 3",
    actualResult: `Downloaded ${mergedBytes.length} bytes; valid PDF; page count: ${mergedPageCount}; alert visible: ${mergeSuccessBanner}`,
    status: test1Passed ? "PASS" : "FAIL",
    severity: "CRITICAL"
  });
  console.log(`   -> Result: ${testReport.tests.at(-1).status} (Pages: ${mergedPageCount})`);

  // -----------------------------------------------------------------
  // 2. PDF MERGE - INVALID & EMPTY GUARDS
  // -----------------------------------------------------------------
  console.log("TEST 1.2: PDF Merge - Disabled initial guard and empty input handling...");
  await page.goto("http://localhost:4321/pdf-merge", { waitUntil: "networkidle" });
  await triggerHydration();

  const btn0 = page.locator('button:has-text("Merge 0 PDFs")').first();
  const btn0Disabled = await btn0.isDisabled();

  testReport.tests.push({
    testName: "PDF Merge Empty/0-File Disabled Guard",
    expectedResult: "Button is disabled when files.length < 2",
    actualResult: `Merge 0 PDFs button disabled: ${btn0Disabled}`,
    status: btn0Disabled ? "PASS" : "FAIL",
    severity: "HIGH"
  });
  console.log(`   -> Result: ${testReport.tests.at(-1).status}`);

  // -----------------------------------------------------------------
  // 3. PDF MERGE - CORRUPT / FAKE PDF MAGIC BYTE CHECK
  // -----------------------------------------------------------------
  console.log("TEST 1.3: PDF Merge - Corrupt file rejection (magic bytes)...");
  const fakePdfBuffer = Buffer.from("NOT_A_REAL_PDF_DATA_HERE");
  await page.locator('input[type="file"]').first().setInputFiles([
    { name: "fake1.pdf", mimeType: "application/pdf", buffer: fakePdfBuffer },
    { name: "fake2.pdf", mimeType: "application/pdf", buffer: fakePdfBuffer }
  ]);
  await page.waitForTimeout(600);
  await page.locator('button:has-text("Merge 2 PDFs")').first().click();
  await page.waitForTimeout(600);
  const corruptAlert = await page.getByText(/is not a valid PDF \(missing %PDF- header\)/i).first().isVisible();

  testReport.tests.push({
    testName: "PDF Merge Corrupt/Invalid Magic Byte Rejection",
    expectedResult: "File validation rejects non-PDF buffer without %PDF- header",
    actualResult: `Corrupt alert visible: ${corruptAlert}`,
    status: corruptAlert ? "PASS" : "FAIL",
    severity: "HIGH"
  });
  console.log(`   -> Result: ${testReport.tests.at(-1).status}`);

  // -----------------------------------------------------------------
  // 4. PDF SPLIT - VALID SPLIT WORKFLOW (RANGE EXTRACTION)
  // -----------------------------------------------------------------
  console.log("TEST 1.4: PDF Split - Multi-page extraction (range 1-2)...");
  await page.goto("http://localhost:4321/pdf-merge", { waitUntil: "networkidle" });
  await triggerHydration();
  await page.getByRole("tab", { name: "Split" }).click();
  await page.waitForTimeout(400);

  const pdfBuf4p = await createValidPdf(4);
  const splitInput = page.locator('input[type="file"]').nth(1);
  await splitInput.setInputFiles({
    name: "source_4pages.pdf",
    mimeType: "application/pdf",
    buffer: pdfBuf4p
  });
  await page.waitForTimeout(600);

  const rangeInput = page.locator('input[placeholder*="1-3"]').first();
  await rangeInput.fill("1-2");

  const [splitDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 10000 }),
    page.locator('button:has-text("Split & Download")').first().click()
  ]);

  const splitDownloadPath = await splitDownload.path();
  const splitBytes = fs.readFileSync(splitDownloadPath);

  let splitPageCount = 0;
  let splitValidPdf = false;
  try {
    const loadedSplit = await PDFDocument.load(splitBytes);
    splitPageCount = loadedSplit.getPageCount();
    splitValidPdf = splitPageCount === 2; // extracted pages 1 and 2
  } catch (e) {
    splitValidPdf = false;
  }

  const splitSuccessBanner = await page.getByText(/Extracted 2 page\(s\)/i).first().isVisible();
  const test4Passed = splitValidPdf && splitSuccessBanner;

  testReport.tests.push({
    testName: "PDF Split Valid Range Extraction (1-2)",
    expectedResult: "Split PDF downloads, opens cleanly, pageCount === 2",
    actualResult: `Downloaded ${splitBytes.length} bytes; valid PDF; page count: ${splitPageCount}; alert visible: ${splitSuccessBanner}`,
    status: test4Passed ? "PASS" : "FAIL",
    severity: "CRITICAL"
  });
  console.log(`   -> Result: ${testReport.tests.at(-1).status} (Pages: ${splitPageCount})`);

  // -----------------------------------------------------------------
  // 5. PDF SPLIT - SINGLE PAGE EXTRACTION (PAGE 3)
  // -----------------------------------------------------------------
  console.log("TEST 1.5: PDF Split - Single page extraction (page 3)...");
  await rangeInput.fill("3");
  const [splitSingleDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 10000 }),
    page.locator('button:has-text("Split & Download")').first().click()
  ]);

  const splitSinglePath = await splitSingleDownload.path();
  const splitSingleBytes = fs.readFileSync(splitSinglePath);
  let singlePageCount = 0;
  try {
    const loadedSingle = await PDFDocument.load(splitSingleBytes);
    singlePageCount = loadedSingle.getPageCount();
  } catch {}

  const test5Passed = singlePageCount === 1;
  testReport.tests.push({
    testName: "PDF Split Single Page Extraction (page 3)",
    expectedResult: "Extracted PDF has exactly 1 page",
    actualResult: `Page count: ${singlePageCount}`,
    status: test5Passed ? "PASS" : "FAIL",
    severity: "HIGH"
  });
  console.log(`   -> Result: ${testReport.tests.at(-1).status} (Pages: ${singlePageCount})`);

  // -----------------------------------------------------------------
  // 6. PDF SPLIT - OUT OF BOUNDS & MALFORMED RANGE GUARDS
  // -----------------------------------------------------------------
  console.log("TEST 1.6: PDF Split - Out of bounds and malformed range error states...");
  // Test 10-20 on a 4-page PDF
  await rangeInput.fill("10-20");
  await page.locator('button:has-text("Split & Download")').first().click();
  await page.waitForTimeout(400);
  const outOfBoundsAlert = await page.getByText(/out of bounds \(1–4\)/i).first().isVisible();

  // Test malformed range "abc"
  await rangeInput.fill("abc");
  await page.locator('button:has-text("Split & Download")').first().click();
  await page.waitForTimeout(400);
  const malformedAlert = await page.getByText(/Invalid range "abc"/i).first().isVisible();

  // Test inverted range "3-1"
  await rangeInput.fill("3-1");
  await page.locator('button:has-text("Split & Download")').first().click();
  await page.waitForTimeout(400);
  const invertedAlert = await page.getByText(/start is greater than end/i).first().isVisible();

  const test6Passed = outOfBoundsAlert && malformedAlert && invertedAlert;
  testReport.tests.push({
    testName: "PDF Split Input Range Error Handling",
    expectedResult: "Catches out-of-bounds, non-numeric, and inverted ranges with clear error banners",
    actualResult: `outOfBounds: ${outOfBoundsAlert}, malformed: ${malformedAlert}, inverted: ${invertedAlert}`,
    status: test6Passed ? "PASS" : "FAIL",
    severity: "HIGH"
  });
  console.log(`   -> Result: ${testReport.tests.at(-1).status}`);

  // -----------------------------------------------------------------
  // 7. PDF MERGE - OVERSIZED FILE GUARD (> 10MB)
  // -----------------------------------------------------------------
  console.log("TEST 1.7: PDF Merge - Oversized file guard (11MB synthetic buffer)...");
  await page.goto("http://localhost:4321/pdf-merge", { waitUntil: "networkidle" });
  await triggerHydration();
  // Allocate 11 MB buffer with valid PDF header
  const bigBuffer = Buffer.alloc(11 * 1024 * 1024, 0x20);
  bigBuffer.write("%PDF-1.4\n", 0);
  await page.locator('input[type="file"]').first().setInputFiles({
    name: "oversized_11mb.pdf",
    mimeType: "application/pdf",
    buffer: bigBuffer
  });
  await page.waitForTimeout(400);
  const oversizedAlert = await page.getByText(/exceeds/i).first().isVisible();

  testReport.tests.push({
    testName: "PDF File Size Limit Guard (> 10MB)",
    expectedResult: "Rejects files larger than MAX_PDF_SIZE with clear warning",
    actualResult: `Oversized warning alert visible: ${oversizedAlert}`,
    status: oversizedAlert ? "PASS" : "FAIL",
    severity: "HIGH"
  });
  console.log(`   -> Result: ${testReport.tests.at(-1).status}`);

  // -----------------------------------------------------------------
  // 8. UNCAUGHT JAVASCRIPT CONSOLE ERROR CHECK
  // -----------------------------------------------------------------
  console.log("TEST 1.8: Uncaught JavaScript errors during entire PDF testing sequence...");
  const jsErrorsPassed = uncaughtErrors.length === 0;
  testReport.tests.push({
    testName: "Zero Uncaught JS Console Errors",
    expectedResult: "0 uncaught runtime exceptions in page console",
    actualResult: `Uncaught errors count: ${uncaughtErrors.length}${uncaughtErrors.length > 0 ? " (" + uncaughtErrors.join("; ") + ")" : ""}`,
    status: jsErrorsPassed ? "PASS" : "FAIL",
    severity: "CRITICAL"
  });
  console.log(`   -> Result: ${testReport.tests.at(-1).status} (Errors: ${uncaughtErrors.length})`);

  await browser.close();
  server.close();

  if (testReport.tests.some(t => t.status === "FAIL")) {
    testReport.overallStatus = "FAILED";
  }

  fs.writeFileSync("scripts/qa3/pdf-remediation-results.json", JSON.stringify(testReport, null, 2));
  console.log("\n=======================================================");
  console.log(`PHASE 1 SUMMARY: ${testReport.tests.filter(t => t.status === 'PASS').length}/${testReport.tests.length} TESTS PASSED`);
  console.log(`Overall Status: ${testReport.overallStatus}`);
  console.log("Saved evidence to scripts/qa3/pdf-remediation-results.json");
  console.log("=======================================================\n");
}

runPdfRemediationTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
