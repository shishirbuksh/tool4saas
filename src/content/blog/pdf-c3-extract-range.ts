import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A 120-page equipment manual arrives, and the client needs the installation chapter on pages 10 through 20 and the wiring diagram on page 5. Sending the whole manual buries the answer. Screenshots lose vector sharpness and break the text layer. Page-range extraction copies exactly those pages into a new PDF, with the original layout intact.</p>
<p>This is part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Extract in <a href="/pdf-merge">PDF split</a>, rejoin with <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">PDF merge</a>, and fix sideways pages with <a href="/blog/pdf-merge-guide/fix-sideways-scans">split-rotate-merge</a>.</p>

<h2 id="syntax">The range syntax: 1-3,5 and nothing else</h2>
<p>The split view accepts a comma-separated list of single pages and closed ranges. Numbering starts at 1, both ends of a range are included, and spaces around the hyphen are ignored. That is the whole grammar. There is no open-ended range such as <code>10-</code>, no <code>first</code> or <code>last</code> keyword, no step or every-Nth operator, and no exclusion syntax such as <code>!5</code>.</p>
<table>
<thead><tr><th>You type</th><th>Pages extracted</th><th>Typical use</th></tr></thead>
<tbody>
<tr><td><strong>5</strong></td><td>Page 5 only</td><td>A single diagram, cover or signature page</td></tr>
<tr><td><strong>1-3,5</strong></td><td>1, 2, 3 and 5 (4 pages)</td><td>Front matter and one key page</td></tr>
<tr><td><strong>10-20</strong></td><td>10 through 20 (11 pages)</td><td>A chapter with an inclusive end</td></tr>
<tr><td><strong>1-3,5,8-10</strong></td><td>1, 2, 3, 5, 8, 9 and 10 (7 pages)</td><td>A non-contiguous exhibit set</td></tr>
</tbody>
</table>
<p>The validation is simple and strict. The tool reads the file's actual page count, rejects a reversed range like <code>5-3</code>, and rejects any page outside the file. There is no live count badge while you type; the success message after the run reports how many pages were copied. The output is always named <code>name-split.pdf</code>, so rename it before the next run gives you another identically named download. Duplicates are accepted, but <code>5,5</code> copies page 5 twice and is almost always a typo.</p>

<h2 id="numbering">Physical pages, printed pages and roman numerals</h2>
<p>Range numbers refer to the PDF's physical page order, not the number printed in the footer. The first sheet is page 1 even if the cover is unnumbered, and a four-page front matter section written in roman numerals still counts as pages 1 through 4. If the footer on a body page says 14, but the file has four front-matter sheets, that page may be physical page 18. Use the viewer's page indicator or count thumbnails; do not trust the printed folio.</p>
<p>PDF page labels are a separate layer. A file can display i, ii, iii, then 1, 2, 3 while the underlying pages remain 1, 2, 3, 4, 5, 6. The split view works on the underlying sequence. This trips up legal and academic files more than any other kind, because the printed citation and the physical sheet often diverge by several pages.</p>
<p>Extract one test page before running a long list. Type <code>1</code>, split, and compare the output with the cover. Then type the page before and after a chapter boundary to confirm where the chapter actually starts. Two minutes of checking prevents a 20-page exhibit set with the wrong first page.</p>

<h2 id="worked-examples">Two worked examples</h2>
<p><strong>Example 1: the installation chapter and one diagram.</strong> The manual has 120 pages. The client asks for pages 10-20 and the wiring diagram on page 5. Enter <code>5,10-20</code> and press Split. The tool copies 12 pages: page 5, then pages 10 through 20 inclusive. The download is <code>manual-split.pdf</code>; rename it <code>manual-install-5-10-20.pdf</code>. When you quote the chapter, cite the manual's printed page numbers, not the extract's page 2. If the client needs to navigate the extract, add a one-line cover note mapping printed page 14 to extract page 3.</p>
<p><strong>Example 2: invoice quarantine.</strong> A 64-page scanned bundle contains invoices on pages 12-14, 27 and 41-42. Enter <code>12-14,27,41-42</code> and split. The result is six pages, downloaded as <code>bundle-split.pdf</code> and renamed <code>invoices-q3-12-14-27-41-42.pdf</code>. Send that file to accounting; keep the 64-page original untouched. This is a convenience extraction, not redaction: the other 58 pages still exist in the source, and any sensitive text inside the six retained pages is still there.</p>
<p><strong>Example 3, in brief: an exhibit set.</strong> A contract has three signature pages, one schedule and two appendices. If they sit at pages 1-3, 5 and 8-10, type <code>1-3,5,8-10</code>. The extract has seven pages, and the success message confirms the count. Name it by exhibit letter, not by the range, so the recipient can match it to the index.</p>

<h2 id="patterns">Four useful patterns</h2>
<ul>
<li><strong>Chapter pulls:</strong> extract a contiguous range such as <code>10-20</code> for a course pack or review packet. Keep the original pagination in citations; the extract's page numbers are not the source's page numbers.</li>
<li><strong>Invoice and record quarantine:</strong> pull only the pages an accounts team needs, forward the extract and archive the full bundle. Extract first, then send, so the recipient never receives the unrelated pages.</li>
<li><strong>Exhibit bundles:</strong> combine non-contiguous pages with commas. Name the output by exhibit or topic. The tool does not add Bates numbers, exhibit stickers or headers; add those before extraction or in a separate document tool.</li>
<li><strong>Review packets:</strong> select the pages a reviewer actually needs. A smaller packet is easier to annotate, but extraction is not a security boundary; hidden text or content inside the retained pages remains.</li>
</ul>
<p>There is no every-Nth mode, despite what some range-splitting guides imply. To sample every fifth page of a 100-page report, list the pages manually as <code>5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100</code>. For a long report, build that list in a spreadsheet and paste it into the field. The grammar stays the same; only the list gets longer.</p>

