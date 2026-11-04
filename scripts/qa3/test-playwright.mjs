import { chromium } from "playwright";

async function testPlaywright() {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("about:blank");
    console.log("Playwright Chromium launched successfully!");
    await browser.close();
  } catch (err) {
    console.error("Playwright error:", err.message);
  }
}
testPlaywright();
