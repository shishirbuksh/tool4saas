import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { toolMetadata, homeMetadata, staticPageMetadata } from "./metadata";
import { tools, getTool } from "./tools";
import { NOINDEX_SLUGS } from "./tools/noindex";
import { siteConfig } from "./site";

const root = process.cwd();
const base = siteConfig.url.replace(/\/$/, "");

describe("SEO metadata", () => {
  it('toolMetadata("word-counter") title is 30-70 chars and contains Tool4SaaS', () => {
    const meta = toolMetadata("word-counter");
    // Absolute title object bypasses layout template (no double suffix).
    const title = (meta.title as { absolute: string }).absolute as string;
    expect(typeof title).toBe("string");
    expect(title).toContain("Tool4SaaS");
    expect(title.length).toBeGreaterThanOrEqual(30);
    expect(title.length).toBeLessThanOrEqual(70);
  });

  it("every tool title is 30-70 chars and contains Tool4SaaS", () => {
    for (const t of tools) {
      const title = (toolMetadata(t.slug).title as { absolute: string }).absolute as string;
      expect(title, `${t.slug} brand`).toContain("Tool4SaaS");
      expect(title.length, `${t.slug} len=${title.length}`).toBeGreaterThanOrEqual(30);
      expect(title.length, `${t.slug} len=${title.length}`).toBeLessThanOrEqual(70);
    }
  });

  it("tool description equals the catalogue description", () => {
    const tool = getTool("word-counter");
    expect(tool).toBeDefined();
    expect(toolMetadata("word-counter").description).toBe(tool!.description);
    for (const t of tools) {
      expect(toolMetadata(t.slug).description, t.slug).toBe(t.description);
    }
  });

  it("tool canonical is absolute base/slug (https in prod)", () => {
    const canonical = (toolMetadata("word-counter").alternates as { canonical: string }).canonical;
    expect(canonical).toBe(`${base}/word-counter`);
    expect(canonical).toMatch(/^https?:\/\//);
    // Dev fallback is http://localhost:3000 (see site.ts); prod canonicals must be https.
    if (base.startsWith("https://")) expect(canonical.startsWith("https://")).toBe(true);
  });

  it("tool OG image is absolute base/og/slug", () => {
    const meta = toolMetadata("word-counter");
    const og = meta.openGraph as { images?: { url: string }[] };
    const twitter = meta.twitter as { images?: string[] };
    const ogUrl = og?.images?.[0]?.url as string;
    // Canonical best practice: absolute URL (was relative /og/slug, now base/og/slug).
    expect(ogUrl).toBe(`${base}/og/word-counter`);
    expect(ogUrl).toMatch(/^https?:\/\//);
    expect(ogUrl.endsWith("/og/word-counter")).toBe(true);
    const twImg = twitter?.images?.[0] as string;
    expect(twImg).toBe(`${base}/og/word-counter`);
    expect(twImg).toMatch(/^https?:\/\//);
    expect(twImg.endsWith("/og/word-counter")).toBe(true);
  });

  it("homeMetadata canonical is the site base", () => {
    const canonical = (homeMetadata().alternates as { canonical: string }).canonical;
    expect(canonical).toBe(base);
  });

  it("home declares locale en_US and no alternateLocale", () => {
    const og = homeMetadata().openGraph as { locale?: string; alternateLocale?: string[] };
    expect(og.locale).toBe("en_US");
    expect(og.alternateLocale).toBeUndefined();
  });

  it("staticPageMetadata /contact canonical is base/contact", () => {
    const meta = staticPageMetadata({ title: "Contact Us", description: "x", path: "/contact" });
    expect((meta.alternates as { canonical: string }).canonical).toBe(`${base}/contact`);
  });

  it("tool pages are indexable (robots index true)", () => {
    const meta = toolMetadata("word-counter");
    expect(meta.robots).toMatchObject({ index: true });
    for (const t of tools) {
      const r = toolMetadata(t.slug).robots as { index?: boolean; googleBot?: { index?: boolean } };
      const expected = !NOINDEX_SLUGS.has(t.slug);
      expect(r?.index, `${t.slug} robots.index`).toBe(expected);
      expect(r?.googleBot?.index, `${t.slug} googleBot.index`).toBe(expected);
    }
  });

  it("pdf-compress is excluded from sitemap (NOINDEX_SLUGS)", async () => {
    // pdf-compress page metadata lives in a .tsx route file (JSX) — not imported
    // here. Instead assert the sitemap imports the single-source noindex list
    // (@/lib/tools NOINDEX_SLUGS, no local duplicate) and the generated sitemap
    // actually excludes the slug.
    const src = fs.readFileSync(path.join(root, "src", "pages", "sitemap.xml.ts"), "utf8");
    expect(src).toContain("NOINDEX_SLUGS");
    expect(src).toMatch(/import\s+.*NOINDEX_SLUGS.*from\s+["']@\/lib\/tools["']/);
    expect(src).not.toMatch(/const\s+NOINDEX_SLUGS\s*=\s*new Set/);
    const toolsSrc = fs.readFileSync(path.join(root, "src", "lib", "tools", "index.ts"), "utf8");
    expect(toolsSrc).toContain("pdf-compress");
    const { default: sitemap } = await import("../pages/sitemap.xml");
    const urls = (sitemap() as { url: string }[]).map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/pdf-compress"))).toBe(false);
    expect(urls.some((u) => u.endsWith("/word-counter"))).toBe(true);
  }, 35000);

  it("noindex blog cluster is excluded from sitemap and llms.txt", async () => {
    const { default: sitemap } = await import("../pages/sitemap.xml");
    const urls = (sitemap() as { url: string }[]).map((e) => e.url);
    expect(urls.some((u) => u.includes("/blog/pdf-merge-guide/compress-pdf-1mb-email"))).toBe(false);
    expect(urls.some((u) => u.includes("/blog/percentage-calculator-guide/percent-of-a-number"))).toBe(true);
    const llms = fs.readFileSync(path.join(root, "public", "llms.txt"), "utf8");
    expect(llms).not.toContain("/blog/pdf-merge-guide/compress-pdf-1mb-email");
    expect(llms).toContain("/blog/percentage-calculator-guide/percent-of-a-number");
  }, 20000);

  it("never emits non-English locale URLs in sitemap (site is English only)", async () => {
    const { default: sitemap } = await import("../pages/sitemap.xml");
    const urls = (sitemap() as { url: string }[]).map((e) => e.url);
    expect(urls.some((u) => u.includes("/es/") || u.endsWith("/es"))).toBe(false);
    expect(urls.some((u) => u.includes("/fr/") || u.endsWith("/fr"))).toBe(false);
  }, 20000);

  it("toolMetadata declares no alternateLocale (single-language site)", () => {
    const alts = (slug: string) =>
      (toolMetadata(slug).openGraph as { alternateLocale?: string[] })?.alternateLocale;
    expect(alts("invoice-generator")).toBeUndefined();
    expect(alts("resume-builder")).toBeUndefined();
    expect(alts("word-counter")).toBeUndefined();
  });

  it("SiteJsonLd and ToolSeo conform to Schema.org standards (no speakableSpecification or WebSite availableLanguage)", () => {
    const siteJsonSrc = fs.readFileSync(path.join(root, "src", "components", "SiteJsonLd.tsx"), "utf8");
    const toolSeoSrc = fs.readFileSync(path.join(root, "src", "lib", "tool-view.server.ts"), "utf8");

    // Must use `speakable` property, not invalid `speakableSpecification`
    expect(siteJsonSrc).not.toContain("speakableSpecification:");
    expect(toolSeoSrc).not.toContain("speakableSpecification:");
    expect(siteJsonSrc).toContain("speakable:");
    expect(toolSeoSrc).toContain("speakable:");

    // WebSite entity must NOT have availableLanguage
    const webSiteBlock = siteJsonSrc.slice(siteJsonSrc.indexOf('"@type": "WebSite"'), siteJsonSrc.indexOf('"@type": "Organization"'));
    expect(webSiteBlock).not.toContain("availableLanguage");
  });
});
