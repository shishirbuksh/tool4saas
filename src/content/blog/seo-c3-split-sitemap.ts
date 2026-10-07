import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Catalog: 120,000 URLs. Search Console: “Sitemap exceeds limits.” One file cannot hold it — the sitemap protocol caps files at <strong>50,000 URLs or 50MB uncompressed</strong>, and a single relative-path entry can poison the whole submission. Splitting catalogs into indexed sitemap files is a thirty-minute job that unblocks crawling for months. This guide covers the split math, changefreq honesty, priority tiers and the relative-path rejection that fails most first attempts.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Generate maps in the <a href="/sitemap-generator">sitemap generator</a>; gate crawling with the <a href="/robots-txt-generator">robots.txt generator</a>.</p>

<h2 id="split-math">Split math: 50K URLs / 50MB per file + index</h2>
<p>120,000 URLs → three files (50K + 50K + 20K), each under 50MB uncompressed, listed in a sitemap index that Search Console accepts as one submission. Name them by segment (<code>sitemap-products-1.xml</code>, not <code>part1.xml</code>) so coverage reports stay readable. Regenerate on catalog change — stale sitemaps listing dead URLs waste crawl budget exactly when launches need it most. Paste up to 1,200 URLs per run into the <a href="/sitemap-generator">generator</a> for clean XML output.</p>

<h2 id="changefreq-priority">changefreq honesty + priority tiers</h2>
<table>
<thead><tr><th>Page type</th><th>changefreq</th><th>priority</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>Bestsellers / pillars</strong></td><td>weekly</td><td>0.8</td><td>Crawl often, rank-bearing</td></tr>
<tr><td><strong>Product / cluster pages</strong></td><td>monthly</td><td>0.5–0.6</td><td>Steady value</td></tr>
<tr><td><strong>Archives, tags</strong></td><td>yearly</td><td>0.3</td><td>De-prioritize crawl spend</td></tr>
</tbody>
</table>
<p>Priorities are hints, not orders — but honest tiers focus crawler attention where revenue lives. Marking everything 1.0/daily trains crawlers to ignore your signals; underclaiming archives is a feature. Revisit tiers quarterly as catalog mix shifts.</p>

<h2 id="rejections">Rejections: relative paths, bad dates, wrong content-type</h2>
<ul>
<li><strong>Relative URLs rejected:</strong> every <code>&lt;loc&gt;</code> must be absolute HTTPS (<code>https://…</code>, never <code>/page</code>). One relative entry can fail the file.</li>
<li><strong>Malformed lastmod:</strong> W3C datetimes only (<code>2026-10-07</code>, not “yesterday”). Future dates confuse schedulers.</li>
<li><strong>Wrong encoding:</strong> UTF-8, ampersands escaped (<code>&amp;amp;</code>). Hand-edited XML breaks here most.</li>
<li><strong>Blocked by robots:</strong> URLs disallowed in robots.txt get “submitted but blocked” status — allow what you submit.</li>
</ul>
<p>After acceptance, watch Search Console's indexed-vs-submitted delta: a growing gap means quality or duplication filters, not sitemap syntax — fix content, not XML. Pair sitemap work with crawler gates in <a href="/blog/seo-analyzer-guide/robots-vs-noindex">robots vs noindex</a>.</p>
<blockquote class="tip">General guidance only. Sitemap hygiene amplifies crawling; it cannot rescue uncrawlable architecture or thin content.</blockquote>
`;

export const seoSplitSitemap: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "split-large-sitemap",
  kind: "cluster",
  title: "Split Large Sitemaps Search Console Accepts",
  description:
    "Split 120K catalogs into 50K/50MB sitemap files: index structure, honest changefreq/priority tiers + rejection fixes. Free generator.",
  keywords: [
    "how to split large sitemap for search console",
    "split 120k catalog 50k chunks index",
    "weekly vs monthly changefreq",
    "0.8 bestsellers 0.3 archives",
    "relative path reject fix",
    "What are sitemap size limits?",
  ],
  toolSlugs: ["sitemap-generator", "robots-txt-generator", "seo-analyzer"],
  relatedSlugs: ["robots-vs-noindex", "fix-score-60-to-80", "utm-naming-governance"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "split-math", text: "Split math", level: 2 },
    { id: "changefreq-priority", text: "Tiers", level: 2 },
    { id: "rejections", text: "Rejection fixes", level: 2 },
  ],
  html,
  faqs: [
    { question: "What are sitemap size limits?", answer: "Each sitemap file caps at 50,000 URLs or 50MB uncompressed, so catalogs must split into files listed in a sitemap index. A 120,000 catalog becomes 50K plus 50K plus 20K files submitted as one Search Console entry. Name segments like sitemap-products-1.xml, regenerate on catalog change, and paste up to 1,200 URLs per run." },
    { question: "What changefreq and priority should I use?", answer: "Use weekly with 0.8 priority for bestsellers, monthly with 0.5 to 0.6 for cluster pages, and yearly with 0.3 for archives and tags. Honest tiers focus crawler attention where revenue lives because priorities are hints, not orders. Marking everything 1.0 daily trains crawlers to ignore signals, so revisit tiers quarterly." },
    { question: "Why did Search Console reject my sitemap?", answer: "Search Console usually rejects for relative URLs, since every loc must be absolute HTTPS and one relative entry can fail the file. Other causes are malformed lastmod dates needing W3C format like 2026-10-07, wrong encoding without UTF-8 and escaped ampersands, or submitted URLs blocked by robots. Allow what you submit and validate encoding before resubmitting." },
    { question: "Do priorities control rankings?", answer: "No, priorities are crawl hints, not orders, so marking everything 1.0 daily trains crawlers to ignore your signals. Honest tiers focus attention where revenue lives, with bestsellers at 0.8 and archives at 0.3 to de-prioritize spend. If indexed versus submitted gaps grow, fix content quality or duplication, not XML, and revisit tiers quarterly." },
    { question: "Submitted but not indexed — sitemap fault?", answer: "Usually content quality or duplication filters cause the gap, not XML, because the sitemap did its delivery job once accepted. Watch Search Console indexed versus submitted delta, since a growing gap signals filters rather than syntax. Fix thin or duplicate content instead of XML, regenerate sitemaps on catalog change, and pair mapping with crawler gates." },
  ],
};
