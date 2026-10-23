import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Markdown is readable as plain text, which makes it easy to publish without checking how a renderer will treat it. A heading needs a space after the hashes. A blank line changes a paragraph break. A link with a relative path may be rejected. The <a href="/markdown-editor">Markdown editor</a> shows a Write tab and a Preview tab, then lets you copy the generated HTML. It is a quick way to catch formatting mistakes before pasting content into a CMS.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. The editor is not a full CommonMark implementation and it is not a split-pane live editor. Knowing the supported subset is more useful than expecting GitHub-flavored Markdown to work everywhere.</p>

<h2 id="supported">What the editor supports</h2>
<p>The parser handles a narrow set of block and inline rules. It extracts fenced code blocks first, escapes the remaining HTML, then converts headings, blockquotes, unordered lists, inline code, links, bold and italic text. Paragraphs are split on blank lines, and single newlines inside a paragraph become line breaks.</p>
<table>
<thead><tr><th>Feature</th><th>Syntax</th><th>Preview result</th></tr></thead>
<tbody>
<tr><td>Headings</td><td><code>#</code> through <code>######</code> plus a space</td><td>h1 through h6</td></tr>
<tr><td>Bold</td><td><code>**text**</code></td><td>strong text</td></tr>
<tr><td>Italic</td><td><code>*text*</code></td><td>emphasized text</td></tr>
<tr><td>Inline code</td><td>backticks around text</td><td>monospace code</td></tr>
<tr><td>Link</td><td><code>[label](https://example.com)</code></td><td>new-tab link</td></tr>
<tr><td>Unordered list</td><td><code>- item</code> or <code>* item</code></td><td>bullet list</td></tr>
<tr><td>Blockquote</td><td><code>&gt; text</code></td><td>indented quote</td></tr>
<tr><td>Code block</td><td>triple backticks around lines</td><td>preformatted block</td></tr>
</tbody>
</table>
<p>Links are restricted to absolute <code>http://</code>, <code>https://</code> and <code>mailto:</code> URLs. A relative path such as <code>/contact</code> becomes <code>#</code> in the generated HTML. That is a safety default, but it also means internal links need to be absolute before they survive this preview. The output adds <code>target="_blank"</code> and <code>rel="noopener noreferrer"</code> to every accepted link.</p>
<p>Raw HTML is escaped. A literal <code>&lt;strong&gt;</code> in the Write tab appears as text, not as bold markup. That is useful when you are documenting HTML, but it also means an embed, iframe or styled callout will not render here. Add those elements in the CMS after the Markdown step.</p>

<h2 id="unsupported">What does not render</h2>
<p>The omissions are the practical source of surprises:</p>
<ul>
<li><strong>Tables.</strong> Pipe characters and separator rows stay as paragraph text. Use a CMS table block or build the table in HTML after export.</li>
<li><strong>Ordered lists.</strong> Lines beginning with <code>1.</code> are not converted into an ordered list. They remain paragraph lines, often separated by line breaks.</li>
<li><strong>Images.</strong> Image syntax is not converted into a figure. It can appear as an exclamation mark followed by a sanitized link, not as an image.</li>
<li><strong>Nested lists.</strong> Indentation is not used to build a hierarchy. Consecutive bullet lines become one flat unordered list.</li>
<li><strong>Task lists, footnotes and strikethrough.</strong> None of these extensions are parsed.</li>
<li><strong>Syntax highlighting.</strong> A language label after the opening fence is kept as the first line of the code block rather than used to color the code.</li>
</ul>
<p>A table is a good test case. Paste a two-column table into the editor and switch to Preview. If the pipes are still visible in a paragraph, the parser did not recognize the table and the CMS will need to handle it. The same applies to an ordered procedure: if the numbers remain plain text, convert the steps to bullets here or rebuild the ordered list in the publishing tool.</p>
<p>Fenced blocks need a closing fence. The parser extracts a complete block only when it finds an opening and closing set of triple backticks. An unclosed fence can produce a confusing mix of code and paragraph text. Close the fence, then check that the language label is acceptable as a first code line or remove it.</p>

<h2 id="workflow">A preview-first publishing workflow</h2>
<ol>
<li>Write or paste the draft in the Write tab.</li>
<li>Add a blank line between paragraphs and keep a space after heading hashes.</li>
<li>Switch to Preview and check headings, bullet structure, links and code blocks.</li>
<li>Open the generated HTML details if you need to confirm the exact tags before copying.</li>
<li>Use Copy HTML, then paste into the CMS in text or code mode rather than visual mode.</li>
<li>Check the published page in the CMS theme, because the editor's preview styles are not exported with the HTML.</li>
</ol>
<p>The tab switch matters. The preview is recalculated when the source changes, but you only see it on the Preview tab. There is no side-by-side view, so keep the draft short enough to compare sections without scrolling far. For a long article, preview one section at a time or paste the final HTML into a local page for a second check.</p>
<p>Copy HTML exports the generated fragment, not a complete document. It does not include the editor's fonts, spacing, dark code background or responsive layout. A CMS may strip tags it does not allow, especially links with target attributes or raw code blocks. That is another reason to inspect the published result instead of trusting the preview alone.</p>

<h2 id="limits">Size, storage and privacy limits</h2>
<p>The editor has a 512,000-character guard labeled as 500 KB. If a paste exceeds it, the page truncates the input and shows a size error. That is large enough for most articles but not for a full documentation export. Split a long document before previewing, or use a desktop editor for the complete file.</p>
<p>Nothing is uploaded or saved by the page. Refreshing clears the draft, and there is no account, history or download button. Copy the HTML or keep the Markdown source somewhere else before closing the tab. The Clear button empties the editor, while Reset example restores the built-in sample.</p>
<p>The safety rules are useful but not a publishing policy. Raw HTML is escaped and unsafe link protocols are rejected, yet the CMS still owns the final sanitization, canonical URLs and accessibility checks. Treat the preview as a formatting check, not as a security review.</p>
<div class="cta-box"><strong>Preview before publishing:</strong> open the <a href="/markdown-editor">Markdown editor</a>, paste the draft, and compare the Write and Preview tabs. Use the <a href="/word-counter">word counter</a> for length and the <a href="/grammar-checker">grammar checker</a> for a final language pass.</div>
`;

export const markdownPreview: BlogPost = {
  pillar: "word-counter-guide",
  slug: "markdown-preview-before-publishing",
  kind: "cluster",
  title: "Markdown Preview: Check Formatting Before Publishing",
  description:
    "Preview Markdown before publishing, see which syntax this editor supports, and catch tables, lists and links that will not survive the export.",
  keywords: ["markdown preview", "markdown editor", "check markdown formatting", "markdown to html", "markdown syntax checker", "publish markdown"],
  toolSlugs: ["markdown-editor"],
  relatedSlugs: ["how-to-count-words-online", "grammar-check-before-publish", "compare-two-texts-word-diff"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "supported", text: "What the editor supports", level: 2 },
    { id: "unsupported", text: "What does not render", level: 2 },
    { id: "workflow", text: "A preview-first workflow", level: 2 },
    { id: "limits", text: "Size, storage and privacy", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the editor show a split-screen preview?", answer: "No. It has separate Write and Preview tabs. The HTML is recalculated as the source changes, but you must switch tabs to see the result." },
    { question: "Does it support Markdown tables?", answer: "No. Pipe tables are not parsed and remain paragraph text. Use a CMS table block or add the table as HTML after copying the rest of the draft." },
    { question: "Can I use relative links?", answer: "No. Only absolute http, https and mailto URLs are accepted. A relative path such as /contact becomes # in the generated HTML, so use a full URL or fix the link in the CMS." },
    { question: "Is the Markdown or HTML saved?", answer: "No. Everything runs in the page with no account or history. Refreshing clears the draft, so copy the HTML or keep the source elsewhere." },
    { question: "Why does my code block show a language name?", answer: "The parser keeps the text after the opening fence as part of the code. It does not use that label for syntax highlighting. Remove the label if you do not want it on the first line." },
  ],
};
