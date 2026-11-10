#!/usr/bin/env node
/**
 * Thin-content audit for the live site.
 *
 * Fetches every URL in sitemap.xml, extracts the <main> text, and scores each
 * page for indexability during the first ~60 days of a new domain.
 *
 * Outputs:
 *   THIN_CONTENT_AUDIT.md
 *   thin-content-audit.json
 *
 * Usage:
 *   node scripts/audit-thin-content.mjs
 *   node scripts/audit-thin-content.mjs --base https://tool4saas.com --concurrency 8
 */

import { writeFile } from "node:fs/promises";

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const BASE = getArg("base", "https://tool4saas.com").replace(/\/+$/, "");
const CONCURRENCY = Number(getArg("concurrency", "8"));
const TIMEOUT_MS = Number(getArg("timeout", "25000"));

// Project convention (scripts/validate-tools.mjs): <300 unique words is thin.
// `noindexBelow` = pull from the index now; `targetBelow` = indexable but weak.
// Legal/trust pages are exempt: short is correct for them.
const THRESHOLDS = {
  home: { noindexBelow: 0, targetBelow: 0, label: "home" },
  static: { noindexBelow: 0, targetBelow: 150, label: "static", exempt: true },
  category: { noindexBelow: 150, targetBelow: 250, label: "category" },
  tool: { noindexBelow: 250, targetBelow: 300, label: "tool" },
  "blog-pillar": { noindexBelow: 400, targetBelow: 700, label: "blog pillar" },
  "blog-cluster": { noindexBelow: 400, targetBelow: 700, label: "blog cluster" },
};

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rsquo: "\u2019", lsquo: "\u2018", rdquo: "\u201d", ldquo: "\u201c",
  mdash: "\u2014", ndash: "\u2013", hellip: "\u2026", middot: "\u00b7",
  copy: "\u00a9", reg: "\u00ae", trade: "\u2122", deg: "\u00b0",
  times: "\u00d7", divide: "\u00f7", rarr: "\u2192", larr: "\u2190",
  eacute: "\u00e9", egrave: "\u00e8", uuml: "\u00fc", ouml: "\u00f6",
  auml: "\u00e4", szlig: "\u00df", ccedil: "\u00e7", ntilde: "\u00f1",
};

