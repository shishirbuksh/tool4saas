import { test, expect } from "@playwright/test";

// Production smoke: homepage + 2 YMYL tool pages (finance + health).
// No console errors, single h1, central YMYL banner present.
test("homepage loads with a single h1", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("homepage exposes hero search, categories and all 12 hubs", async ({ page }) => {
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Free online tools" });
  await expect(hero.getByLabel("Search tools")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "All 125 free tools" })
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Tool categories" }).getByRole("link")
  ).toHaveCount(12);
});

test("homepage directory server-renders every visible tool", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#tools ul a")).toHaveCount(125);
  await expect(page.locator('#tools a[href="/pdf-compress"]')).toHaveCount(0);
  await expect(page.locator('#tools a[href="/fancy-text-generator"]')).toHaveCount(0);
  await expect(page.locator('#tools a[href="/json-formatter"]')).toHaveCount(1);
});

test("tablet header uses the drawer without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await expect(menuButton).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBe(0);
  await menuButton.click();
  const drawer = page.getByRole("dialog", { name: "Menu" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByLabel("Search tools")).toBeVisible();
  const bannerOnTop = await page.evaluate(() => {
    const banner = document.querySelector('[aria-label="Cookie consent"]');
    if (!banner) return false;
    const rect = banner.getBoundingClientRect();
    const top = document.elementFromPoint(rect.left + 12, rect.top + 12);
    return Boolean(top && banner.contains(top));
  });
  expect(bannerOnTop).toBe(false);
});

test("mobile directory uses two columns and stays within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Free online tools" });
  await expect(hero.getByLabel("Search tools")).toBeVisible();
  const columns = await page.locator("#tools ul").first().evaluate((el) =>
    getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length
  );
  expect(columns).toBe(2);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBe(0);
});

test("mortgage-calculator shows the finance disclaimer", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/mortgage-calculator");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(
    page.getByRole("alert").filter({ hasText: /not financial advice/i }).first()
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("calorie-calculator shows the health disclaimer", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/calorie-calculator");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(
    page.getByRole("alert").filter({ hasText: /not medical advice/i }).first()
  ).toBeVisible();
  expect(errors).toEqual([]);
});
