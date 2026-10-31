import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    // DOM only for component tests — keep node default so the 19 lib
    // suites stay fast and side-effect free.
    environmentMatchGlobs: [["src/**/*.test.tsx", "jsdom"]],
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "tests/**/*.test.ts"],
    globals: true,
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: /^@mui\/material\/(.*)/, replacement: path.resolve(__dirname, "./src/components/ui/$1") },
      { find: "@mui/material", replacement: path.resolve(__dirname, "./src/components/ui/index.ts") },
      { find: /^@mui\/icons-material\/(.*)/, replacement: path.resolve(__dirname, "./src/components/ui/icons/$1") },
      { find: "@mui/icons-material", replacement: path.resolve(__dirname, "./src/components/ui/icons/index.ts") },
    ],
  },
});
