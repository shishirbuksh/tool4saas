import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A slug is the readable part of a URL that identifies a page: the <code>url-slug-rules</code> in <code>/blog/json-formatter-guide/url-slug-rules</code>. It is not a ranking trick, and it is not a place to repeat every keyword. It is a stable, human-readable address that should still make sense when the campaign, the season or the product name changes. The local <a href="/slug-generator">slug generator</a> handles the mechanical part, but the decisions that matter happen before and after the conversion.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. The tool turns one title per line into one slug per line, using either hyphens or underscores. It does not check whether a slug is already taken, whether it is too long, or whether the page will still exist next year.</p>

<h2 id="what-a-slug-does">What a slug does, and does not do</h2>
<p>A good slug tells a person what the destination contains before they click. It also gives the page a stable identifier that can be shared, linked and printed. Search engines use the words in a URL as a weak relevance signal, but the page title, headings and content do far more work. Repeating a keyword five times in a slug looks spammy and makes the link harder to read.</p>
<p>The most important property is stability. Every change to a published slug breaks inbound links unless you add a redirect. A date in the slug becomes wrong when the article is updated. A campaign name becomes embarrassing when the campaign ends. A product code is stable only while the product exists. Choose the shortest phrase that describes the page's lasting topic, then leave it alone.</p>
<p>Slugs are also case-sensitive on many servers. Lowercase is the convention because it avoids duplicate URLs that differ only by capitalization. A URL ending in <code>/Guide</code> and one ending in <code>/guide</code> may resolve to the same page or may not, depending on the host. Pick lowercase and enforce it in the CMS.</p>

<h2 id="tool-rules">The exact rules used by the generator</h2>
<p>The generator normalizes each line with Unicode NFKD, removes combining marks in the U+0300 to U+036F range, lowercases the result, trims it and replaces every run of characters outside <code>a-z</code> and <code>0-9</code> with the chosen separator. Leading and trailing separators are removed. Empty lines are dropped, and the output keeps one slug per line.</p>
<p>The practical consequences are worth spelling out. Accented Latin letters usually survive as their base letters: <code>Café</code> becomes <code>cafe</code>. Punctuation, apostrophes, ampersands and emoji become separators, not deletions, so <code>Tom &amp; Jerry</code> becomes <code>tom-jerry</code> rather than <code>tomjerry</code>. Consecutive punctuation collapses to one separator. A title written entirely in a non-Latin script may become empty because the tool does not transliterate Cyrillic, Arabic, Devanagari or CJK characters. Those titles need a manual slug.</p>
<p>The generator does not remove stopwords. <code>How to Use the Tool</code> becomes <code>how-to-use-the-tool</code>, including <code>to</code> and <code>the</code>. It does not enforce a maximum length, does not add a date, does not check for duplicates across pages and does not verify that the slug is unique within the current site. Those checks belong in your publishing workflow.</p>
<p>Example: <code>Café déjà vu: 10 Tips &amp; Tricks!</code> becomes <code>cafe-deja-vu-10-tips-tricks</code> with hyphens. With underscores selected, it becomes <code>cafe_deja_vu_10_tips_tricks</code>. Both are valid URL path segments, but hyphens are the common convention for web pages and are treated as word separators by search engines.</p>

<h2 id="seo">SEO choices that the converter cannot make</h2>
<p>Start with the primary topic, not the site name. <code>/blog/url-slug-rules</code> tells the reader more than <code>/blog/tool4saas-post-2026-10-23</code>. Remove filler words only when the result still reads naturally; a slug of three generic words may be shorter but less useful. Put the most specific noun near the front, because it survives when a link is truncated in a chat app or a search result.</p>
<p>Avoid changing slugs after launch. If a change is unavoidable, keep a permanent redirect from the old URL and update internal links. Redirect chains should be one hop, not five. If the page is substantially new content rather than a rename, create a new URL and leave the old page in place with a link to the successor.</p>
<p>Do not stuff synonyms into the slug. Pick the phrase people would use when describing the page, then use the title and body to cover related language. A slug like <code>best-cheap-fast-reliable-tool-online-free</code> reads like an advertisement and dates quickly. A slug like <code>compare-json-formatters</code> describes a durable comparison.</p>
<p>Canonical URLs and language versions add another layer. If the same page exists in several languages, keep the slug in the page's language where possible and use <code>hreflang</code> to connect the versions. If you transliterate a title for a Latin-script URL, do it once and document the mapping so future editors do not produce a second slug for the same page.</p>

<h2 id="unicode">Unicode, accents and non-Latin titles</h2>
<p>Unicode normalization matters because the same visual character can have more than one byte representation. NFKD splits accented letters into a base letter and a combining mark, and the generator then removes the mark. That is why <code>é</code> becomes <code>e</code>. It also means a character that has no canonical decomposition may disappear or become a separator. Always inspect the output for names and brands that use diacritics.</p>
<p>Non-Latin scripts require a decision. You can keep the original script in the URL, percent-encoded by the browser, or transliterate it into Latin characters. Keeping the original is more faithful but produces long, unreadable percent-encoded strings when copied. Transliteration improves readability but can be inconsistent, especially for names. Either way, do not let an automatic converter silently produce an empty slug; check it.</p>
<p>Symbols such as <code>+</code>, <code>&amp;</code> and <code>#</code> have special meanings in URLs. The generator replaces them with separators, which is safer than leaving them raw. A literal <code>#</code> in a path would start a fragment; a literal <code>?</code> would start a query. Replacing them avoids a whole class of broken links.</p>

