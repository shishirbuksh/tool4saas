import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import { startServer } from "./static-server.mjs";

async function createTestPdf() {
  const doc = await PDFDocument.create();
  doc.addPage([200, 200]);
  return Buffer.from(await doc.save());
}

async function testPdfMerge() {
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:4321/pdf-merge", { waitUntil: "networkidle" });
  
  // Trigger hydration
  await page.evaluate(() => window.dispatchEvent(new PointerEvent("pointerdown")));
  await page.waitForTimeout(1000);

  const pdf1 = await createTestPdf();
  const pdf2 = await createTestPdf();

  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles([
    { name: "file1.pdf", mimeType: "application/pdf", buffer: pdf1 },
    { name: "file2.pdf", mimeType: "application/pdf", buffer: pdf2 }
  ]);

  await page.waitForTimeout(500);

  const buttonTexts = await page.locator("button").allInnerTexts();
  console.log("Button texts after file upload:", buttonTexts.filter(b => b.includes("Merge") || b.includes("file")));

  const hasFile1 = await page.getByText("file1.pdf").isVisible();
  console.log("Is file1.pdf visible in UI:", hasFile1);

  await browser.close();
  server.close();
}

testPdfMerge();
