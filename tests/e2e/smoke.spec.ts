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
    page.getByRole("heading", { level: 2, name: /popular free online tools/i })
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Tool categories" }).getByRole("link")
  ).toHaveCount(12);
});

test("homepage tool explorer filters by category", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Developer Tools/ }).click();
  await expect(
    page.getByRole("button", { name: /^Developer Tools/ })
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page
      .getByRole("region", { name: "All tools" })
      .getByRole("heading", { level: 3, name: "JSON Formatter" })
  ).toBeVisible();
  await expect(page.getByText("Showing 12 of 22 tools")).toBeVisible();
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
