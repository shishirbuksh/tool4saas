import { describe, it, expect } from "vitest";
import { getStaggeredDay, getDateModifiedIso, SITE_PUBLISHED_ISO } from "./dates";
import { countWords, readingMinutesFor } from "./blog";
import {
  BLOG_PILLARS,
  BLOG_POST_COUNT,
  getPillarMeta,
  getPillarPost,
  getClusterPost,
  getClustersForPillar,
  getAllBlogStaticParams,
  getRelatedPosts,
} from "./blog-registry";
import {
  CATEGORY_INTROS,
  FALLBACK_INTRO,
  introForCategory,
  CATEGORY_FAQ_CONTENT,
  FALLBACK_FAQ_CONTENT,
  faqContentForCategory,
} from "./category-content";
import { siteConfig } from "./site";
import { toolMetadata } from "./metadata";
import {
  tools,
  CATEGORIES,
  getTool,
  getCategory,
  toolsByCategoryCached,
  EXPECTED_TOOL_COUNT,
  EXPECTED_CATEGORY_COUNT,
  NOINDEX_SLUGS,
} from "./tools";
import { validatePdfMagicBytes, MAX_PDF_PAGES } from "./validate";

describe("dates – staggered invariant", () => {
  it("staggered day is deterministic in 1..9", () => {
    for (const t of tools) {
      const d = getStaggeredDay(t.slug);
      expect(d).toBeGreaterThanOrEqual(1);
      expect(d).toBeLessThanOrEqual(9);
      expect(getStaggeredDay(t.slug)).toBe(d);
    }
  });

  it("modified ISO matches 2026-09-0X and >= published", () => {
    expect(SITE_PUBLISHED_ISO).toBe("2026-09-01");
    for (const t of tools) {
      const iso = getDateModifiedIso(t.slug);
      expect(iso).toMatch(/^2026-09-0[1-9]$/);
      expect(iso >= SITE_PUBLISHED_ISO).toBe(true);
    }
  });
});

describe("blog – word counting", () => {
  it("strips tags/entities and handles empty", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("<p>hello world</p>")).toBe(2);
    expect(countWords("<script>var x = 1;</script><p>hi</p>")).toBe(1);
    expect(countWords("a&nbsp;b &amp; c")).toBe(3);
  });

  it("reading minutes floors at 3", () => {
    expect(readingMinutesFor("")).toBe(3);
    expect(readingMinutesFor("<p>hi</p>")).toBe(3);
    expect(readingMinutesFor(`<p>${"word ".repeat(400)}</p>`)).toBe(3);
    expect(readingMinutesFor(`<p>${"word ".repeat(1000)}</p>`)).toBe(5);
  });
});

describe("blog-registry – mesh integrity", () => {
  it("has 60 posts: 6 pillars x (1 + 9 clusters)", () => {
    expect(BLOG_POST_COUNT).toBe(60);
    expect(BLOG_PILLARS.length).toBe(6);
    for (const meta of BLOG_PILLARS) {
      expect(getPillarPost(meta.pillar)).toBeDefined();
      expect(getClustersForPillar(meta.pillar).length).toBe(9);
    }
  });

  it("cluster lookup misses return undefined", () => {
    expect(getClusterPost("word-counter-guide", "nope")).toBeUndefined();
    expect(getPillarPost("nope")).toBeUndefined();
    expect(getPillarMeta("nope")).toBeUndefined();
  });

  it("relatedSlugs all resolve + related is pillar-first for clusters", () => {
    const params = getAllBlogStaticParams();
    expect(params.length).toBe(60);
    for (const meta of BLOG_PILLARS) {
      for (const c of getClustersForPillar(meta.pillar)) {
        for (const rel of c.relatedSlugs) {
          expect(getClusterPost(meta.pillar, rel)).toBeDefined();
        }
        const related = getRelatedPosts(c, 4);
        expect(related[0]?.kind).toBe("pillar");
        expect(related.length).toBeLessThanOrEqual(4);
      }
    }
  });
});

