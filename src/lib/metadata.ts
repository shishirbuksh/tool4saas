import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export function toolMetadata(slug: string): Metadata {
  const tool = getTool(slug);
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}/${slug}`;
  const ogImage = `${base}/og/${slug}`;

  if (!tool) {
    return {
      title: siteConfig.title,
      description: siteConfig.description,
      alternates: { canonical: url },
    };
  }

  // SEO title depth: `${title} - ${short}` sliced to 55 chars + ` | Tool4SaaS`
  // keeps 50-60 ideal, max ~67 (under 70 truncation limit). Description stays
  // verbatim, canonical absolute, OG image /og/slug, robots max-snippet -1.
  let core = `${tool.title} - ${tool.short}`;
  if (core.length > 55) {
    core = core.slice(0, 55).trimEnd();
    const lastSpace = core.lastIndexOf(" ");
    if (lastSpace > 35) core = core.slice(0, lastSpace);
  }
  const fullTitle = `${core} | Tool4SaaS`;

  return {
    title: fullTitle,
    description: tool.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
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
      languages: { en: base, "x-default": base },
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
  const ogImage = `${base}/og/home`;
  return {
    title: opts.title,
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
      url,
      siteName: siteConfig.name,
      title: opts.title,
      description: opts.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
  };
}
