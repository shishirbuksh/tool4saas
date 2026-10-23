import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two titles can use the same number of characters and still behave differently in search: one fits, one ends in an ellipsis. Google allocates <strong>horizontal space in pixels</strong>, not a fixed character allowance, so a title built from narrow letters can run longer than a wide one with the same count. This guide explains how truncation works in 2026, how much room a brand suffix consumes, why Google may replace your title, how Open Graph titles differ, and how to rewrite three common failures.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Check the rendered result in <a href="/serp-preview">SERP preview</a>, generate the head block in <a href="/meta-tag-generator">meta tag generator</a>, and keep promotional links tidy in <a href="/utm-builder">UTM builder</a>.</p>

<h2 id="pixels-vs-characters">Pixels vs characters: why one count fits no title</h2>
<p>A character is a unit of text; a pixel is a unit of rendered width. Search results render your title in a proportional font, so <code>W</code>, <code>M</code>, capital letters and wide punctuation take more room than <code>i</code>, <code>l</code>, hyphens or a space. Ten capital Ws can occupy more width than twenty lowercase i's. That is why two 55-character titles can produce different endings: one shows the full promise, the other loses its last three words behind an ellipsis.</p>
<p>Google truncates at display time. The full text remains in your HTML and may appear in a browser tab, a bookmark or another surface, but the search result gets the clipped version. There is no single character count that guarantees display, and any article that promises one is describing an average, not a rule. Treat character counts as drafting shorthand, then verify the actual rendering in a pixel-aware preview.</p>

<h2 id="working-budgets">Working budgets for desktop and mobile</h2>
<p>The ranges below are practical starting points for mixed-case English text, not guarantees. They assume a typical result layout with a favicon and no long date stamp. Use them to draft, then measure the real string.</p>
<table>
<thead><tr><th>Element</th><th>Desktop working range</th><th>Mobile behavior</th><th>Practical move</th></tr></thead>
<tbody>
<tr><td><strong>Title</strong></td><td>About 540–580px; often mid-50s characters</td><td>Narrower viewport, roughly 40 characters visible</td><td>Front-load the promise and primary keyword</td></tr>
<tr><td><strong>Description</strong></td><td>About 880–920px; often 150–160 characters</td><td>Fewer lines before the cut</td><td>Lead with the benefit, close with the action</td></tr>
<tr><td><strong>Brand suffix</strong></td><td>“ | Tool4SaaS” is 12 characters</td><td>Consumes the same width proportionally</td><td>Reserve room or omit it when space is tight</td></tr>
<tr><td><strong>OG title</strong></td><td>Not a Google SERP limit</td><td>Social apps clamp or wrap differently</td><td>Write for the card, then test the unfurl</td></tr>
</tbody>
</table>
<p>Descriptions are not a direct ranking factor, and Google may replace them with a passage from the page. A well-written description still earns clicks when it is shown, so write it for humans first. The same logic applies to titles: the tag matters, but the page must support the promise.</p>

<h2 id="brand-suffix">The brand suffix: reserve space, do not repeat it</h2>
<p>Many templates append a site name, for example <code> | Tool4SaaS</code>. That suffix is 12 characters, and it consumes width that your core message cannot use. If the template always appends it, draft the core at roughly 40–55 characters and let the suffix complete the line. If the template only appends it when the combined string fits a 30–70 character window, know which branch your page will take before you publish.</p>
<p>Two mistakes waste the same space. The first is starting the title with the brand and ending with the suffix: <em>Tool4SaaS | Invoice Generator | Tool4SaaS</em>. The second is padding a short core with vague words just to reach an imagined minimum. A 34-character title that states the task clearly beats a 62-character title that repeats the category, the year and the brand. Check the final <code>&lt;title&gt;</code> output, not just the field in your CMS.</p>

