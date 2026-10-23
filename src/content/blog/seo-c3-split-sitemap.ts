import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A marketplace export produced 120,000 URLs, and Search Console answered with a size-limit error. The cause was not mysterious XML: one sitemap file cannot hold that catalog. The protocol caps a file at <strong>50,000 URLs or 50MB uncompressed</strong>, and an index may reference at most 50,000 child sitemaps within the same 50MB ceiling. Splitting is mostly bookkeeping, but the generator on this site does one specific job: it turns a pasted list into a single <code>&lt;urlset&gt;</code>. It does not detect the limit for you, build an index or compress the output. Knowing that up front saves an afternoon.</p>
<p>The wider <a href="/blog/seo-analyzer-guide">SEO publishing guide</a> covers the audit context. Generate each part in the <a href="/sitemap-generator">sitemap generator</a>, control crawling with the <a href="/robots-txt-generator">robots.txt generator</a>, and review the page afterward in the <a href="/seo-analyzer">SEO analyzer</a>.</p>

<h2 id="split-math">The two limits and the split math</h2>
<p>URL count and file size are separate constraints. A sitemap with 48,000 URLs can still exceed 50MB if each URL is long, and a file with short URLs can hold 50,000 entries comfortably. The size limit applies to the uncompressed XML, not to the bytes on the wire after a server applies gzip. An index follows the same 50MB ceiling, but its entries are sitemap locations rather than page URLs, and it can list up to 50,000 of them.</p>
<p>The generator is deliberately single-file. Paste absolute URLs one per line, and it validates each line, listing anything that is not an absolute <code>http</code> or <code>https</code> URL as invalid. It then emits one <code>&lt;urlset&gt;</code> with an optional global <code>lastmod</code>, <code>changefreq</code> and <code>priority</code> repeated on every entry. There is no automatic split at 50,000, no sitemap-index output, no gzip option and no per-URL settings. The tool itself does not impose a run count, but the protocol ceiling still applies to whatever you publish, so check the count before uploading.</p>
<ol>
<li><strong>Export the canonical, indexable URLs</strong> from the CMS or database. Remove noindex pages, 404s, redirects and duplicate parameter variants before they enter the list.</li>
<li><strong>Partition by section</strong> such as products, categories and blog, keeping every part under 50,000 URLs and under 50MB uncompressed.</li>
<li><strong>Generate each part separately.</strong> Choose the global values that suit that section, download <code>sitemap.xml</code>, and rename it by segment.</li>
<li><strong>Host the files at stable absolute URLs</strong> and build a sitemap index that points to each one.</li>
<li><strong>Submit the index once</strong> in Search Console and reference it from robots.txt if you already list sitemaps there.</li>
</ol>
<p><strong>Worked example: 120,000 URLs.</strong> Split into 50,000 product URLs in <code>products-1.xml</code>, another 50,000 in <code>products-2.xml</code>, and 20,000 blog URLs in <code>blog-1.xml</code>. All three stay below both limits. The index lists three locations. Names by segment make coverage reports readable and tell you which file to regenerate when only one section changes.</p>
<pre><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;
  &lt;sitemap&gt;
    &lt;loc&gt;https://example.com/sitemaps/products-1.xml&lt;/loc&gt;
    &lt;lastmod&gt;2026-10-22&lt;/lastmod&gt;
  &lt;/sitemap&gt;
  &lt;sitemap&gt;
    &lt;loc&gt;https://example.com/sitemaps/blog-1.xml&lt;/loc&gt;
  &lt;/sitemap&gt;
&lt;/sitemapindex&gt;</code></pre>
<p><strong>Worked example: the size limit bites first.</strong> A catalog has 48,000 product URLs averaging 1.2KB each, roughly 56MB of XML. The count is legal but the bytes are not, so split by measured size instead of count, perhaps 24,000 URLs per file. Export one part, check the downloaded file size in Explorer or Finder, and keep splitting until both numbers pass. For a 320,000-URL marketplace, the count yields seven files: six at 50,000 and one at 20,000.</p>
<p>For catalogs far larger than a manual paste can handle, let the framework or platform generate the files. Next.js metadata routes, WordPress SEO plugins and ecommerce sitemap modules can paginate a catalog and produce an index on deploy. Review the output anyway: an automatically generated file can still contain noindex URLs, redirects or cross-host entries that the sitemap should not advertise.</p>

