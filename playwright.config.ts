import { defineConfig, devices } from "@playwright/test";

// Smoke only: 3 representative pages on production build (npm run build +
// npm run start). Chromium only, no sleeps/screenshots, no ad-network asserts.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run start",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
  },
});
