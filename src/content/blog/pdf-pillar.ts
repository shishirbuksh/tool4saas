import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A visa agent once emailed a 34-file application — scans, forms and bank statements — as 34 separate attachments named “scan_final_FINAL2.pdf”. The consulate wanted one ordered PDF. Merging took a few minutes; naming discipline would have saved an hour. That afternoon shaped how I think about <strong>PDF workflow</strong>: merge, split, rotate, watermark and convert in one local pipeline, with the limits known before a deadline finds them.</p>
<p>This guide covers the seven operations the free tools actually perform, with the real ceilings: 20 files per merge, 200 pages total, 10MB per file, 100MB combined. Nothing uploads; the processing runs in your browser after the page loads. Work alongside me starting at the <a href="/pdf-merge">free PDF merge and organizer</a>.</p>
<p>Part of the <a href="/blog">blog guides</a>. Merge, split, rotate and watermark in <a href="/pdf-merge">PDF merge</a>; scans to PDF in <a href="/image-to-pdf">image to PDF</a>; pages to images in <a href="/pdf-to-jpg">PDF to JPG</a>; text in <a href="/pdf-to-text">PDF to text</a>. A browser compressor is not available yet — the <a href="/pdf-compress">PDF file checker</a> only inspects a file, and the honest alternatives are covered below.</p>

<h2 id="toolbox">The 7 working operations (and what they really do)</h2>
<table>
<thead><tr><th>Job</th><th>Tool</th><th>Limits that matter</th></tr></thead>
<tbody>
<tr><td><strong>Join PDFs in order</strong></td><td><a href="/pdf-merge">PDF merge</a></td><td>2–20 files, 200 pages total, 10MB each, 100MB combined</td></tr>
<tr><td><strong>Extract page ranges</strong></td><td><a href="/pdf-merge">PDF split</a></td><td>1 PDF, 10MB, <code>1-3,5</code> syntax, no every-Nth mode</td></tr>
<tr><td><strong>Fix orientation</strong></td><td><a href="/pdf-merge">PDF rotate</a></td><td>1 PDF, 10MB, 90/180/270 applied to every page</td></tr>
<tr><td><strong>Stamp drafts</strong></td><td><a href="/pdf-merge">PDF watermark</a></td><td>1 PDF, 10MB, text up to 100 characters, all pages</td></tr>
<tr><td><strong>Scans → one PDF</strong></td><td><a href="/image-to-pdf">Image to PDF</a></td><td>20 images, 10MB each, 30MB total, A4/Letter</td></tr>
<tr><td><strong>Pages → images</strong></td><td><a href="/pdf-to-jpg">PDF to JPG</a></td><td>1 PDF, 10MB, 1x–3x scale, one JPG per page</td></tr>
<tr><td><strong>Text extraction</strong></td><td><a href="/pdf-to-text">PDF to text</a></td><td>1 PDF, 10MB, 200 pages, selectable text only (no OCR)</td></tr>
</tbody>
</table>
<p>Everything above runs on pdf-lib and pdf.js in the browser. Load a tool page once, and a repeat job still runs if the connection drops; reloading fetches the engine again. Compare that with cloud tools that cap free use and keep your uploads: for visa bundles, bank statements and contracts, local-first matters. Each section below links its deep tutorial.</p>

<h2 id="merge-order">Merge in order: cover + chapters → one file</h2>
<p>The classic job: cover.pdf, chapter1.pdf (12 pages) and chapter2.pdf (8 pages) become one 20-page book. Select up to 20 files, each under 10MB, then merge. The order is the order you added the files; there is no drag-to-reorder, so add them in reading order or remove and re-add. The list numbers each file, which makes checking easier than a page-count badge would. The run is blocked only when the combined total would pass 200 pages or 100MB, or when a file fails the <code>%PDF-</code> magic-byte check.</p>
<p>What carries over: the page content itself, copied page by page. What does not: document-level bookmarks and outlines, interactive form behavior and digital signatures are not guaranteed to survive. Treat the merged file as a new document and verify anything that depends on interactivity. Encrypted files are loaded with encryption ignored, so they may parse but produce blank or unreadable pages; remove the restrictions in a desktop tool first and re-save before merging. Walkthrough: <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">merge in order</a>.</p>

<h2 id="scans-to-pdf">JPG scans → single PDF</h2>
<p>Phone scans arrive as loose JPGs. Select up to 20 images, each under 10MB, with 30MB combined. JPG and PNG are the reliable formats; WebP and GIF usually work because the browser can decode them; SVG is unreliable and should be exported to PNG first. HEIC files often fail to decode in the browser, so convert them to JPG or PNG before starting. Choose A4 or Letter at portrait or landscape orientation, then add the images in order. Each page is placed with a 10mm margin, and there is no drag reorder — set the order as you add files.</p>
<p>The result is an image-only PDF. There is no OCR and no text layer, so the output cannot be searched or selected until you run OCR software separately. Keep names like scan-01.jpg so the order stays obvious. Guide: <a href="/blog/pdf-merge-guide/jpg-scans-single-pdf">scans to PDF</a>. If the scans are oversized, compress the source images first with <a href="/blog/image-compressor-guide/compress-jpg-100kb-portal">image compression</a>.</p>

