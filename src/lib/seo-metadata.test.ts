import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { toolMetadata, homeMetadata, staticPageMetadata } from "./metadata";
import { tools, getTool } from "./tools";
import { siteConfig } from "./site";

const root = process.cwd();
const base = siteConfig.url.replace(/\/$/, "");

describe("SEO metadata", () => {
  it('toolMetadata("word-counter") title is 30-70 chars and contains Tool4SaaS', () => {
    const meta = toolMetadata("word-counter");
    const title = meta.title as string;
    expect(typeof title).toBe("string");
    expect(title).toContain("Tool4SaaS");
    expect(title.length).toBeGreaterThanOrEqual(30);
    expect(title.length).toBeLessThanOrEqual(70);
  });

  it("every tool title is 30-70 chars and contains Tool4SaaS", () => {
    for (const t of tools) {
      const title = toolMetadata(t.slug).title as string;
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

  it("staticPageMetadata /contact canonical is base/contact", () => {
    const meta = staticPageMetadata({ title: "Contact Us", description: "x", path: "/contact" });
    expect((meta.alternates as { canonical: string }).canonical).toBe(`${base}/contact`);
  });

  it("tool pages are indexable (robots index true)", () => {
    const meta = toolMetadata("word-counter");
    expect(meta.robots).toMatchObject({ index: true });
    for (const t of tools) {
      const r = toolMetadata(t.slug).robots as { index?: boolean; googleBot?: { index?: boolean } };
      expect(r?.index, `${t.slug} robots.index`).toBe(true);
      expect(r?.googleBot?.index, `${t.slug} googleBot.index`).toBe(true);
    }
  });

  it("pdf-compress is excluded from sitemap (NOINDEX_SLUGS)", async () => {
    // pdf-compress page metadata lives in a .tsx route file (JSX) — not imported
    // here. Instead assert the sitemap imports the single-source noindex list
    // (@/lib/tools NOINDEX_SLUGS, no local duplicate) and the generated sitemap
    // actually excludes the slug.
    const src = fs.readFileSync(path.join(root, "src", "app", "sitemap.ts"), "utf8");
    expect(src).toContain("NOINDEX_SLUGS");
    expect(src).toMatch(/import\s+.*NOINDEX_SLUGS.*from\s+["']@\/lib\/tools["']/);
    expect(src).not.toMatch(/const\s+NOINDEX_SLUGS\s*=\s*new Set/);
    const toolsSrc = fs.readFileSync(path.join(root, "src", "lib", "tools", "index.ts"), "utf8");
    expect(toolsSrc).toContain("pdf-compress");
    const { default: sitemap } = await import("../app/sitemap");
    const urls = (sitemap() as { url: string }[]).map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/pdf-compress"))).toBe(false);
    expect(urls.some((u) => u.endsWith("/word-counter"))).toBe(true);
  });
});
