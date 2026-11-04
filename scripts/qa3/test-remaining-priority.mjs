import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";

const PNG_10X10_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9QzwAEjDAGYzMGAA+mARF1iN2jAAAAAElFTkSuQmCC";

async function waitForHydration(page) {
  await page.evaluate(() => window.dispatchEvent(new PointerEvent("pointerdown")));
  await page.waitForTimeout(600);
}

async function testTools() {
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log("Testing Image Resizer...");
  await page.goto("http://localhost:4321/image-compressor", { waitUntil: "networkidle" });
  await waitForHydration(page);
  await page.getByRole("tab", { name: "Resize" }).click();
  await page.waitForTimeout(400);

  const pngBuffer = Buffer.from(PNG_10X10_BASE64, "base64");
  const imgResizeInput = page.locator('input[type="file"]').nth(1);
  await imgResizeInput.setInputFiles({
    name: "resize-test.png",
    mimeType: "image/png",
    buffer: pngBuffer
  });
  await page.waitForTimeout(600);

  const wInput = page.locator('input[type="number"]:visible').first();
  await wInput.fill("20");
  await page.waitForTimeout(300);

  const resizeBtn = page.locator('button:has-text("Resize"):visible').first();
  await resizeBtn.click();
  await page.waitForTimeout(600);

  const resizeDownloadLink = await page.locator('a:has-text("Download"):visible').first().isVisible();
  console.log("Image Resizer download link visible:", resizeDownloadLink);

  console.log("\nTesting JSON Formatter...");
  await page.goto("http://localhost:4321/json-formatter", { waitUntil: "networkidle" });
  await waitForHydration(page);

  const jsonInput = page.locator('textarea:visible').first();
  await jsonInput.fill("{ invalid json: ");
  await page.getByRole("button", { name: "Format (2 spaces)" }).click();
  const jsonErr = await page.getByText(/Invalid JSON:/i).first().isVisible();
  console.log("JSON Formatter invalid syntax error displayed:", jsonErr);

  await jsonInput.fill('{"site":"Tool4SaaS","version":3}');
  await page.getByRole("button", { name: "Format (2 spaces)" }).click();
  await page.waitForTimeout(400);

  const resultTextarea = page.locator("textarea:visible").nth(1);
  const formattedVal = await resultTextarea.inputValue();
  const formatPassed = formattedVal.includes('  "site": "Tool4SaaS"');
  console.log("JSON Formatter indented output produced:", formatPassed);

  await page.getByRole("button", { name: "Minify" }).click();
  await page.waitForTimeout(400);
  const minifiedVal = await resultTextarea.inputValue();
  const minifyPassed = minifiedVal === '{"site":"Tool4SaaS","version":3}';
  console.log("JSON Formatter minified output produced:", minifyPassed);

  await browser.close();
  server.close();
}

testTools();
