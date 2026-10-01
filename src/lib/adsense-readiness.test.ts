import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

// Static AdSense-readiness checks (file reads only, no network).
const root = process.cwd();
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const exists = (rel: string) => fs.existsSync(path.join(root, rel));

describe("adsense readiness (static)", () => {
  it("contact page exists and exposes the contact email via mailto", () => {
    const rel = path.join("src", "app", "contact", "page.tsx");
    expect(exists(rel), rel).toBe(true);
    const src = read(rel);
    // Page renders the configured contact email via siteConfig (env-overridable),
    // so assert the reference plus a mailto link rather than a literal address.
    expect(src).toContain("siteConfig.email");
    expect(src).toContain("mailto");
  });

  it("author page exists (E-E-A-T signal)", () => {
    const rel = path.join("src", "app", "author", "page.tsx");
    expect(exists(rel), rel).toBe(true);
    expect(read(rel).length).toBeGreaterThan(0);
  });

  it("methodology page exists (warn-only if missing)", () => {
    const rel = path.join("src", "app", "methodology", "page.tsx");
    if (!exists(rel)) {
      console.warn(`[adsense-readiness] missing ${rel}: methodology page recommended for E-E-A-T`);
      return;
    }
    expect(read(rel).length).toBeGreaterThan(0);
  });

  it("Footer links contact and author (discoverability)", () => {
    const src = read(path.join("src", "components", "Footer.tsx"));
    expect(src).toContain("/contact");
    expect(src).toContain("/author");
    expect(exists(path.join("src", "app", "author", "page.tsx"))).toBe(true);
    expect(read(path.join("src", "app", "sitemap.ts"))).toContain("/author");
  });

  it("layout sets consent default denied with wait_for_update", () => {
    const src = read(path.join("src", "app", "layout.tsx"));
    expect(src).toContain("wait_for_update");
    expect(src).toContain("consent', 'default'");
    expect(src).toContain("ad_storage: 'denied'");
    expect(src).toContain("analytics_storage: 'denied'");
  });

  it("next.config.js allows AdSense + Funding Choices", () => {
    const src = read("next.config.js");
    expect(src).toContain("pagead2");
    expect(src).toContain("fundingchoices");
  });

  it("CookieConsent uses t4s-consent-v1, Save choices, and honours GPC", () => {
    const src = read(path.join("src", "components", "CookieConsent.tsx"));
    expect(src).toContain("t4s-consent-v1");
    expect(src).toContain("Save choices");
    expect(src).toContain("globalPrivacyControl");
  });

  it("AdSlot validates 10-digit slots, gates on consent, labels ads", () => {
    const src = read(path.join("src", "components", "AdSlot.tsx"));
    expect(src).toContain("\\d{10}");
    expect(src).toContain("t4s:consent-updated");
    expect(src).toContain("Advertisement");
  });

  it("YMYLDisclaimer exists and is imported by >=30 tool components (script parity)", () => {
    const disc = path.join("src", "components", "YMYLDisclaimer.tsx");
    expect(exists(disc), disc).toBe(true);
    const dir = path.join(root, "src", "components", "tools");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"));
    expect(files.length).toBeGreaterThan(0);
    let importing = 0;
    for (const f of files) {
      if (fs.readFileSync(path.join(dir, f), "utf8").includes("YMYLDisclaimer")) importing += 1;
    }
    expect(importing).toBeGreaterThanOrEqual(30);
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

  it("AdSense IDs fail closed on placeholders (no fake client/slot reaches markup)", () => {
    const site = read(path.join("src", "lib", "site.ts"));
    expect(site).toContain("ca-pub-\\d{16}");
    const slot = read(path.join("src", "components", "AdSlot.tsx"));
    expect(slot).toContain("return null");
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
