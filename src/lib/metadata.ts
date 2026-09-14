import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export function toolMetadata(slug: string): Metadata {
  const tool = getTool(slug);
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}/${slug}`;
  const ogImage = `/og/${slug}`;

  if (!tool) {
    return {
      title: siteConfig.title,
      description: siteConfig.description,
      alternates: { canonical: url },
    };
  }

  return {
    title: tool.title,
    description: tool.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    alternates: { canonical: url },
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
      title: tool.title,
      description: tool.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${tool.title} — ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      images: [ogImage],
    },
  };
}

export function homeMetadata(): Metadata {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    alternates: { canonical: base },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
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
      images: [{ url: "/og/home", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: ["/og/home"],
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
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: opts.title,
      description: opts.description,
      images: [{ url: "/og/home", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: ["/og/home"],
    },
  };
}