<h2 id="bulk">Bulk generation without creating a mess</h2>
<p>Paste one working title per line, choose a separator, generate, then treat the output as a draft. Before publishing, check the list for duplicates, empty results, accidental dates and slugs that are too generic. Add a numeric suffix only when two pages genuinely need the same phrase, and make the suffix meaningful if possible.</p>
<p>Keep a small redirect map when migrating an existing site. A spreadsheet with old URL, new URL and status is enough for most teams. After the migration, crawl the site and check that internal links point to the new versions rather than bouncing through redirects. A redirect that works is still slower than a direct link.</p>
<table>
<thead><tr><th>Title</th><th>Generated slug</th><th>Review note</th></tr></thead>
<tbody>
<tr><td><strong>10 Tips for Faster JSON Parsing</strong></td><td>10-tips-for-faster-json-parsing</td><td>Clear and durable</td></tr>
<tr><td><strong>Café déjà vu: 10 Tips &amp; Tricks!</strong></td><td>cafe-deja-vu-10-tips-tricks</td><td>Accents folded, symbols replaced</td></tr>
<tr><td><strong>2026 Q4 Sale</strong></td><td>2026-q4-sale</td><td>Date will age; keep only for a permanent archive</td></tr>
<tr><td><strong>工具使用指南</strong></td><td>empty</td><td>Needs manual transliteration</td></tr>
<tr><td><strong>How to Use the Tool</strong></td><td>how-to-use-the-tool</td><td>Stopwords are not removed</td></tr>
</tbody>
</table>

<h2 id="checklist">Before you publish</h2>
<ol>
<li>Read the slug aloud. If it is awkward to say, it is awkward to share.</li>
<li>Remove dates, campaign names and version numbers unless the page is explicitly archival.</li>
<li>Check for duplicates in the CMS, including drafts and localized versions.</li>
<li>Keep it lowercase and use one separator consistently across the site.</li>
<li>Add a redirect before changing any slug that has already been indexed or shared.</li>
<li>Update internal links so they point to the final URL directly.</li>
</ol>
<div class="cta-box"><strong>Generate a batch now:</strong> paste your titles into the <a href="/slug-generator">slug generator</a>, choose hyphens, then review the list by hand. For the surrounding URL workflow, read <a href="/blog/json-formatter-guide/url-encoding-spaces-symbols">URL encoding</a> and the <a href="/blog/json-formatter-guide">developer toolkit guide</a>.</div>
`;

export const slugGenerator: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "url-slug-rules",
  kind: "cluster",
  title: "URL Slugs: Rules for Readable, Stable Links",
  description:
    "Turn titles into clean URL slugs, understand transliteration and separator choices, and keep links stable after publication.",
  keywords: ["url slug generator", "slug rules seo", "hyphen vs underscore url", "transliterate slug", "stable url slugs"],
  toolSlugs: ["slug-generator"],
  relatedSlugs: ["url-encoding-spaces-symbols", "html-entities-encode-decode", "json-to-csv"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-a-slug-does", text: "What a slug does", level: 2 },
    { id: "tool-rules", text: "The generator's rules", level: 2 },
    { id: "seo", text: "SEO choices", level: 2 },
    { id: "unicode", text: "Unicode and non-Latin titles", level: 2 },
    { id: "bulk", text: "Bulk generation", level: 2 },
    { id: "checklist", text: "Before you publish", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the slug generator remove stopwords?", answer: "No. It keeps words such as to, the and for. You can delete them by hand after generating, but check that the remaining phrase still reads naturally. For short titles, keeping a stopword is often clearer than producing a three-word fragment." },
    { question: "What happens to Chinese or Arabic titles?", answer: "The tool strips characters outside a-z and 0-9, so a title written only in a non-Latin script can produce an empty line. It does not transliterate. Write a Latin-script slug manually or use a transliteration service, then verify the result with a native speaker." },
    { question: "Should I use hyphens or underscores?", answer: "Hyphens are the usual choice for page URLs and are treated as word separators by search engines. Underscores are common in some analytics and file naming conventions. Pick one and keep it consistent; the bigger risk is changing published URLs later." },
    { question: "Can I change a slug after publishing?", answer: "You can, but add a permanent redirect from the old URL and update internal links in the same release. Repeated changes create redirect chains and dilute the value of inbound links. If the content is substantially different, publish a new page instead of renaming the old one." },
    { question: "Does the tool check for duplicate slugs?", answer: "No. It converts each line independently and does not know what already exists on the site. Duplicate detection belongs in the CMS or a pre-publish script. Two pages with the same slug will collide on most static hosts." },
  ],
};