<h2 id="changefreq-priority">changefreq, priority and lastmod without theatre</h2>
<p>Google has said it ignores <code>changefreq</code> and <code>priority</code>. They are not crawl controls, they do not change ranking, and setting everything to daily with priority 1.0 does not make a site crawl faster. The table below is a reasonable labeling convention for humans reading the files, not a lever to pull.</p>
<table>
<thead><tr><th>Section</th><th>changefreq</th><th>priority</th><th>lastmod practice</th></tr></thead>
<tbody>
<tr><td><strong>Product pages</strong></td><td>weekly</td><td>0.8</td><td>Date of a real price, stock or copy change</td></tr>
<tr><td><strong>Category pages</strong></td><td>monthly</td><td>0.6</td><td>Date the listing or intro genuinely changed</td></tr>
<tr><td><strong>Blog posts</strong></td><td>monthly</td><td>0.5</td><td>Date of a substantive edit</td></tr>
<tr><td><strong>Archives and tags</strong></td><td>yearly</td><td>0.3</td><td>Omit unless the archive itself changed</td></tr>
</tbody>
</table>
<p>Because the generator applies one global set of values per run, different tiers require separate files. That fits the section-based split above: generate the product file with weekly and 0.8, then generate the archive file with yearly and 0.3. The index ties them together. If a single file mixes 49,000 untouched URLs with 1,000 updated ones, a file-level <code>lastmod</code> is inaccurate for most of the list. In that case omit the date or partition updated URLs into their own file.</p>
<p><strong>Worked example: an honest lastmod.</strong> The product team repriced 800 items on 22 October 2026. The sitemap file for those 800 URLs gets <code>&lt;lastmod&gt;2026-10-22&lt;/lastmod&gt;</code>; the file holding the other 99,200 unchanged products gets no date at all. Do not bump the date on every deploy, and do not use a future date to appear fresh. Search engines compare <code>lastmod</code> with what they observe, and a date that changes without a content change teaches them to distrust the signal. A consistent, genuine date is more useful than a precise-looking one that is fiction.</p>
<p>Correct dates use the W3C format, either <code>2026-10-22</code> or a full timestamp with a timezone such as <code>2026-10-22T14:30:00+00:00</code>. The generator accepts what you type, so validate it before publishing. Keep <code>changefreq</code> values from the allowed vocabulary; a typo such as <code>weekley</code> makes the document invalid even though it looks harmless.</p>

