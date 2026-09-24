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

// Parse tools
const toolBlocks = content.split(/{\s*slug:\s*"/).slice(1);
const tools = toolBlocks.map(block => {
  const slug = block.match(/^([^"]+)"/)?.[1] || "";
  const title = block.match(/title:\s*"([^"]+)"/)?.[1] || "";
  const short = block.match(/short:\s*"([^"]+)"/)?.[1] || "";
  const category = block.match(/category:\s*"([^"]+)"/)?.[1] || "";
  return { slug, title, short, category };
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
// with the sitemap exclusion.
let out = `# Tool4SaaS (${tools.length} free tools across ${categories.length} categories)

> Free, privacy-friendly online productivity and developer tools. Most run entirely in your browser with no account and no upload; 4 network tools (currency, YouTube thumbnails, SSL checker, voice input) need internet - see /privacy. ${tools.length} tools across ${categories.length} categories.

## Overview
- [Tool4SaaS](${siteUrl}/): Home page with all ${tools.length} free tools grouped by ${categories.length} categories.
- [About](${siteUrl}/about): What the site is and how it protects your privacy.
- [Privacy Policy](${siteUrl}/privacy): How user data is handled (it stays in your browser).
- [Contact](${siteUrl}/contact): Contact the Tool4SaaS team.
- [Author](${siteUrl}/author): About the author behind Tool4SaaS.
- [Methodology](${siteUrl}/methodology): How we build and test tools.
- [Categories](${siteUrl}/category/text-documents): Browse tools by category.
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

// Parse Blog
let blogsOut = `## Guides & Blog\n- [All Guides](${siteUrl}/blog): View all long-form tool guides and tutorials.\n`;
try {
  const registryPath = path.resolve("src/lib/blog-registry.ts");
  if (fs.existsSync(registryPath)) {
    const regContent = fs.readFileSync(registryPath, "utf8");
    const pillarMatches = [...regContent.matchAll(/pillar:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"/g)];
    for (const m of pillarMatches) {
      blogsOut += `- [${m[2]}](${siteUrl}/blog/${m[1]})\n`;
    }
  }
} catch (e) {}

out += blogsOut + "\n";

out += `## Site
- [Sitemap](${siteUrl}/sitemap.xml): Machine-readable list of all pages.
- [Robots](${siteUrl}/robots.txt): Crawler directives.
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, "utf8");
console.log(`generate-llms: wrote ${visibleTools.length} tools across ${categories.length} categories to ${outPath}`);
