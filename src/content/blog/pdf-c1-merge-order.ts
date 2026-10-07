import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Thirty-four attachments named “scan_final_FINAL2.pdf”. That visa application taught me what consulates actually want: <strong>one ordered PDF where page 1 is the cover and every chapter follows</strong>. Merging is the highest-leverage PDF skill because every bundle — applications, reports, portfolios — ends as one file. This guide covers ordering, limits, what survives merging, and the encrypted-file wall, with a cover+chapters worked example.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Merge in <a href="/pdf-merge">PDF merge</a>; split ranges in <a href="/pdf-split">PDF split</a>. Pair with <a href="/blog/pdf-merge-guide/jpg-scans-single-pdf">scans to PDF</a> for mixed bundles.</p>

<h2 id="method">Method: select, order, verify, merge</h2>
<ol>
<li><strong>Select up to 20 files</strong> (10MB each) in the <a href="/pdf-merge">PDF merge tool</a>. Rename first if names are chaos — order is easier with sane filenames.</li>
<li><strong>Drag into reading order:</strong> cover first, then chapters, appendix last. The badge does the arithmetic (cover + 12 + 8 = 20 pages) — trust it over memory.</li>
<li><strong>Verify the badge count</strong> against your expectation. A mismatch means a file with unexpected pages (scanned blanks count too).</li>
<li><strong>Merge and download</strong> as <code>book-combined.pdf</code>. Test hyperlinks and the outline on the result before sending.</li>
</ol>

<h2 id="survives">What survives merging (and what flattens)</h2>
<table>
<thead><tr><th>Element</th><th>After merge</th><th>Action</th></tr></thead>
<tbody>
<tr><td><strong>Text layers</strong></td><td>Preserved, searchable</td><td>None needed</td></tr>
<tr><td><strong>Hyperlinks, outlines</strong></td><td>Concatenated in order</td><td>Spot-check first/last</td></tr>
<tr><td><strong>Form fields, signatures</strong></td><td>Flattened to static ink</td><td>Archive editable originals</td></tr>
<tr><td><strong>Annotations</strong></td><td>Mostly flattened</td><td>Keep annotated source</td></tr>
<tr><td><strong>Encryption</strong></td><td>Refuses to merge</td><td>Unlock with owner password first</td></tr>
</tbody>
</table>
<p>Bank statements and exam papers commonly carry owner passwords — remove restrictions in Acrobat or reprint via Microsoft Print to PDF before merging. Brute-forcing violates policy and our terms.</p>

<h2 id="limits">Limits: 20 files, 200 pages, and the split-first escape</h2>
<p>Two hundred pages is the ceiling per run: a 12+8 page booklet flies on phones, while a 20-file archive needs a laptop and patience. Over the ceiling? Split into parts (see <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a>), merge parts, then merge the merged — two passes, same result. Mixed-orientation bundles need the <a href="/blog/pdf-merge-guide/fix-sideways-scans">split-rotate-merge</a> detour instead of a straight merge. Name outputs with content and date (<code>visa-bundle-2026-10.pdf</code>) — future you files by name, not by “final_FINAL”.</p>
<blockquote class="tip">General guidance only. Verify merged pagination by sampling first, middle and final pages — sequence errors caught late cost resubmissions.</blockquote>
`;

export const pdfMergeOrder: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "merge-multiple-pdfs-order",
  kind: "cluster",
  title: "Merge Multiple PDFs in Order (Cover + Chapters)",
  description:
    "Merge PDFs in reading order: drag-to-sort workflow, 20-file/200-page limits, what survives vs flattens + encrypted-file fixes. Free merge tool.",
  keywords: [
    "merge pdfs cover first appendix last order",
    "combine 5 pdfs cover chapter appendix",
    "drag reorder pdf pages",
    "merge 20 pdfs 200 pages limit",
    "merge without losing text layer",
    "How do I merge PDFs in a specific order?",
  ],
  toolSlugs: ["pdf-merge", "pdf-split", "image-to-pdf"],
  relatedSlugs: ["jpg-scans-single-pdf", "extract-pages-range", "compress-pdf-1mb-email"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "method", text: "Select, order, verify, merge", level: 2 },
    { id: "survives", text: "What survives merging", level: 2 },
    { id: "limits", text: "Limits and escape hatches", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I merge PDFs in a specific order?", answer: "Select up to 20 files under 10MB each, rename sanely, then drag rows into reading sequence with cover first and appendix last. Confirm the page-count badge arithmetic like 12+8=20 before merging, since scanned blanks count too. Download as book-combined.pdf and test hyperlinks and outlines afterward." },
    { question: "How many PDFs can I merge at once?", answer: "20 files, 200 pages total, 10MB each per run. A 12+8 page booklet flies on phones, while a 20-file archive needs a laptop. Over the ceiling, split into parts with range extraction, merge parts, then merge the merged files in two passes for the same result." },
    { question: "Do merged PDFs keep clickable links?", answer: "Yes — text layers stay searchable, while hyperlinks and outlines concatenate in order, so spot-check first and last pages. Form fields, signatures and annotations flatten to static ink, so archive editable originals. Bank statements often carry owner passwords that must be unlocked before merging with proper credentials beforehand." },
    { question: "Why won't my PDF merge?", answer: "Usually owner-password encryption, since locked files refuse parsing by design. Unlock with the owner password first, remove restrictions in Acrobat, or reprint via Microsoft Print to PDF. Brute-forcing violates policy and terms, and user passwords alone only open viewing without releasing merge permissions for protected bank workflows reliably." },
    { question: "What should I name the merged file?", answer: "Content plus date, like visa-bundle-2026-10.pdf, so future retrieval works by name rather than final_FINAL chaos. Start from sane filenames before ordering, since sequence errors caught late cost resubmissions. Verify merged pagination by sampling first, middle and final pages after downloading for dependable long-term archiving needs." },
  ],
};
