import { siteConfig } from "@/lib/site";

export function GET() {
  const base = siteConfig.url.replace(/\/$/, "");
  const aiBots = [
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
    "Bingbot",
    "msnbot",
    "CCBot",
    "Amazonbot",
    "Bytespider",
  ];

  let body = `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /*?target=*\n\n`;
  for (const bot of aiBots) {
    body += `User-agent: ${bot}\nAllow: /\nDisallow: /api/\nDisallow: /*?target=*\n\n`;
  }
  body += `Sitemap: ${base}/sitemap.xml\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
