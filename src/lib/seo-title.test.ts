import { describe, it, expect } from "vitest";
import { blogMetaTitle, toolMetaTitle } from "./seo-title";
import { tools } from "./tools";
import { BLOG_PILLARS, getClustersForPillar } from "./blog-registry";

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "vs",
  "with",
]);

function coreOf(title: string): string {
  return title.replace(/\s*\|\s*Tool4SaaS$/, "").trim();
}

function lastWordOf(title: string): string {
  return coreOf(title).split(" ").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ?? "";
}

function expectHealthy(title: string, label: string) {
  expect(title.length, `${label} length=${title.length}`).toBeGreaterThanOrEqual(30);
  expect(title.length, `${label} length=${title.length}`).toBeLessThanOrEqual(70);
  expect(title, `${label} trailing punctuation`).not.toMatch(/[,;:|—–-]$/);
  expect(STOPWORDS.has(lastWordOf(title)), `${label} ends with stopword: "${title}"`).toBe(false);
}

const blogTitles = [
  ...BLOG_PILLARS.map((pillar) => ({ label: `pillar:${pillar.pillar}`, title: pillar.title })),
  ...BLOG_PILLARS.flatMap((pillar) =>
    getClustersForPillar(pillar.pillar).map((post) => ({
      label: `cluster:${post.pillar}/${post.slug}`,
      title: post.title,
    })),
  ),
];

describe("seo-title", () => {
  it("keeps every tool meta title 30-70 characters and branded", () => {
    for (const tool of tools) {
      const title = toolMetaTitle(tool.title, tool.short, tool.seoTitle);
      expectHealthy(title, `tool:${tool.slug}`);
      expect(title, `tool:${tool.slug}`).toContain("Tool4SaaS");
    }
  });

  it("keeps every blog meta title 30-70 characters without a trailing stopword", () => {
    for (const post of blogTitles) {
      expectHealthy(blogMetaTitle(post.title), post.label);
    }
  });

  it("does not cut the long blog question at 'and'", () => {
    const title = blogMetaTitle("How Long Should a Blog Post Be? Intent, Coverage and Limits");
    expect(title).not.toMatch(/\band\b\s*(?:\|\s*Tool4SaaS)?$/i);
    expect(title).toContain("How Long Should a Blog Post Be?");
  });

  it("prefers a complete title over a shortened one when it fits", () => {
    const title = blogMetaTitle("Mortgage Calculator Guide: Payments, PMI & Amortization");
    expect(title).toContain("Mortgage Calculator Guide: Payments, PMI & Amortization");
    expect(title.length).toBeLessThanOrEqual(70);
  });

  it("uses an explicit seoTitle when supplied", () => {
    const title = blogMetaTitle(
      "A very long H1 that would otherwise be shortened for search results",
      "Short SEO Title for Search",
    );
    expect(title).toBe("Short SEO Title for Search | Tool4SaaS");
  });
});
