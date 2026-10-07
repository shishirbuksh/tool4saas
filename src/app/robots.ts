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
      // Training posture: MAX-VISIBILITY (documented intent) — GPTBot, CCBot
      // and Google-Extended may train on allowed paths. To opt out of
      // training while keeping search/answer citations, add explicit
      // Disallow blocks for those agents here.
      // (Remove a block to opt out of a specific AI indexer. Keep disallow
      // identical to "*" so budget isn't wasted on /api/ or ?target= dupes.)
      // AI assistants can also read the machine-readable catalogue at
      // /llms.txt (full FAQ/steps dump at /llms-full.txt).
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
        "Bytespider",
      ].map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/*?target=*"],
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
