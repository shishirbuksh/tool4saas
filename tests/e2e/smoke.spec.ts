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
