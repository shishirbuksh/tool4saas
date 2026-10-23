// Generates src/lib/tools/catalog-lite.ts — a tiny client-safe projection of
// the tool catalogue (slug/title/short/description/keywords/icon/category).
// Why: src/lib/tools/index.ts pulls all 12 data/*.ts modules (full faq/howTo
// /guide bodies, ~hundreds of KB) into every client chunk that imports it
// (Header on all pages, ToolSearch, Footer, homepage grid props). The lite
// module carries no guide bodies, so client JS + RSC payloads shrink.
// Runs in `npm run validate` and `npm run build` BEFORE next build; the
// generated file is committed so `next dev` / vitest / eslint work standalone.
// Field parsing mirrors scripts/generate-llms.mjs (single-line key: "value"
// entries in data/*.ts). Fails closed on count/field mismatch.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "src", "lib", "tools", "data");
const TOOLS_DIR = path.join(ROOT, "src", "lib", "tools");
const OUT = path.join(TOOLS_DIR, "catalog-lite.ts");
const COUNTS_OUT = path.join(TOOLS_DIR, "counts.generated.ts");
const SEARCH_OUT = path.join(TOOLS_DIR, "search-index.generated.ts");

const EXPECTED_TOOLS = 127;
const CATEGORY_IDS = new Set([
  "text-documents",
  "business",
  "developer",
  "converters",
  "generators",
  "images-design",
  "pdf",
  "calculators",
  "finance",
  "health",
  "seo",
  "time",
]);

const SCALAR_RE = /^\s*(slug|title|short|description|icon|category):\s*"((?:[^"\\]|\\.)*)",?\s*$/;
const KEY_ONLY_RE = /^\s*(slug|title|short|description|icon|category):\s*$/;
const CONT_RE = /^\s*"((?:[^"\\]|\\.)*)",?\s*$/;

function unescape(s) {
  return s.replace(/\\(.)/g, "$1");
}

function parseFile(file) {
  const text = fs.readFileSync(path.join(DATA_DIR, file), "utf8").replace(/\r\n/g, "\n");
  const lines = text.split("\n");
  const tools = [];
  let cur = null;
  let kwAccum = null;
  let pendingKey = null;
  for (const line of lines) {
    if (kwAccum !== null) {
      kwAccum += " " + line.trim();
      if (line.includes("]")) {
        const kws = [...kwAccum.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => unescape(m[1]));
        if (cur) cur.keywords = kws;
        kwAccum = null;
      }
      continue;
    }
    if (pendingKey) {
      const c = line.match(CONT_RE);
      const key = pendingKey;
      pendingKey = null;
      if (c && cur) {
        cur[key] = unescape(c[1]);
        continue;
      }
      // Not a continuation value — fall through to normal parsing.
    }
    const ko = line.match(KEY_ONLY_RE);
    if (ko) {
      // Wrapped value ("description:" alone on its line) — value follows.
      if (ko[1] === "slug") {
        if (cur) tools.push(cur);
        cur = { slug: "", keywords: [] };
      } else if (!cur) {
        cur = { slug: "", keywords: [] };
      }
      pendingKey = ko[1];
      continue;
    }
    const m = line.match(SCALAR_RE);
    if (m) {
      const [, key, val] = m;
      if (key === "slug") {
        if (cur) tools.push(cur);
        cur = { slug: unescape(val), keywords: [] };
      } else if (cur) {
        cur[key] = unescape(val);
      }
      continue;
    }
    const kwStart = line.match(/^\s*keywords:\s*\[(.*)$/);
    if (kwStart && cur) {
      const rest = kwStart[1];
      if (rest.includes("]")) {
        cur.keywords = [...rest.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => unescape(x[1]));
      } else {
        kwAccum = rest;
      }
      continue;
    }
    if (cur && /^\s*\},?\s*$/.test(line)) {
      tools.push(cur);
      cur = null;
    }
  }
  if (cur) tools.push(cur);
  return tools;
}

const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".ts")).sort();
const all = [];
for (const f of files) all.push(...parseFile(f));

// NOINDEX is a tiny hand-maintained module. Parse it here so generated search
// data and counts can never drift from the indexable surface.
const noindexSrc = fs.readFileSync(path.join(TOOLS_DIR, "noindex.ts"), "utf8");
const noindexMatch = noindexSrc.match(/NOINDEX_SLUGS\s*=\s*new Set\(\[([^\]]*)\]\)/);
if (!noindexMatch) {
  console.error("generate-catalog-lite: FAIL — could not parse NOINDEX_SLUGS from noindex.ts");
  process.exit(1);
}
const noindexSlugs = new Set(
  [...noindexMatch[1].matchAll(/"([^"]+)"/g)].map((m) => unescape(m[1]))
);

