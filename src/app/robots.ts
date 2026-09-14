import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block API routes and share-link query variants (e.g. ?target= countdowns)
        // so crawlers don't waste budget on duplicate thin URLs. Tool pages
        // themselves stay fully crawlable (sitemap.xml is the source of truth).
        disallow: ["/api/", "/*?target=*"],
      },
      // AI crawlers: allow training-neutral indexing like normal bots.
      // (Remove these blocks to opt out of specific AI indexers.)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
