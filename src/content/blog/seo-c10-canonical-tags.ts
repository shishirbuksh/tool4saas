import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A product page can answer at several URLs: http and https, with and without www, with a tracking parameter, and with a trailing slash. The content is identical, but a crawler sees multiple candidates. A <strong>canonical tag</strong> names the one URL you want indexed. Used well, it consolidates signals from duplicates. Used carelessly, it can hide the wrong page or contradict a redirect, a noindex tag or an hreflang cluster.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Generate the head block in the <a href="/meta-tag-generator">meta tag generator</a>; review the rest of the page in the <a href="/seo-analyzer">SEO analyzer</a>.</p>

<h2 id="self-reference">Put a self-referencing canonical on every indexable page</h2>
<p>The safest default is a self-referencing canonical: every indexable page declares its own preferred URL in the head. A guide at <code>https://example.com/guides/canonical-tags</code> should carry <code>&lt;link rel="canonical" href="https://example.com/guides/canonical-tags"&gt;</code>. That sounds redundant, but it establishes a baseline. If a template, a plugin or a campaign parameter later changes the URL, the canonical still points to the clean version.</p>
<p>Place exactly one canonical link in the <code>&lt;head&gt;</code>. Two canonical tags with different targets create a conflict, and search engines may ignore both. Check the rendered source rather than the CMS field: some themes inject a canonical automatically, and a second tag from a plugin can override the one you typed. The same rule applies to every indexable page type, including category pages, author archives and the homepage.</p>

<h2 id="absolute-urls">Use absolute URLs and one clean target</h2>
<p>Use an absolute URL with the protocol and host you actually serve: <code>https://www.example.com/page</code>, not <code>/page</code> and not <code>http://example.com/page</code>. Relative canonicals can resolve differently when a page is fetched through a proxy, a staging domain or a syndication feed. Protocol and host consistency also prevents the canonical from pointing at a URL that immediately redirects.</p>
<p>The target should return HTTP 200, be indexable, and contain the same content as the page declaring it. A canonical that points to a redirect asks a crawler to follow a chain before it reaches the preferred page, which weakens the signal. A canonical that points to a 404 or a noindex page is a contradiction. One canonical per page, one clean target, and no conflicting directives in the same head.</p>

<h2 id="duplicate-variants">Handle parameter and duplicate variants</h2>
<p>Duplicate URLs usually come from parameters, not from copied content. Campaign tags, sort orders, filter combinations, session IDs and print views can multiply one page into dozens. Canonical them to the clean URL when the parameter does not change the core content. When the parameter creates a genuinely different page, such as a color variant with unique stock and copy, let that page self-canonical instead.</p>
<table>
<thead><tr><th>Variant</th><th>Canonical target</th><th>Action</th></tr></thead>
<tbody>
<tr><td><strong>UTM or click ID</strong></td><td>Clean page URL</td><td>Canonical to the version without tracking parameters</td></tr>
<tr><td><strong>Sort and filter</strong></td><td>Base category URL</td><td>Canonical when the filtered view has no unique intent</td></tr>
<tr><td><strong>Trailing slash or case</strong></td><td>One preferred form</td><td>Pick a form, redirect the other, self-canonical the winner</td></tr>
<tr><td><strong>Print or AMP-style view</strong></td><td>Main article URL</td><td>Canonical to the main page, or noindex if it adds nothing</td></tr>
<tr><td><strong>Syndicated copy</strong></td><td>Original article URL</td><td>Canonical only when the partner agrees; otherwise discuss noindex</td></tr>
</tbody>
</table>
<p>Do not canonicalize every parameter blindly. A price comparison or a page with unique reviews may deserve its own URL. The test is content: if the page would satisfy a different search intent, it is not a duplicate. If it only rearranges the same inventory, it is a variant and belongs on the canonical.</p>