<h2 id="split-ranges">Extract pages by range without fear</h2>
<p>The syntax <code>1-3,5</code> means pages 1, 2, 3 and 5. Ranges are inclusive, comma-separated and numbered from 1. Validation happens when you click Split, not while you type, so a reversed interval like <code>5-3</code> or an out-of-bounds page produces an error naming the problem then. There is no every-Nth or periodic sampling mode, and no live count of how many pages you selected. From a 120-page manual, <code>1-3,5,8-10</code> produces a seven-page PDF named <code>manual-split.pdf</code>.</p>
<p>The tool takes one PDF under 10MB and has no separate 200-page ceiling here; the range is checked against the file’s actual page count. Encrypted files are not supported, and the output is a single extracted document rather than one file per range. Tutorial: <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a>. Remember the workflow pair: split singles out, merge puts back — <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">merging</a> is splitting in reverse.</p>

<h2 id="pages-to-images">Pages → JPG for slides and uploaders</h2>
<p>Legacy uploaders that reject PDFs accept images, so render each page to a JPG. The scale runs from 1x to 3x, and quality from 10 to 100 percent; around 85 percent is a sensible default. One JPG downloads per page, named from the PDF, so a six-page file yields <code>name-p1.jpg</code> through <code>name-p6.jpg</code>. There is no ZIP bundle and no PNG option, and each page is capped at 8192 pixels per side and 16 megapixels, which a very large page at 3x can exceed.</p>
<p>Raising quality cannot recover detail a low scale never rendered, so choose the scale first and tune quality second. Transparent areas flatten onto white, and dark-mode sources should be checked after export. For a long document, split it first with <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a> and convert each part separately. Guide: <a href="/blog/pdf-merge-guide/pdf-pages-high-quality-jpg">PDF to JPG</a>.</p>

<h2 id="text-vs-ocr">Text extraction vs OCR: know which you have</h2>
<p>Born-digital PDFs embed selectable glyphs, so extraction is instant and exact. Scanned pages are flat pictures with no text layer: extraction returns page markers with no words, and pages that produced nothing are flagged instead of failing silently. That is not a bug. OCR (optical character recognition) is a different technology and is not part of this tool — use dedicated OCR software for scans, then bring the result back into the PDF workflow.</p>
<p>On a digital file you can extract all pages or a range such as <code>1-3,5</code>, up to 200 pages and 10MB, then copy the text or download a <code>.txt</code> file. Page markers keep the output navigable. Method: <a href="/blog/pdf-merge-guide/extract-text-without-ocr">text without OCR</a>.</p>

<h2 id="rotate-mixed">Fix sideways scans (split-rotate-merge for mixed bundles)</h2>
<p>Flatbeds produce sideways pages, and phone scans inherit orientation flags. The rotate tool takes one PDF and applies 90, 180 or 270 degrees clockwise to every page, setting an absolute rotation rather than adding to the existing one. If every page is wrong, one run fixes the file and saves it as <code>name-rotated-90.pdf</code>. If only pages 5–8 are sideways, split out that range first, rotate the segment, then merge everything back in order.</p>
<p>Preview the first thumbnail before committing, because a second pass rewrites the rotation instead of stacking it and can land back where you started. Fixes: <a href="/blog/pdf-merge-guide/fix-sideways-scans">sideways scan repair</a>.</p>

<h2 id="watermark-draft">Watermark DRAFT without ruining readability</h2>
<p>The watermark tool takes one PDF and stamps every page with text up to 100 characters. The default is a 48pt Helvetica-Bold stamp in gray at 30 percent opacity, positioned diagonally at the center and rotated 45 degrees. Five other presets are available: center, top-left, top-right, bottom-left and bottom-right. The opacity slider runs from 0.05 to 1, so you can go lighter than the default or heavy enough to be hard to ignore.</p>
<p>There is no page-range option — the stamp lands on every page. If only some pages need it, split them out first, watermark that segment and merge back. Underlying text stays selectable because the stamp is drawn on top as a separate layer. Use DRAFT, CONFIDENTIAL, SAMPLE or DO NOT COPY per audience, and archive unwatermarked masters. Stamping: <a href="/blog/pdf-merge-guide/add-draft-watermark">watermark guide</a>.</p>

