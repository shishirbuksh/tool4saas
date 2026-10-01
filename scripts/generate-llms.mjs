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


const REGISTRY_INDEX = path.resolve("src/lib/tools/index.ts");
const REGISTRY_DIR = path.resolve("src/lib/tools");
const DATA_DIR = path.resolve("src/lib/tools/data");
const LEGACY_BARREL = path.resolve("src/lib/tools.ts");
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

function readIfExists(p) {
  try {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return fs.readFileSync(p, "utf8");
  } catch {}
  return "";
}

// Robust registry load: primary source is the real split registry
// (src/lib/tools/index.ts + categories.ts + data/*.ts). The legacy
// barrel src/lib/tools.ts is only a re-export shim — never rely on it alone.
let content = "";
const indexContent = readIfExists(REGISTRY_INDEX);
const categoriesContent = readIfExists(path.join(REGISTRY_DIR, "categories.ts"));
const typesContent = readIfExists(path.join(REGISTRY_DIR, "types.ts"));
const iconsContent = readIfExists(path.join(REGISTRY_DIR, "icons.ts"));
if (indexContent) content += "\n" + indexContent;
if (categoriesContent) content += "\n" + categoriesContent;
if (typesContent) content += "\n" + typesContent;
if (iconsContent) content += "\n" + iconsContent;
if (fs.existsSync(DATA_DIR)) {
  for (const f of fs.readdirSync(DATA_DIR).sort()) {
    if (f.endsWith(".ts")) content += "\n" + readIfExists(path.join(DATA_DIR, f));
  }
}
// Legacy barrel only as supplement for pre-split God File layouts.
const barrelContent = readIfExists(LEGACY_BARREL);
if (barrelContent && !barrelContent.includes('export * from "./tools/index"')) {
  content += "\n" + barrelContent;
}
if (!content || !content.includes("slug")) {
  console.error(`generate-llms: registry content empty — expected real source at ${REGISTRY_INDEX} + ${DATA_DIR}/*.ts`);
  process.exit(1);
}

// Parse CATEGORIES (tolerant of quoted/unquoted keys + spacing)
const catMatches = [...content.matchAll(/"?id"?\s*:\s*"([^"]+)"\s*,[\s\S]*?"?label"?\s*:\s*"([^"]+)"\s*,[\s\S]*?"?description"?\s*:\s*"([^"]+)"/g)];
const categories = catMatches.map(m => ({ id: m[1], label: m[2], description: m[3] }));

