import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Picture a quarterly report with three versions of the same channel: <code>Email</code>, <code>email</code> and <code>e-mail</code>. Nothing changed in the market. The links simply described identical traffic in different ways, and the report treated each description as a separate source. UTM parameters are free text, so one teammate can split a channel with a capital letter and nobody notices until the review meeting.</p>
<p>Governance fixes this without buying another analytics tool. Define what each parameter answers, standardize on lowercase words joined by hyphens, publish the allowed values, and make the clean link the easiest link to build. This guide covers all five parameters, a working taxonomy, naming examples, override traps, cleanup, and a review routine that keeps the dictionary from drifting.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Build links in <a href="/utm-builder">UTM builder</a>, inspect the landing page in <a href="/serp-preview">SERP preview</a>, and generate consistent page tags in <a href="/meta-tag-generator">meta tag generator</a>.</p>

<h2 id="five-parameters">The five parameters and the question each answers</h2>
<p>UTMs are query parameters appended to a landing page URL. Analytics tools read them to attribute a visit to a campaign instead of guessing from the referrer. Three are the working core: <code>utm_source</code>, <code>utm_medium</code> and <code>utm_campaign</code>. Two are optional refinements: <code>utm_term</code> for a paid keyword and <code>utm_content</code> for a creative or placement variant.</p>
<table>
<thead><tr><th>Parameter</th><th>Question it answers</th><th>Convention</th><th>Example</th><th>Common failure</th></tr></thead>
<tbody>
<tr><td><strong>utm_source</strong></td><td>Where did the visit come from?</td><td>Platform or publisher, lowercase</td><td><code>newsletter</code></td><td><code>Newsletter</code> or <code>news-letter</code> creates a second source</td></tr>
<tr><td><strong>utm_medium</strong></td><td>What kind of channel is it?</td><td>Channel class, lowercase</td><td><code>email</code></td><td>Putting the platform here and the channel in source</td></tr>
<tr><td><strong>utm_campaign</strong></td><td>Which initiative is this?</td><td>Descriptive slug, often year first</td><td><code>2026-spring-sale</code></td><td><code>Spring Sale 2026</code> with spaces and capitals</td></tr>
<tr><td><strong>utm_term</strong></td><td>Which paid keyword triggered it?</td><td>Keyword slug, lowercase</td><td><code>running-shoes</code></td><td>Pasting a full ad headline or a sentence</td></tr>
<tr><td><strong>utm_content</strong></td><td>Which creative or placement?</td><td>Variant slug, stable labels</td><td><code>header-cta</code></td><td><code>final-v2-real</code> or a value nobody can decode</td></tr>
</tbody>
</table>
<p>The campaign value should name the initiative, not repeat the channel. <code>utm_campaign=email</code> tells you nothing that source and medium do not already say. <code>utm_campaign=2026-spring-sale</code> groups every placement of that launch while source and medium separate the channels.</p>

<h2 id="lowercase-hyphen">The lowercase-hyphen convention</h2>
<p>Agree on one character set and stop negotiating it per campaign. Lowercase letters, digits and hyphens are readable in a URL, safe in most analytics exports, and easy to validate. Avoid spaces, underscores, camelCase, accented characters and punctuation. Spaces may become <code>%20</code>, while some parsers decode a raw <code>+</code> as a space; underscores look similar to hyphens but remain a different string; capitals create different values.</p>
<p>Keep the hierarchy stable. Source is the platform or publisher: <code>newsletter</code>, <code>google</code>, <code>linkedin</code>, <code>partner-name</code>. Medium is the channel class: <code>email</code>, <code>cpc</code>, <code>social</code>, <code>referral</code>. Campaign is the initiative: <code>2026-spring-sale</code>. Term is a paid keyword: <code>running-shoes</code>. Content is a placement or creative: <code>header-cta</code>. Do not put <code>email</code> in source and <code>newsletter</code> in medium; that inversion splits reports even when both values are clean.</p>
<p>A campaign can run for months, so avoid values that change with every send. If you need a date, put it in a fixed format at the front of the campaign slug and keep it stable for the whole initiative. Changing <code>2026-spring-sale</code> to <code>spring-sale-2026</code> halfway through creates two campaigns in the report.</p>