<h2 id="pagination">Keep pagination self-canonical</h2>
<p>Paginated series are not duplicates of page one. Each page in the series should normally self-canonical, because page two contains different items and may be the only path to them. Pointing every page at page one tells search engines to ignore the deeper items. A canonical from page two to page one is a common template mistake, especially on blog archives and product listings.</p>
<p>Google no longer uses <code>rel="next"</code> and <code>rel="prev"</code> as indexing signals, but the links still help users and crawlers move through the series. Keep crawlable pagination links in the HTML, give each page a unique title and self-canonical, and make sure the first page links to the second. If you consolidate a series into a single long page, redirect the old pages to the consolidated URL rather than canonicalizing them to it.</p>

<h2 id="syndication-hreflang">Coordinate syndication and hreflang</h2>
<p>When an article is republished on a partner site, the partner page can canonical to the original if the agreement allows it. The original keeps a self-canonical. That tells search engines which version should rank and keeps the duplicate from competing. If the partner cannot implement a cross-domain canonical, a noindex on the copy is the cleaner alternative; a canonical that the partner ignores leaves both versions eligible.</p>
<p>Hreflang and canonical must agree. Each language version should self-canonical, and the hreflang cluster should point among the language versions, not funnel every language into English. A Spanish page that canonicalizes to the English page removes itself from the Spanish index, even if the hreflang tag says otherwise. Decide the language architecture first, then apply both tags consistently.</p>

<h2 id="bad-targets">Never point at noindex, 404 or redirect targets</h2>
<p>Never canonicalize to a URL that is noindex, blocked, 404 or redirecting. The signals conflict: one tag says “index this page”, another says “do not index the target”. Search engines may ignore the canonical, or they may follow it and drop the page entirely. The same applies to canonicalizing to a staging domain, a parameter URL or a page that requires a login.</p>
<p>A canonical is a hint, not a redirect. Visitors still reach the duplicate URL, and the consolidation of signals is not guaranteed. If you need everyone to land on one URL, use a 301 redirect. If you need to keep both URLs live for users but prefer one in search, use a canonical. Mixing the two without a plan is how sites end up with redirect chains and conflicting tags.</p>

<h2 id="examples">Two fixes in practice</h2>
<p>Two common patterns show how the decision changes with content.</p>
<h3>Example 1: a product page with campaign parameters</h3>
<p>A jacket page is live at <code>/jackets/rain-shell</code>. A newsletter links to the same page with <code>?utm_source=newsletter</code>, and a filter links to <code>?color=black</code>. The jacket page self-canonicals to <code>/jackets/rain-shell</code>. The UTM version canonicals to the same clean URL. The color filter stays live only if it has unique copy, stock or reviews; otherwise it also canonicals to the base page. The newsletter URL still works for tracking, but search engines see one product page.</p>
<h3>Example 2: a syndicated guide</h3>
<p>A guide is published on your site and republished by an industry partner. Your original self-canonicals. The partner page adds <code>&lt;link rel="canonical" href="https://your-site.com/guide"&gt;</code>. If the partner cannot add the tag, the copy gets <code>noindex</code> instead. The hreflang tags, if any, stay within each language cluster. The goal is one indexable original per language, not a chain of canonicals across domains.</p>

