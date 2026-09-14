import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { tools, CATEGORIES } from "@/lib/tools";

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

  const pages: MetadataRoute.Sitemap = ["/about", "/privacy", "/terms"].map((p) => ({
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
  // Keeps crawl budget focused instead of flat 0.8 for all 158 tools.
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

  const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${base}/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: priorityForTool(t.slug, t.category),
    // OG images double as sitemap <image:image> entries (Google image sitemap).
    images: [`${base}/og/${t.slug}`],
  }));

  return [...home, ...pages, ...categoryRoutes, ...toolRoutes];
}
