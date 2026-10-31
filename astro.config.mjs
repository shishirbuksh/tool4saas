import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REDIRECT_MAP } from "./scripts/redirects.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// `.env` files are not loaded inside Astro config (only inside the app via
// import.meta.env), so parse the handful of keys needed at config time.
// PUBLIC_* is the canonical prefix; NEXT_PUBLIC_* stays supported as a
// migration fallback (both are inlined into client bundles via `define`).
function readEnvFile(file) {
  if (!existsSync(file)) return {};
  const out = {};
  for (const raw of readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}
const env = {
  ...readEnvFile(".env"),
  ...readEnvFile(".env.local"),
  ...Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key.startsWith("PUBLIC_") || key.startsWith("NEXT_PUBLIC_")),
  ),
};
const site = (env.PUBLIC_SITE_URL || env.NEXT_PUBLIC_SITE_URL || "https://tool4saas.com").replace(/\/+$/, "");

const legacyEnv = Object.fromEntries(
  Object.entries(env)
    .filter(([key]) => key.startsWith("NEXT_PUBLIC_"))
    .map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
);

export default defineConfig({
  site,
  // Slashless canonical URLs: `/about` -> dist/about.html, served by Nginx
  // with `try_files $uri $uri.html $uri/ =404`.
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [react()],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      optimizedFallbacks: true,
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains",
      weights: ["100 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      optimizedFallbacks: true,
    },
  ],
  // Dev/preview parity only: static builds emit meta-refresh pages, while
  // production Nginx issues real 308s (see deploy/nginx.conf).
  redirects: Object.fromEntries(
    Object.entries(REDIRECT_MAP).map(([source, destination]) => [
      source,
      { status: 308, destination },
    ]),
  ),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: /^@mui\/material\/(.*)/, replacement: path.resolve(__dirname, "src/components/ui/$1") },
        { find: "@mui/material", replacement: path.resolve(__dirname, "src/components/ui/index.ts") },
        { find: /^@mui\/icons-material\/(.*)/, replacement: path.resolve(__dirname, "src/components/ui/icons/$1") },
        { find: "@mui/icons-material", replacement: path.resolve(__dirname, "src/components/ui/icons/index.ts") },
      ],
    },
    define: legacyEnv,
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
  },
});