<h2 id="workflow">Audit and implement safely</h2>
<ol>
<li><strong>Inventory the variants.</strong> Crawl the site or export URLs from analytics and look for parameters, case differences, trailing slashes and duplicate paths.</li>
<li><strong>Choose one preferred URL per page.</strong> Use the version that appears in navigation, sitemaps and internal links.</li>
<li><strong>Add a self-canonical to every indexable page.</strong> Make it absolute, place it once in the head, and confirm the target returns 200.</li>
<li><strong>Resolve conflicts.</strong> Remove canonicals that point at noindex, 404 or redirecting URLs; replace them with a redirect or a corrected target.</li>
<li><strong>Verify in the rendered HTML.</strong> The <a href="/meta-tag-generator">meta tag generator</a> can produce the canonical line from the URL you enter, but it does not crawl your site or validate the target. Check the live page source, then monitor indexing in Search Console.</li>
</ol>
<p>Review canonicals after migrations, template changes and campaign launches. A tag that was correct last quarter can point at a retired URL after a redesign. The <a href="/blog/seo-analyzer-guide/split-large-sitemap">sitemap splitting guide</a> covers URL inventory at scale, and <a href="/blog/seo-analyzer-guide/robots-vs-noindex">robots vs noindex</a> explains the exclusion controls that should not be mixed with a canonical. If the canonical is one item in a wider cleanup, the <a href="/blog/seo-analyzer-guide/fix-score-60-to-80">60-to-80 score rescue</a> shows where it fits.</p>
<div class="cta-box"><strong>Generate the tag:</strong> enter the preferred URL in the <a href="/meta-tag-generator">meta tag generator</a>, copy the canonical line, then verify the live page and its target. For the full workflow, start with the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>.</div>
`;

export const seoCanonical: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "canonical-tag-guide",
  kind: "cluster",
  title: "Canonical Tags: Fix Duplicate URLs Safely",
  description:
    "Canonical tag guide: self-referencing URLs, parameters, pagination, syndication and hreflang fixes, and when a redirect or noindex fits.",
  keywords: ["canonical tag guide", "self referencing canonical", "duplicate url parameters", "canonical vs redirect", "pagination canonical"],
  toolSlugs: ["meta-tag-generator"],
  relatedSlugs: ["fix-score-60-to-80", "split-large-sitemap", "robots-vs-noindex"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "self-reference", text: "Self-referencing canonicals", level: 2 },
    { id: "absolute-urls", text: "Absolute URLs, one target", level: 2 },
    { id: "duplicate-variants", text: "Parameter duplicates", level: 2 },
    { id: "pagination", text: "Pagination", level: 2 },
    { id: "syndication-hreflang", text: "Syndication and hreflang", level: 2 },
    { id: "bad-targets", text: "Noindex, 404, redirects", level: 2 },
    { id: "examples", text: "Two fixes in practice", level: 2 },
    { id: "workflow", text: "Audit and implement", level: 2 },
  ],
  html,
  faqs: [
    { question: "What does a canonical tag do?", answer: "A canonical tag names the URL you want search engines to treat as the preferred version of a page. It helps consolidate duplicate signals from tracking parameters, protocol variants and syndicated copies. It is a hint rather than a directive, so search engines can ignore it when other signals conflict. It does not redirect visitors." },
    { question: "Should every page have a self-referencing canonical?", answer: "Yes, every indexable page should normally include one self-referencing canonical with an absolute URL. It establishes a clean baseline and prevents a template change or campaign parameter from becoming the preferred version. Place one tag in the head, confirm the target returns 200 and is indexable, then verify the rendered HTML." },
    { question: "Can a canonical replace a redirect?", answer: "No. A canonical suggests a preferred URL while leaving the duplicate reachable; a redirect sends visitors and crawlers to the new URL. Use a 301 when a page has moved and you want one live address. Use a canonical when both URLs must stay available but one should represent the page in search." },
    { question: "How many canonical tags should a page have?", answer: "One. Multiple canonical tags with different targets create conflicting instructions, and search engines may ignore all of them. Check the rendered head because CMS templates and plugins sometimes inject a second tag. If two systems control metadata, disable one or make both output the same absolute URL." },
    { question: "Should page two of a paginated series canonical to page one?", answer: "Usually no. Each page contains different items and may be the only path to deeper content, so it should self-canonical. Funneling every page to page one tells search engines to ignore the rest of the series. Keep crawlable pagination links and unique titles, and redirect old pages only when you consolidate the series." },
    { question: "Why is my canonical tag being ignored?", answer: "Common causes include conflicting signals such as a noindex tag on the target, a canonical pointing at a 404 or redirect, multiple canonical tags, relative URLs resolving to the wrong host, or a target with different content. Check the rendered head, the target's status code and the sitemap, then remove the conflict." },
  ],
};
