import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A 1,000-word essay is often about 3.5 to 4 double-spaced pages. A 1,000-word report is about two single-spaced pages. Both statements are useful, and both are wrong without the formatting assumptions behind them. Page count depends on font, size, line spacing, margins, headings, paragraph spacing and bullet lists. The word count stays fixed; the pages move around it.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Measure the draft in the <a href="/word-counter">word counter</a>, then check the page count in the document or PDF export.</p>

<h2 id="why-vary">Why page counts vary so much</h2>
<p>A page is a physical container. Words are content. Change the container and the same content occupies more or fewer pages. A 12-point font with double spacing and one-inch margins holds far fewer words than an 11-point font with single spacing and narrow margins. Headings, blank lines between paragraphs, tables, images and bullet lists all consume vertical space that could have held text.</p>
<p>This is why “1,000 words equals four pages” is a planning heuristic, not a conversion factor. It describes a common academic manuscript format. It does not describe a business report, a newsletter, a screenplay or a web page. Always state the format when you quote a page count, and always check the actual document before submitting to a page limit.</p>
<p>The ranges also assume continuous body text. A title page, table of contents, figures, tables or appendices can extend a document well beyond the body estimate. Count only the sections the brief includes, and note in your style sheet whether front matter and back matter belong in the page limit.</p>

<h2 id="reference-page">The reference page: 12pt Times New Roman, double-spaced</h2>
<p>The reference format for most page-count advice is a Word document with 12-point Times New Roman, double spacing, one-inch margins and 8.5-by-11-inch Letter paper. In that format, a full page of body text often runs about 250 to 300 words. At that density, 1,000 words is roughly 3.3 to 4 pages before headings, title blocks or a reference list.</p>
<p>Single-spaced 12-point Times New Roman holds about 500 words per page, so 1,000 words is roughly two pages. These are planning ranges, not exact counts. A page with many short paragraphs wastes space at the end of each paragraph; a page with long paragraphs uses more of the width. A heading near the top pushes body text down. A table can replace 200 words with a block that takes half a page.</p>

<h2 id="ranges">Words per page by format</h2>
<p>The table below gives practical ranges for common formats. Use the middle of the range for planning, then verify with the actual template.</p>
<table>
<thead><tr><th>Format</th><th>Planning words per page</th><th>1,000 words is about</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>12pt Times New Roman, double-spaced, 1-inch margins</strong></td><td>250–300</td><td>3.3–4 pages</td><td>The standard academic manuscript range</td></tr>
<tr><td><strong>12pt Times New Roman, single-spaced, 1-inch margins</strong></td><td>About 500</td><td>About 2 pages</td><td>Dense body text with few headings</td></tr>
<tr><td><strong>11pt Calibri, single-spaced, 1-inch margins</strong></td><td>450–550</td><td>1.8–2.2 pages</td><td>Common office report format</td></tr>
<tr><td><strong>12pt Times New Roman, double-spaced, 1.25-inch margins</strong></td><td>220–270</td><td>3.7–4.5 pages</td><td>Wider margins reduce words per page</td></tr>
<tr><td><strong>12pt font, 1.5 spacing, 1-inch margins</strong></td><td>330–400</td><td>2.5–3 pages</td><td>Between single and double spacing</td></tr>
</tbody>
</table>

<h2 id="formatting">Font, spacing, margins and furniture</h2>
<p>Font choice changes density through character width and x-height. Times New Roman is relatively compact; Arial is wider at the same point size, and Calibri sits between the two depending on size. A 12-point Arial page holds fewer words than a 12-point Times New Roman page. Line spacing is the bigger lever: double spacing roughly halves the words per page compared with single spacing. Margins matter next; moving from one-inch to 1.25-inch margins removes roughly 8 percent of the text width.</p>
<p>Headings, paragraph spacing and lists add white space. A document with a heading every 150 words and a blank line between paragraphs will run longer than a wall of body text at the same word count. Tables and images can consume a full page with almost no words. If a page limit is strict, count the pages in the final format, not from a words-per-page average.</p>
<p>Paragraph style is a smaller but real variable. Indented first lines with no blank line between paragraphs pack more text onto a page than block paragraphs separated by a full blank line. Word processors also apply widow and orphan control, which can push a short paragraph to the next page and leave white space behind. Those settings are invisible in a word count, which is why the PDF page count is the final authority.</p>

<h2 id="examples">Two concrete examples</h2>
<h3>Example 1: a double-spaced academic essay</h3>
<p>A 1,000-word essay in 12-point Times New Roman, double-spaced, with one-inch margins and a title block runs about 3.5 to 4 pages. Add a heading and a reference list and the document may reach 4.5 to 5 pages, even though the body still contains 1,000 words. Most academic word limits exclude the reference list, so check the rubric before trimming the argument to fit a page count.</p>
<h3>Example 2: a single-spaced business report</h3>
<p>A 1,000-word report in 11-point Calibri, single-spaced, with headings and bullet lists runs about 2 to 2.5 pages. Switch to 1.15 spacing and the same content may reach 2.5 to 3 pages. Add a title page and a table and it can pass 3 pages. The words did not change; the formatting and furniture did.</p>