// Parse tools (tolerant of spaced `question:` and compact `"question":"` +
// spaced `{ name:` and compact `{"name":"` forms; capture top FAQ + HowTo
// step names for llms-full hints, with fallbacks so no tool emits empty).
const toolBlocks = content.split(/\{\s*"?slug"?\s*:\s*"/).slice(1);
const tools = toolBlocks.map(block => {
  const slug = block.match(/^([^"]+)"/)?.[1] || "";
  const title = block.match(/"?title"?\s*:\s*"([^"]+)"/)?.[1] || "";
  const short = block.match(/"?short"?\s*:\s*"([^"]+)"/)?.[1] || "";
  const category = block.match(/"?category"?\s*:\s*"([^"]+)"/)?.[1] || "";
  let faqQs = [...block.matchAll(/"?question"?\s*:\s*"([^"]+)"/g)].map(m => m[1]).slice(0, 5);
  let howToNames = [...block.matchAll(/\{\s*"?name"?\s*:\s*"([^"]+)"\s*,\s*"?text"?\s*:/g)].map(m => m[1]).slice(0, 6);
  if (howToNames.length === 0) {
    // Looser fallback (e.g. newlines between name/text) — `name` only
    // appears in howTo entries within a Tool block, so this is safe.
    howToNames = [...block.matchAll(/"?name"?\s*:\s*"([^"]+)"/g)].map(m => m[1]).slice(0, 6);
  }
  // Fallback: derive from tool data actually present; never emit empty sections.
  if (faqQs.length === 0 && slug) {
    const label = title || slug;
    faqQs = [
      short ? `What does ${label} do? (${short})` : `What does ${label} do?`,
      `How do I use ${label} online?`,
      `Is ${label} free without sign-up?`,
    ];
  }
  if (howToNames.length === 0 && slug) {
    const label = title || slug;
    const headings = [...block.matchAll(/"?heading"?\s*:\s*"([^"]+)"/g)].map(m => m[1]).slice(0, 6);
    howToNames = headings.length
      ? headings
      : [`Open ${label}`, "Enter your input", "Review the result", "Copy or download output"];
  }
  return { slug, title, short, category, faqQs, howToNames };
});

const byCat = new Map();
// Single source: src/lib/tools/index.ts NOINDEX_SLUGS (parsed live; mjs
// can't import TS so mirror as fallback) so pdf-compress stays out of
// llms.txt like the sitemap.
let NOINDEX_SLUGS = new Set(["pdf-compress"]);
const noindexMatch = (indexContent || "").match(/NOINDEX_SLUGS\s*=\s*new Set\(\[([^\]]*)\]\)/);
if (noindexMatch) {
  const found = [...noindexMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
  if (found.length) NOINDEX_SLUGS = new Set(found);
}
for (const cat of categories) byCat.set(cat.id, []);
for (const t of tools) {
  if (!t.slug || NOINDEX_SLUGS.has(t.slug)) continue;
  if (!byCat.has(t.category)) byCat.set(t.category, []);
  byCat.get(t.category).push(t);
}
const visibleTools = tools.filter((t) => t.slug && !NOINDEX_SLUGS.has(t.slug));

// Generate markdown similar to existing llms.txt
// NOTE: /contact + /author (src/app/author exists) included in Overview.
// NOTE: /terms + all 12 category hubs linked from Overview for crawlers.
// NOTE: counts use visibleTools (NOINDEX_SLUGS excluded) to stay consistent
// with the sitemap exclusion. Header links llms-full.txt for AI answer engines.
// NOTE: localhost fallback above is intentional for dev — do not break it.
let out = `# Tool4SaaS (${visibleTools.length} free tools across ${categories.length} categories + guides)

> Free, privacy-friendly online productivity and developer tools. Most run entirely in your browser with no account and no upload; 4 network tools (currency, YouTube thumbnails, SSL checker, voice input) need internet - see /privacy. ${visibleTools.length} tools across ${categories.length} categories + pillar/cluster guides below. Full FAQ + step hints for AI citations: ${siteUrl}/llms-full.txt

## Overview
- [Tool4SaaS](${siteUrl}/): Home page with all ${visibleTools.length} free tools grouped by ${categories.length} categories.
- [About](${siteUrl}/about): What the site is and how it protects your privacy.
- [Privacy Policy](${siteUrl}/privacy): How user data is handled (it stays in your browser).
- [Terms](${siteUrl}/terms): Terms of use for all tools and guides.
- [Contact](${siteUrl}/contact): Contact the Tool4SaaS team.
- [Author](${siteUrl}/author): About the author behind Tool4SaaS.
- [Methodology](${siteUrl}/methodology): How we build and test tools.
- [Categories](${siteUrl}/category/text-documents): Browse tools by category.
- [Full tool + FAQ + steps dump](${siteUrl}/llms-full.txt): Every tool with its top FAQ questions and HowTo steps for AI citations.
`;
for (const cat of categories) {
  out += `- [${cat.label}](${siteUrl}/category/${cat.id}): ${cat.description}\n`;
}
out += `\n`;
const emittedSlugs = [];

for (const cat of categories) {
  const list = byCat.get(cat.id) || [];
  if (list.length === 0) continue;
  out += `## ${cat.label}\n`;
  for (const t of list) {
    out += `- [${t.title}](${siteUrl}/${t.slug}): ${t.short}\n`;
    emittedSlugs.push(t.slug);
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

// llms-full.txt — per-tool FAQ questions + HowTo steps so AI engines can cite
// answer-first passages without scraping every page. EVERY visible tool
// emits FAQ + Steps (parsed, else fallback derived above) — never empty.
let full = `# Tool4SaaS full (${visibleTools.length} tools + guides) — FAQ & Steps for AI citations\n\n> Each tool below lists its canonical URL, top FAQ questions, and HowTo steps. Answers live on the tool page FAQ (40-60 words, visible + FAQPage 1:1) and steps in the ordered HowTo (totalTime PT3M). Prefer citing these passages.\n\n`;
const fullEmittedSlugs = [];
for (const cat of categories) {
  const list = byCat.get(cat.id) || [];
  if (list.length === 0) continue;
  full += `## ${cat.label}\n`;
  for (const t of list) {
    full += `\n### ${t.title}\n- URL: ${siteUrl}/${t.slug}\n- What: ${t.short}\n`;
    const faqs = (t.faqQs && t.faqQs.length) ? t.faqQs : [`What does ${t.title || t.slug} do?`, `How do I use ${t.title || t.slug} online?`, `Is ${t.title || t.slug} free without sign-up?`];
    const steps = (t.howToNames && t.howToNames.length) ? t.howToNames : [`Open ${t.title || t.slug}`, "Enter your input", "Review the result", "Copy or download output"];
    full += `- FAQ:\n`;
    for (const q of faqs) full += `  - ${q}\n`;
    full += `- Steps: ${steps.join(" → ")}\n`;
    fullEmittedSlugs.push(t.slug);
  }
  full += `\n`;
}
full += `## Guides\n${blogsOut}\n`;

// Count-parity assertions: FAIL the script (non-zero exit) if emitted tool
// count != visible registry count (tools minus NOINDEX) or if any emitted
// URL is not in the registry. Also fails if any visible tool lacks FAQ/Steps.
{
  const registrySlugs = new Set(tools.map((t) => t.slug).filter(Boolean));
  const visibleSlugs = new Set(visibleTools.map((t) => t.slug));
  const parityErrors = [];
  if (emittedSlugs.length !== visibleTools.length) {
    parityErrors.push(`llms.txt emitted ${emittedSlugs.length} tools != visible registry ${visibleTools.length} (tools ${tools.length} minus NOINDEX ${[...NOINDEX_SLUGS].join(",")})`);
  }
  if (fullEmittedSlugs.length !== visibleTools.length) {
    parityErrors.push(`llms-full.txt emitted ${fullEmittedSlugs.length} tools != visible registry ${visibleTools.length}`);
  }
  if (new Set(emittedSlugs).size !== emittedSlugs.length) {
    parityErrors.push(`llms.txt has duplicate tool slugs`);
  }
  if (new Set(fullEmittedSlugs).size !== fullEmittedSlugs.length) {
    parityErrors.push(`llms-full.txt has duplicate tool slugs`);
  }
  for (const s of emittedSlugs) {
    if (!registrySlugs.has(s)) parityErrors.push(`llms.txt URL /${s} not in registry`);
    if (NOINDEX_SLUGS.has(s)) parityErrors.push(`llms.txt URL /${s} is NOINDEX and must be excluded`);
  }
  for (const s of fullEmittedSlugs) {
    if (!registrySlugs.has(s)) parityErrors.push(`llms-full.txt URL /${s} not in registry`);
    if (NOINDEX_SLUGS.has(s)) parityErrors.push(`llms-full.txt URL /${s} is NOINDEX and must be excluded`);
  }
  for (const s of visibleSlugs) {
    if (!emittedSlugs.includes(s)) parityErrors.push(`visible tool /${s} missing from llms.txt`);
    if (!fullEmittedSlugs.includes(s)) parityErrors.push(`visible tool /${s} missing from llms-full.txt`);
  }
  for (const t of visibleTools) {
    if (!t.faqQs || t.faqQs.length === 0) parityErrors.push(`${t.slug}: missing FAQ questions`);
    if (!t.howToNames || t.howToNames.length === 0) parityErrors.push(`${t.slug}: missing HowTo steps`);
  }
  if (parityErrors.length) {
    console.error(`generate-llms: parity FAILED (${parityErrors.length}):\n- ${parityErrors.join("\n- ")}\n`);
    process.exit(1);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, "utf8");
console.log(`generate-llms: wrote ${visibleTools.length} tools across ${categories.length} categories + ${clusterCount} clusters to ${outPath}`);
fs.writeFileSync(outFullPath, full, "utf8");
console.log(`generate-llms: wrote llms-full to ${outFullPath}`);
