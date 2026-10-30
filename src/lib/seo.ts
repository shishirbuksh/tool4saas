import { siteConfig } from "@/lib/site";

// Framework-neutral page metadata. The three builders in src/lib/metadata.ts
// return this shape; src/layouts/BaseLayout.astro renders it to tags. Keeping
// the Next-like field names made the page codemod mechanical while removing
// every `next` type import from the app.
export type PageRobots = {
  index: boolean;
  follow: boolean;
  googleBot?: {
    index?: boolean;
    follow?: boolean;
    "max-image-preview"?: "large" | "none";
    "max-snippet"?: number;
    "max-video-preview"?: number;
  };
};

export type PageImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type PageMeta = {
  title?: string | { absolute?: string; default?: string; template?: string };
  description?: string;
  applicationName?: string;
  authors?: { name: string }[];
  creator?: string;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string | undefined>;
  };
  robots?: PageRobots;
  openGraph?: {
    type?: string;
    locale?: string;
    alternateLocale?: string[];
    url?: string;
    siteName?: string;
    title?: string;
    description?: string;
    images?: PageImage[];
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  icons?: {
    icon?: { url: string; sizes?: string; type?: string }[];
    apple?: { url: string; sizes?: string; type?: string }[];
  };
  appleWebApp?: {
    capable?: boolean;
    title?: string;
    statusBarStyle?: string;
  };
  verification?: {
    google?: string;
    other?: Record<string, string>;
  };
  manifest?: string;
};

export function resolveTitle(meta?: PageMeta): string {
  const title = meta?.title;
  if (!title) return siteConfig.title;
  if (typeof title === "string") {
    return title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  }
  return title.absolute ?? title.default ?? siteConfig.title;
}

export const DEFAULT_ROBOTS: PageRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function robotsContent(robots: PageRobots = DEFAULT_ROBOTS): string {
  return `${robots.index ? "index" : "noindex"}, ${robots.follow ? "follow" : "nofollow"}`;
}

export function googleBotContent(robots: PageRobots = DEFAULT_ROBOTS): string {
  const g = robots.googleBot ?? {};
  return [
    `${g.index ?? robots.index ? "index" : "noindex"}`,
    `${g.follow ?? robots.follow ? "follow" : "nofollow"}`,
    `max-video-preview:${g["max-video-preview"] ?? -1}`,
    `max-image-preview:${g["max-image-preview"] ?? "large"}`,
    `max-snippet:${g["max-snippet"] ?? -1}`,
  ].join(", ");
}