<h2 id="planning">Turn page limits into word targets</h2>
<p>Convert page limits to word targets with the range for your format. Five double-spaced pages at 250 to 300 words per page is roughly 1,250 to 1,500 words. Ten pages is roughly 2,500 to 3,000 words. Five single-spaced pages at about 500 words per page is roughly 2,500 words. Treat the result as a target band, then verify in the actual document.</p>
<p>Build a style sheet for recurring formats: font, size, spacing, margins, heading styles and whether the title page or references count. That sheet turns a vague page limit into a repeatable word target. For blog posts, page count matters less than scroll depth and readability; the <a href="/blog/word-counter-guide/ideal-blog-post-length-seo">blog length guide</a> covers intent-based ranges, and the <a href="/word-counter">word counter</a> reports reading time alongside words.</p>
<p>Paper size matters too. A4 is narrower and taller than US Letter, so the same margins and font can produce a different words-per-page count. If you are submitting across borders, confirm the required paper size before you convert a page limit into words. A document that fits four Letter pages may spill onto a fifth A4 page, or the reverse, without a single word changing.</p>

<h2 id="workflow">Check the document in its final format</h2>
<ol>
<li><strong>Set the format first.</strong> Choose font, size, spacing and margins before writing, not after.</li>
<li><strong>Draft to a word target.</strong> Use the range for your format, then paste the draft into the <a href="/word-counter">word counter</a> to confirm the count.</li>
<li><strong>Export to PDF.</strong> Page count in the editor can differ from the printed or submitted version, especially with tables and images.</li>
<li><strong>Check the pages that count.</strong> Confirm whether the title page, references and appendices are included in the limit.</li>
<li><strong>Adjust content or format, not filler.</strong> If the document is short, add evidence or examples. If it is long, cut repetition before shrinking the font.</li>
</ol>
<p>For a broader view of length, the <a href="/blog/word-counter-guide/ideal-blog-post-length-seo">intent-based length guide</a> explains why word counts are heuristics, and <a href="/blog/word-counter-guide/how-to-count-words-online">how to count words online</a> covers the raw metrics. Readability is a separate question; the <a href="/blog/word-counter-guide/flesch-reading-ease-score-explained">Flesch score guide</a> explains why a page that fits can still be hard to read.</p>
<div class="cta-box"><strong>Count the words, then count the pages:</strong> paste the draft into the <a href="/word-counter">word counter</a> for an exact word count, export the document in its final format, and compare the page count. Start with the <a href="/blog/word-counter-guide">word counter guide</a> for the full method.</div>
`;

export const wordPagesPer1000: BlogPost = {
  pillar: "word-counter-guide",
  slug: "pages-per-1000-words",
  kind: "cluster",
  title: "Pages per 1,000 Words: Formatting and Examples",
  description:
    "How many pages 1,000 words takes: 250-300 words per double-spaced page, about 500 single-spaced, with font, margins and paragraph effects.",
  keywords: ["pages per 1000 words", "how many pages is 1000 words", "words per page double spaced", "1000 words single spaced pages", "page count formatting"],
  toolSlugs: ["word-counter"],
  relatedSlugs: ["ideal-blog-post-length-seo", "how-to-count-words-online", "flesch-reading-ease-score-explained"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-vary", text: "Why page counts vary", level: 2 },
    { id: "reference-page", text: "The reference page", level: 2 },
    { id: "ranges", text: "Words per page by format", level: 2 },
    { id: "formatting", text: "Font, spacing and margins", level: 2 },
    { id: "examples", text: "Two examples", level: 2 },
    { id: "planning", text: "Page limits to word targets", level: 2 },
    { id: "workflow", text: "Check the final format", level: 2 },
  ],
  html,
  faqs: [
    { question: "How many pages is 1,000 words?", answer: "About four pages in 12-point Times New Roman, double-spaced, with one-inch margins, where a page often holds 250 to 300 words. Single-spaced, the same 1,000 words is about two pages. Font, size, spacing, margins, headings and paragraphing move the result, so treat these as planning ranges and check the actual document." },
    { question: "How many words are on a double-spaced page?", answer: "A double-spaced page in 12-point Times New Roman with one-inch margins often holds about 250 to 300 words. Wider margins or larger fonts reduce that range; narrower margins or tighter paragraph spacing increase it. A page with headings, tables or images holds fewer words because those elements consume vertical space." },
    { question: "How many pages is 1,000 words single-spaced?", answer: "About two pages in 12-point Times New Roman with one-inch margins, where a full page often holds about 500 words. An 11-point Calibri document may run slightly shorter, while 1.15 spacing or larger headings may push the count toward 2.5 pages. Verify in the final template rather than relying on the average." },
    { question: "Does font choice change the page count?", answer: "Yes. Times New Roman is compact, while Arial and Calibri are wider at the same point size, so a 12-point page holds fewer words in the wider fonts. Line spacing and margins usually change the count more than the typeface alone. If a page limit is strict, set the font and spacing before drafting and check the export." },
    { question: "How do I convert a page limit into a word count?", answer: "Multiply the page limit by the planning range for your format. Five double-spaced pages at 250 to 300 words per page is roughly 1,250 to 1,500 words; ten pages is roughly 2,500 to 3,000. Confirm whether the title page, references and appendices count, then verify the final document in its submitted format." },
    { question: "Why is my 1,000-word document five pages?", answer: "Formatting is the likely cause: double spacing, wide margins, a large font, frequent headings, blank lines between paragraphs or a title page can push 1,000 words past four pages. Tables and images also consume space. Count the pages in the final PDF and check whether the limit includes the title page and references." },
  ],
};
