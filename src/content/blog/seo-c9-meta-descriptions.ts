import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A meta description is the small block of text under a search result title. It does not decide whether a page ranks, but it often decides whether someone clicks. The work is part copywriting and part constraint: enough detail to be useful, few enough characters to avoid a truncated ending, and a promise the page actually keeps. The familiar 160-character guide is a drafting target, not a rule Google enforces. Pixels, query intent and automatic rewriting all shape what a searcher finally sees.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Draft the tag in the <a href="/meta-tag-generator">meta tag generator</a>, then check the actual cut in <a href="/serp-preview">SERP preview</a> on desktop and mobile. The <a href="/seo-analyzer">SEO analyzer</a> shows how the description fits the rest of the page.</p>

<h2 id="what-it-does">What a meta description can and cannot do</h2>
<p>The description tag gives search engines a summary to consider. Google may use it, rewrite it, or replace it with a passage from the page that matches the query. There is no reliable opt-out and no character count that forces the tag to appear. Treat the description as your preferred pitch, not a guaranteed display.</p>
<p>It is not a direct ranking factor. Keywords in the description do not lift a page by themselves, and stuffing them makes the pitch worse. What the tag can influence is click-through rate when it is shown, which in turn can affect how a page performs in a competitive result set. Write for the person scanning the page, not for a keyword counter.</p>
<p>The tag also sets expectations. A description that promises a calculator, a template or a price and then lands on a signup wall earns a quick back click. Consistency between the tag, the title and the page is part of the work. A useful description is specific, honest and short enough to finish.</p>

<h2 id="drafting-formula">A drafting formula that fits 160 characters</h2>
<p>Use three moves: name the task or outcome, add one concrete proof point, and close with a clear next step. Front-load the useful part because mobile results show fewer lines and the ending is the first thing lost. Keep one idea per description. A page that tries to mention every feature usually reads like a list and earns nothing.</p>
<table>
<thead><tr><th>Page type</th><th>Formula</th><th>Example opening</th></tr></thead>
<tbody>
<tr><td><strong>Product</strong></td><td>Product, key spec, offer, action</td><td>Insulated 750ml bottle keeps drinks cold 24 hours.</td></tr>
<tr><td><strong>Local service</strong></td><td>Service, city, proof, action</td><td>Licensed Austin plumber for leaks and drain clogs.</td></tr>
<tr><td><strong>How-to article</strong></td><td>Outcome, what is inside, action</td><td>Learn to format SQL joins without breaking clauses.</td></tr>
<tr><td><strong>Category page</strong></td><td>Range, filter benefit, action</td><td>Compare 40 lightweight hiking tents under 2kg.</td></tr>
</tbody>
</table>
<p>Those openings are not complete descriptions. They are the first clause, the part that must survive truncation. Finish with a benefit or a next step, then count the whole string. The <a href="/meta-tag-generator">generator</a> shows 60- and 160-character guides with progress bars, so both tags are measured rather than guessed.</p>
<p>Avoid opening with the brand name unless the brand is the reason to click. Avoid “Welcome to our website” and “Learn more about our services.” Replace vague adjectives with a number, a place, a format or a time. Specific details are easier to trust and easier to scan.</p>

<h2 id="rewrites">Two rewrites that recover the click</h2>
<p><strong>Example 1: a product page.</strong> The original description read: “We offer a wide range of premium stainless steel water bottles for hiking, camping, travel and everyday use. Browse our full collection today and find the perfect bottle for your needs.” That is about 185 characters, opens with a generic claim and spends the visible first line on “wide range of premium.”</p>
<p>The rewrite: “Insulated stainless steel bottle keeps drinks cold for 24 hours. 750ml, leakproof lid, fits car cup holders. Free shipping over $40.” It is about 129 characters. The first sentence states the product and the main benefit, the second adds three concrete specs, and the third gives an offer. A searcher knows exactly what the page sells before the snippet ends.</p>
<p><strong>Example 2: a local service page.</strong> The original read: “Our team provides professional plumbing services in Austin for all your needs. Contact us today to learn more about how we can help you.” That is about 136 characters, but “all your needs” describes every plumber and “learn more” asks for a click without offering a reason.</p>
<p>The rewrite: “Licensed Austin plumber for leaks, water heaters and drain clogs. Same-day appointments, upfront pricing, 24/7 emergency line. Call now.” It is about 136 characters. The service and city arrive first, the proof points answer common objections, and the closing action is specific. The page must actually offer same-day appointments and upfront pricing; if it does not, change the description rather than the page.</p>
<p>Both rewrites use the same pattern: remove filler, add evidence, keep the action short. Neither repeats the title word for word. The description extends the title instead of restating it.</p>

<h2 id="pixels-rewrites">Pixels, mobile cuts and Google rewrites</h2>
<p>Search results truncate by pixel width, not by an exact character count. A description near 160 characters with narrow letters may fit, while the same count of wide capitals can be cut earlier. Desktop results often show about two lines near 920 pixels; mobile shows fewer lines and a narrower column. The 160 figure is a useful ceiling, not a promise that every character appears.</p>
<p>Google may replace your description with a passage from the page. It often does this when the query is better answered by body text, when the tag is boilerplate, or when the page has no description at all. You cannot prevent a rewrite, but you can make the page a better source: put a clear summary in the opening paragraph, use headings that match real questions, and avoid burying the answer under a long introduction.</p>
<p>Do not judge a description by the tag alone. Preview the search result with a realistic title and URL, then read the first 100 characters as if the rest were gone. If the pitch still works, the tag is doing its job. If it only makes sense after the final clause, rewrite the opening. The pixel behavior is covered in more detail in the <a href="/blog/seo-analyzer-guide/title-meta-length-2026">title and meta length guide</a>.</p>
<p>The description is also not the Open Graph description. Social cards have their own crop and context. You can reuse the copy, but preview the social card separately; a sentence that fits a search snippet may wrap awkwardly under an image. The <a href="/meta-tag-generator">meta tag generator</a> outputs the search, Open Graph and Twitter tags, and <a href="/serp-preview">SERP preview</a> focuses on the search cut.</p>

