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
      // AI crawlers + AI search answer engines: allow all like normal bots.
      // (Remove a block to opt out of a specific AI indexer. Keep disallow
      // identical to "*" so budget isn't wasted on /api/ or ?target= dupes.)
      ...[
        "GPTBot",
        "ChatGPT-User",
        "OAI-SearchBot",
        "PerplexityBot",
        "ClaudeBot",
        "Claude-SearchBot",
        "Claude-User",
        "Cohere-AI",
        "Google-Extended",
        "Applebot-Extended",
        "CCBot",
        "Amazonbot",
      ].map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/*?target=*"],
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
