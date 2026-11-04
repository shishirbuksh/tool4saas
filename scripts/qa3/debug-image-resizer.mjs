import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";

const PNG_10X10_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9QzwAEjDAGYzMGAA+mARF1iN2jAAAAAElFTkSuQmCC";

async function run() {
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto("http://localhost:4321/image-compressor", { waitUntil: "networkidle" });
  await page.evaluate(() => window.dispatchEvent(new PointerEvent("pointerdown")));
  await page.waitForTimeout(600);

  // Click the tab
  await page.getByRole("tab", { name: "Resize" }).click();
  await page.waitForTimeout(400);

  const pngBuffer = Buffer.from(PNG_10X10_BASE64, "base64");
  await page.locator('input[type="file"]').nth(1).setInputFiles({
    name: "test.png",
    mimeType: "image/png",
    buffer: pngBuffer
  });

  await page.waitForTimeout(1000);

  // Click the action button (NOT the tab)
  const actionBtn = page.locator('button:not([role="tab"]):has-text("Resize")');
  console.log("Action button text:", await actionBtn.innerText());
  console.log("Action button disabled?", await actionBtn.isDisabled());

  await actionBtn.click();
  await page.waitForTimeout(1000);

  const downloadBtn = page.locator('a:has-text("Download")');
  console.log("Download link visible?", await downloadBtn.isVisible());
  console.log("Download link href:", await downloadBtn.getAttribute("href"));

  await browser.close();
  server.close();
}

run();
