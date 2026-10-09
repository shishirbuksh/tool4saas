import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { tools, CATEGORIES, NOINDEX_SLUGS } from "@/lib/tools";
import { BLOG_PILLARS, getClustersForPillar } from "@/lib/blog-registry";
import { getDateModifiedIso } from "@/lib/dates";
import { ES_BLOG_PILOTS, HUB_LOCALES, NON_DEFAULT_LOCALES, pilotSlugsForLocale } from "@/lib/i18n";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  // Stable build-time date for static pages: avoids lastmod churn (every URL
  // "changed daily") which wastes crawl budget. Bump only when content
  // actually changes. Tool routes use per-tool staggered dates below so
  // sitemap lastmod matches the visible <time> + JSON-LD dateModified.
  const lastModified = new Date("2026-10-01T00:00:00.000Z");

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
    images: [`${base}/og/category-${c.id}`],
  }));

  // Priority tiers: hero money pages rank highest, long-tail utilities lower.
  // Keeps crawl budget focused instead of flat 0.8 for all 185 tools.
  // Hero set covers site-wide money pages (invoice, mortgage, pdf-merge,
  // image-compressor, qr, resume) plus finance heroes (emi, sip, compound,
  // fd, ppf) and word-counter. Tiers only — lastModified stays stable.
  const HERO_SLUGS = new Set([
    "invoice-generator",
    "mortgage-calculator",
    "emi-calculator",
    "sip-calculator",
    "compound-interest-calculator",
    "fd-calculator",
    "ppf-calculator",
    "pdf-merge",
    "image-compressor",
    "word-counter",
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
    // Staggered per-tool date (Sept 1-9) — matches ToolSeo JSON-LD
    // dateModified + ToolPageShell visible <time> (see src/lib/dates.ts).
    lastModified: new Date(`${getDateModifiedIso(t.slug)}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: priorityForTool(t.slug, t.category),
    // OG images double as sitemap <image:image> entries (Google image sitemap).
    images: [`${base}/og/${t.slug}`],
  }));

  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${base}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
      images: [`${base}/og/home`],
    },
  ];
  const blogPillars: MetadataRoute.Sitemap = BLOG_PILLARS.map((p) => ({
    url: `${base}/blog/${p.pillar}`,
    lastModified: new Date(`${p.updated}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.65,
    images: [`${base}/og/${p.toolSlug}`],
  }));
  const blogClusters: MetadataRoute.Sitemap = BLOG_PILLARS.flatMap((p) =>
    getClustersForPillar(p.pillar).map((c) => ({
      url: `${base}/blog/${c.pillar}/${c.slug}`,
      lastModified: new Date(`${c.updated}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: [`${base}/og/${c.toolSlugs[0] ?? p.toolSlug}`],
    }))
  );

  // Pilot i18n (P1): subdirectory with English slugs kept (/<locale>/<slug>).
  // Only pilot slugs are listed — never multiply all 185 until EN CTR>=2%
  // and the full [locale]/ migration lands (dynamic <html lang>, per-locale
  // sitemaps, translated OG). Gated expansion, not day-one N locales.
  // Generalized: per-locale pilot sets + hub only where a landing exists,
  // so the sitemap never lists a page that does not exist.
  const esPilotRoutes: MetadataRoute.Sitemap = NON_DEFAULT_LOCALES.flatMap((locale) => [
    ...(HUB_LOCALES.includes(locale)
      ? [
          {
            url: `${base}/${locale}`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.8,
            images: [`${base}/og/home`],
          },
        ]
      : []),
    ...tools
      .filter((t) => pilotSlugsForLocale(locale).has(t.slug) && !NOINDEX_SLUGS.has(t.slug))
      .map((t) => ({
        url: `${base}/${locale}/${t.slug}`,
        lastModified: new Date(`${getDateModifiedIso(t.slug)}T00:00:00.000Z`),
        changeFrequency: "monthly" as const,
        priority: priorityForTool(t.slug, t.category),
        images: [`${base}/og/${t.slug}`],
      })),
  ]);

  // ES blog pilots (P1): /es/blog/<pillar>/<slug> with English pillar/slug kept.
  // Only listed clusters — pillar pages stay EN-only in V1.
  const esBlogRoutes: MetadataRoute.Sitemap = NON_DEFAULT_LOCALES.flatMap((locale) =>
    [...ES_BLOG_PILOTS].map((key) => {
      const [pillar, slug] = key.split("/");
      const clusters = getClustersForPillar(pillar);
      const cluster = clusters.find((c) => c.slug === slug);
      return {
        url: `${base}/${locale}/blog/${pillar}/${slug}`,
        lastModified: new Date(`${cluster?.updated ?? "2026-09-22"}T00:00:00.000Z`),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        images: [`${base}/og/${cluster?.toolSlugs[0] ?? "qr-code-generator"}`],
      };
    }),
  );

  return [...home, ...pages, ...categoryRoutes, ...toolRoutes, ...blogIndex, ...blogPillars, ...blogClusters, ...esPilotRoutes, ...esBlogRoutes];
}
