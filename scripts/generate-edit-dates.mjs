// Generates src/lib/edit-dates.generated.ts — real per-tool/per-page dates
// derived from git history, replacing the old fake slug-hash "staggered
// freshness" scheme (which fabricated Sept 1-9 dates for every page).
//
// Semantics (all dates REAL, derived from git):
// - Tool data files (src/lib/tools/data/<category>.ts): first commit = the
//   published date for tools in that category's file; last commit = the
//   modified date. An edit to a data file genuinely updates every tool page
//   rendered from it, so per-file granularity is honest.
// - Static pages (about/privacy/terms/contact/author/methodology): git dates
//   of their page.tsx.
// - home: latest commit touching src/app/page.tsx or src/components/home.
// - blog index: latest commit touching blog page.tsx, the registry, or content.
//
// Runs in `npm run validate` and `npm run build`; the generated file is
// committed so `next dev` / vitest / eslint work standalone. Fails closed on
// git absence (falls back to committed file mtime) — never invents dates.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "src", "lib", "edit-dates.generated.ts");
const DATA_DIR = path.join(ROOT, "src", "lib", "tools", "data");

const isoOf = (gitDate) => gitDate.trim().slice(0, 10);

function gitDates(relPath) {
  try {
    const out = execFileSync("git", ["log", "--format=%ad", "--date=short", "--", relPath], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    const lines = out.split("\n").map(isoOf).filter(Boolean);
    if (lines.length === 0) return null;
    return { modified: lines[0], published: lines[lines.length - 1] };
  } catch {
    return null;
  }
}

function gitDatesMulti(relPaths) {
  let best = null;
  for (const p of relPaths) {
    const d = gitDates(p);
    if (!d) continue;
    if (!best || d.modified > best.modified) best = d.modified;
  }
  return best;
}

function mtimeFallback(relPath) {
  const p = path.join(ROOT, relPath);
  if (!fs.existsSync(p)) return null;
  return fs.statSync(p).mtime.toISOString().slice(0, 10);
}

// ---------- tool categories (data files) ----------
const categoryFiles = fs
  .readdirSync(DATA_DIR)
  .filter((f) => f.endsWith(".ts"))
  .sort();

// slug -> category from the committed catalog-lite projection (single source).
const catalogText = fs.readFileSync(
  path.join(ROOT, "src", "lib", "tools", "catalog-lite.ts"),
  "utf8"
);
const slugToCategory = new Map();
for (const m of catalogText.matchAll(/slug: "([^"]+)"[\s\S]*?category: "([^"]+)"/g)) {
  slugToCategory.set(m[1], m[2]);
}
const errors = [];
if (slugToCategory.size !== 128) {
  errors.push(`catalog-lite parsed ${slugToCategory.size} slugs, expected 128 — run generate-catalog-lite.mjs first`);
}

const toolDates = {};
const fileDates = {};
for (const f of categoryFiles) {
  const categoryId = f.replace(/\.ts$/, "");
  const rel = `src/lib/tools/data/${f}`;
  let d = gitDates(rel);
  let source = "git";
  if (!d) {
    source = "mtime-fallback";
    const mt = mtimeFallback(rel);
    if (!mt) {
      errors.push(`${rel}: no git history and no file on disk`);
      continue;
    }
    d = { published: mt, modified: mt };
  }
  fileDates[categoryId] = d;
  for (const [slug, cat] of slugToCategory) {
    if (cat === categoryId) {
      toolDates[slug] = { ...d, source };
    }
  }
}

const missingTools = [...slugToCategory.keys()].filter((s) => !toolDates[s]);
if (missingTools.length > 0) {
  errors.push(`no date source for slugs: ${missingTools.slice(0, 10).join(", ")}`);
}

// ---------- static pages / composite pages ----------
const pageFiles = {
  about: "src/app/(en)/about/page.tsx",
  privacy: "src/app/(en)/privacy/page.tsx",
  terms: "src/app/(en)/terms/page.tsx",
  contact: "src/app/(en)/contact/page.tsx",
  author: "src/app/(en)/author/page.tsx",
  methodology: "src/app/(en)/methodology/page.tsx",
};
const pageDates = {};
for (const [name, rel] of Object.entries(pageFiles)) {
  if (!fs.existsSync(path.join(ROOT, rel))) {
    errors.push(`missing static page file ${rel}`);
    continue;
  }
  const d = gitDates(rel) ?? { published: mtimeFallback(rel), modified: mtimeFallback(rel) };
  pageDates[name] = { ...d, source: gitDates(rel) ? "git" : "mtime-fallback" };
}

const homeModified = gitDatesMulti([
  "src/app/(en)/page.tsx",
  "src/components/home/HomeHero.tsx",
  "src/components/home/HomeNav.tsx",
  "src/components/home/HomePopular.tsx",
  "src/components/home/HomeTools.tsx",
  "src/components/home/HomeGuides.tsx",
  "src/components/home/HomeEditorial.tsx",
]) ?? mtimeFallback("src/app/(en)/page.tsx");
if (!homeModified) errors.push("home: no date source");

const blogModified = gitDatesMulti([
  "src/app/(en)/blog/page.tsx",
  "src/lib/blog-registry.ts",
]) ?? mtimeFallback("src/app/(en)/blog/page.tsx");
if (!blogModified) errors.push("blog index: no date source");

const categoriesModified = {};
for (const [id, d] of Object.entries(fileDates)) categoriesModified[id] = d.modified;

// Site-wide published = earliest tool-data commit (first real content date).
let sitePublished = null;
for (const { published } of Object.values(fileDates)) {
  if (published && (!sitePublished || published < sitePublished)) sitePublished = published;
}
if (!sitePublished) errors.push("sitePublished: no date source");

if (errors.length > 0) {
  console.error(`generate-edit-dates: FAIL\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

const out = `// AUTO-GENERATED by scripts/generate-edit-dates.mjs — do not edit.
// REAL dates derived from git history (see script header). Regenerated on
// \`npm run validate\` / \`npm run build\`; committed so dev/vitest work
// standalone. Consumers: src/lib/dates.ts (single API surface).
export type ContentDate = { published: string; modified: string; source: string };

export const TOOL_DATES: Record<string, ContentDate> = ${JSON.stringify(toolDates, null, 0).replaceAll('","', '", "')};

export const PAGE_DATES: Record<string, ContentDate> = ${JSON.stringify(pageDates, null, 0).replaceAll('","', '", "')};

export const HOME_MODIFIED = "${homeModified}";
export const BLOG_MODIFIED = "${blogModified}";
export const CATEGORY_MODIFIED: Record<string, string> = ${JSON.stringify(categoriesModified).replaceAll('","', '", "')};
export const SITE_PUBLISHED = "${sitePublished}";
export const SITE_PUBLISHED_SOURCE = "git";
`;

fs.writeFileSync(OUT, out);
const counts = Object.keys(toolDates).length;
console.log(`generate-edit-dates: wrote ${counts} tool dates + ${Object.keys(pageDates).length} page dates → src/lib/edit-dates.generated.ts`);
