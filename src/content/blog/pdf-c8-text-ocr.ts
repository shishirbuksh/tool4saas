import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“Extract text,” I told the tool, pointing at a 10-page flat scan. It returned ten blank pages with polite per-page flags. Correct behavior — and the moment I finally internalized the distinction that saves hours: <strong>selectable text extracts; scanned images need OCR</strong>. They look identical on screen and behave oppositely under extraction. This guide teaches telling them apart in seconds, extracting with page ranges, and knowing exactly when to reach for OCR software instead.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Extract in <a href="/pdf-to-text">PDF to text</a>; split large sets first in <a href="/pdf-split">PDF split</a>. Scans to PDF background in <a href="/blog/pdf-merge-guide/jpg-scans-single-pdf">scans guide</a>.</p>

<h2 id="layer-vs-scan">Selectable layer vs scanned image (the 5-second test)</h2>
<table>
<thead><tr><th>Test</th><th>Digital (extractable)</th><th>Scanned (needs OCR)</th></tr></thead>
<tbody>
<tr><td><strong>Drag-select text</strong></td><td>Selects cleanly</td><td>Selects nothing / whole page</td></tr>
<tr><td><strong>Zoom to 400%</strong></td><td>Edges stay sharp</td><td>Pixels blur</td></tr>
<tr><td><strong>Search (Ctrl+F)</strong></td><td>Finds words</td><td>Finds nothing</td></tr>
<tr><td><strong>File size per page</strong></td><td>Kilobytes</td><td>Hundreds of KB+</td></tr>
</tbody>
</table>
<p>Run the drag-select test first — five seconds that prevent ten minutes of confused re-extraction. Hybrid documents mix both types unpredictably; review per-page flags instead of assuming uniformity.</p>

<h2 id="ranges">Extract with ranges: <code>1-3,5</code> chapters to <code>.txt</code></h2>
<p>Same range grammar as splitting: type <code>1-3,5</code> to pull an introduction, or leave blank for all pages (cap 200). Output arrives as a plain-text preview with <code>--- Page N ---</code> separators — empty pages flagged <code>(no extractable text)</code> rather than silently skipped, so you know exactly which sheets need OCR. Copy to clipboard for Word/Notes, or download <code>chapter.txt</code>. Academic hygiene: retain original pagination, author and range when quoting (“pp. 10–20 of the manual”), archive source PDFs beside notes.</p>

<h2 id="when-ocr">When you actually need OCR (and preprocessing that helps)</h2>
<ul>
<li><strong>Image-only scans:</strong> dedicated OCR software (desktop or service) — extraction tools correctly return empty here by design.</li>
<li><strong>Before OCR:</strong> unlock secured files, split 300-page bundles into smaller chunks, straighten skewed scans — recognition accuracy tracks input quality linearly.</li>
<li><strong>After OCR:</strong> proofread proper nouns and numbers (OCR confuses 0/O, 1/l, 5/S); searchable PDFs from good OCR then extract normally.</li>
<li><strong>Handwriting:</strong> specialized engines only; general OCR fails on cursive — budget human transcription for critical passages.</li>
</ul>
<p>Preprocessing checklist for the 120-page manual: split <code>1-3,5</code> plus <code>10-20</code> test batches through extraction first (free, instant) to map which pages are digital vs scanned — then OCR only the scanned subset instead of paying for all 120.</p>
<blockquote class="tip">General guidance only. Cite extracted passages with original pagination — copy-paste without attribution is still plagiarism with extra steps.</blockquote>
`;

export const pdfTextOcr: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "extract-text-without-ocr",
  kind: "cluster",
  title: "Extract Text From PDF Without OCR (When It Works)",
  description:
    "PDF text extraction: 5-second layer-vs-scan test, range syntax, empty-page flags + when OCR is actually needed. Free local extractor.",
  keywords: [
    "how to extract text from pdf without ocr",
    "pdf to txt 1-3 5 chapter",
    "scanned pdf blank output why",
    "pdf.js text layer",
    "ocr vs text extraction",
    "Why is my extracted PDF text blank?",
  ],
  toolSlugs: ["pdf-to-text", "pdf-split", "image-to-pdf"],
  relatedSlugs: ["extract-pages-range", "jpg-scans-single-pdf", "pdf-pages-high-quality-jpg"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "layer-vs-scan", text: "Layer vs scan test", level: 2 },
    { id: "ranges", text: "Ranges to .txt", level: 2 },
    { id: "when-ocr", text: "When OCR is needed", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why is my extracted PDF text blank?", answer: "Scanned pages are flat images with no text layer, so extraction correctly returns empty with per-page flags rather than failing. Those pages need dedicated OCR software, not extraction. Run the five-second drag-select test first, then OCR only the scanned subset instead of paying for all 120 manual pages." },
    { question: "How do I tell digital from scanned PDF?", answer: "Drag-select, 400% zoom, Ctrl+F, or size-per-page reveals it. Selectable plus sharp plus searchable plus small means digital and extractable, while whole-page selection, pixel blur and hundreds of KB per page mean scanned. Hybrid documents mix both types, so review per-page flags rather than assuming uniformity." },
    { question: "Can I extract specific pages only?", answer: "Yes — ranges like 1-3,5 pull chapters while blank means all pages up to the 200-page cap. Output arrives as plain-text preview with Page N separators, while empty pages flag no extractable text rather than skipping. Copy to clipboard for Word or download chapter.txt, retaining original pagination for quotes." },
    { question: "When do I need OCR instead?", answer: "For image-only scans, handwriting with specialized engines, or secured files after unlocking. Preprocess first by straightening skew, splitting 300-page bundles and unlocking — accuracy tracks input quality linearly. After OCR, proofread proper nouns and numbers since OCR confuses 0/O, 1/l and 5/S characters before searching across long reports." },
    { question: "How should I cite extracted text?", answer: "Keep original pagination, author and range like pp.10–20 of the manual rather than extract numbering. Archive source PDFs beside notes for verification trails, since copy-paste without attribution remains plagiarism. Retain Page N separators when copying chapters to preserve reference context for readers across academic and compliance filings." },
  ],
};
