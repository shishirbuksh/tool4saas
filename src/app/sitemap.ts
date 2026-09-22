import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { tools, CATEGORIES, NOINDEX_SLUGS } from "@/lib/tools";
import { BLOG_PILLARS, getClustersForPillar } from "@/lib/blog-registry";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  // Stable build-time date: avoids lastmod churn (every URL "changed daily")
  // which wastes crawl budget. Bump only when content actually changes.
  const lastModified = new Date("2026-09-09T00:00:00.000Z");

  const home: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${base}/og/home`],
    },
  ];

  const pages: MetadataRoute.Sitemap = ["/about", "/privacy", "/terms", "/contact", "/author", "/methodology"].map((p) => ({
    url: `${base}${p}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/category/${c.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Priority tiers: hero money pages rank highest, long-tail utilities lower.
  // Keeps crawl budget focused instead of flat 0.8 for all 185 tools.
  const HERO_SLUGS = new Set([
    "invoice-generator",
    "mortgage-calculator",
    "pdf-merge",
    "image-compressor",
    "qr-code-generator",
    "resume-builder",
  ]);

  const priorityForTool = (slug: string, category: string): number => {
    if (HERO_SLUGS.has(slug)) return 0.9;
    if (category === "finance") return 0.85;
    if (category === "business" || category === "pdf") return 0.8;
    return 0.75;
  };

  // Single source: NOINDEX_SLUGS from @/lib/tools (e.g. pdf-compress placeholder
  // until real compression lands) — excluded from sitemap.
  // FUTURE NOINDEX LIST: add thin/duplicate/no-value tool slugs to NOINDEX_SLUGS
  // in src/lib/tools/index.ts (mirrored in scripts/generate-llms.mjs which can't
  // import TS, and filtered in src/app/category/[id]/page.tsx). Do not change priorities.
  const toolRoutes: MetadataRoute.Sitemap = tools
    .filter((t) => !NOINDEX_SLUGS.has(t.slug))
    .map((t) => ({
    url: `${base}/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: priorityForTool(t.slug, t.category),
    // OG images double as sitemap <image:image> entries (Google image sitemap).
    images: [`${base}/og/${t.slug}`],
  }));

  const blogIndex: MetadataRoute.Sitemap = [
    { url: `${base}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
  ];
  const blogPillars: MetadataRoute.Sitemap = BLOG_PILLARS.map((p) => ({
    url: `${base}/blog/${p.pillar}`,
    lastModified: new Date(`${p.updated}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.65,
  }));
  const blogClusters: MetadataRoute.Sitemap = BLOG_PILLARS.flatMap((p) =>
    getClustersForPillar(p.pillar).map((c) => ({
      url: `${base}/blog/${c.pillar}/${c.slug}`,
      lastModified: new Date(`${c.updated}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...home, ...pages, ...categoryRoutes, ...toolRoutes, ...blogIndex, ...blogPillars, ...blogClusters];
}
