import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { tools, CATEGORIES, NOINDEX_SLUGS } from "@/lib/tools";
import { BLOG_PILLARS, getClustersForPillar } from "@/lib/blog-registry";
import { getBlogPostDateModifiedIso, getDateModifiedIso, getPageModifiedIso, HOME_MODIFIED, BLOG_MODIFIED, CATEGORY_MODIFIED, SITE_PUBLISHED_ISO } from "@/lib/dates";
import { isNoindexCluster } from "@/lib/blog/noindex";
import { BLOG_PILOT_LOCALES, ES_BLOG_PILOTS, getPilotLocales, hreflangHubLanguages, hreflangLanguages, HUB_LOCALES, isEsBlogPilot, NON_DEFAULT_LOCALES, pilotSlugsForLocale } from "@/lib/i18n";

// Sitemap hreflang annotations: only emitted for URLs that actually have
// locale alternates (hubs, pilot tools, the ES blog pilot). Non-pilot EN URLs
// stay without `alternates` to keep the file lean and unambiguous.
type Alternates = { languages: Record<string, string> };
function alternates(languages: Record<string, string>): Alternates {
  return { languages };
}
const blogPilotLanguages = (base: string, pillar: string, slug: string): Record<string, string> => ({
  en: `${base}/blog/${pillar}/${slug}`,
  es: `${base}/es/blog/${pillar}/${slug}`,
  "x-default": `${base}/blog/${pillar}/${slug}`,
});

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  // REAL dates: static/composite pages get their last genuine git edit date
  // (src/lib/edit-dates.generated.ts); tool routes use each tool's data-file
  // last-commit date so sitemap lastmod matches the visible <time> + JSON-LD
  // dateModified. No fabricated churn, no stale hardcoded constants.

  const home: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(`${HOME_MODIFIED}T00:00:00.000Z`),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${base}/og/home`],
      alternates: alternates(hreflangHubLanguages(base, "en")),
    },
  ];

  const pages: MetadataRoute.Sitemap = ["/about", "/privacy", "/terms", "/contact", "/author", "/methodology"].map((p) => ({
    url: `${base}${p}`,
    // e.g. "/about" -> page key "about"
    lastModified: new Date(`${getPageModifiedIso(p.replace(/^\//, "")) ?? SITE_PUBLISHED_ISO}T00:00:00.000Z`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/category/${c.id}`,
    lastModified: new Date(`${CATEGORY_MODIFIED[c.id] ?? getDateModifiedIso(c.id)}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${base}/og/category-${c.id}`],
  }));

  // Priority tiers: hero money pages rank highest, long-tail utilities lower.
  // Keeps crawl budget focused instead of flat 0.8 for all 127 tools.
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
    // hreflang cluster only for slug pilots (en + every published locale).
    ...(getPilotLocales(t.slug).length ? { alternates: alternates(hreflangLanguages(base, t.slug)) } : {}),
  }));

  const blogIndex: MetadataRoute.Sitemap = [
    {
    url: `${base}/blog`,
    lastModified: new Date(`${BLOG_MODIFIED}T00:00:00.000Z`),
      changeFrequency: "weekly",
      priority: 0.7,
      images: [`${base}/og/static-blog`],
    },
    {
      url: `${base}/guides`,
      lastModified: new Date(`${getPageModifiedIso("guides") ?? BLOG_MODIFIED}T00:00:00.000Z`),
      changeFrequency: "weekly",
      priority: 0.7,
      images: [`${base}/og/static-guides`],
    },
  ];
  const blogPillars: MetadataRoute.Sitemap = BLOG_PILLARS.map((p) => ({
    url: `${base}/blog/${p.pillar}`,
    lastModified: new Date(`${getBlogPostDateModifiedIso(p.pillar, p.pillar, p.updated)}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.65,
    images: [`${base}/og/blog/${p.pillar}`],
  }));
  const blogClusters: MetadataRoute.Sitemap = BLOG_PILLARS.flatMap((p) =>
    getClustersForPillar(p.pillar)
      // Same noindex source as the route metadata (src/lib/blog/noindex.ts).
      .filter((c) => !isNoindexCluster(c.pillar, c.slug))
      .map((c) => ({
      url: `${base}/blog/${c.pillar}/${c.slug}`,
      lastModified: new Date(`${getBlogPostDateModifiedIso(c.pillar, c.slug, c.updated)}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: [`${base}/og/blog/${c.pillar}/${c.slug}`],
      ...(isEsBlogPilot(c.pillar, c.slug) ? { alternates: alternates(blogPilotLanguages(base, c.pillar, c.slug)) } : {}),
    }))
  );

  // Pilot i18n (P1): subdirectory with English slugs kept (/<locale>/<slug>).
  // <html lang> is now correct per locale (root layouts), so only pilot slugs
  // are listed — never multiply all 127 until EN CTR>=2%. Per-locale sitemaps
  // and translated OG remain future work. Gated expansion, not day-one N locales.
  // Generalized: per-locale pilot sets + hub only where a landing exists,
  // so the sitemap never lists a page that does not exist.
  const esPilotRoutes: MetadataRoute.Sitemap = NON_DEFAULT_LOCALES.flatMap((locale) => [
    ...(HUB_LOCALES.includes(locale)
      ? [
          {
            url: `${base}/${locale}`,
            lastModified: new Date(`${BLOG_MODIFIED >= HOME_MODIFIED ? BLOG_MODIFIED : HOME_MODIFIED}T00:00:00.000Z`),
            changeFrequency: "weekly" as const,
            priority: 0.8,
            images: [`${base}/og/home`],
            alternates: alternates(hreflangHubLanguages(base, locale)),
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
        alternates: alternates(hreflangLanguages(base, t.slug)),
      })),
  ]);

  // ES blog pilots (P1): /es/blog/<pillar>/<slug> with English pillar/slug kept.
  // Only listed clusters — pillar pages stay EN-only in V1. Iterates
  // BLOG_PILOT_LOCALES (not NON_DEFAULT_LOCALES) so locales with no translated
  // blog — FR — never get a /fr/blog/... <loc> that would 404.
  const esBlogRoutes: MetadataRoute.Sitemap = BLOG_PILOT_LOCALES.flatMap((locale) =>
    [...ES_BLOG_PILOTS].map((key) => {
      const [pillar, slug] = key.split("/");
      const clusters = getClustersForPillar(pillar);
      const cluster = clusters.find((c) => c.slug === slug);
      return {
        url: `${base}/${locale}/blog/${pillar}/${slug}`,
        lastModified: new Date(`${cluster ? getBlogPostDateModifiedIso(cluster.pillar, cluster.slug, cluster.updated) : SITE_PUBLISHED_ISO}T00:00:00.000Z`),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        images: [`${base}/og/blog/${pillar}/${slug}`],
        alternates: alternates(blogPilotLanguages(base, pillar, slug)),
      };
    }),
  );

  return [...home, ...pages, ...categoryRoutes, ...toolRoutes, ...blogIndex, ...blogPillars, ...blogClusters, ...esPilotRoutes, ...esBlogRoutes];
}
