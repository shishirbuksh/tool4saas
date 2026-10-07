import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Q3 report: “Email” revenue tripled overnight. Nobody sent anything. The cause: one campaign tagged <code>Email</code>, another <code>email</code>, a third <code>e-mail</code> — analytics treats all three as different channels, and leadership celebrated a phantom. <strong>UTM naming is governance, not typing</strong>: lowercase-hyphen conventions, a fixed dictionary, and a builder that enforces both. This guide gives the naming system that keeps reports unified, plus the edge cases (existing queries, 2000-char clips, term/content discipline) that corrupt data silently.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Build disciplined links in the <a href="/utm-builder">UTM builder</a>; preview landing pages in <a href="/serp-preview">SERP preview</a>.</p>

<h2 id="dictionary">The naming dictionary (lowercase-hyphen, fixed values)</h2>
<table>
<thead><tr><th>Parameter</th><th>Convention</th><th>Example</th><th>Never</th></tr></thead>
<tbody>
<tr><td><strong>source</strong></td><td>Platform, lowercase</td><td><code>newsletter</code></td><td><code>Newsletter</code>, <code>news-letter</code> variants</td></tr>
<tr><td><strong>medium</strong></td><td>Channel class</td><td><code>email</code></td><td><code>Email</code>, <code>e-mail</code></td></tr>
<tr><td><strong>campaign</strong></td><td>Slug + season</td><td><code>spring-sale</code></td><td><code>SpringSale2026!!</code></td></tr>
<tr><td><strong>term</strong></td><td>Paid keyword verbatim</td><td><code>running-shoes</code></td><td>Free-text essays</td></tr>
<tr><td><strong>content</strong></td><td>Element variant</td><td><code>header-button</code></td><td><code>final-v2-REAL</code></td></tr>
</tbody>
</table>
<p>Publish the dictionary where link-creators actually work (the builder presets it); review quarterly for drift. New values require a proposal, not improvisation — every novel string is a future cleanup ticket.</p>

<h2 id="mechanics">Mechanics: encoding, existing queries, length</h2>
<ul>
<li><strong>Auto-encoding:</strong> spaces become <code>%20</code>, symbols percent-encoded — the <a href="/utm-builder">builder</a> handles it; hand-rolled links in docs usually don't (audit them).</li>
<li><strong>Existing query strings:</strong> landing pages with <code>?id=7</code> take UTMs with <code>&amp;</code>, not a second <code>?</code> — the classic broken-link pattern in CMS templates.</li>
<li><strong>2000-char ceiling:</strong> long UTM stacks plus long slugs clip in emails and chats. Keep values terse; total URLs short.</li>
<li><strong>Internal links:</strong> never UTM tag on-site navigation — it rewrites session attribution and pollutes the very reports UTMs serve.</li>
</ul>

<h2 id="audit">Audit: find splits, freeze dictionary, backfill nothing</h2>
<p>Quarterly, pull channel reports grouped by source/medium and eyeball near-duplicates (<code>email/Email/e-mail</code>, <code>social/Social/social-media</code>). Merge forward via dictionary (filters/views can relabel history in most platforms; never rewrite raw collected data). The <code>Email vs email unassigned</code> bucket in GA4 is the tell — its size measures governance debt directly. Backfill sparingly: annotate the fix date and let clean data accumulate rather than fabricating history.</p>
<blockquote class="tip">General guidance only. Attribution models differ per platform — consistent naming is the precondition every model needs.</blockquote>
`;

export const seoUtmNaming: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "utm-naming-governance",
  kind: "cluster",
  title: "Name UTM Campaigns Without Splitting Reports",
  description:
    "UTM naming governance: lowercase-hyphen dictionary, encoding/query/length mechanics + split-audit routine. Free enforcing builder.",
  keywords: [
    "how to name utm campaigns without splitting reports",
    "source newsletter medium email campaign spring-sale",
    "term running-shoes content header-button",
    "Email vs email unassigned",
    "2000 char clip",
    "Why is my email revenue split in reports?",
  ],
  toolSlugs: ["utm-builder", "serp-preview", "meta-tag-generator"],
  relatedSlugs: ["title-meta-length-2026", "stale-og-image-fix", "split-large-sitemap"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "dictionary", text: "Naming dictionary", level: 2 },
    { id: "mechanics", text: "Mechanics", level: 2 },
    { id: "audit", text: "Split audit", level: 2 },
  ],
  html,
  faqs: [
    { question: "How should I name UTM parameters?", answer: "Use a lowercase-hyphen fixed dictionary with source as platform like newsletter, medium as channel class like email, campaign as slug plus season like spring-sale, term as paid keyword like running-shoes, and content as variant like header-button. Publish the dictionary in builder presets, review quarterly for drift, and require proposals for new values rather than improvisation." },
    { question: "Why is my email revenue split in reports?", answer: "Case and format variants like Email versus email versus e-mail count as different channels, so leadership celebrated phantom tripled revenue when nothing was sent. Standardize to lowercase dictionary values and merge forward with filters or views that relabel history. Check the GA4 unassigned bucket size quarterly, since its size directly measures governance debt." },
    { question: "Should internal links have UTMs?", answer: "No, never tag on-site navigation because UTMs rewrite session attribution and pollute the very reports they serve. Internal links should rely on clean URLs and analytics defaults, reserving UTMs for external inbound only. Audit CMS templates for hand-rolled links that add UTMs internally and remove them to keep channel reports unified." },
    { question: "What breaks long UTM URLs?", answer: "Long UTM stacks plus long slugs clip at about 2000 characters in emails and chats, so keep values terse and URLs short. Landing pages with existing queries like question id equals 7 must append UTMs with ampersand, not a question mark, or links break. Hand-rolled links skip encoding, so build in the UTM builder." },
    { question: "Can I fix historical splits?", answer: "Relabel history going forward with filters or views that merge near-duplicates like social variants, but never rewrite raw collected data. Pull channel reports grouped by source and medium quarterly to eyeball splits, freeze the dictionary, and annotate the fix date. Backfill sparingly and let clean data accumulate rather than fabricating history." },
  ],
};
