import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“We blocked <code>/admin</code> in robots.txt — why does it show up on Google?” Because <strong>robots.txt blocks crawling, not indexing</strong>: Google lists the URL (title-only, no description) without ever fetching it. Teams discover this during security reviews, and the fix is a different tool entirely. This guide draws the bright line between robots.txt, noindex, authentication and removal — with the Disallow-matching rules that decide real cases.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Build rules in the <a href="/robots-txt-generator">robots.txt generator</a>; map crawling in the <a href="/sitemap-generator">sitemap generator</a>.</p>

<h2 id="bright-line">The bright line (memorize this table)</h2>
<table>
<thead><tr><th>Goal</th><th>Tool</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>Save crawl budget</strong></td><td>robots.txt Disallow</td><td>Stops fetching (facets, filters, staging)</td></tr>
<tr><td><strong>Keep out of index</strong></td><td>noindex meta + allow crawl</td><td>Google must fetch to see noindex</td></tr>
<tr><td><strong>Keep secret</strong></td><td>Authentication</td><td>Neither robots nor noindex is security</td></tr>
<tr><td><strong>Remove urgently</strong></td><td>Removals tool + noindex</td><td>Temporary hide, then permanent fix</td></tr>
</tbody>
</table>
<p>The classic error is combining Disallow with noindex on the same URL: blocked crawlers never see the noindex tag, so the URL lingers indexed indefinitely. To deindex, <em>allow</em> crawling of the noindexed URL — counterintuitive, correct, and the fix for most “blocked but indexed” mysteries.</p>

<h2 id="matching">Disallow matching: longest rule wins</h2>
<ul>
<li><strong>Longest match applies:</strong> <code>Allow: /admin/public</code> beats <code>Disallow: /admin</code> for that path. Order in the file does not matter — specificity does.</li>
<li><strong><code>$</code> anchors ends:</strong> <code>Disallow: /*.pdf$</code> blocks PDFs only, not <code>/pdf-guide</code> pages.</li>
<li><strong><code>*</code> wildcards spans:</strong> <code>Disallow: /*?sort=</code> kills faceted crawl traps while keeping clean category URLs.</li>
<li><strong>Crawl-delay is advisory:</strong> respected by some crawlers (shared-host relief at <code>Crawl-delay: 5</code>), ignored by Googlebot — use Search Console crawl settings instead.</li>
</ul>
<p>Validate every ruleset in a tester before deploying — one misplaced wildcard has deindexed entire blogs. The 500KB robots cap rarely binds, but bloated files signal undisciplined crawling that sitemaps should instead organize (see <a href="/blog/seo-analyzer-guide/split-large-sitemap">sitemap splitting</a>).</p>

<h2 id="cases">Three real cases (admin, staging, facets)</h2>
<p><strong>Admin login indexed:</strong> remove the Disallow, add noindex, let Google recrawl, then re-evaluate — plus authentication, because login pages deserve locks, not hints. <strong>Staging clone indexed:</strong> noindex + password-protect staging permanently; relying on Disallow alone leaks titles. <strong>Faceted filters eating budget:</strong> Disallow parameter variants (<code>?color=</code>, <code>?sort=</code>), canonical clean versions, submit only canonicals in sitemaps. Bing vs Google diverge on edge directives — test both Search Console and Bing Webmaster before declaring victory.</p>
<blockquote class="tip">General guidance only. Robots.txt is a crawling courtesy with security-adjacent consequences — audit quarterly, never assume.</blockquote>
`;

export const seoRobotsNoindex: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "robots-vs-noindex",
  kind: "cluster",
  title: "Robots.txt vs Noindex: When to Use Each",
  description:
    "Robots.txt vs noindex bright line, longest-match Disallow rules + admin/staging/facet cases. Free rule builder and tester.",
  keywords: [
    "robots txt vs noindex when to use each",
    "disallow admin login title-only",
    "allow disallow longest match",
    "crawl-delay 5 shared host",
    "tester validation",
    "Does robots.txt remove pages from Google?",
  ],
  toolSlugs: ["robots-txt-generator", "sitemap-generator", "seo-analyzer"],
  relatedSlugs: ["split-large-sitemap", "stale-og-image-fix", "fix-score-60-to-80"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "bright-line", text: "The bright line", level: 2 },
    { id: "matching", text: "Matching rules", level: 2 },
    { id: "cases", text: "Real cases", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does robots.txt remove pages from Google?", answer: "No, robots.txt blocks crawling, not indexing, so blocked URLs can appear title-only without descriptions because Google lists them without fetching. To keep pages out of the index, use a noindex tag and allow crawling so Google must fetch to see it. For secrets use authentication, and for urgent removal pair noindex with the Removals tool." },
    { question: "Why is my disallowed page still indexed?", answer: "Because blocked crawlers never see any noindex tag behind the Disallow, so the URL lingers indexed indefinitely despite the block. To deindex, allow crawling of the noindexed URL, let Google recrawl to discover the tag, then re-evaluate. For admin logins or anything secret, add authentication because neither robots nor noindex provides security." },
    { question: "How does Disallow matching work?", answer: "The longest matching rule wins regardless of file order, so Allow for admin public beats Disallow for admin on that path. Dollar signs anchor ends to block PDFs only, while asterisks span parameters like question sort equals to kill faceted traps. Validate every ruleset in a tester before deploying since one wildcard can deindex blogs." },
    { question: "Does Google respect crawl-delay?", answer: "No, crawl-delay is advisory for some crawlers only and Googlebot ignores it, so it cannot control Google load. Shared hosts may see relief at Crawl-delay 5 from cooperating crawlers, but for Googlebot use Search Console crawl settings instead. Keep files under the 500KB cap and organize crawling with disciplined Disallows and sitemaps." },
    { question: "How do I fix faceted crawl traps?", answer: "Disallow parameter variants like question color equals and question sort equals to stop faceted crawl traps while keeping clean category URLs crawlable. Canonicalize clean versions, submit only canonicals in sitemaps, and save budget rather than fetching filters. Test rules in both Search Console and Bing Webmaster since edge directives diverge before declaring victory." },
  ],
};
