import type { PageMeta } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { siteConfig } from "@/lib/site";
import type { Tool } from "@/lib/tools/types";
import { toolMetaTitle } from "@/lib/seo-title";

export function toolMetadata(slug: string): PageMeta {
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

  const fullTitle = toolMetaTitle(tool.title, tool.short, tool.seoTitle);
  const isNoindex = NOINDEX_SLUGS.has(slug);

  return {
    title: { absolute: fullTitle },
    description: tool.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url },
    },
    robots: {
      index: !isNoindex,
      follow: true,
      googleBot: {
        index: !isNoindex,
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

export function homeMetadata(): PageMeta {
  const base = siteConfig.url.replace(/\/$/, "");
  const ogImage = `${base}/og/home`;
  return {
    title: siteConfig.title,
    description: siteConfig.description,
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
}): PageMeta {
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}${opts.path}`;
  const ogImage = `${base}/og/static-${opts.path.replace(/^\//, "").replace(/\//g, "-") || "home"}`;
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
