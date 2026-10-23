import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";
import { getPilotLocales, hreflangLanguages, hreflangHubLanguages, HUB_LOCALES, OG_LOCALE } from "@/lib/i18n";
import { toolMetaTitle } from "@/lib/seo-title";

// OG locale alternates for a slug: every pilot locale that is NOT the default.
// Keeps og:locale:alternate consistent with the hreflang set (previously EN
// tool pages declared none, and locale pages drifted file by file).
function ogAlternateLocales(slug: string): string[] {
  return getPilotLocales(slug).map((loc) => OG_LOCALE[loc]);
}

// EN home advertises the published locale hubs (es/fr) as og:locale:alternate,
// mirroring the hreflang cluster it now declares.
function homeAlternateLocales(): string[] {
  return HUB_LOCALES.map((loc) => OG_LOCALE[loc]);
}

export function toolMetadata(slug: string): Metadata {
  const tool = getTool(slug);
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}/${slug}`;
  const ogImage = `${base}/og/${slug}`;

  if (!tool) {
    return {
      title: siteConfig.title,
      description: siteConfig.description,
      alternates: { canonical: url, languages: { en: url, "x-default": url } },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
      openGraph: {
        type: "website",
        locale: siteConfig.locale,
        url,
        siteName: siteConfig.name,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
      },
      twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [ogImage],
      },
    };
  }

  // SEO title: prefer a complete clause over a raw character cut. The helper
  // keeps every title inside 30-70 characters and always retains the brand.
  const fullTitle = toolMetaTitle(tool.title, tool.short, tool.seoTitle);

  return {
    // absolute: bypasses layout title.template (%s | Tool4SaaS) which would
    // otherwise render a double suffix "... | Tool4SaaS | Tool4SaaS" (~80ch,
    // truncated in SERPs). Category pages use plain-string titles and are the
    // only correct consumers of the template.
    title: { absolute: fullTitle },
    description: tool.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: url,
      languages: hreflangLanguages(base, slug),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      ...(ogAlternateLocales(slug).length ? { alternateLocale: ogAlternateLocales(slug) } : {}),
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: tool.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${tool.title} — ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: tool.description,
      images: [ogImage],
    },
  };
}

export function homeMetadata(): Metadata {
  const base = siteConfig.url.replace(/\/$/, "");
  const ogImage = `${base}/og/home`;
  return {
    alternates: {
      canonical: base,
      // EN home now advertises every hub (es/fr) so the hub hreflang cluster is
      // mutually reciprocal (previously home declared only en + x-default).
      languages: hreflangHubLanguages(base, "en"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // Full object: Metadata merges shallowly, so a partial openGraph here
    // would drop the parent title/description/url/siteName (see layout).
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      alternateLocale: homeAlternateLocales(),
      url: base,
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [ogImage],
    },
  };
}

export function staticPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}${opts.path}`;
  // Per-page share card: /og/static-<name> renders curated title/desc
  // (route falls back to site defaults for unknown names).
  const ogImage = `${base}/og/static-${opts.path.replace(/^\//, "").replace(/\//g, "-") || "home"}`;
  // absolute: static titles already carry brand once (e.g. "Our Authors -
  // Tool4SaaS Editorial Team"); plain strings would get a second suffix from
  // the layout template. Titles without brand get it appended once here.
  const absoluteTitle = opts.title.includes(siteConfig.name)
    ? opts.title
    : `${opts.title} | ${siteConfig.name}`;
  return {
    title: { absolute: absoluteTitle },
    description: opts.description,
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: absoluteTitle,
      description: opts.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description: opts.description,
      images: [ogImage],
    },
  };
}
