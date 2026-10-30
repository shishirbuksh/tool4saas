import { siteConfig } from "@/lib/site";
import { tools, CATEGORIES, NOINDEX_SLUGS } from "@/lib/tools";
import { BLOG_PILLARS, getClustersForPillar } from "@/lib/blog-registry";
import {
  getBlogPostDateModifiedIso,
  getDateModifiedIso,
  getPageModifiedIso,
  HOME_MODIFIED,
  BLOG_MODIFIED,
  CATEGORY_MODIFIED,
  SITE_PUBLISHED_ISO,
} from "@/lib/dates";
import { isNoindexCluster } from "@/lib/blog/noindex";
import {
  BLOG_PILOT_LOCALES,
  ES_BLOG_PILOTS,
  getPilotLocales,
  hreflangHubLanguages,
  hreflangLanguages,
  HUB_LOCALES,
  isEsBlogPilot,
  NON_DEFAULT_LOCALES,
  pilotSlugsForLocale,
} from "@/lib/i18n";

type SitemapItem = {
  url: string;
  lastModified?: string;
  changeFrequency?: string;
  priority?: number;
  images?: string[];
  alternates?: { languages: Record<string, string> };
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const blogPilotLanguages = (base: string, pillar: string, slug: string): Record<string, string> => ({
  en: `${base}/blog/${pillar}/${slug}`,
  es: `${base}/es/blog/${pillar}/${slug}`,
  "x-default": `${base}/blog/${pillar}/${slug}`,
});

export function sitemap(): SitemapItem[] {
  const base = siteConfig.url.replace(/\/$/, "");

  const home: SitemapItem[] = [
    {
      url: base,
      lastModified: `${HOME_MODIFIED}T00:00:00.000Z`,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${base}/og/home`],
      alternates: { languages: hreflangHubLanguages(base, "en") },
    },
  ];

  const pages: SitemapItem[] = ["/about", "/privacy", "/terms", "/contact", "/author", "/methodology"].map((p) => ({
    url: `${base}${p}`,
    lastModified: `${getPageModifiedIso(p.replace(/^\//, "")) ?? SITE_PUBLISHED_ISO}T00:00:00.000Z`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const categoryRoutes: SitemapItem[] = CATEGORIES.map((c) => ({
    url: `${base}/category/${c.id}`,
    lastModified: `${CATEGORY_MODIFIED[c.id] ?? getDateModifiedIso(c.id)}T00:00:00.000Z`,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${base}/og/category-${c.id}`],
  }));

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

  const toolRoutes: SitemapItem[] = tools
    .filter((t) => !NOINDEX_SLUGS.has(t.slug))
    .map((t) => ({
      url: `${base}/${t.slug}`,
      lastModified: `${getDateModifiedIso(t.slug)}T00:00:00.000Z`,
      changeFrequency: "monthly",
      priority: priorityForTool(t.slug, t.category),
      images: [`${base}/og/${t.slug}`],
      ...(getPilotLocales(t.slug).length ? { alternates: { languages: hreflangLanguages(base, t.slug) } } : {}),
    }));

  const blogIndex: SitemapItem[] = [
    {
      url: `${base}/blog`,
      lastModified: `${BLOG_MODIFIED}T00:00:00.000Z`,
      changeFrequency: "weekly",
      priority: 0.7,
      images: [`${base}/og/static-blog`],
    },
    {
      url: `${base}/guides`,
      lastModified: `${getPageModifiedIso("guides") ?? BLOG_MODIFIED}T00:00:00.000Z`,
      changeFrequency: "weekly",
      priority: 0.7,
      images: [`${base}/og/static-guides`],
    },
  ];

  const blogPillars: SitemapItem[] = BLOG_PILLARS.map((p) => ({
    url: `${base}/blog/${p.pillar}`,
    lastModified: `${getBlogPostDateModifiedIso(p.pillar, p.pillar, p.updated)}T00:00:00.000Z`,
    changeFrequency: "monthly",
    priority: 0.65,
    images: [`${base}/og/blog/${p.pillar}`],
  }));

  const blogClusters: SitemapItem[] = BLOG_PILLARS.flatMap((p) =>
    getClustersForPillar(p.pillar)
      .filter((c) => !isNoindexCluster(c.pillar, c.slug))
      .map((c) => ({
        url: `${base}/blog/${c.pillar}/${c.slug}`,
        lastModified: `${getBlogPostDateModifiedIso(c.pillar, c.slug, c.updated)}T00:00:00.000Z`,
        changeFrequency: "monthly",
        priority: 0.6,
        images: [`${base}/og/blog/${c.pillar}/${c.slug}`],
        ...(isEsBlogPilot(c.pillar, c.slug) ? { alternates: { languages: blogPilotLanguages(base, c.pillar, c.slug) } } : {}),
      }))
  );

  const esPilotRoutes: SitemapItem[] = NON_DEFAULT_LOCALES.flatMap((locale) => [
    ...(HUB_LOCALES.includes(locale)
      ? [
          {
            url: `${base}/${locale}`,
            lastModified: `${BLOG_MODIFIED >= HOME_MODIFIED ? BLOG_MODIFIED : HOME_MODIFIED}T00:00:00.000Z`,
            changeFrequency: "weekly",
            priority: 0.8,
            images: [`${base}/og/home`],
            alternates: { languages: hreflangHubLanguages(base, locale) },
          },
        ]
      : []),
    ...tools
      .filter((t) => pilotSlugsForLocale(locale).has(t.slug) && !NOINDEX_SLUGS.has(t.slug))
      .map((t) => ({
        url: `${base}/${locale}/${t.slug}`,
        lastModified: `${getDateModifiedIso(t.slug)}T00:00:00.000Z`,
        changeFrequency: "monthly",
        priority: priorityForTool(t.slug, t.category),
        images: [`${base}/og/${t.slug}`],
        alternates: { languages: hreflangLanguages(base, t.slug) },
      })),
  ]);

  const esBlogRoutes: SitemapItem[] = BLOG_PILOT_LOCALES.flatMap((locale) =>
    [...ES_BLOG_PILOTS].map((key) => {
      const [pillar, slug] = key.split("/");
      const clusters = getClustersForPillar(pillar);
      const cluster = clusters.find((c) => c.slug === slug);
      return {
        url: `${base}/${locale}/blog/${pillar}/${slug}`,
        lastModified: `${cluster ? getBlogPostDateModifiedIso(cluster.pillar, cluster.slug, cluster.updated) : SITE_PUBLISHED_ISO}T00:00:00.000Z`,
        changeFrequency: "monthly",
        priority: 0.6,
        images: [`${base}/og/blog/${pillar}/${slug}`],
        alternates: { languages: blogPilotLanguages(base, pillar, slug) },
      };
    })
  );

  const allItems: SitemapItem[] = [
    ...home,
    ...pages,
    ...categoryRoutes,
    ...toolRoutes,
    ...blogIndex,
    ...blogPillars,
    ...blogClusters,
    ...esPilotRoutes,
    ...esBlogRoutes,
  ];

  return allItems;
}

export default sitemap;

export function GET() {
  const allItems = sitemap();

  const xmlEntries = allItems.map((item) => {
    let entry = `  <url>\n    <loc>${escapeXml(item.url)}</loc>\n`;
    if (item.lastModified) {
      entry += `    <lastmod>${escapeXml(item.lastModified)}</lastmod>\n`;
    }
    if (item.changeFrequency) {
      entry += `    <changefreq>${escapeXml(item.changeFrequency)}</changefreq>\n`;
    }
    if (item.priority !== undefined) {
      entry += `    <priority>${item.priority.toFixed(2)}</priority>\n`;
    }
    if (item.images?.length) {
      for (const img of item.images) {
        entry += `    <image:image>\n      <image:loc>${escapeXml(img)}</image:loc>\n    </image:image>\n`;
      }
    }
    if (item.alternates?.languages) {
      for (const [lang, href] of Object.entries(item.alternates.languages)) {
        entry += `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />\n`;
      }
    }
    entry += `  </url>`;
    return entry;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlEntries.join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