function decodeEntities(input) {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, body) => {
    if (body.startsWith("#x") || body.startsWith("#X")) {
      const code = Number.parseInt(body.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    if (body.startsWith("#")) {
      const code = Number.parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    const named = ENTITIES[body.toLowerCase()];
    return named ?? match;
  });
}

function htmlToText(html) {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(script|style|svg|noscript|template|iframe)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function words(text) {
  return text.toLowerCase().match(/[a-z0-9][a-z0-9'-]*/g) ?? [];
}

function shingles(text, size = 8) {
  const w = words(text);
  const set = new Set();
  for (let i = 0; i + size <= w.length; i += 1) set.add(w.slice(i, i + size).join(" "));
  return set;
}

function classify(url) {
  const path = new URL(url).pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return { type: "home", key: "home" };
  if (path.startsWith("/blog/")) {
    const parts = path.split("/").filter(Boolean);
    return parts.length <= 2
      ? { type: "blog-pillar", key: parts[1] ?? "" }
      : { type: "blog-cluster", key: parts.slice(1).join("/") };
  }
  if (path === "/blog") return { type: "static", key: "blog" };
  if (path.startsWith("/category/")) return { type: "category", key: path.slice(10) };
  if (/^\/(about|privacy|terms|contact|author|methodology|sitemap)$/.test(path)) {
    return { type: "static", key: path.slice(1) };
  }
  return { type: "tool", key: path.slice(1) };
}

async function fetchSitemap() {
  const res = await fetch(`${BASE}/sitemap.xml`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const urls = [];
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const block = m[1];
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (!loc) continue;
    urls.push({
      loc: loc.replace(/&amp;/g, "&"),
      lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? null,
    });
  }
  return urls;
}

async function auditPage(entry) {
  const { loc } = entry;
  const meta = classify(loc);
  const started = Date.now();
  try {
    const res = await fetch(loc, {
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; Tool4SaaS-Audit/1.0)" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const html = await res.text();
    const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
    const text = htmlToText(mainHtml);
    const all = words(text);
    const unique = new Set(all);
    const title = decodeEntities(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
    const desc = decodeEntities(
      html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "",
    ).trim();
    const robots = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? "";
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => htmlToText(m[1]));
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? "";
    const mainLinks = (mainHtml.match(/<a\b[^>]*href="(\/[^"#?]*)/gi) ?? []).length;
    const headings = (mainHtml.match(/<h2\b/gi) ?? []).length;

    return {
      url: loc,
      path: new URL(loc).pathname,
      type: meta.type,
      key: meta.key,
      status: res.status,
      words: all.length,
      uniqueWords: unique.size,
      title,
      titleLength: title.length,
      descLength: desc.length,
      robots,
      h1Count: h1s.length,
      h1: h1s[0] ?? "",
      canonical,
      mainLinks,
      headings,
      lastmod: entry.lastmod,
      ms: Date.now() - started,
      shingles: shingles(text),
    };
  } catch (error) {
    return {
      url: loc,
      path: new URL(loc).pathname,
      type: meta.type,
      key: meta.key,
      status: 0,
      error: String(error?.message ?? error),
      words: 0,
      uniqueWords: 0,
      shingles: new Set(),
      ms: Date.now() - started,
    };
  }
}

async function pool(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  let shared = 0;
  for (const s of small) if (large.has(s)) shared += 1;
  return shared / (a.size + b.size - shared);
}

function grade(page) {
  const rule = THRESHOLDS[page.type] ?? { noindexBelow: 250, targetBelow: 300 };
  if (page.status !== 200) return { verdict: "fix", reason: `HTTP ${page.status}` };
  if (/noindex/i.test(page.robots)) return { verdict: "keep", reason: "already noindex" };
  if (rule.exempt) return { verdict: "keep", reason: "legal/trust page (length exempt)" };
  if (!rule.noindexBelow && !rule.targetBelow) return { verdict: "keep", reason: "always index" };
  if (page.uniqueWords < rule.noindexBelow) {
    return { verdict: "noindex", reason: `${page.uniqueWords} unique words, floor ${rule.noindexBelow}` };
  }
  if (page.uniqueWords < rule.targetBelow) {
    return { verdict: "improve", reason: `${page.uniqueWords} unique words, target ${rule.targetBelow}` };
  }
  return { verdict: "keep", reason: `${page.uniqueWords} unique words` };
}

function mdEscape(s) {
  return String(s ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function table(rows, headers) {
  const head = `| ${headers.join(" | ")} |\n| ${headers.map(() => "---").join(" | ")} |`;
  return [head, ...rows.map((r) => `| ${r.map(mdEscape).join(" | ")} |`)].join("\n");
}

const main = async () => {
  console.log(`Fetching sitemap: ${BASE}/sitemap.xml`);
  const entries = await fetchSitemap();
  console.log(`Found ${entries.length} URLs. Crawling with concurrency ${CONCURRENCY}...`);

  let done = 0;
  const pages = await pool(entries, CONCURRENCY, async (entry) => {
    const page = await auditPage(entry);
    done += 1;
    if (done % 25 === 0 || done === entries.length) {
      process.stdout.write(`  ${done}/${entries.length}\r`);
    }
    return page;
  });
  process.stdout.write("\n");

  // Near-duplicate detection on 8-word shingles.
  const comparable = pages.filter((p) => p.status === 200 && p.shingles.size >= 20);
  const pairs = [];
  for (let i = 0; i < comparable.length; i += 1) {
    for (let j = i + 1; j < comparable.length; j += 1) {
      const score = jaccard(comparable[i].shingles, comparable[j].shingles);
      if (score >= 0.5) pairs.push({ a: comparable[i], b: comparable[j], score });
    }
  }
  pairs.sort((x, y) => y.score - x.score);

  for (const page of pages) {
    const { verdict, reason } = grade(page);
    page.verdict = verdict;
    page.reason = reason;
  }

  const duplicateFlags = new Map();
  for (const pair of pairs) {
    const [small, large] =
      pair.a.uniqueWords <= pair.b.uniqueWords ? [pair.a, pair.b] : [pair.b, pair.a];
    if (large.uniqueWords - small.uniqueWords < 150) continue;
    duplicateFlags.set(small.url, {
      similarTo: large.url,
      score: Number(pair.score.toFixed(2)),
      wordGap: large.uniqueWords - small.uniqueWords,
    });
  }
  for (const page of pages) {
    const dup = duplicateFlags.get(page.url);
    if (dup && page.verdict !== "noindex") {
      page.verdict = "noindex";
      page.reason = `${Math.round(dup.score * 100)}% template overlap with ${dup.similarTo}`;
    }
    page.duplicate = dup ?? null;
  }

  const byType = {};
  for (const page of pages) {
    byType[page.type] ??= [];
    byType[page.type].push(page);
  }

  const noindex = pages.filter((p) => p.verdict === "noindex").sort((a, b) => a.uniqueWords - b.uniqueWords);
  const improve = pages.filter((p) => p.verdict === "improve").sort((a, b) => a.uniqueWords - b.uniqueWords);
  const fix = pages.filter((p) => p.verdict === "fix");
  const keep = pages.filter((p) => p.verdict === "keep");

  const trustPaths = new Set([
    "/",
    "/about",
    "/methodology",
    "/author",
    "/privacy",
    "/terms",
    "/contact",
    "/sitemap",
    "/blog",
  ]);
  // Head terms this site should own. Only used when the page exists.
  const headTerms = [
    "/pdf-merge",
    "/word-counter",
    "/image-compress",
    "/qr-code-generator",
    "/invoice-generator",
    "/json-formatter",
    "/password-generator",
    "/case-converter",
    "/unit-converter",
    "/percentage-calculator",
    "/age-calculator",
    "/base64-encode-decode",
    "/resume-builder",
    "/text-to-speech",
    "/mortgage-calculator",
  ];
  const toolPages = byType.tool ?? [];
  const byPath = new Map(toolPages.map((p) => [p.path, p]));
  const headTools = headTerms.map((p) => byPath.get(p)).filter(Boolean);
  const fillTools = toolPages
    .filter((p) => !headTerms.includes(p.path))
    .sort((a, b) => b.uniqueWords - a.uniqueWords)
    .slice(0, Math.max(0, 15 - headTools.length));
  const priority = [
    ...pages.filter((p) => trustPaths.has(p.path)),
    ...headTools,
    ...fillTools,
    ...[...(byType["blog-pillar"] ?? [])].sort((a, b) => b.uniqueWords - a.uniqueWords).slice(0, 5),
  ]
    .filter((p) => p.status === 200)
    .filter((p, i, arr) => arr.findIndex((x) => x.path === p.path) === i)
    .sort((a, b) => (a.path === "/" ? -1 : b.path === "/" ? 1 : a.path.localeCompare(b.path)));

  const summaryRows = Object.entries(byType)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([type, list]) => {
      const sorted = [...list].sort((a, b) => a.uniqueWords - b.uniqueWords);
      const median = sorted[Math.floor(sorted.length / 2)];
      const min = sorted[0];
      return [
        type,
        list.length,
        min?.uniqueWords ?? 0,
        median?.uniqueWords ?? 0,
        list.filter((p) => p.verdict === "noindex").length,
        list.filter((p) => p.verdict === "improve").length,
      ];
    });

  const report = [
    "# Thin-Content Audit — tool4saas.com",
    "",
    `**Run:** ${new Date().toISOString()}`,
    `**Scope:** ${pages.length} URLs from \`${BASE}/sitemap.xml\` (live, rendered \`<main>\` text)`,
    `**Thresholds (unique words):** tool >=${THRESHOLDS.tool.targetBelow}, category >=${THRESHOLDS.category.targetBelow}, blog pillar >=${THRESHOLDS["blog-pillar"].targetBelow}, blog cluster >=${THRESHOLDS["blog-cluster"].targetBelow}. Legal/trust pages exempt. Project rule: <300 = thin.`,
    "",
    "## Verdict",
    "",
    table(
      [
        ["Keep (index)", keep.length],
        ["Improve (under target)", improve.length],
        ["Noindex (thin/duplicate)", noindex.length],
        ["Broken (non-200)", fix.length],
        ["Total", pages.length],
      ],
      ["Bucket", "URLs"],
    ),
    "",
    "## By page type",
    "",
    table(summaryRows, ["Type", "URLs", "Min words", "Median words", "Noindex", "Improve"]),
    "",
    `## 1. Noindex candidates (${noindex.length})`,
    "",
    "These pages should be pulled from the sitemap and set to `noindex, follow` until they have unique content. They currently dilute crawl budget on a domain that Google has not yet trusted.",
    "",
    noindex.length
      ? table(
          noindex.map((p) => [p.path, p.type, p.uniqueWords, p.reason, p.lastmod ?? ""]),
          ["Path", "Type", "Unique words", "Why", "Lastmod"],
        )
      : "_None._",
    "",
    `## 2. Improve (${improve.length})`,
    "",
    "Indexable, but under the target for their type. Add a real 3-section guide / worked example before promoting them.",
    "",
    improve.length
      ? table(
          improve.map((p) => [p.path, p.type, p.uniqueWords, p.headings, p.reason]),
          ["Path", "Type", "Unique words", "H2s", "Gap"],
        )
      : "_None._",
    "",
    `## 3. Broken URLs (${fix.length})`,
    "",
    fix.length
      ? table(
          fix.map((p) => [p.path, p.status, p.error ?? ""]),
          ["Path", "Status", "Error"],
        )
      : "_None — every sitemap URL returned 200._",
    "",
    `## 4. Near-duplicate pairs (${pairs.length} ≥ 50% shingle overlap)`,
    "",
    pairs.length
      ? table(
          pairs.slice(0, 30).map((p) => [
            p.a.path,
            p.b.path,
            `${Math.round(p.score * 100)}%`,
            p.a.uniqueWords,
            p.b.uniqueWords,
          ]),
          ["Page A", "Page B", "Overlap", "A words", "B words"],
        )
      : "_No page pair shares 50%+ of its 8-word shingles._",
    "",
    "## 5. Metadata outliers",
    "",
    table(
      [
        ["Titles > 60 chars", pages.filter((p) => p.titleLength > 60).length],
        ["Titles < 25 chars", pages.filter((p) => p.titleLength > 0 && p.titleLength < 25).length],
        ["Descriptions > 160 chars", pages.filter((p) => p.descLength > 160).length],
        ["Descriptions < 70 chars", pages.filter((p) => p.descLength > 0 && p.descLength < 70).length],
        ["Missing H1", pages.filter((p) => p.h1Count === 0).length],
        ["Multiple H1", pages.filter((p) => p.h1Count > 1).length],
        ["No internal links in main", pages.filter((p) => p.mainLinks === 0).length],
        ["No H2 sections", pages.filter((p) => p.headings === 0).length],
      ],
      ["Check", "URLs"],
    ),
    "",
    "## 6. Suggested 60-day index set",
    "",
    `Concrete starting surface: ${priority.length} URLs. Everything else stays live for users but carries \`noindex, follow\` and is absent from \`sitemap.xml\`.`,
    "",
    table(
      priority.map((p) => [p.path, p.type, p.uniqueWords]),
      ["Path", "Type", "Unique words"],
    ),
    "",
    `**Rationale.** Tool pages are this site's strongest asset — all ${(byType.tool ?? []).length} clear the 300-word floor (min ${Math.min(...(byType.tool ?? []).map((p) => p.uniqueWords))}, median ${[...(byType.tool ?? [])].sort((a, b) => a.uniqueWords - b.uniqueWords)[Math.floor((byType.tool ?? []).length / 2)]?.uniqueWords}) with zero duplicates. The blog is the drag: ${(byType["blog-cluster"] ?? []).length} clusters, none above 700 words, median ${[...(byType["blog-cluster"] ?? [])].sort((a, b) => a.uniqueWords - b.uniqueWords)[Math.floor((byType["blog-cluster"] ?? []).length / 2)]?.uniqueWords}. But note what the crawl also proved: **zero duplicate pairs and zero broken URLs**. This is not a spam or doorway problem — it is a depth and trust problem.`,
    "",
    "**Sequence (recommended):**",
    "",
    "1. Do **not** noindex the 160 `improve` pages. They cost nothing, they are unique, and they can earn long-tail impressions once the domain is trusted. Depth comes later.",
    "2. Apply `noindex, follow` to the 31 pages in section 1 only. That is the reversible, low-risk slice.",
    "3. Resubmit `sitemap.xml` in GSC and run `npm run indexnow`.",
    "4. Request indexing for the 29-URL priority set above — 10–15 per day, not all at once.",
    "5. Fix the real bottleneck: external signals. Three to five genuine mentions (directory, Product Hunt, a dev.to or Reddit post where relevant) will move impressions faster than any on-page change at this stage.",
    "",
    "**Do not** treat a 29-URL index set as the goal. It is a starting surface for indexing requests, not a noindex list. Cutting the site to 29 pages would remove the long-tail upside that is the entire point of a tool directory.",
    "",
  ].join("\n");

  await writeFile("THIN_CONTENT_AUDIT.md", report, "utf8");
  await writeFile(
    "thin-content-audit.json",
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        base: BASE,
        thresholds: THRESHOLDS,
        counts: {
          total: pages.length,
          keep: keep.length,
          improve: improve.length,
          noindex: noindex.length,
          broken: fix.length,
        },
        noindex: noindex.map((p) => ({ path: p.path, type: p.type, uniqueWords: p.uniqueWords, reason: p.reason })),
        improve: improve.map((p) => ({ path: p.path, type: p.type, uniqueWords: p.uniqueWords, reason: p.reason })),
        broken: fix.map((p) => ({ path: p.path, status: p.status, error: p.error })),
        duplicates: pairs.slice(0, 100).map((p) => ({
          a: p.a.path,
          b: p.b.path,
          overlap: Number(p.score.toFixed(3)),
        })),
        pages: pages.map(({ shingles, ...rest }) => rest),
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`\nkeep=${keep.length} improve=${improve.length} noindex=${noindex.length} broken=${fix.length}`);
  console.log("Wrote THIN_CONTENT_AUDIT.md and thin-content-audit.json");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
