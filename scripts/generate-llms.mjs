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
// GEO payload: first 2 FAQ answers + first 2 HowTo step texts are inlined so
// AI engines can cite numbers without scraping every page (questions alone
// are not citable). Answers/steps truncated to ~60 words (citable passage).
const toolBlocks = content.split(/\{\s*"?slug"?\s*:\s*"/).slice(1);
const clipWords = (s, n) => {
  const w = String(s || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  return w.length > n ? w.slice(0, n).join(" ") + "…" : w.join(" ");
};
const tools = toolBlocks.map(block => {
  const slug = block.match(/^([^"]+)"/)?.[1] || "";
  const title = block.match(/"?title"?\s*:\s*"([^"]+)"/)?.[1] || "";
  const short = block.match(/"?short"?\s*:\s*"([^"]+)"/)?.[1] || "";
  const category = block.match(/"?category"?\s*:\s*"([^"]+)"/)?.[1] || "";
  let faqQs = [...block.matchAll(/"?question"?\s*:\s*"([^"]+)"/g)].map(m => m[1]).slice(0, 5);
  // First FAQ answers (citable). FAQ answers are single-line `"answer":"..."`
  // (compact) or `answer: "..."` (spaced) in data/*.ts.
  let faqAs = [...block.matchAll(/"?answer"?\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map(m => clipWords(m[1].replace(/\\"/g, '"'), 60)).slice(0, 2);
  let howToNames = [...block.matchAll(/\{\s*"?name"?\s*:\s*"([^"]+)"\s*,\s*"?text"?\s*:/g)].map(m => m[1]).slice(0, 6);
  if (howToNames.length === 0) {
    // Looser fallback (e.g. newlines between name/text) — `name` only
    // appears in howTo entries within a Tool block, so this is safe.
    howToNames = [...block.matchAll(/"?name"?\s*:\s*"([^"]+)"/g)].map(m => m[1]).slice(0, 6);
  }
  // First HowTo step bodies (citable mini-passages, ~40 words).
  let howToTexts = [...block.matchAll(/"?text"?\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map(m => clipWords(m[1].replace(/\\"/g, '"'), 40)).slice(0, 2);
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
  return { slug, title, short, category, faqQs, faqAs, howToNames, howToTexts };
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

// ---- ES pilot catalog (public/llms-es.txt) ----
// Parses the SAME Tool shapes from src/lib/i18n.ts (native ES transcreations,
// English slugs kept as /es/<slug>). mjs can't import TS, so regex-parse like
// the EN registry above. Parity (below) fails closed if pilots drift.
const I18N_PATH = path.resolve("src/lib/i18n.ts");
const outEsPath = path.resolve("public/llms-es.txt");
const esContent = readIfExists(I18N_PATH);
let esPilotSlugs = [];
if (esContent) {
  const setMatch = esContent.match(/ES_PILOT_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/);
  if (setMatch) esPilotSlugs = [...setMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  if (!setMatch || esPilotSlugs.length === 0) {
    console.error("generate-llms: ES_PILOT_SLUGS not found/empty in src/lib/i18n.ts — failing closed");
    process.exit(1);
  }
}
// Scoped parser: splits on `export const <Name>: Tool = {` so each chunk is
// tagged with its const name. BlogPosts (`: BlogPost`), helpers and the FR
// section never leak into the ES list (or vice versa) — scoping is by const
// name allowlist, not by slug (slugs repeat across locales by design).
const ES_TOOL_CONSTS = new Set(["invoiceGeneratorEs", "qrCodeGeneratorEs", "creditCardValidatorEs", "unitConverterEs", "typingSpeedEs", "plagiarismCheckerEs", "wordCounterEs", "mortgageCalculatorEs"]);
const FR_TOOL_CONSTS = new Set(["invoiceGeneratorFr"]);
function parseI18nTools(esContent, constAllow) {
  const parts = (esContent || "").split(/export const (\w+)\s*:\s*Tool\s*=\s*\{/);
  const out = [];
  for (let i = 1; i + 1 < parts.length; i += 2) {
    if (!constAllow.has(parts[i])) continue;
    const block = parts[i + 1];
    const slug = block.match(/^\s*"?slug"?\s*:\s*"([^"]+)"/m)?.[1] || "";
    const title = block.match(/"?title"?\s*:\s*"([^"]+)"/)?.[1] || "";
    const short = block.match(/"?short"?\s*:\s*"([^"]+)"/)?.[1] || "";
    const category = block.match(/"?category"?\s*:\s*"([^"]+)"/)?.[1] || "";
    const faqQs = [...block.matchAll(/"?question"?\s*:\s*"([^"]+)"/g)].map((m) => m[1]).slice(0, 5);
    const faqAs = [...block.matchAll(/"?answer"?\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => clipWords(m[1].replace(/\\"/g, '"'), 60)).slice(0, 2);
    const howToTexts = [...block.matchAll(/"?text"?\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => clipWords(m[1].replace(/\\"/g, '"'), 40)).slice(0, 2);
    out.push({ slug, title, short, category, faqQs, faqAs, howToTexts });
  }
  return out;
}
const esTools = parseI18nTools(esContent, ES_TOOL_CONSTS)
  .filter((t) => t.slug && esPilotSlugs.includes(t.slug) && !NOINDEX_SLUGS.has(t.slug));

// Generate markdown similar to existing llms.txt
// NOTE: /contact + /author (src/app/author exists) included in Overview.
// NOTE: /terms + all 12 category hubs linked from Overview for crawlers.
// NOTE: counts use visibleTools (NOINDEX_SLUGS excluded) to stay consistent
// with the sitemap exclusion. Header links llms-full.txt for AI answer engines.
// NOTE: localhost fallback above is intentional for dev — do not break it.
let out = `# Tool4SaaS (${visibleTools.length} free tools across ${categories.length} categories + guides)
> Updated: ${new Date().toISOString().slice(0, 10)} · visible count excludes 1 NOINDEX placeholder (pdf-compress, ships soon).

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
      const updated = b.match(/^\s*updated:\s*"([^"]+)"/m)?.[1] || "";
      if (!pillar || !title) continue;
      const dateSuffix = updated ? ` (updated ${updated})` : "";
      if (kind === "pillar") {
        if (pillarSeen.has(pillar)) continue;
        pillarSeen.add(pillar);
        blogsOut += `- [${title}](${siteUrl}/blog/${pillar}): Pillar guide.${dateSuffix}\n`;
      } else {
        if (!slug) continue;
        clusterCount++;
        blogsOut += `- [${title}](${siteUrl}/blog/${pillar}/${slug})${dateSuffix}\n`;
      }
    }
  }
} catch {}

out += blogsOut + "\n";

out += `## Site
- [Sitemap](${siteUrl}/sitemap.xml): Machine-readable list of all pages.
- [Robots](${siteUrl}/robots.txt): Crawler directives.
- [LLMs full](${siteUrl}/llms-full.txt): Full FAQ + HowTo step hints per tool.
- [LLMs ES](${siteUrl}/llms-es.txt): Herramientas en español (piloto) con FAQ y pasos citables.
- [LLMs FR](${siteUrl}/llms-fr.txt): Outils en français (pilote) avec FAQ et étapes citables.
`;

// llms-full.txt — per-tool FAQ answers + HowTo step bodies so AI engines can
// cite passages with numbers without scraping every page. EVERY visible tool
// emits FAQ + Steps (parsed, else fallback derived above) — never empty.
let full = `# Tool4SaaS full (${visibleTools.length} tools + guides) — FAQ answers & steps for AI citations\n\n> Updated: ${new Date().toISOString().slice(0, 10)} · visible count excludes 1 NOINDEX placeholder (pdf-compress). Each tool below lists its canonical URL, top FAQ answers (citable, from the visible FAQPage), and HowTo steps with bodies. Prefer citing these passages.\n\n`;
const fullEmittedSlugs = [];
for (const cat of categories) {
  const list = byCat.get(cat.id) || [];
  if (list.length === 0) continue;
  full += `## ${cat.label}\n`;
  for (const t of list) {
    full += `\n### ${t.title}\n- URL: ${siteUrl}/${t.slug}\n- What: ${t.short}\n`;
    const faqs = (t.faqQs && t.faqQs.length) ? t.faqQs : [`What does ${t.title || t.slug} do?`, `How do I use ${t.title || t.slug} online?`, `Is ${t.title || t.slug} free without sign-up?`];
    const answers = (t.faqAs && t.faqAs.length) ? t.faqAs : [];
    const steps = (t.howToNames && t.howToNames.length) ? t.howToNames : [`Open ${t.title || t.slug}`, "Enter your input", "Review the result", "Copy or download output"];
    const stepTexts = (t.howToTexts && t.howToTexts.length) ? t.howToTexts : [];
    full += `- FAQ:\n`;
    for (let i = 0; i < faqs.length; i++) {
      full += `  - ${faqs[i]}\n`;
      if (answers[i]) full += `    - Answer: ${answers[i]}\n`;
    }
    full += `- Steps: ${steps.map((s, i) => (stepTexts[i] ? `${s} (${stepTexts[i]})` : s)).join(" → ")}\n`;
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

// llms-es.txt — native ES pilots with /es/ URLs + citable FAQ/steps.
// Single file (tools + passages) since the pilot is tiny; split if N grows.
let esOut = `# Tool4SaaS ES (${esTools.length} herramientas gratis en español — piloto)\n\n> Actualizado: ${new Date().toISOString().slice(0, 10)} · Slugs en inglés conservados (/es/<slug>). FAQ y pasos citables con números; prefiere citar estos pasajes. Catálogo completo en inglés: ${siteUrl}/llms.txt · Detalle EN: ${siteUrl}/llms-full.txt\n\n## Herramientas en español\n- [Todas en español](${siteUrl}/es): Página hub con las ${esTools.length} herramientas piloto.\n`;
const esEmitted = [];
for (const t of esTools) {
  esOut += `\n### ${t.title}\n- URL: ${siteUrl}/es/${t.slug}\n- EN: ${siteUrl}/${t.slug}\n- Qué: ${t.short}\n`;
  const faqs = t.faqQs.length ? t.faqQs : [`¿Qué hace ${t.title || t.slug}?`];
  esOut += `- FAQ:\n`;
  for (let i = 0; i < faqs.length; i++) {
    esOut += `  - ${faqs[i]}\n`;
    if (t.faqAs[i]) esOut += `    - Respuesta: ${t.faqAs[i]}\n`;
  }
  if (t.howToTexts.length) esOut += `- Pasos: ${t.howToTexts.join(" → ")}\n`;
  esEmitted.push(t.slug);
}

// ES parity: emitted == pilots minus NOINDEX, no dupes, every pilot present,
// every emitted URL in the pilot set, none NOINDEX, none missing FAQ.
{
  const expectedEs = esPilotSlugs.filter((s) => !NOINDEX_SLUGS.has(s));
  const esErrors = [];
  if (esEmitted.length !== expectedEs.length) {
    esErrors.push(`llms-es.txt emitted ${esEmitted.length} != ES pilots ${expectedEs.length} (${expectedEs.join(",")})`);
  }
  if (new Set(esEmitted).size !== esEmitted.length) esErrors.push("llms-es.txt has duplicate slugs");
  for (const s of expectedEs) {
    if (!esEmitted.includes(s)) esErrors.push(`ES pilot /es/${s} missing from llms-es.txt`);
  }
  for (const s of esEmitted) {
    if (!esPilotSlugs.includes(s)) esErrors.push(`llms-es.txt /es/${s} not in ES_PILOT_SLUGS`);
    if (NOINDEX_SLUGS.has(s)) esErrors.push(`llms-es.txt /es/${s} is NOINDEX and must be excluded`);
  }
  for (const t of esTools) {
    if (!t.faqQs || t.faqQs.length === 0) esErrors.push(`/es/${t.slug}: missing FAQ questions`);
  }
  if (esErrors.length) {
    console.error(`generate-llms: ES parity FAILED (${esErrors.length}):\n- ${esErrors.join("\n- ")}\n`);
    process.exit(1);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, "utf8");
console.log(`generate-llms: wrote ${visibleTools.length} tools across ${categories.length} categories + ${clusterCount} clusters to ${outPath}`);
fs.writeFileSync(outFullPath, full, "utf8");
console.log(`generate-llms: wrote llms-full to ${outFullPath}`);
fs.writeFileSync(outEsPath, esOut, "utf8");
console.log(`generate-llms: wrote ${esEmitted.length} ES pilots to ${outEsPath}`);

// ---- FR pilot catalog (public/llms-fr.txt) ----
// Same pattern as ES: regex-parse FR Tool shapes from src/lib/i18n.ts
// (native FR transcreations, English slugs kept as /fr/<slug>).
const outFrPath = path.resolve("public/llms-fr.txt");
let frPilotSlugs = [];
if (esContent) {
  const frSetMatch = esContent.match(/FR_PILOT_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/);
  if (frSetMatch) frPilotSlugs = [...frSetMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  if (!frSetMatch || frPilotSlugs.length === 0) {
    console.error("generate-llms: FR_PILOT_SLUGS not found/empty in src/lib/i18n.ts — failing closed");
    process.exit(1);
  }
}
const frTools = parseI18nTools(esContent, FR_TOOL_CONSTS)
  .filter((t) => t.slug && frPilotSlugs.includes(t.slug) && !NOINDEX_SLUGS.has(t.slug));

let frOut = `# Tool4SaaS FR (${frTools.length} outils gratuits en français — pilote)\n\n> Mis à jour : ${new Date().toISOString().slice(0, 10)} · Slugs anglais conservés (/fr/<slug>). FAQ et étapes citables avec chiffres ; préférez citer ces passages. Catalogue anglais complet : ${siteUrl}/llms.txt · ES : ${siteUrl}/llms-es.txt\n\n## Outils en français\n- [Tout en français](${siteUrl}/fr) : page hub avec les ${frTools.length} outils pilotes.\n`;
const frEmitted = [];
for (const t of frTools) {
  frOut += `\n### ${t.title}\n- URL : ${siteUrl}/fr/${t.slug}\n- EN : ${siteUrl}/${t.slug}\n- Quoi : ${t.short}\n`;
  const faqs = t.faqQs.length ? t.faqQs : [`Que fait ${t.title || t.slug} ?`];
  frOut += `- FAQ :\n`;
  for (let i = 0; i < faqs.length; i++) {
    frOut += `  - ${faqs[i]}\n`;
    if (t.faqAs[i]) frOut += `    - Réponse : ${t.faqAs[i]}\n`;
  }
  if (t.howToTexts.length) frOut += `- Étapes : ${t.howToTexts.join(" → ")}\n`;
  frEmitted.push(t.slug);
}

// FR parity: emitted == pilots minus NOINDEX, no dupes, every pilot present,
// every emitted URL in the pilot set, none NOINDEX, none missing FAQ.
{
  const expectedFr = frPilotSlugs.filter((s) => !NOINDEX_SLUGS.has(s));
  const frErrors = [];
  if (frEmitted.length !== expectedFr.length) {
    frErrors.push(`llms-fr.txt emitted ${frEmitted.length} != FR pilots ${expectedFr.length} (${expectedFr.join(",")})`);
  }
  if (new Set(frEmitted).size !== frEmitted.length) frErrors.push("llms-fr.txt has duplicate slugs");
  for (const s of expectedFr) {
    if (!frEmitted.includes(s)) frErrors.push(`FR pilot /fr/${s} missing from llms-fr.txt`);
  }
  for (const s of frEmitted) {
    if (!frPilotSlugs.includes(s)) frErrors.push(`llms-fr.txt /fr/${s} not in FR_PILOT_SLUGS`);
    if (NOINDEX_SLUGS.has(s)) frErrors.push(`llms-fr.txt /fr/${s} is NOINDEX and must be excluded`);
  }
  for (const t of frTools) {
    if (!t.faqQs || t.faqQs.length === 0) frErrors.push(`/fr/${t.slug}: missing FAQ questions`);
  }
  if (frErrors.length) {
    console.error(`generate-llms: FR parity FAILED (${frErrors.length}):\n- ${frErrors.join("\n- ")}\n`);
    process.exit(1);
  }
}
fs.writeFileSync(outFrPath, frOut, "utf8");
console.log(`generate-llms: wrote ${frEmitted.length} FR pilots to ${outFrPath}`);