const errors = [];
if (all.length !== EXPECTED_TOOLS) {
  errors.push(`tool count ${all.length}, expected ${EXPECTED_TOOLS}`);
}
const seen = new Set();
for (const t of all) {
  for (const k of ["slug", "title", "short", "description", "icon", "category"]) {
    if (!t[k] || typeof t[k] !== "string") errors.push(`${t.slug || "?"}: missing ${k}`);
  }
  if (!Array.isArray(t.keywords) || t.keywords.length < 3) errors.push(`${t.slug}: keywords <3`);
  if (!CATEGORY_IDS.has(t.category)) errors.push(`${t.slug}: bad category ${t.category}`);
  if (seen.has(t.slug)) errors.push(`duplicate slug ${t.slug}`);
  seen.add(t.slug);
}
for (const slug of noindexSlugs) {
  if (!seen.has(slug)) errors.push(`NOINDEX slug ${slug} is not in the catalogue`);
}
if (errors.length > 0) {
  console.error(`generate-catalog-lite: FAIL\n- ${errors.slice(0, 20).join("\n- ")}`);
  process.exit(1);
}

const lit = (t) =>
  `{ slug: ${JSON.stringify(t.slug)}, title: ${JSON.stringify(t.title)}, short: ${JSON.stringify(t.short)}, description: ${JSON.stringify(
    t.description
  )}, keywords: ${JSON.stringify(t.keywords)}, icon: ${JSON.stringify(t.icon)}, category: ${JSON.stringify(t.category)} }`;

const out = `// AUTO-GENERATED by scripts/generate-catalog-lite.mjs — do not edit.
// Client-safe catalogue projection (no faq/howTo/guide bodies). Regenerated
// on every \`npm run validate\` / \`npm run build\`. ${all.length} tools.
import type { IconName } from "./icons";
import type { Category } from "./types";
import { CATEGORIES } from "./categories";

export type LiteTool = {
  slug: string;
  title: string;
  short: string;
  description: string;
  keywords: string[];
  icon: IconName;
  category: string;
};

export const LITE_TOOLS: LiteTool[] = Object.freeze([
${all.map((t) => `  ${lit(t)},`).join("\n")}
]) as LiteTool[];

const liteMap = new Map<string, LiteTool>(LITE_TOOLS.map((t) => [t.slug, t]));

export const liteGetTool = (slug: string): LiteTool | undefined => liteMap.get(slug);

export type LiteGroup = { category: Category; tools: LiteTool[] };

export const LITE_GROUPS: LiteGroup[] = Object.freeze(
  CATEGORIES.map((category) =>
    Object.freeze({
      category,
      tools: Object.freeze(LITE_TOOLS.filter((t) => t.category === category.id)) as LiteTool[],
    })
  )
) as LiteGroup[];

export const liteToolsByCategory = () => LITE_GROUPS;
`;

fs.writeFileSync(OUT, out);

const countsOut = `// AUTO-GENERATED by scripts/generate-catalog-lite.mjs — do not edit.
// Registry totals only; importing this file must never pull catalogue data.
export const TOTAL_TOOL_COUNT = ${all.length};
export const TOTAL_CATEGORY_COUNT = ${CATEGORY_IDS.size};
`;

fs.writeFileSync(COUNTS_OUT, countsOut);

const searchTools = all
  .filter((t) => !noindexSlugs.has(t.slug))
  .map((t) => ({
    slug: t.slug,
    title: t.title,
    haystack: [t.title, t.short, t.slug, ...(t.keywords ?? [])].join(" ").toLowerCase(),
  }));

const searchOut = `// AUTO-GENERATED by scripts/generate-catalog-lite.mjs — do not edit.
// Client-safe search index: visible tools only, no descriptions or guide bodies.
export type SearchTool = { slug: string; title: string; haystack: string };

export const SEARCH_TOOLS: SearchTool[] = Object.freeze([
${searchTools
  .map(
    (t) =>
      `  { slug: ${JSON.stringify(t.slug)}, title: ${JSON.stringify(t.title)}, haystack: ${JSON.stringify(
        t.haystack
      )} },`
  )
  .join("\n")}
]) as SearchTool[];
`;

fs.writeFileSync(SEARCH_OUT, searchOut);
console.log(
  `generate-catalog-lite: wrote ${all.length} tools, ${all.length - noindexSlugs.size} search rows and registry counts`
);