<h2 id="rejections">Rejections, index submission and status checks</h2>
<ul>
<li><strong>Relative paths:</strong> every <code>&lt;loc&gt;</code> must be absolute, including the scheme and host. The generator rejects entries such as <code>/products/widget</code> and lists them as invalid. Prefer HTTPS, though the validator accepts absolute HTTP URLs as well.</li>
<li><strong>Hand-edited XML errors:</strong> ampersands in query strings must be escaped as <code>&amp;amp;</code>, tags must close, and the document must be UTF-8. Generate the file rather than editing it when possible.</li>
<li><strong>Wrong content type:</strong> serve XML as <code>application/xml</code> or <code>text/xml</code>. An HTML error page or a login redirect under a .xml URL is not a sitemap.</li>
<li><strong>URLs that do not belong:</strong> noindex pages, 404s and redirects should stay out. The sitemap should list canonical URLs that return 200 and are allowed to be indexed.</li>
<li><strong>Host consistency:</strong> keep every URL and child sitemap on the same verified property. Mixing www, non-www or several domains in one submission muddies reporting and can fail verification.</li>
</ul>
<p>Build the index after the child files are live and fetching cleanly. Submit the index URL, not each child file separately, then confirm in Search Console that the index reports Success and that the discovered URL count looks plausible. If a child fails, open its URL directly in a browser and inspect the response; a 404, an HTML page or a robots block explains most failures without any XML debugging. Do not resubmit the same file every day hoping for a different result.</p>
<p><strong>Worked example: a migration.</strong> A site moves 72,000 pages from three subdomains to one host. It generates one 50,000-URL file and one 22,000-URL file for the new host, confirms that old-host URLs are absent, and submits a two-entry index. It then checks a sample of 20 URLs for status 200, confirms no noindex tag appears, and watches the Pages report rather than refreshing the sitemap. The old sitemaps are removed only after the redirects have been live long enough for the new URLs to be discovered.</p>
<p>Two adjacent topics are worth separating. Blocking a URL in robots.txt does not remove it from the index, so noindex pages need to be crawlable before they can be excluded; the <a href="/blog/seo-analyzer-guide/robots-vs-noindex">robots versus noindex guide</a> covers that boundary. For the rest of the audit workflow, see the <a href="/blog/seo-analyzer-guide/fix-score-60-to-80">60-to-80 walkthrough</a> and the <a href="/blog/seo-analyzer-guide/utm-naming-governance">UTM naming guide</a>.</p>
<p>A submitted sitemap is a discovery aid, not a ranking guarantee or an indexing command. A gap between submitted and indexed can reflect quality filters, duplication or crawl scheduling rather than a broken file. Fix the content or the internal linking; regenerating the XML will not force a thin page into the index.</p>
<blockquote class="tip">General guidance only. Sitemap changes affect discovery, not rankings, and Search Console reporting can lag for days. For large migrations, keep redirects and canonical signals in place and verify a sample before removing the old files.</blockquote>
`;

export const seoSplitSitemap: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "split-large-sitemap",
  kind: "cluster",
  title: "Split Large Sitemaps for Search Console Correctly",
  description:
    "Partition a 120,000-URL catalog into 50,000-URL sitemaps, build an index, avoid relative-path rejections, and submit cleanly to Search Console.",
  keywords: ["split large sitemap search console", "50000 urls 50mb sitemap limit", "sitemap index example", "sitemap relative path rejected", "lastmod changefreq priority ignored"],
  toolSlugs: ["sitemap-generator", "robots-txt-generator", "seo-analyzer"],
  relatedSlugs: ["robots-vs-noindex", "fix-score-60-to-80", "utm-naming-governance"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "split-math", text: "Limits and split math", level: 2 },
    { id: "changefreq-priority", text: "changefreq, priority, lastmod", level: 2 },
    { id: "rejections", text: "Rejections and submission", level: 2 },
  ],
  html,
  faqs: [
    { question: "What are the sitemap size limits?", answer: "A sitemap file may contain at most 50,000 URLs or 50MB uncompressed, whichever comes first. A sitemap index follows the same 50MB ceiling and may reference up to 50,000 child sitemaps. A 120,000-URL catalog therefore needs at least three files, all listed in one index." },
    { question: "Does the sitemap generator split files automatically?", answer: "No. It accepts a pasted list of absolute URLs and emits one urlset with optional global lastmod, changefreq and priority values. It does not detect the 50,000-URL limit, produce a sitemap index or gzip the output. You partition the catalog, generate each part, name it by section and build the index yourself or with a framework tool." },
    { question: "Why does Search Console reject a sitemap?", answer: "Common causes include relative paths, malformed XML, unescaped ampersands, an HTML page served under a .xml URL, and URLs that are noindex, redirect or return 404. Check the child file directly in a browser, confirm it is UTF-8 XML with absolute URLs, and keep every entry on the same verified host." },
    { question: "Do changefreq and priority improve crawling?", answer: "No. Google ignores both values, so they do not control crawl frequency or rankings. Set them as a readable convention if you like, but do not expect them to change behavior. The generator applies one global set per run, so separate sections need separate files if you want different labels." },
    { question: "How should lastmod be set?", answer: "Use it only when the page content genuinely changed, in W3C date or timestamp format. Do not refresh it on every deploy or set future dates. Because the generator applies one lastmod to the whole file, omit it when the file mixes updated and untouched URLs, or split the updated URLs into their own file." },
    { question: "How many sitemap files does 320,000 URLs need?", answer: "Seven: six files with 50,000 URLs and one with 20,000, all below the 50MB uncompressed limit. List them in a sitemap index and submit that single index in Search Console. If the URLs are long, check the file sizes as well, because the byte limit can bind before the count does." },
  ],
};
