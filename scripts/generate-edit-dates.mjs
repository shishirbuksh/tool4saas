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
const BLOG_DATES_JSON_OUT = path.join(ROOT, "src", "lib", "blog-dates.generated.json");
const DATA_DIR = path.join(ROOT, "src", "lib", "tools", "data");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");

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
const countsText = fs.readFileSync(path.join(ROOT, "src", "lib", "tools", "counts.generated.ts"), "utf8");
const expectedToolCount = Number(countsText.match(/TOTAL_TOOL_COUNT\s*=\s*(\d+)/)?.[1]);
const errors = [];
if (!expectedToolCount || slugToCategory.size !== expectedToolCount) {
  errors.push(
    `catalog-lite parsed ${slugToCategory.size} slugs, expected ${expectedToolCount || "?"} — run generate-catalog-lite.mjs first`
  );
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

const homePaths = [
  "src/app/(en)/page.tsx",
  "src/components/home/HomeHero.tsx",
  "src/components/home/HomeCategories.tsx",
  "src/components/home/HomeDirectory.tsx",
  "src/components/home/HomeDirectory.module.css",
  "src/components/home/HomeGuides.tsx",
  "src/components/home/HomeFaq.tsx",
  "src/components/home/HomeClosing.tsx",
  "src/content/home.ts",
];
const homeHasWorkingTreeChanges = (() => {
  try {
    const out = execFileSync("git", ["status", "--porcelain", "--", ...homePaths], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    return out.length > 0;
  } catch {
    return false;
  }
})();
const homeModified = homeHasWorkingTreeChanges
  ? new Date().toISOString().slice(0, 10)
  : gitDatesMulti(homePaths) ?? mtimeFallback("src/app/(en)/page.tsx");
if (!homeModified) errors.push("home: no date source");

// ---------- blog posts (one content file per pillar/cluster) ----------
// Each file is the real source for its rendered page. Git gives us the
// honest first/last edit dates; uncommitted new files fall back to their
// declared dates or file mtime, never a fabricated stagger.
const blogPostDates = {};
const blogContentPaths = [];
if (fs.existsSync(BLOG_DIR)) {
  const blogFiles = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".ts")).sort();
  for (const f of blogFiles) {
    const rel = `src/content/blog/${f}`;
    const text = fs.readFileSync(path.join(ROOT, rel), "utf8");
    const pillar = text.match(/pillar:\s*"([^"]+)"/)?.[1] || "";
    const slug = text.match(/^\s*slug:\s*"([^"]+)"/m)?.[1] || "";
    const kind = text.match(/kind:\s*"(pillar|cluster)"/)?.[1] || "";
    const declaredPublished = text.match(/^\s*published:\s*"([^"]+)"/m)?.[1] || "";
    const declaredUpdated = text.match(/^\s*updated:\s*"([^"]+)"/m)?.[1] || "";
    if (!pillar || !slug || !kind) {
      errors.push(`${rel}: cannot parse pillar/slug/kind`);
      continue;
    }
    const key = `${pillar}/${slug}`;
    if (blogPostDates[key]) {
      errors.push(`${rel}: duplicate blog key ${key}`);
      continue;
    }
    const d = gitDates(rel);
    const mtime = mtimeFallback(rel);
    const published = d?.published || declaredPublished || mtime;
    const modified = d?.modified || declaredUpdated || mtime;
    if (!published || !modified) {
      errors.push(`${rel}: no date source`);
      continue;
    }
    blogPostDates[key] = {
      published: published > modified ? modified : published,
      modified,
      source: d ? "git" : "content-fallback",
    };
    blogContentPaths.push(rel);
  }
}
if (Object.keys(blogPostDates).length === 0) {
  errors.push("blog posts: no dates derived");
}

const blogIndexModified =
  gitDatesMulti(["src/app/(en)/blog/page.tsx", "src/lib/blog-registry.ts"]) ??
  mtimeFallback("src/app/(en)/blog/page.tsx");
const blogModified = [blogIndexModified, ...Object.values(blogPostDates).map((d) => d.modified)]
  .filter(Boolean)
  .sort()
  .pop();
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

const sortedBlogDates = Object.fromEntries(
  Object.entries(blogPostDates).sort(([a], [b]) => a.localeCompare(b))
);

const out = `// AUTO-GENERATED by scripts/generate-edit-dates.mjs — do not edit.
// REAL dates derived from git history (see script header). Regenerated on
// \`npm run validate\` / \`npm run build\`; committed so dev/vitest work
// standalone. Consumers: src/lib/dates.ts (single API surface).
export type ContentDate = { published: string; modified: string; source: string };

export const TOOL_DATES: Record<string, ContentDate> = ${JSON.stringify(toolDates, null, 0).replaceAll('","', '", "')};

export const PAGE_DATES: Record<string, ContentDate> = ${JSON.stringify(pageDates, null, 0).replaceAll('","', '", "')};

export const BLOG_POST_DATES: Record<string, ContentDate> = ${JSON.stringify(sortedBlogDates, null, 0).replaceAll('","', '", "')};

export const HOME_MODIFIED = "${homeModified}";
export const BLOG_MODIFIED = "${blogModified}";
export const CATEGORY_MODIFIED: Record<string, string> = ${JSON.stringify(categoriesModified).replaceAll('","', '", "')};
export const SITE_PUBLISHED = "${sitePublished}";
export const SITE_PUBLISHED_SOURCE = "git";
`;

fs.writeFileSync(OUT, out);
fs.writeFileSync(BLOG_DATES_JSON_OUT, `${JSON.stringify(sortedBlogDates, null, 2)}\n`, "utf8");
const counts = Object.keys(toolDates).length;
console.log(
  `generate-edit-dates: wrote ${counts} tool dates + ${Object.keys(pageDates).length} page dates + ${Object.keys(sortedBlogDates).length} blog dates -> src/lib/edit-dates.generated.ts`
);