<h2 id="title-rewrites">Why Google rewrites titles, and the risk you can reduce</h2>
<p>Google treats the title tag as a signal, not a contract. It may generate a different title from the H1, a prominent heading, anchor text pointing at the page, or the opening paragraph when it believes the tag is boilerplate, stuffed with keywords, misleading or poorly matched to the query. Site-name additions and date insertions are part of the same behavior. You cannot opt out, and no character count prevents it.</p>
<p>You can reduce the odds of a bad rewrite by making the page consistent. Use one clear H1 that matches the title's promise, put the primary phrase in the opening paragraph, and avoid stacking superlatives or repeating the same keyword in every clause. A title that reads like navigation (<em>Services | Solutions | Company</em>) gives the system little reason to keep it. A specific, natural title that accurately describes the page gives it less room to improvise.</p>

<h2 id="og-title">OG title vs meta title: different surfaces, different limits</h2>
<p>The meta title is written for search results. The Open Graph title controls the headline on social cards and in chat unfurls. They can be identical, but they do not have to be. A search title might lead with the query phrase, while an OG title can lead with the outcome or the audience. What matters is that both describe the same page; a clever social headline that contradicts the article is a bounce waiting to happen.</p>
<p>Social platforms do not use Google's pixel budget. They apply their own wrapping, clamping and fallback rules, and some show the domain separately. Keep the OG title compact enough to survive a narrow card, put the distinguishing detail early, and preview the actual card before a launch. Generate both tags together in the <a href="/meta-tag-generator">meta tag generator</a>, then compare the search snippet and the social render in <a href="/serp-preview">SERP preview</a>.</p>

<h2 id="rewrite-examples">Three rewrites that recover a clipped promise</h2>
<p>Each example keeps the page's real topic, removes words that do not earn space, and moves supporting detail into the description. Character counts are for the visible core; width still depends on the letters used.</p>
<h3>Example 1: an ecommerce category</h3>
<p><strong>Before:</strong> “Premium Stainless Steel Insulated Water Bottles for Hiking, Camping and Everyday Use | Hydra” (96 characters). The product phrase is buried behind “Premium Stainless Steel”, and the brand repeats at the end.</p>
<p><strong>After:</strong> “Insulated Water Bottles for Hiking and Camping” (49 characters). The category and two use cases survive; “premium”, “stainless steel” and the brand move into the description or the H1.</p>
<h3>Example 2: a SaaS feature page</h3>
<p><strong>Before:</strong> “CRM Software That Helps Your Team Close More Deals Faster in 2026” (68 characters). The year dates the page, “helps your team” adds no search value, and the benefit arrives late.</p>
<p><strong>After:</strong> “CRM Software for Small Sales Teams” (35 characters). The audience is explicit and the category leads. A suffix can complete the title without pushing the useful words out of view.</p>
<h3>Example 3: a how-to article</h3>
<p><strong>Before:</strong> “How to Create an Invoice Online Free in 5 Steps (PDF, No Signup) — Complete Guide for Freelancers” (100 characters). Three promises compete, and “complete guide” repeats the format instead of adding information.</p>
<p><strong>After:</strong> “How to Create an Invoice Online Free (PDF)” (44 characters). One task and one format remain. The five steps, the no-signup detail and the freelancer angle belong in the H1 and description, where they have room.</p>