<h2 id="naming-examples">Naming examples by channel</h2>
<ul>
<li><strong>Newsletter:</strong> <code>utm_source=newsletter</code>, <code>utm_medium=email</code>, <code>utm_campaign=2026-spring-sale</code>, <code>utm_content=header-cta</code>. Use content to compare the header link with the inline link.</li>
<li><strong>Paid search:</strong> <code>utm_source=google</code>, <code>utm_medium=cpc</code>, <code>utm_campaign=2026-spring-sale</code>, <code>utm_term=running-shoes</code>, <code>utm_content=search-ad-a</code>. Term is the keyword, not the match type; put match type in a separate platform field if you need it.</li>
<li><strong>Partner placement:</strong> <code>utm_source=partner-name</code>, <code>utm_medium=referral</code>, <code>utm_campaign=2026-spring-sale</code>, <code>utm_content=newsletter-footer</code>. The partner is the source because the click originates there.</li>
<li><strong>Organic social:</strong> <code>utm_source=linkedin</code>, <code>utm_medium=social</code>, <code>utm_campaign=2026-spring-sale</code>, <code>utm_content=carousel-a</code>. Do not call it <code>paid</code> unless it is paid; paid social belongs in a paid medium.</li>
</ul>

<h2 id="before-after">Two before-and-after links</h2>
<p><strong>Example 1 — newsletter.</strong> Before: <code>https://example.com/spring-sale?utm_source=Email&amp;utm_medium=Newsletter&amp;utm_campaign=Spring Sale 2026</code>. The source and medium are capitalized, the medium describes a platform rather than a channel class, and the campaign contains an unencoded space. After: <code>https://example.com/spring-sale?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=2026-spring-sale&amp;utm_content=header-cta</code>. Every value is lowercase and hyphenated, the source/medium hierarchy is correct, and the placement is recorded separately.</p>
<p><strong>Example 2 — paid search.</strong> Before: <code>https://example.com/pricing?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=spring-sale&amp;utm_campaign=spring_sale&amp;utm_term=Running+Shoes&amp;utm_content=ad1</code>. The campaign key appears twice with different values, the term mixes an underscore with a raw <code>+</code> symbol, and <code>ad1</code> will not tell you which creative ran. After: <code>https://example.com/pricing?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=2026-spring-sale&amp;utm_term=running-shoes&amp;utm_content=search-ad-a</code>. One campaign key, one convention, and a content label that maps to an asset in the ad platform.</p>
<p>Both fixes are visible in the URL, which is the point. A reviewer should be able to spot a bad link before it ships without opening a spreadsheet.</p>