describe("category-content – single source", () => {
  it("covers all 12 categories with fallback for unknown", () => {
    for (const c of CATEGORIES) {
      expect(introForCategory(c.id).body.length).toBeGreaterThan(50);
      expect(faqContentForCategory(c.id).length).toBe(5);
    }
    expect(introForCategory("nope")).toEqual(FALLBACK_INTRO);
    expect(faqContentForCategory("nope")).toEqual(FALLBACK_FAQ_CONTENT);
    expect(Object.keys(CATEGORY_INTROS).length).toBe(12);
    expect(Object.keys(CATEGORY_FAQ_CONTENT).length).toBe(12);
  });

  it("intro picks reference real tools", () => {
    for (const intro of Object.values(CATEGORY_INTROS)) {
      for (const p of intro.picks) {
        expect(getTool(p.slug), `pick ${p.slug}`).toBeDefined();
      }
      expect(getTool(intro.faqSlug), `faq ${intro.faqSlug}`).toBeDefined();
    }
  });
});

describe("site – fail-closed shape", () => {
  it("url/canonical base is https and adsense is valid-or-empty", () => {
    expect(siteConfig.url).toMatch(/^https?:\/\//);
    expect(siteConfig.url).not.toContain("your-domain");
    expect(siteConfig.adsenseClient === "" || /^ca-pub-\d{16}$/.test(siteConfig.adsenseClient)).toBe(true);
    expect(Array.isArray(siteConfig.sameAs)).toBe(true);
  });
});

describe("metadata – unknown slug fallback", () => {
  it("falls back to site title without double brand", () => {
    const m = toolMetadata("definitely-not-a-tool-xyz") as { title: string; description: string };
    expect(m.title).toBe(siteConfig.title);
    expect(m.description).toBe(siteConfig.description);
  });

  it("known tool title carries single brand suffix", () => {
    const m = toolMetadata("word-counter") as { title: { absolute: string } };
    expect(m.title.absolute.endsWith("| Tool4SaaS")).toBe(true);
    expect(m.title.absolute).not.toContain("| Tool4SaaS | Tool4SaaS");
    expect(m.title.absolute.length).toBeLessThanOrEqual(70);
  });
});

describe("tools – single-source registries", () => {
  it("expected counts match catalogue", () => {
    expect(EXPECTED_TOOL_COUNT).toBe(185);
    expect(EXPECTED_CATEGORY_COUNT).toBe(12);
    expect(tools.length).toBe(EXPECTED_TOOL_COUNT);
    expect(CATEGORIES.length).toBe(EXPECTED_CATEGORY_COUNT);
  });

  it("getCategory + cached groups cover every tool", () => {
    for (const c of CATEGORIES) {
      expect(getCategory(c.id)?.id).toBe(c.id);
    }
    expect(getCategory("nope")).toBeUndefined();
    const groups = toolsByCategoryCached();
    const total = groups.reduce((s, g) => s + g.tools.length, 0);
    expect(total).toBe(tools.length);
  });

  it("NOINDEX quarantines pdf-compress", () => {
    expect(NOINDEX_SLUGS.has("pdf-compress")).toBe(true);
    expect(getTool("pdf-compress")).toBeDefined();
  });
});

describe("validate – PDF magic bytes + page cap", () => {
  function mockPdf(name: string, head: string | Error): File {
    return {
      name,
      slice: () => ({
        // Real slice(0, 5) returns the first 5 bytes only.
        text: async () => {
          if (head instanceof Error) throw head;
          return head.slice(0, 5);
        },
      }),
    } as unknown as File;
  }

  it("accepts %PDF- header and rejects others", async () => {
    expect((await validatePdfMagicBytes(mockPdf("a.pdf", "%PDF-1.7"))).valid).toBe(true);
    expect((await validatePdfMagicBytes(mockPdf("a.pdf", "GIF89a"))).valid).toBe(false);
    expect((await validatePdfMagicBytes(mockPdf("a.pdf", new Error("denied")))).valid).toBe(false);
  });

  it("exposes a 200-page cap constant", () => {
    expect(MAX_PDF_PAGES).toBe(200);
  });
});