<h2 id="reduce-size">Reducing file size without a browser compressor</h2>
<p>This site does not yet have a working browser compressor. The route at <a href="/pdf-compress">pdf-compress</a> is a <strong>PDF file checker</strong>: it confirms the <code>%PDF-</code> header, enforces the 10MB limit and reports the page count and file size. It does not rewrite, downsample or shrink anything, and it says so on the page. A guide promising compression levels would be fiction until that engine ships.</p>
<p>Practical ways to reduce a PDF today: re-export from the source application with “reduce file size” or “compress images” enabled; downscale images before embedding them and pair that with <a href="/blog/image-compressor-guide/compress-jpg-100kb-portal">image compression</a>; use a desktop or OS print-to-PDF pipeline that offers quality settings; or split the document with <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a> and send only the pages the recipient needs. Confirm what the portal actually accepts before assuming 1MB is the target.</p>

<h2 id="limits">Limits and honest notes</h2>
<p>Ceilings exist to protect your tab: 20 files per merge, 200 pages total, 10MB per file, 100MB combined. Split, rotate and watermark each take a single PDF under 10MB. Image to PDF takes 20 images at 10MB each and 30MB total; PDF to JPG and PDF to text take one 10MB PDF, with a 200-page limit on text extraction. Password-locked files may need to be unlocked first. Interactive forms and signatures may flatten or break. Image-only scans need external OCR. Split oversized jobs into passes on phones, keep originals archived, and verify pagination by sampling the first, middle and last pages.</p>
<blockquote class="tip">General guidance only. Verify sensitive documents page by page; encrypted or signed files may need desktop software.</blockquote>
<div class="cta-box"><strong>Try it now:</strong> open the <a href="/pdf-merge">free PDF merge and organizer</a> and combine your first bundle in under a minute.</div>
`;

export const pdfPillar: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "pdf-merge-guide",
  kind: "pillar",
  title: "Manage PDFs Locally: Merge, Split, Rotate, Watermark and Convert",
  description:
    "Merge, split, rotate and watermark PDFs offline, convert scans to PDF, export pages to JPG. Real limits, range syntax and honest notes. No upload.",
  keywords: ["how to manage pdf files offline", "merge split pdf private", "pdf tools without upload", "jpg scans to single pdf", "extract text from pdf without ocr"],
  toolSlugs: ["pdf-merge", "image-to-pdf"],
  relatedSlugs: ["merge-multiple-pdfs-order", "jpg-scans-single-pdf", "extract-pages-range"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "toolbox", text: "The 7 working operations", level: 2 },
    { id: "merge-order", text: "Merge in order", level: 2 },
    { id: "scans-to-pdf", text: "Scans to PDF", level: 2 },
    { id: "split-ranges", text: "Extract by range", level: 2 },
    { id: "pages-to-images", text: "Pages to images", level: 2 },
    { id: "text-vs-ocr", text: "Text vs OCR", level: 2 },
    { id: "rotate-mixed", text: "Fix sideways scans", level: 2 },
    { id: "watermark-draft", text: "Watermark drafts", level: 2 },
    { id: "reduce-size", text: "Reducing file size", level: 2 },
    { id: "limits", text: "Limits", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I merge PDFs without uploading them?", answer: "Use a local tool: select 2 to 20 files under 10MB each, add them in the order you want, then merge. The files are combined in your browser with pdf-lib and never uploaded. The combined job is capped at 200 pages and 100MB, and the download is named merged.pdf." },
    { question: "What is the page-range syntax for splitting?", answer: "Ranges like 1-3,5 mean pages 1, 2, 3 and 5 — inclusive at both ends, comma-separated, numbered from 1. Validation runs when you click Split, so reversed intervals such as 5-3 and out-of-bounds pages produce an error then. There is no every-Nth mode." },
    { question: "Can these tools compress a PDF?", answer: "No. The pdf-compress route is a file checker that validates the header and reports page count and size; it does not shrink the file. For real compression, re-export from the source application, downscale images before embedding, or use a desktop print-to-PDF pipeline with quality settings." },
    { question: "Why is my extracted PDF text blank?", answer: "Scanned pages are flat images with no text layer, so extraction correctly returns page markers and flags those pages as empty. That is not a bug. Use dedicated OCR software for scans and reserve this tool for born-digital PDFs with selectable text, up to 200 pages and 10MB." },
    { question: "Can I rotate only some pages?", answer: "Not in a single run. The rotate tool applies 90, 180 or 270 degrees to every page as an absolute value. For mixed orientation, split out the sideways range, rotate that segment, then merge everything back in order in the merge tab." },
    { question: "What watermark options exist?", answer: "One PDF under 10MB, text up to 100 characters, a 48pt Helvetica-Bold stamp in gray, opacity from 0.05 to 1, and six positions: diagonal, center, top-left, top-right, bottom-left and bottom-right. The default is diagonal at 30 percent opacity, and the stamp lands on every page." },
  ],
};