<h2 id="duplicate-override">Duplicate and override pitfalls</h2>
<p>When a URL carries the same parameter twice, parsers do not agree on which value wins. Some take the first occurrence, some take the last, and redirects or email scanners may reorder the query string. Do not rely on a particular outcome. Remove the duplicate before launch.</p>
<p>Other traps are quieter. If the landing page already has a query string, append UTMs with <code>&amp;</code>, not a second <code>?</code>. Keep the fragment (<code>#section</code>) at the end, after the UTMs; anything after the fragment is not sent to the server. A redirect can strip parameters, so test the final URL and not just the short link. Link wrappers in email clients can rewrite the query string, so click the delivered email once before a full send.</p>
<p>Do not tag internal navigation. A UTM on an on-site link starts a new campaign session and can overwrite the original attribution, which pollutes the reports the tags were meant to improve. Reserve UTMs for external placements. Also keep the total URL reasonably short; very long query strings are more likely to be clipped by email clients, chat apps or legacy systems, even when the browser itself would accept them.</p>

<h2 id="cleanup">Analytics cleanup: merge forward, leave raw data alone</h2>
<p>Start with a source/medium report and sort by sessions. Near-duplicates usually surface quickly: <code>email</code> beside <code>Email</code>, <code>social</code> beside <code>social-media</code>, <code>newsletter</code> beside <code>news-letter</code>. Build a mapping from every observed variant to one canonical value. Do not rewrite the raw events; most analytics tools do not offer that, and inventing history makes the cleanup impossible to audit.</p>
<p>Apply the mapping in the reporting layer: saved explorations, a warehouse lookup table, or a custom channel grouping that folds variants into the intended channel. Add an annotation on the date the convention changed so future readers know why the numbers shift. Keep a small exception list for genuinely different sources that look similar but are not the same publisher. The goal is a stable view, not a perfect past.</p>
<p>Watch the unassigned or direct bucket, but do not assume every direct visit is a tagging failure. Bookmarks, apps, privacy tools and untagged dark social also land there. Use the bucket as a prompt for investigation, not as proof of a specific mistake.</p>

<h2 id="governance">A lightweight governance routine</h2>
<p>One owner, one dictionary, one review cadence. Publish the dictionary where people build links: a shared doc, a saved preset in the <a href="/utm-builder">UTM builder</a>, or a template in your campaign brief. New values should go through a short request: what it means, which channel uses it, and why an existing value will not work. That single step prevents most one-off spellings.</p>
<ul>
<li><strong>Before every send:</strong> check the required trio, lowercase and hyphen formatting, one value per key, a working final URL, and no UTMs on internal links.</li>
<li><strong>Every quarter:</strong> pull the source/medium report, compare observed values with the dictionary, merge variants forward, and retire campaigns that have ended.</li>
<li><strong>At onboarding:</strong> show new teammates the dictionary and the builder preset before they create their first link.</li>
</ul>
<p>Keep the system small enough to follow. A five-row table and a ten-minute quarterly review beat a 40-page standard nobody reads. If a campaign needs a new dimension, add it deliberately and document it; do not let a temporary label become permanent by accident.</p>
<p>A clean campaign link still lands on a page that has to earn the click. Pair this routine with the <a href="/blog/seo-analyzer-guide/title-meta-length-2026">title and meta length guide</a>, the <a href="/blog/seo-analyzer-guide/stale-og-image-fix">social preview fix</a>, and, for large site moves, the <a href="/blog/seo-analyzer-guide/split-large-sitemap">sitemap splitting guide</a>.</p>
<div class="cta-box"><strong>Build a clean link now:</strong> open <a href="/utm-builder">UTM builder</a> to assemble the five parameters with automatic encoding, then check the destination page in <a href="/serp-preview">SERP preview</a> and its metadata in <a href="/meta-tag-generator">meta tag generator</a>. The <a href="/blog/seo-analyzer-guide">SEO publishing guide</a> covers the rest of the launch checklist.</div>
`;

export const seoUtmNaming: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "utm-naming-governance",
  kind: "cluster",
  title: "Name UTM Campaigns Without Splitting Reports",
  description:
    "UTM naming governance: five parameters, lowercase-hyphen dictionary, a working taxonomy, duplicate pitfalls, cleanup and a quarterly review routine.",
  keywords: ["how to name utm campaigns without splitting reports", "source newsletter medium email campaign spring-sale", "term running-shoes content header-button", "Email vs email unassigned", "2000 char clip"],
  toolSlugs: ["utm-builder", "serp-preview", "meta-tag-generator"],
  relatedSlugs: ["title-meta-length-2026", "stale-og-image-fix", "split-large-sitemap"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "five-parameters", text: "Five parameters", level: 2 },
    { id: "lowercase-hyphen", text: "Lowercase-hyphen convention", level: 2 },
    { id: "naming-examples", text: "Naming examples", level: 2 },
    { id: "before-after", text: "Before-and-after links", level: 2 },
    { id: "duplicate-override", text: "Duplicate pitfalls", level: 2 },
    { id: "cleanup", text: "Analytics cleanup", level: 2 },
    { id: "governance", text: "Governance routine", level: 2 },
  ],
  html,
  faqs: [
    { question: "Which UTM parameters are required?", answer: "The working core is utm_source, utm_medium and utm_campaign. Source identifies the platform or publisher, medium identifies the channel class, and campaign identifies the initiative. utm_term and utm_content are optional: use term for a paid keyword and content for a creative or placement variant. Add the optional two only when they answer a comparison you will actually review." },
    { question: "Should UTM values be lowercase and hyphenated?", answer: "Yes, choose lowercase letters, digits and hyphens as the standard. Capitals create separate values, underscores look similar to hyphens but remain different strings, and spaces may be encoded inconsistently. Apply the same convention to every parameter, publish the allowed values, and keep a campaign slug stable for the whole initiative rather than renaming it midway through." },
    { question: "Why is my campaign split across reports?", answer: "Case differences, spaces, underscores, inverted source and medium values, or duplicate parameter keys can all create separate rows for the same traffic. Build a mapping from observed variants to one canonical value, apply it in the reporting layer, and annotate the date the convention changed. Do not rewrite collected events; keep the raw data and merge forward in saved reports." },
    { question: "Do UTMs belong on internal links?", answer: "No. A UTM on an on-site link can start a new campaign session and overwrite the original attribution, so the report credits the internal placement instead of the channel that brought the visitor. Reserve UTMs for external placements such as email, ads, partners and social posts. Audit CMS templates that append campaign parameters to navigation or related-content links." },
    { question: "What happens when a URL has duplicate UTM parameters?", answer: "Different parsers may keep the first value, the last value, or behave unpredictably after a redirect or email wrapper rewrites the query string. Do not rely on a preferred winner. Remove the duplicate before launch, keep one value per key, append UTMs with an ampersand when a query string already exists, and test the final delivered URL." },
    { question: "How should I clean up old UTM data?", answer: "Map every variant to a canonical value in a saved exploration, custom channel grouping or warehouse lookup table. Leave the raw events untouched, add an annotation explaining the change, and keep a short exception list for sources that look similar but are genuinely different. Then review the source and medium report quarterly so new drift is caught before it spreads." },
  ],
};
