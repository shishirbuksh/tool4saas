import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";

async function check() {
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto("http://localhost:4321/pdf-merge", { waitUntil: "networkidle" });
  
  console.log("Immediately after goto:");
  let isHydrated = await page.evaluate(() => !!document.querySelector("#app")?._reactRootContainer || document.querySelector("#app")?.innerHTML.includes("react"));
  console.log("Check immediately:", isHydrated);

  // Wait 2000ms for requestIdleCallback timeout (1500ms)
  await page.waitForTimeout(2000);
  console.log("After 2s wait:");
  
  // Try clicking or interacting
  const btnText = await page.locator("button").allInnerTexts();
  console.log("Buttons on page:", btnText);

  await browser.close();
  server.close();
}

check();
