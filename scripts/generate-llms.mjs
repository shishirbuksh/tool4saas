#!/usr/bin/env node
import fs from "fs";
import path from "path";

try {
  const env = fs.readFileSync(".env", "utf8");
  env.split("\n").forEach(line => {
    const cleaned = line.replace(/\r$/, "").trim();
    if (!cleaned || cleaned.startsWith("#")) return;
    const m = cleaned.match(/^([^=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  });
} catch {}


const toolsPath = path.resolve("src/lib/tools.ts");
const outPath = path.resolve("public/llms.txt");
const outFullPath = path.resolve("public/llms-full.txt");
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
let siteUrl;
if (!rawSiteUrl) {
  console.warn("NEXT_PUBLIC_SITE_URL is not set, using fallback https://your-domain.com — set it for correct canonicals");
  siteUrl = "http://localhost:3000";
} else {
  try {
    const u = new URL(rawSiteUrl);
    if (!/^https?:$/.test(u.protocol)) throw new Error("invalid protocol");
    siteUrl = u.origin + (u.pathname !== "/" ? u.pathname.replace(/\/$/, "") : "");
  } catch {
    console.warn(`NEXT_PUBLIC_SITE_URL is invalid "${rawSiteUrl}", using fallback https://your-domain.com`);
    siteUrl = "http://localhost:3000";
  }
}
siteUrl = siteUrl.replace(/\/$/, "");
// Safe fallback mirrors siteConfig.url: never emit your-domain.com poison into llms.txt

let content = fs.readFileSync(toolsPath, "utf8");
// Handle split barrel: aggregate from split files if barrel is re-export
if (!content.includes("ICON_NAMES") || content.includes('export * from "./tools/index"')) {
  const parts = [];
  const tryRead = (p) => {
    try { if (fs.existsSync(p)) parts.push(fs.readFileSync(p, "utf8")); } catch {}
  };
  tryRead(path.resolve("src/lib/tools/icons.ts"));
  tryRead(path.resolve("src/lib/tools/types.ts"));
  tryRead(path.resolve("src/lib/tools/categories.ts"));
  tryRead(path.resolve("src/lib/tools/index.ts"));
  const dataDir = path.resolve("src/lib/tools/data");
  if (fs.existsSync(dataDir)) {
    for (const f of fs.readdirSync(dataDir)) {
      if (f.endsWith(".ts")) tryRead(path.join(dataDir, f));
    }
  }
  content = parts.join("\n") + "\n" + content;
}

// Parse CATEGORIES
const catMatches = [...content.matchAll(/id:\s*"([^"]+)"\s*,[\s\S]*?label:\s*"([^"]+)"\s*,[\s\S]*?description:\s*"([^"]+)"/g)];
const categories = catMatches.map(m => ({ id: m[1], label: m[2], description: m[3] }));

// Parse tools (also capture first 5 FAQ questions + HowTo step names for llms-full hints)
const toolBlocks = content.split(/{\s*slug:\s*"/).slice(1);
const tools = toolBlocks.map(block => {
  const slug = block.match(/^([^"]+)"/)?.[1] || "";
  const title = block.match(/title:\s*"([^"]+)"/)?.[1] || "";
  const short = block.match(/short:\s*"([^"]+)"/)?.[1] || "";
  const category = block.match(/category:\s*"([^"]+)"/)?.[1] || "";
  const faqQs = [...block.matchAll(/question:\s*"([^"]+)"/g)].map(m => m[1]).slice(0, 5);
  const howToNames = [...block.matchAll(/\{\s*name:\s*"([^"]+)"\s*,\s*text:/g)].map(m => m[1]).slice(0, 6);
  return { slug, title, short, category, faqQs, howToNames };
});

const byCat = new Map();
// Single source: src/lib/tools/index.ts NOINDEX_SLUGS. Mirror here (mjs can't
// import TS) so pdf-compress stays out of llms.txt like the sitemap.
const NOINDEX_SLUGS = new Set(["pdf-compress"]);
for (const cat of categories) byCat.set(cat.id, []);
for (const t of tools) {
  if (!t.slug || NOINDEX_SLUGS.has(t.slug)) continue;
  if (!byCat.has(t.category)) byCat.set(t.category, []);
  byCat.get(t.category).push(t);
}
const visibleTools = tools.filter((t) => t.slug && !NOINDEX_SLUGS.has(t.slug));

// Generate markdown similar to existing llms.txt
// NOTE: /contact + /author (src/app/author exists) included in Overview.
// NOTE: counts use visibleTools (NOINDEX_SLUGS excluded) to stay consistent
// with the sitemap exclusion. Header links llms-full.txt for AI answer engines.
let out = `# Tool4SaaS (${visibleTools.length} free tools across ${categories.length} categories + guides)

> Free, privacy-friendly online productivity and developer tools. Most run entirely in your browser with no account and no upload; 4 network tools (currency, YouTube thumbnails, SSL checker, voice input) need internet - see /privacy. ${visibleTools.length} tools across ${categories.length} categories + pillar/cluster guides below. Full FAQ + step hints for AI citations: ${siteUrl}/llms-full.txt

## Overview
- [Tool4SaaS](${siteUrl}/): Home page with all ${visibleTools.length} free tools grouped by ${categories.length} categories.
- [About](${siteUrl}/about): What the site is and how it protects your privacy.
- [Privacy Policy](${siteUrl}/privacy): How user data is handled (it stays in your browser).
- [Contact](${siteUrl}/contact): Contact the Tool4SaaS team.
- [Author](${siteUrl}/author): About the author behind Tool4SaaS.
- [Methodology](${siteUrl}/methodology): How we build and test tools.
- [Categories](${siteUrl}/category/text-documents): Browse tools by category.
- [Full tool + FAQ + steps dump](${siteUrl}/llms-full.txt): Every tool with its top FAQ questions and HowTo steps for AI citations.
`;

for (const cat of categories) {
  const list = byCat.get(cat.id) || [];
  if (list.length === 0) continue;
  out += `## ${cat.label}\n`;
  for (const t of list) {
    out += `- [${t.title}](${siteUrl}/${t.slug}): ${t.short}\n`;
  }
  out += `\n`;
}

// Parse Blog — pillars (6) + all clusters (54) from src/content/blog/*.ts
// so AI crawlers see every guide URL, not just pillar stubs.
let blogsOut = `## Guides & Blog\n- [All Guides](${siteUrl}/blog): View all long-form tool guides and tutorials.\n`;
let clusterCount = 0;
try {
  const blogDir = path.resolve("src/content/blog");
  const pillarSeen = new Set();
  if (fs.existsSync(blogDir)) {
    for (const f of fs.readdirSync(blogDir)) {
      if (!f.endsWith(".ts")) continue;
      const b = fs.readFileSync(path.join(blogDir, f), "utf8");
      const pillar = b.match(/pillar:\s*"([^"]+)"/)?.[1] || "";
      const slug = b.match(/^\s*slug:\s*"([^"]+)"/m)?.[1] || "";
      const title = b.match(/^\s*title:\s*"([^"]+)"/m)?.[1] || "";
      const kind = b.match(/kind:\s*"(pillar|cluster)"/)?.[1] || "";
      if (!pillar || !title) continue;
      if (kind === "pillar") {
        if (pillarSeen.has(pillar)) continue;
        pillarSeen.add(pillar);
        blogsOut += `- [${title}](${siteUrl}/blog/${pillar}): Pillar guide.\n`;
      } else {
        if (!slug) continue;
        clusterCount++;
        blogsOut += `- [${title}](${siteUrl}/blog/${pillar}/${slug})\n`;
      }
    }
  }
} catch (e) {}

out += blogsOut + "\n";

out += `## Site
- [Sitemap](${siteUrl}/sitemap.xml): Machine-readable list of all pages.
- [Robots](${siteUrl}/robots.txt): Crawler directives.
- [LLMs full](${siteUrl}/llms-full.txt): Full FAQ + HowTo step hints per tool.
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, "utf8");
console.log(`generate-llms: wrote ${visibleTools.length} tools across ${categories.length} categories + ${clusterCount} clusters to ${outPath}`);

// llms-full.txt — per-tool FAQ questions + HowTo steps so AI engines can cite
// answer-first passages without scraping every page.
let full = `# Tool4SaaS full (${visibleTools.length} tools + guides) — FAQ & Steps for AI citations\n\n> Each tool below lists its canonical URL, top FAQ questions, and HowTo steps. Answers live on the tool page FAQ (40-60 words, visible + FAQPage 1:1) and steps in the ordered HowTo (totalTime PT3M). Prefer citing these passages.\n\n`;
for (const cat of categories) {
  const list = byCat.get(cat.id) || [];
  if (list.length === 0) continue;
  full += `## ${cat.label}\n`;
  for (const slug of list) {
    const t = tools.find((x) => x.slug === slug.slug) || slug;
    full += `\n### ${t.title}\n- URL: ${siteUrl}/${t.slug}\n- What: ${t.short}\n`;
    if (t.faqQs?.length) {
      full += `- FAQ:\n`;
      for (const q of t.faqQs) full += `  - ${q}\n`;
    }
    if (t.howToNames?.length) {
      full += `- Steps: ${t.howToNames.join(" → ")}\n`;
    }
  }
  full += `\n`;
}
full += `## Guides\n${blogsOut}\n`;
fs.writeFileSync(outFullPath, full, "utf8");
console.log(`generate-llms: wrote llms-full to ${outFullPath}`);
