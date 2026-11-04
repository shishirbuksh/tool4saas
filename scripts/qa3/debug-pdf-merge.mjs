import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import { startServer } from "./static-server.mjs";

async function run() {
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:4321/pdf-merge", { waitUntil: "networkidle" });
  await page.evaluate(() => window.dispatchEvent(new PointerEvent("pointerdown")));
  await page.waitForTimeout(600);

  const b0 = page.locator('button:has-text("Merge 0 PDFs")').first();
  const d0 = await b0.isDisabled();
  console.log("merge0Disabled:", d0);

  const doc1 = await PDFDocument.create(); doc1.addPage();
  const doc2 = await PDFDocument.create(); doc2.addPage();
  const b1 = Buffer.from(await doc1.save());
  const b2 = Buffer.from(await doc2.save());

  await page.locator('input[type="file"]').first().setInputFiles([
    { name: "doc1.pdf", mimeType: "application/pdf", buffer: b1 },
    { name: "doc2.pdf", mimeType: "application/pdf", buffer: b2 }
  ]);
  await page.waitForTimeout(500);

  const b2Btn = page.locator('button:has-text("Merge 2 PDFs")').first();
  const e2 = !(await b2Btn.isDisabled());
  console.log("merge2Enabled:", e2);

  await b2Btn.click();
  await page.waitForTimeout(1000);

  const alerts = await page.locator(".alert").allInnerTexts();
  console.log("Alerts on page after merge click:", alerts);

  await browser.close();
  server.close();
}
run();
