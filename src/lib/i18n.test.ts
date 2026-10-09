import { describe, it, expect } from "vitest";
import {
  ES_PILOT_SLUGS,
  ES_BLOG_PILOTS,
  FR_PILOT_SLUGS,
  getEsTool,
  getFrTool,
  getPilotLocales,
  isEsPilotSlug,
  isEsBlogPilot,
  isPilotSlug,
  pilotUrl,
  qrSizePrintEs,
} from "./i18n";
import { toolMetadata } from "./metadata";
import { siteConfig } from "./site";

const base = siteConfig.url.replace(/\/$/, "");

function esTitleFor(tool: { title: string; short: string }): string {
  let core = `${tool.title} - ${tool.short}`;
  if (core.length > 55) {
    core = core.slice(0, 55).trimEnd();
    const lastSpace = core.lastIndexOf(" ");
    if (lastSpace > 35) core = core.slice(0, lastSpace);
  }
  return `${core} | Tool4SaaS`;
}

describe("i18n pilot registry", () => {
  it("pilot slugs resolve to ES tools with valid SEO contracts", () => {
    expect(ES_PILOT_SLUGS.size).toBeGreaterThanOrEqual(3);
    for (const slug of ES_PILOT_SLUGS) {
      const t = getEsTool(slug);
      expect(t, `${slug} has ES tool`).toBeDefined();
      const title = esTitleFor(t!);
      expect(title).toContain("Tool4SaaS");
      expect(title.length, `${slug} es title len`).toBeGreaterThanOrEqual(30);
      expect(title.length, `${slug} es title len`).toBeLessThanOrEqual(70);
      expect(t!.description.length, `${slug} es desc`).toBeGreaterThanOrEqual(100);
      expect(t!.description.length, `${slug} es desc`).toBeLessThanOrEqual(180);
      expect(t!.keywords.length, `${slug} es keywords`).toBeGreaterThanOrEqual(7);
      expect(
        t!.keywords.some((k) => k.includes("?")),
        `${slug} es long-tail ?`,
      ).toBe(true);
      expect(t!.faq.length, `${slug} es faq`).toBeGreaterThanOrEqual(4);
      expect(t!.howTo.length, `${slug} es howTo`).toBeGreaterThanOrEqual(4);
    }
  });

  it("helpers are consistent (pilot locales, urls, back-compat)", () => {
    for (const slug of ES_PILOT_SLUGS) {
      expect(isEsPilotSlug(slug)).toBe(true);
      expect(isPilotSlug(slug)).toBe(true);
      expect(getPilotLocales(slug)).toContain("es");
      expect(pilotUrl("es", slug)).toBe(`/es/${slug}`);
      expect(pilotUrl("en", slug)).toBe(`/${slug}`);
    }
    expect(isPilotSlug("fd-calculator")).toBe(false);
    expect(getPilotLocales("fd-calculator")).toEqual([]);
    expect(getEsTool("fd-calculator")).toBeUndefined();
  });

  it("EN toolMetadata emits bidirectional hreflang only for pilots", () => {
    for (const slug of ES_PILOT_SLUGS) {
      const langs = (toolMetadata(slug).alternates as { languages: Record<string, string> })
        .languages;
      expect(langs.en).toBe(`${base}/${slug}`);
      expect(langs.es).toBe(`${base}/es/${slug}`);
      expect(langs["x-default"]).toBe(`${base}/${slug}`);
    }
    const plain = (toolMetadata("fd-calculator").alternates as { languages: Record<string, string> })
      .languages;
    expect(plain.es).toBeUndefined();
    expect(plain.fr).toBeUndefined();
    expect(plain.en).toBe(`${base}/fd-calculator`);
  });

  it("FR pilots have valid SEO contracts + full N-locale hreflang/sitemap parity", () => {
    expect(FR_PILOT_SLUGS.size).toBeGreaterThanOrEqual(8);
    for (const slug of FR_PILOT_SLUGS) {
      const fr = getFrTool(slug);
      expect(fr, `${slug} has FR tool`).toBeDefined();
      let core = `${fr!.title} - ${fr!.short}`;
      if (core.length > 55) {
        core = core.slice(0, 55).trimEnd();
        const ls = core.lastIndexOf(" ");
        if (ls > 35) core = core.slice(0, ls);
      }
      const full = `${core} | Tool4SaaS`;
      expect(full).toContain("Tool4SaaS");
      expect(full.length).toBeLessThanOrEqual(70);
      expect(fr!.description.length).toBeGreaterThanOrEqual(100);
      expect(fr!.description.length).toBeLessThanOrEqual(180);
      expect(fr!.keywords.length).toBeGreaterThanOrEqual(7);
      expect(fr!.keywords.some((k) => k.includes("?"))).toBe(true);
      expect(fr!.faq.length).toBeGreaterThanOrEqual(4);
      expect(fr!.howTo.length).toBeGreaterThanOrEqual(4);
      expect(pilotUrl("fr", slug)).toBe(`/fr/${slug}`);
    }
    expect(getFrTool("typing-speed-test")).toBeDefined();
    expect(getFrTool("password-generator")).toBeUndefined();
    expect(getPilotLocales("invoice-generator")).toEqual(
      expect.arrayContaining(["es", "fr"]),
    );
    expect(getPilotLocales("qr-code-generator")).toEqual(
      expect.arrayContaining(["es", "fr"]),
    );
    expect(getPilotLocales("word-counter")).toEqual(
      expect.arrayContaining(["es", "fr"]),
    );
    // EN invoice + QR now serve es+fr; ES-only pilots serve es only.
    const invLangs = (toolMetadata("invoice-generator").alternates as { languages: Record<string, string> })
      .languages;
    expect(invLangs.es).toBe(`${base}/es/invoice-generator`);
    expect(invLangs.fr).toBe(`${base}/fr/invoice-generator`);
    const qrLangs = (toolMetadata("qr-code-generator").alternates as { languages: Record<string, string> })
      .languages;
    expect(qrLangs.es).toBe(`${base}/es/qr-code-generator`);
    expect(qrLangs.fr).toBe(`${base}/fr/qr-code-generator`);
    const unitLangs = (toolMetadata("unit-converter").alternates as { languages: Record<string, string> })
      .languages;
    expect(unitLangs.es).toBe(`${base}/es/unit-converter`);
    expect(unitLangs.fr).toBe(`${base}/fr/unit-converter`);
    const wordLangs = (toolMetadata("word-counter").alternates as { languages: Record<string, string> })
      .languages;
    expect(wordLangs.es).toBe(`${base}/es/word-counter`);
    expect(wordLangs.fr).toBe(`${base}/fr/word-counter`);
    const cardLangs = (toolMetadata("credit-card-validator").alternates as { languages: Record<string, string> })
      .languages;
    expect(cardLangs.es).toBe(`${base}/es/credit-card-validator`);
    expect(cardLangs.fr).toBe(`${base}/fr/credit-card-validator`);
    const mortLangs = (toolMetadata("mortgage-calculator").alternates as { languages: Record<string, string> })
      .languages;
    expect(mortLangs.es).toBe(`${base}/es/mortgage-calculator`);
    expect(mortLangs.fr).toBe(`${base}/fr/mortgage-calculator`);
    // ES-only pilots serve es only (no FR content yet).
    const passLangs = (toolMetadata("password-generator").alternates as { languages: Record<string, string> })
      .languages;
    expect(passLangs.es).toBe(`${base}/es/password-generator`);
    expect(passLangs.fr).toBeUndefined();
  });

  it("sitemap includes every pilot /es URL and no non-pilot /es URLs", async () => {
    const { default: sitemap } = await import("../app/sitemap");
    const urls = (sitemap() as { url: string }[]).map((e) => e.url);
    expect(urls).toContain(`${base}/es`);
    expect(urls).toContain(`${base}/fr`);
    for (const slug of ES_PILOT_SLUGS) {
      expect(urls).toContain(`${base}/es/${slug}`);
      expect(urls).toContain(`${base}/${slug}`);
    }
    for (const slug of FR_PILOT_SLUGS) {
      expect(urls).toContain(`${base}/fr/${slug}`);
    }
    expect(urls.some((u) => u.endsWith("/es/fd-calculator"))).toBe(false);
    // Per-locale pilot sets: no /fr page without FR content.
    expect(urls.some((u) => u.endsWith("/fr/password-generator"))).toBe(false);
  }, 20000);

  it("ES blog pilot has valid SEO contracts and registry parity", async () => {
    expect(ES_BLOG_PILOTS.size).toBeGreaterThanOrEqual(1);
    expect(isEsBlogPilot("qr-code-generator-guide", "qr-code-size-print-guide")).toBe(true);
    expect(isEsBlogPilot("qr-code-generator-guide", "how-to-create-qr-code")).toBe(false);
    // Title slices to <=70 with brand, desc 100-180, 6 keywords with long-tail.
    let core = qrSizePrintEs.title;
    if (core.length > 55) {
      core = core.slice(0, 55).trimEnd();
      const ls = core.lastIndexOf(" ");
      if (ls > 35) core = core.slice(0, ls);
    }
    const full = `${core} | Tool4SaaS`;
    expect(full).toContain("Tool4SaaS");
    expect(full.length).toBeLessThanOrEqual(70);
    expect(qrSizePrintEs.description.length).toBeGreaterThanOrEqual(100);
    expect(qrSizePrintEs.description.length).toBeLessThanOrEqual(180);
    expect(qrSizePrintEs.keywords.length).toBe(6);
    expect(qrSizePrintEs.keywords.some((k) => k.includes("?"))).toBe(true);
    expect(qrSizePrintEs.faqs.length).toBe(5);
    expect(qrSizePrintEs.toc.length).toBe(5);
    // Every TOC anchor exists in the HTML body.
    for (const t of qrSizePrintEs.toc) {
      expect(qrSizePrintEs.html.includes(`id="${t.id}"`), `toc anchor ${t.id}`).toBe(true);
    }
    // Funnel head resolves to an ES tool (primary CTA deep-links /es/).
    expect(getEsTool(qrSizePrintEs.toolSlugs[0])).toBeDefined();
    // EN registry still owns the pillar (sibling mesh + pillar crumb fallback).
    const { getClusterPost } = await import("./blog-registry");
    expect(getClusterPost("qr-code-generator-guide", "qr-code-size-print-guide")).toBeDefined();
    // Sitemap emits the ES blog URL, never unlisted ES blog URLs.
    const { default: sitemap } = await import("../app/sitemap");
    const urls = (sitemap() as { url: string }[]).map((e) => e.url);
    expect(urls).toContain(`${base}/es/blog/qr-code-generator-guide/qr-code-size-print-guide`);
    expect(urls.some((u) => u.endsWith("/es/blog/word-counter-guide/how-to-count-words-online"))).toBe(false);
  }, 20000);
});