<h2 id="workflow">Draft, preview, publish, review</h2>
<ol>
<li>Write down the page's single job in one sentence before drafting the tag.</li>
<li>Draft three versions between 140 and 160 characters, each with a different proof point.</li>
<li>Read the first 100 characters aloud. If the reason to click is not there, move it forward.</li>
<li>Paste each version into <a href="/serp-preview">SERP preview</a> and compare the desktop and mobile cut.</li>
<li>Check that the title and description do not repeat the same phrase, and that the page keeps the promise.</li>
<li>Generate the final head block in <a href="/meta-tag-generator">meta tag generator</a>, including the canonical and social tags.</li>
<li>After a few weeks, compare click-through in Search Console. Rewrite only when you have a specific reason.</li>
</ol>
<p>Do not rewrite descriptions on a schedule just to look busy. A stable tag accumulates click data; constant edits make it hard to learn anything. Change the copy when the offer, price or audience changes, or when a clear pattern in search results suggests the current pitch is being ignored.</p>
<p>If the page is part of a broader rescue, the <a href="/blog/seo-analyzer-guide/fix-score-60-to-80">60-to-80 score walkthrough</a> shows where description edits fit among titles, headings and internal links. If the social card is outdated, the <a href="/blog/seo-analyzer-guide/stale-og-image-fix">stale OG image fix</a> covers the image side.</p>

<h2 id="templates">Descriptions at template scale</h2>
<p>Catalog pages cannot all be hand-written, but a template should still produce a unique, truthful sentence. Combine stable fields such as product type, key specification, price range and shipping offer, then add a fallback for missing values. Truncate at a word boundary rather than cutting mid-word, and test a sample of the output for duplicates. A thousand pages with the same description compete with each other for the same snippet.</p>
<p>For local pages, the city and service are the minimum unique combination, but do not stop there. Add a genuine differentiator such as response time, license detail or service area. For articles, describe the outcome and the format: steps, examples, a calculator or a checklist. The description should sound like a useful sentence, not a form filled with keywords.</p>
<p>Keep the tag short enough to finish, specific enough to trust, and consistent with the page. That combination earns more than a keyword-perfect string that gets truncated before the point.</p>
<div class="cta-box"><strong>Write the next snippet now:</strong> draft it in the <a href="/meta-tag-generator">meta tag generator</a>, copy the tags, then check the desktop and mobile cut in <a href="/serp-preview">SERP preview</a>. Both run locally. For the full publishing sequence, start with the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>.</div>
`;

export const seoMetaDescriptions: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "meta-description-guide",
  kind: "cluster",
  title: "Meta Description Guide: Write Snippets That Earn Clicks",
  description:
    "Write meta descriptions that earn clicks: a 160-character drafting method, pixel-aware previews, two concrete rewrites and the truth about Google rewriting.",
  keywords: ["meta description 160 characters", "how to write meta description", "google rewrites meta description", "serp snippet pixel width", "meta description examples"],
  toolSlugs: ["meta-tag-generator", "serp-preview"],
  relatedSlugs: ["title-meta-length-2026", "fix-score-60-to-80", "stale-og-image-fix"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-it-does", text: "What a description does", level: 2 },
    { id: "drafting-formula", text: "Drafting formula", level: 2 },
    { id: "rewrites", text: "Two rewrites", level: 2 },
    { id: "pixels-rewrites", text: "Pixels and Google rewrites", level: 2 },
    { id: "workflow", text: "Draft and review workflow", level: 2 },
    { id: "templates", text: "Descriptions at scale", level: 2 },
  ],
  html,
  faqs: [
    { question: "How long should a meta description be in 2026?", answer: "Aim for roughly 140 to 160 characters as a drafting range, then verify the actual cut in a pixel-aware preview. Desktop results often show about two lines near 920 pixels, while mobile loses the ending sooner. The 160 figure is a guide, not a Google limit, and wide characters consume more width than narrow ones." },
    { question: "Is the meta description a ranking factor?", answer: "Not directly. Keywords in the description do not lift rankings by themselves, and stuffing them makes the pitch worse. The tag can influence click-through when Google chooses to show it, which is why a specific, honest description is still worth writing for every important page." },
    { question: "Why does Google rewrite my description?", answer: "Google may replace the tag with a passage from the page that better matches the query, especially when the description is generic or missing. You cannot opt out. Make the opening paragraph a clear summary, use headings that answer real questions, and accept that some queries will produce a different snippet." },
    { question: "Should I include the keyword in the description?", answer: "Include it only if it reads naturally and matches the searcher's intent. A keyword stuffed into an awkward sentence is worse than a plain description that explains the page. The title usually carries the keyword; the description should carry the reason to click." },
    { question: "Can I reuse one description across many pages?", answer: "No. Duplicate descriptions blur which page is relevant and waste the chance to differentiate. For catalog templates, combine unique fields such as product type, specification, price and offer, then add a fallback for missing values and review a sample for duplicates before publishing." },
    { question: "How do I preview the mobile cut?", answer: "Paste the description into SERP preview with a realistic title and URL, then compare the desktop and mobile views. Read only the first 100 characters and ask whether the reason to click survives. If it does not, move the concrete detail forward instead of adding more text." },
  ],
};
