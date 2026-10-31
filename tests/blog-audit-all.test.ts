import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  ALL_POSTS,
  BLOG_PILLARS,
  getPillarPost,
  getClusterPost,
  getClustersForPillar,
} from "@/lib/blog-registry";
import { countWords } from "@/lib/blog";
import { LITE_TOOLS } from "@/lib/tools/catalog-lite";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");
const toolSlugSet = new Set(LITE_TOOLS.map((t) => t.slug));
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const STATIC_ROUTES = new Set([
  "/",
  "/blog",
  "/guides",
  "/about",
  "/author",
  "/methodology",
  "/contact",
  "/privacy",
  "/terms",
  "/sitemap",
  "/sitemap.xml",
  "/robots.txt",
]);

describe("Comprehensive Blog Audit — All 198 Posts", () => {
  it("registry has exactly 197 posts matching files on disk", () => {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".ts"));
    expect(ALL_POSTS.length).toBe(197);
    expect(files.length).toBe(197);
  });

  it("every blog post file is imported into ALL_POSTS with unique slugs per pillar", () => {
    const slugMap = new Map<string, string>();
    for (const post of ALL_POSTS) {
      const key = `${post.pillar}/${post.slug}`;
      expect(slugMap.has(key), `Duplicate slug: ${key}`).toBe(false);
      slugMap.set(key, post.title);
    }
  });

  it("all pillars in BLOG_PILLARS exist and have a corresponding pillar post", () => {
    for (const pillar of BLOG_PILLARS) {
      const post = getPillarPost(pillar.pillar);
      expect(post, `Missing pillar post for: ${pillar.pillar}`).toBeDefined();
      expect(post?.kind).toBe("pillar");
      expect(post?.slug).toBe(pillar.pillar);
    }
  });

  it("every cluster post belongs to a registered pillar and has kind 'cluster'", () => {
    const pillarSlugs = new Set(BLOG_PILLARS.map((p) => p.pillar));
    for (const post of ALL_POSTS) {
      expect(pillarSlugs.has(post.pillar), `Post has unknown pillar: ${post.pillar} (${post.slug})`).toBe(true);
      if (post.kind === "cluster") {
        expect(post.slug).not.toBe(post.pillar);
      } else {
        expect(post.slug).toBe(post.pillar);
      }
    }
  });

  it("all posts pass SEO title, description, and keyword validation", () => {
    const issues: string[] = [];
    for (const post of ALL_POSTS) {
      const id = `${post.pillar}/${post.slug}`;
      if (!post.title || post.title.trim().length < 15) {
        issues.push(`${id}: title too short (${post.title})`);
      }
      if (post.seoTitle && (post.seoTitle.length < 25 || post.seoTitle.length > 80)) {
        issues.push(`${id}: seoTitle out of range 25-80 chars (${post.seoTitle.length})`);
      }
      if (!post.description || post.description.trim().length < 40) {
        issues.push(`${id}: description too short (${post.description?.length} chars)`);
      }
      if (!Array.isArray(post.keywords) || post.keywords.length < 3) {
        issues.push(`${id}: fewer than 3 keywords`);
      }
      for (const kw of post.keywords || []) {
        if (kw.includes("?")) {
          issues.push(`${id}: keyword contains question mark "${kw}"`);
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it("all posts have valid dates and reading time", () => {
    const issues: string[] = [];
    for (const post of ALL_POSTS) {
      const id = `${post.pillar}/${post.slug}`;
      if (!isoDateRegex.test(post.published)) issues.push(`${id}: invalid published date ${post.published}`);
      if (!isoDateRegex.test(post.updated)) issues.push(`${id}: invalid updated date ${post.updated}`);
      if (post.published > post.updated) issues.push(`${id}: published > updated (${post.published} > ${post.updated})`);
      if (typeof post.readingMinutes !== "number" || post.readingMinutes < 1) {
        issues.push(`${id}: invalid readingMinutes ${post.readingMinutes}`);
      }
    }
    expect(issues).toEqual([]);
  });

  it("all toolSlugs reference valid tools in the catalog", () => {
    const issues: string[] = [];
    for (const post of ALL_POSTS) {
      const id = `${post.pillar}/${post.slug}`;
      for (const tool of post.toolSlugs) {
        if (!toolSlugSet.has(tool)) {
          issues.push(`${id}: references unknown tool slug "${tool}"`);
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it("all relatedSlugs reference existing clusters within the pillar", () => {
    const issues: string[] = [];
    for (const post of ALL_POSTS) {
      const id = `${post.pillar}/${post.slug}`;
      const siblings = new Set(getClustersForPillar(post.pillar).map((c) => c.slug));
      for (const rel of post.relatedSlugs) {
        if (!siblings.has(rel)) {
          issues.push(`${id}: relatedSlug "${rel}" not found among siblings in ${post.pillar}`);
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it("HTML structure: no H1 in body, all H2/H3 have valid id, and TOC entries exist in HTML", () => {
    const issues: string[] = [];
    for (const post of ALL_POSTS) {
      const id = `${post.pillar}/${post.slug}`;
      const html = post.html;

      // No H1 in body
      if (/<h1[\s>]/i.test(html)) {
        issues.push(`${id}: contains <h1> in body`);
      }

      // Check all H2 and H3 have IDs
      const h2Matches = [...html.matchAll(/<h2([^>]*)>/gi)];
      for (const m of h2Matches) {
        if (!/id=["'][^"']+["']/i.test(m[1])) {
          issues.push(`${id}: <h2> missing id attribute: ${m[0]}`);
        }
      }

      // Extract all element IDs in HTML
      const idsInHtml = new Set(
        [...html.matchAll(/id=["']([^"']+)["']/gi)].map((m) => m[1])
      );

      // TOC matches
      if (!Array.isArray(post.toc) || post.toc.length < 2) {
        issues.push(`${id}: toc has fewer than 2 items`);
      } else {
        for (const item of post.toc) {
          if (!idsInHtml.has(item.id)) {
            issues.push(`${id}: TOC item #${item.id} not found in HTML body`);
          }
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it("all FAQs have valid questions and substantial answers", () => {
    const issues: string[] = [];
    for (const post of ALL_POSTS) {
      const id = `${post.pillar}/${post.slug}`;
      if (!Array.isArray(post.faqs) || post.faqs.length < 3) {
        issues.push(`${id}: fewer than 3 FAQs (found ${post.faqs?.length || 0})`);
      }
      for (let i = 0; i < (post.faqs || []).length; i++) {
        const faq = post.faqs[i];
        if (!faq.question || !faq.question.trim().endsWith("?")) {
          issues.push(`${id}: FAQ #${i} question does not end with '?' ("${faq.question}")`);
        }
        if (!faq.answer || faq.answer.trim().length < 30) {
          issues.push(`${id}: FAQ #${i} answer too short (${faq.answer?.length || 0} chars)`);
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it("content depth: all posts meet minimum substantive coverage (>= 350 words)", () => {
    const thinPosts: { id: string; words: number }[] = [];
    for (const post of ALL_POSTS) {
      const id = `${post.pillar}/${post.slug}`;
      const words = countWords(post.html);
      // Floor: every guide must have at least 350 substantive words; pillars >= 750 words
      const minWords = post.kind === "pillar" ? 750 : 350;
      if (words < minWords) {
        thinPosts.push({ id, words });
      }
    }
    expect(thinPosts, `Thin posts found: ${JSON.stringify(thinPosts)}`).toEqual([]);
  });

  it("checks for machine-spin vocabulary, canned phrasing, and invisible watermarks", () => {
    const issues: string[] = [];
    const invisibleChars = /[\u200B\u200C\u200D\uFEFF]/;

    for (const post of ALL_POSTS) {
      const id = `${post.pillar}/${post.slug}`;
      const text = `${post.title} ${post.description} ${post.html} ${JSON.stringify(post.faqs)}`;

      if (invisibleChars.test(text)) {
        issues.push(`${id}: contains invisible Unicode watermark characters`);
      }
      if (/\bsans\b/i.test(text)) {
        issues.push(`${id}: contains forbidden 'sans'`);
      }
      if (/\bwholly\b/i.test(text)) {
        issues.push(`${id}: contains forbidden 'wholly'`);
      }
      if (/\bevaporate?s? (?:on|upon) close\b/i.test(text)) {
        issues.push(`${id}: contains 'evaporate on close' template`);
      }
      if (/entirely entirely/i.test(text)) {
        issues.push(`${id}: contains 'entirely entirely' artifact`);
      }
      if (/ inside your browser tab/i.test(text)) {
        issues.push(`${id}: contains 'inside your browser tab' template`);
      }
    }
    expect(issues).toEqual([]);
  });
});