<h2 id="workflow">Draft, meter, publish, re-check</h2>
<ol>
<li><strong>Draft the core promise first.</strong> Write the title without the brand suffix, then add the suffix only if your template does.</li>
<li><strong>Meter the actual string.</strong> Paste it into <a href="/serp-preview">SERP preview</a> and check desktop and mobile. Adjust words, not just counts.</li>
<li><strong>Generate the head block once.</strong> Use the <a href="/meta-tag-generator">meta tag generator</a> for title, description, canonical and OG tags, then paste it near the top of <code>&lt;head&gt;</code>.</li>
<li><strong>Check consistency.</strong> The H1, title, description and OG title should describe the same page. If they disagree, fix the page before you tune the metadata.</li>
<li><strong>Re-check after changes.</strong> A font swap, a template update or a new suffix can change the rendered width without changing the character count. Re-meter after launches, not once a year.</li>
</ol>
<p>If the page will be promoted in email or paid social, build the campaign URL in <a href="/utm-builder">UTM builder</a> after the title is settled. Clean campaign tags will not fix a clipped headline, but they keep the traffic report readable once clicks arrive; the <a href="/blog/seo-analyzer-guide/utm-naming-governance">UTM naming governance</a> guide sets the convention.</p>
<p>Truncation fixes work best inside a full audit: the <a href="/blog/seo-analyzer-guide/fix-score-60-to-80">60-to-80 score rescue</a> shows where title and description edits fit, and <a href="/blog/seo-analyzer-guide/stale-og-image-fix">stale OG image fixes</a> covers the social card after the search snippet is settled.</p>
<div class="cta-box"><strong>Check your title now:</strong> open <a href="/serp-preview">SERP preview</a> to see the desktop and mobile cut, then generate the final tags in <a href="/meta-tag-generator">meta tag generator</a>. For the full publishing sequence, start with the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>.</div>
`;

export const seoTitleLength: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "title-meta-length-2026",
  kind: "cluster",
  title: "Title and Meta Lengths That Avoid Truncation (2026)",
  description:
    "Title and meta description length in 2026: pixel budgets, SERP truncation, brand suffix, Google rewrites, OG title differences and three fixes.",
  keywords: ["how long should title and meta description be 2026", "55 char 540px safe green", "72 char 660px ellipsis", "mobile clips earlier 40 chars", "google rewrites title why"],
  toolSlugs: ["serp-preview", "meta-tag-generator", "seo-analyzer"],
  relatedSlugs: ["fix-score-60-to-80", "stale-og-image-fix", "utm-naming-governance"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "pixels-vs-characters", text: "Pixels vs characters", level: 2 },
    { id: "working-budgets", text: "Desktop and mobile budgets", level: 2 },
    { id: "brand-suffix", text: "Brand suffix", level: 2 },
    { id: "title-rewrites", text: "Google title rewrites", level: 2 },
    { id: "og-title", text: "OG vs meta title", level: 2 },
    { id: "rewrite-examples", text: "Three rewrite examples", level: 2 },
    { id: "workflow", text: "Draft, meter, re-check", level: 2 },
  ],
  html,
  faqs: [
    { question: "How long should a title tag be in 2026?", answer: "There is no fixed character count that guarantees display. A practical desktop target is roughly 540 to 580 pixels, which often lands in the mid-50s for mixed-case English, while mobile shows closer to 40 characters. Front-load the promise and primary keyword, then measure the actual string in SERP preview because wide letters consume more width than narrow ones." },
    { question: "How long should a meta description be?", answer: "Aim for roughly 150 to 160 characters near 880 to 920 pixels on desktop, then verify the mobile cut. The description is not a direct ranking factor, and Google may replace it with a passage from the page, but a clear benefit followed by an action still earns clicks when it is shown. Generate the tag with the meta tag generator and preview it before publishing." },
    { question: "Does the brand suffix count toward title length?", answer: "Yes. A suffix such as the 12-character pipe-and-brand string uses real width, so the core message has less room. If your template always appends it, draft the core at roughly 40 to 55 characters and let the suffix complete the line. Do not repeat the brand at the start of the title, and check the final title element rather than only the CMS field." },
    { question: "Why did Google change my title in search results?", answer: "Google may generate a title from the H1, a heading, anchor text or the page body when it thinks the tag is boilerplate, keyword-stuffed, misleading or poorly matched to the query. Site names and dates can also be inserted. You cannot opt out, but a specific title that matches a clear H1 and opening paragraph gives the system less reason to rewrite it." },
    { question: "Should the OG title be the same as the SEO title?", answer: "They can match, but they serve different surfaces. The meta title targets search results, while og:title controls social cards and chat unfurls, where platforms apply their own wrapping and clamping. Keep both consistent with the page, lead the OG title with the outcome or audience, and preview the card before launch rather than assuming the search snippet will translate." },
    { question: "How do I fix a truncated title?", answer: "Remove words that do not earn space, front-load the topic and move supporting detail into the description or H1. Do not chase an exact character count, because width depends on the letters used. Meter the revised title on desktop and mobile, then check that the H1, description and OG title still describe the same page. Re-check after font or template changes." },
  ],
};
