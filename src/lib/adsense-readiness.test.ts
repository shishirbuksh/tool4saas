import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

// Static AdSense-readiness checks (file reads only, no network).
const root = process.cwd();
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const exists = (rel: string) => fs.existsSync(path.join(root, rel));

describe("adsense readiness (static)", () => {
  it("contact page exists and exposes the contact email via mailto", () => {
    const astroPage = path.join("src", "pages", "contact.astro");
    const rel = path.join("src", "views", "pages", "contact.tsx");
    expect(exists(astroPage), astroPage).toBe(true);
    expect(exists(rel), rel).toBe(true);
    const src = read(rel);
    // Page renders the configured contact email via siteConfig (env-overridable),
    // so assert the reference and a mailto link rather than a literal address.
    expect(src).toContain("siteConfig.email");
    expect(src).toContain("mailto");
  });

  it("author page exists (E-E-A-T signal)", () => {
    const astroPage = path.join("src", "pages", "author.astro");
    const rel = path.join("src", "views", "pages", "author.tsx");
    expect(exists(astroPage), astroPage).toBe(true);
    expect(exists(rel), rel).toBe(true);
    expect(read(rel).length).toBeGreaterThan(0);
  });

  it("methodology page exists (warn-only if missing)", () => {
    const astroPage = path.join("src", "pages", "methodology.astro");
    const rel = path.join("src", "views", "pages", "methodology.tsx");
    if (!exists(astroPage) && !exists(rel)) {
      console.warn(`[adsense-readiness] missing ${rel}: methodology page recommended for E-E-A-T`);
      return;
    }
    expect(read(rel).length).toBeGreaterThan(0);
  });

  it("Footer links contact and author (discoverability)", () => {
    const src = read(path.join("src", "components", "Footer.tsx"));
    expect(src).toContain("/contact");
    expect(src).toContain("/author");
    expect(exists(path.join("src", "pages", "author.astro"))).toBe(true);
    expect(read(path.join("src", "pages", "sitemap.xml.ts"))).toContain("/author");
  });

  it("layout sets consent default denied with wait_for_update", () => {
    const src = read(path.join("src", "layouts", "BaseLayout.astro"));
    expect(src).toContain("wait_for_update");
    expect(src).toContain("consent', 'default'");
    expect(src).toContain("ad_storage: 'denied'");
    expect(src).toContain("analytics_storage: 'denied'");
  });

  it("layout and app shell gate Google scripts safely", () => {
    const base = read(path.join("src", "layouts", "BaseLayout.astro"));
    expect(base).not.toContain("googletagmanager.com/gtag/js");
    expect(base).not.toContain("pagead2.googlesyndication.com");
    const shell = read(path.join("src", "components", "AppShell.tsx"));
    expect(shell).toContain("ConsentGatedGoogleScripts");
  });

  it("ConsentGatedGoogleScripts gates on stored consent + split grants", () => {
    const src = read(path.join("src", "components", "ConsentGatedGoogleScripts.tsx"));
    expect(src).toContain("t4s:consent-updated");
    expect(src).toContain("t4s-consent-v1");
    expect(src).toContain("analytics_storage");
    expect(src).toContain("ad_storage");
    expect(src).toContain("AdSenseScript");
  });

  it("site GA ID is env-overridable with safe fallback", () => {
    const src = read(path.join("src", "lib", "site.ts"));
    expect(src).toContain("NEXT_PUBLIC_GA_ID");
    expect(src).toContain("G-JD0HNN61MF");
  });

  it("deploy/nginx.conf allows AdSense + Funding Choices in CSP", () => {
    const src = read(path.join("deploy", "nginx.conf"));
    expect(src).toContain("pagead2");
    expect(src).toContain("fundingchoices");
  });

  it("CookieConsent uses t4s-consent-v1, Save choices, and honours GPC", () => {
    const src = read(path.join("src", "components", "CookieConsent.tsx"));
    expect(src).toContain("t4s-consent-v1");
    expect(src).toContain("Save choices");
    expect(src).toContain("globalPrivacyControl");
  });

  it("AdSense uses the Auto Ads page-level loader (no manual slots)", () => {
    const script = read(path.join("src", "components", "AdSenseScript.tsx"));
    expect(script).toContain("adsbygoogle.js?client=");
    expect(script).toContain("return null");
    // Manual ad units were removed in favor of Auto Ads.
    expect(exists(path.join("src", "components", "AdSlot.tsx"))).toBe(false);
  });

  it("Funding Choices is wired + env-gated (off until an id is set)", () => {
    const root = read(path.join("src", "layouts", "BaseLayout.astro"));
    expect(root).toContain("fundingChoicesId");
    expect(root).toContain("fundingchoicesmessages.google.com");
    const site = read(path.join("src", "lib", "site.ts"));
    expect(site).toContain("NEXT_PUBLIC_FUNDING_CHOICES_ID");
    expect(site).toContain("pub-\\d{16}");
    expect(read(path.join(".env.example"))).toContain("NEXT_PUBLIC_FUNDING_CHOICES_ID");
  });

  it("YMYLDisclaimer is centrally injected by ToolPageShell (no manual imports)", () => {
    const disc = path.join("src", "components", "YMYLDisclaimer.tsx");
    expect(exists(disc), disc).toBe(true);
    // Shell renders the disclaimer from the single source (src/lib/ymyl.ts).
    const shell = read(path.join("src", "components", "ToolPageShell.tsx"));
    expect(shell).toContain("YMYLDisclaimer");
    const server = read(path.join("src", "lib", "tool-view.server.ts"));
    expect(server).toContain("getYMYLType");
    // The mapping covers finance + health categories and overrides.
    const map = read(path.join("src", "lib", "ymyl.ts"));
    expect(map).toContain('"finance"');
    expect(map).toContain('"health"');
    expect(map).toContain("getYMYLType");
    // Regression guard: no tool imports the disclaimer directly (no doubles).
    const dir = path.join(root, "src", "components", "tools");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"));
    expect(files.length).toBeGreaterThan(0);
    const importing = files.filter((f) =>
      fs.readFileSync(path.join(dir, f), "utf8").includes("YMYLDisclaimer")
    );
    expect(importing, importing.join(", ")).toEqual([]);
  });

  it("ads.txt exists with valid google.com DIRECT entry (format only — real ID gated by adsense:check script)", () => {
    const rel = path.join("public", "ads.txt");
    expect(exists(rel), rel).toBe(true);
    const content = read(rel);
    expect(content).toContain("google.com");
    expect(content).toContain("DIRECT");
    expect(content).toContain("f08c47fec0942fa0");
    // NOTE: placeholder publisher IDs are intentionally NOT approved here.
    // scripts/check-adsense-readiness.mjs FAILs on pub-0{4,}/ca-pub-XXX placeholders;
    // that script (npm run adsense:check) is the ID gate before review submission.
  });

  it("AdSense IDs fail closed on placeholders (no fake client/FC id reaches markup)", () => {
    const site = read(path.join("src", "lib", "site.ts"));
    expect(site).toContain("ca-pub-\\d{16}");
    const script = read(path.join("src", "components", "AdSenseScript.tsx"));
    expect(script).toContain("return null");
  });

  it("llms.txt links Contact/Author/Terms + all 12 category hubs when present (skip if missing)", () => {
    const rel = path.join("public", "llms.txt");
    if (!exists(rel)) {
      console.warn("[adsense-readiness] public/llms.txt missing; skipping");
      return;
    }
    const content = read(rel);
    expect(content).toContain("Contact");
    expect(content).toContain("Author");
    expect(content).toContain("/terms");
    for (const hub of [
      "text-documents",
      "business",
      "developer",
      "converters",
      "generators",
      "images-design",
      "pdf",
      "calculators",
      "finance",
      "health",
      "seo",
      "time",
    ]) {
      expect(content, `llms.txt missing hub ${hub}`).toContain(`/category/${hub}`);
    }
  });
});