<h2 id="round-trip">Split is half of a round trip</h2>
<p>Extraction and merging are one workflow. Split carves out the pages worth isolating; merge puts the pieces back in reading order. The merge view accepts up to 20 files, 200 pages total and 10MB per file, and it appends files in the order you add them. There is no drag reorder, so rename the parts <code>01-front.pdf</code>, <code>02-fixed.pdf</code> and <code>03-rest.pdf</code> before adding them, then confirm the page count before you merge.</p>
<p>The classic repair is a mixed-orientation bundle. Split out pages 5-8, rotate that four-page file upright, then merge pages 1-4, the fixed segment and pages 9 to the end. Another is a chapter pull that needs a missing diagram: split the chapter and the diagram separately, then merge them in the order the reader expects. The round trip keeps page size and rotation, so a landscape chart stays landscape.</p>
<p>Quality is preserved because pages are copied rather than re-rendered. Text stays selectable, vectors stay sharp and embedded images keep their original pixels. Interactive form fields and some annotations are the exception; check them before filing. Extraction is also not compression: a seven-page extract from a 120-page manual can still be several megabytes because each page carries its own fonts and images. And it is not redaction. Removing a page does not scrub the retained pages or the source file.</p>

<h2 id="limits">Limits, encryption and file size</h2>
<p>The split view accepts one PDF up to 10MB and checks ranges against that file's real page count. The 200-page ceiling belongs to the merge view, which also caps the number of files at 20 and each file at 10MB. A large manual may need to be rejoined in batches of 200 pages or fewer, and the split view itself only enforces the 10MB file limit.</p>
<p>Encrypted PDFs must be unlocked before splitting; the PDF engine cannot parse a locked document. Scanned pages keep their image-only nature, which is fine for extraction but means the output has no searchable text. If the source is a pile of phone photos, assemble it first with the <a href="/blog/pdf-merge-guide/jpg-scans-single-pdf">JPG scans to PDF guide</a>, then split the result. If the source PDF is over 10MB, the browser split view rejects it; reduce or divide the file in a desktop PDF tool first, then bring the parts back here. Keep the original archived, because the extract is a derivative and the source is the record.</p>
<div class="cta-box"><strong>Your turn:</strong> open <a href="/pdf-merge">PDF Merge &amp; Organizer</a>, choose Split, load one PDF and try <code>1-3,5</code> on a copy. Check the success count, rename the download, then send only the pages the recipient needs. The <a href="/blog/pdf-merge-guide">full PDF workflow guide</a> covers merging, rotation and compression next.</div>
<blockquote class="tip">General guidance only. For court or compliance filings, confirm that extracted sets carry the required headers, footers and Bates numbering before submitting.</blockquote>
`;

export const pdfExtractRange: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "extract-pages-range",
  kind: "cluster",
  title: "Extract PDF Pages by Range: 1-3,5 Syntax Guide",
  description:
    "Extract PDF pages with 1-3,5 syntax: inclusive ranges, physical page numbers, chapter and invoice examples, split-merge round trips and file limits.",
  keywords: ["extract pages from pdf by range", "split pdf 1-3 5 meaning", "extract chapter pages pdf", "pdf split merge workflow", "pdf page range syntax"],
  toolSlugs: ["pdf-merge"],
  relatedSlugs: ["merge-multiple-pdfs-order", "jpg-scans-single-pdf", "fix-sideways-scans"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "syntax", text: "Range syntax", level: 2 },
    { id: "numbering", text: "Physical vs printed pages", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "patterns", text: "Useful patterns", level: 2 },
    { id: "round-trip", text: "Split-merge round trip", level: 2 },
    { id: "limits", text: "Limits and encryption", level: 2 },
  ],
  html,
  faqs: [
    { question: "What does 1-3,5 mean in PDF splitting?", answer: "It extracts pages 1, 2, 3 and 5: four pages in total. Numbering starts at 1, both ends of a range are included, and commas separate each part. Type 5,10-20 to get page 5 and the eleven-page chapter from 10 through 20. Reversed ranges like 5-3 and pages outside the file are rejected." },
    { question: "Can I extract non-contiguous pages?", answer: "Yes. Use commas between single pages and ranges, for example 12-14,27,41-42 for six invoice pages. Each part is validated against the file's real page count before anything is copied. The output arrives as name-split.pdf, so rename it by topic or exhibit letter before the next run." },
    { question: "Is there an every-Nth page option?", answer: "No. The split view supports single pages and closed ranges only. To sample every fifth page, type the list manually as 5,10,15 and so on, or build the list in a spreadsheet and paste it into the range field. There is no step operator, no open-ended range and no exclusion syntax." },
    { question: "Do extracted pages lose quality?", answer: "No. Pages are copied rather than re-rendered, so text stays selectable, vector art stays sharp and images keep their original pixels. Interactive form fields and some annotations may not survive the copy, so check those before filing. The extract can still be several megabytes because each page carries its own fonts and images." },
    { question: "How do I put the extracted pages back together?", answer: "Use PDF merge and add the parts in reading order. The merge view appends files in the order you add them and has no drag reorder, so rename them 01, 02 and 03 first. It accepts up to 20 files, 200 pages total and 10MB per file; confirm the page count before merging." },
    { question: "What is the file size limit for splitting?", answer: "The split view accepts one PDF up to 10MB, and ranges are checked against that file's actual page count. The 200-page ceiling belongs to the merge view, which also caps the number of files at 20 and each file at 10MB. Encrypted PDFs must be unlocked before either view can parse them." },
  ],
};
