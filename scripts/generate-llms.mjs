#!/usr/bin/env node
import fs from "fs";
import path from "path";

const toolsPath = path.resolve("src/lib/tools.ts");
const outPath = path.resolve("public/llms.txt");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://your-domain.com";

const content = fs.readFileSync(toolsPath, "utf8");

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
for (const cat of categories) byCat.set(cat.id, []);
for (const t of tools) {
  if (!byCat.has(t.category)) byCat.set(t.category, []);
  byCat.get(t.category).push(t);
}

// Generate markdown similar to existing llms.txt
let out = `# ToolKit Pro

> Free, privacy-friendly online productivity and developer tools that run entirely in your browser. No account required and your data never leaves your device.

## Overview
- [ToolKit Pro](${siteUrl}/): Home page with all free tools grouped by category.
- [About](${siteUrl}/about): What the site is and how it protects your privacy.
- [Privacy Policy](${siteUrl}/privacy): How user data is handled (it stays in your browser).
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

out += `## Site
- [Sitemap](${siteUrl}/sitemap.xml): Machine-readable list of all pages.
- [Robots](${siteUrl}/robots.txt): Crawler directives.
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, "utf8");
console.log(`generate-llms: wrote ${tools.length} tools across ${categories.length} categories to ${outPath}`);
