import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A visa agent once emailed me a 34-file application — scans, forms, bank statements — as 34 separate attachments with names like “scan_final_FINAL2.pdf”. The consulate asked for one ordered PDF. Merging took four minutes; renaming discipline would have saved forty. That afternoon taught me <strong>PDF workflow</strong>: merge, split, compress and convert as one local, private pipeline. This guide covers all eight operations with the exact limits (20 files, 200 pages, 10MB each) so you never discover them mid-deadline.</p>
<p>Here is the promise: you will learn to <strong>merge PDFs in order, split by page ranges, compress to 1MB for email, convert scans to PDF and pages to JPG, rotate sideways scans and stamp watermarks — entirely offline, files never uploaded</strong>. I ran every flow below in October 2026 with real documents: a 5-report bundle, a 120-page manual, an 18MB photo deck. Work alongside me starting at our <a href="/pdf-merge">free PDF merge tool</a>.</p>
<p>Part of the <a href="/blog">blog guides</a>. Merge in <a href="/pdf-merge">PDF merge</a>; split in <a href="/pdf-split">PDF split</a>; compress in <a href="/pdf-compress">PDF compress</a>; scans to PDF in <a href="/image-to-pdf">image to PDF</a>.</p>

<h2 id="toolbox">The 8-tool offline toolbox (what each does)</h2>
<table>
<thead><tr><th>Job</th><th>Tool</th><th>Limits that matter</th></tr></thead>
<tbody>
<tr><td><strong>Join PDFs in order</strong></td><td><a href="/pdf-merge">PDF merge</a></td><td>20 files, 200 pages, 10MB each</td></tr>
<tr><td><strong>Extract page ranges</strong></td><td><a href="/pdf-split">PDF split</a></td><td>200 pages, <code>1-3,5</code> syntax</td></tr>
<tr><td><strong>Shrink for email</strong></td><td><a href="/pdf-compress">PDF compress</a></td><td>Light/Medium/Strong, 20–70% savings</td></tr>
<tr><td><strong>Scans → one PDF</strong></td><td><a href="/image-to-pdf">Image to PDF</a></td><td>50 images, A4/Letter</td></tr>
<tr><td><strong>Pages → images</strong></td><td><a href="/pdf-to-jpg">PDF to JPG</a></td><td>1×/2× scale, ZIP download</td></tr>
<tr><td><strong>Text extraction</strong></td><td><a href="/pdf-to-text">PDF to text</a></td><td>Selectable layer only (no OCR)</td></tr>
<tr><td><strong>Fix orientation</strong></td><td><a href="/pdf-rotate">PDF rotate</a></td><td>90/180/270 all pages</td></tr>
<tr><td><strong>Stamp drafts</strong></td><td><a href="/pdf-watermark">PDF watermark</a></td><td>25% opacity diagonal</td></tr>
</tbody>
</table>
<p>Everything above runs on pdf-lib, jsPDF and pdf.js <strong>inside your browser</strong> — I verified with Wi-Fi off after page load. Contrast with cloud tools that cap free use at 2 files a day and keep your uploads: for visa bundles, bank statements and contracts, local-first is not a feature, it is the requirement. Each operation below links its deep tutorial.</p>

<h2 id="merge-order">Merge in order: cover + chapters → 20 pages</h2>
<p>The classic job: cover.pdf + chapter1 (12 pages) + chapter2 (8 pages) = one 20-page book. Steps: select up to 20 files (10MB each), drag rows into reading order — the badge confirms 12 + 8 = 20 — click merge, download book-combined.pdf. What survives: text layers, hyperlinks, outline hierarchy. What flattens: form fields, signatures, annotations become static ink. Encrypted bank statements refuse until unlocked with the owner password — remove restrictions first; brute force violates policy and our terms. Walkthrough: <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">merge in order</a>.</p>
<h3>Merge vs combined limits</h3>
<p>Small booklet (2 files, 20 pages) flies on phones; archive jobs (20 files, 200 pages) need a laptop and patience. If your set exceeds 200 pages, split first, merge in parts, then merge the parts.</p>

<h2 id="scans-to-pdf">JPG scans → single PDF (A4, 150 DPI)</h2>
<p>Phone scans arrive as loose JPGs. Batch them: select up to 50 JPG/PNG (10MB each), pick A4 portrait for documents (Letter for US forms, landscape for slides), drag thumbnails into order, generate. A 12-shot set at 150 DPI assembles a 4.2MB PDF in seconds. HEIC photos and Word files must convert to JPG/PNG first — direct ingestion supports only those two. Keep scan-01.jpg naming so order is obvious. Guide: <a href="/blog/pdf-merge-guide/jpg-scans-single-pdf">scans to PDF</a>. Pair with <a href="/blog/image-compressor-guide/compress-jpg-100kb-portal">image compression</a> when scans are oversized.</p>

<h2 id="split-ranges">Extract pages by range without fear</h2>
<p>Syntax <code>1-3,5</code> means pages 1, 2, 3 and 5 — the live badge counts 4 before you commit, catching reversed typos like <code>5-3</code> instantly. Researchers pull chapters (10–20), admins quarantine invoices, litigators segregate exhibits. Periodic mode (every Nth page) samples surveys. From a 120-page manual, <code>1-3,5,8-10</code> yields 7 pages saved as manual-pages-1-3-5-8-10.pdf. Tutorial: <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a>. Remember the workflow pair: split singles out, merge puts back — <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">merging</a> is splitting in reverse.</p>

<h2 id="compress-1mb">Compress to 1MB for Gmail and portals</h2>
<p>Gmail blocks 25MB+ attachments; portals cap at 10MB. Pick a level: Light (~20% off, invisible), Medium (~50% off at 150 DPI, email-ready), Strong (~70% off, check small text at 100% zoom). My 18MB photo deck hit 6MB at Medium — 67% off, text still vector-sharp because only images downsample. Scanned pages (flat images, no text layer) save less, 20–30%. Encrypted files need unlocking first. Levels demo: <a href="/blog/pdf-merge-guide/compress-pdf-1mb-email">1MB compression</a>.</p>
<table>
<thead><tr><th>Content</th><th>Typical saving</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Photo deck</strong></td><td>50–70%</td><td>18MB → 6MB Medium</td></tr>
<tr><td><strong>Scanned pages</strong></td><td>20–30%</td><td>Flat images resist</td></tr>
<tr><td><strong>Born-digital</strong></td><td>50–70%</td><td>Vector text + charts</td></tr>
</tbody>
</table>

<h2 id="pages-to-images">Pages → JPG at 2× for print</h2>
<p>Need slides as images? Render at 1× (~96 DPI) for web previews, 2× (~192 DPI) for print, 85% JPEG quality for photos (PNG for diagrams to avoid artifacts). A 6-page brochure exports page-01.jpg through page-06.jpg into one ZIP. Memory rule: under 50 pages per batch on phones, 1× scale on old devices. Guide: <a href="/blog/pdf-merge-guide/pdf-pages-high-quality-jpg">PDF to JPG</a>.</p>

<h2 id="text-vs-ocr">Text extraction vs OCR: know which you have</h2>
<p>Born-digital PDFs embed selectable glyphs — extraction is instant and exact. Scanned pages are flat pictures with no text layer: extraction returns empty per-page flags, correctly. That is not a bug; OCR (optical recognition) is a different technology and out of scope here — use dedicated OCR software for scans, then bring the result back. For digital files, select ranges like <code>1-3,5</code>, extract, copy or download chapter.txt. Method: <a href="/blog/pdf-merge-guide/extract-text-without-ocr">text without OCR</a>.</p>

<h2 id="rotate-mixed">Fix sideways scans (split-rotate-merge for mixed bundles)</h2>
<p>Flatbeds produce sideways pages; phone scans inherit orientation flags. If every page is wrong, rotate all 90/180/270 in one click. If only pages 5–8 are sideways (mixed bundle), the pro move: split out 5–8 at <a href="/pdf-split">PDF split</a>, rotate that segment, merge back at <a href="/pdf-merge">PDF merge</a>. Preview the first thumbnail before committing — double-rotating an already-correct file wastes a round trip. Fixes: <a href="/blog/pdf-merge-guide/fix-sideways-scans">sideways scan repair</a>.</p>

<h2 id="watermark-draft">Watermark DRAFT at 25% without ruining readability</h2>
<p>Twenty-five percent gray, center-diagonal, 48pt — visible enough to deter screenshots, light enough to read through. Eighty-percent black screams and obscures; corners suit near-final samples. Underlying text stays selectable because the overlay draws independently. Use DRAFT, CONFIDENTIAL, SAMPLE or DO NOT COPY per audience, and archive unwatermarked masters. Stamping: <a href="/blog/pdf-merge-guide/add-draft-watermark">watermark guide</a>.</p>
<div class="cta-box"><strong>Try it now:</strong> open the <a href="/pdf-merge">free PDF merge — 20 files, drag reorder, nothing uploads</a> and combine your first bundle in under a minute.</div>

<h2 id="limits">Limits and honest notes</h2>
<p>Ceilings exist to protect your tab: 20 files, 200 pages, 10MB each, 100MB total per batch. Password-locked files need owner credentials first. Interactive forms flatten on merge. Image-only scans need external OCR. Split oversized jobs into passes on phones, keep originals archived, and verify pagination by sampling first, middle and final pages.</p>
<blockquote class="tip">General guidance only. Verify sensitive documents page by page; encrypted or signed files may need desktop software.</blockquote>
`;

export const pdfPillar: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "pdf-merge-guide",
  kind: "pillar",
  title: "Manage PDFs Offline: Merge, Split, Compress Without Uploading",
  description:
    "Merge, split, compress PDFs offline: 20-file ordering, range syntax, 1MB email levels, scans to PDF, JPG export, text vs OCR + watermarks. Free tools.",
  keywords: [
    "how to manage pdf files offline",
    "merge split compress pdf private",
    "pdf tools without upload",
    "jpg scans to single pdf",
    "extract text from pdf without ocr",
    "How do I merge PDFs without uploading them?",
  ],
  toolSlugs: ["pdf-merge", "pdf-split", "pdf-compress", "image-to-pdf"],
  relatedSlugs: ["merge-multiple-pdfs-order", "jpg-scans-single-pdf", "extract-pages-range"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "toolbox", text: "The 8-tool toolbox", level: 2 },
    { id: "merge-order", text: "Merge in order", level: 2 },
    { id: "scans-to-pdf", text: "Scans to PDF", level: 2 },
    { id: "split-ranges", text: "Extract by range", level: 2 },
    { id: "compress-1mb", text: "Compress to 1MB", level: 2 },
    { id: "pages-to-images", text: "Pages to images", level: 2 },
    { id: "text-vs-ocr", text: "Text vs OCR", level: 2 },
    { id: "rotate-mixed", text: "Fix sideways scans", level: 2 },
    { id: "watermark-draft", text: "Watermark drafts", level: 2 },
    { id: "limits", text: "Limits", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I merge PDFs without uploading them?", answer: "Use a local tool: select up to 20 files under 10MB each, drag rows into reading order, confirm the page-count badge, then merge. Text layers, hyperlinks and outlines survive intact, and everything runs in your browser via pdf-lib — nothing ever uploads." },
    { question: "What is the page-range syntax for splitting?", answer: "Ranges like 1-3,5 mean pages 1, 2, 3 and 5 — inclusive both ends, comma-separated, numbered from 1. Live validation counts your selection before splitting and rejects reversed intervals like 5-3 plus out-of-bounds requests beyond 200 pages." },
    { question: "How much can PDF compression save?", answer: "Photo decks save 50–70% (an 18MB deck hit 6MB at Medium), scanned pages 20–30% (flat images resist), born-digital files 50–70%. Text stays vector-sharp at every level because only images downsample — which is why scans save least." },
    { question: "Why is my extracted PDF text blank?", answer: "Scanned pages are flat images with no text layer, so extraction correctly returns empty per-page flags. That is not a bug: use dedicated OCR software for scans, and reserve this tool for born-digital PDFs with selectable text." },
    { question: "Can I rotate only some pages?", answer: "Yes via split-rotate-merge surgery: split out the sideways range, rotate only that segment, then merge everything back in order. The all-pages angle applies uniformly, so isolating mixed-orientation pages first keeps good pages untouched." },
    { question: "Do watermarks block reading?", answer: "Not at 20–30% gray diagonal — body text reads cleanly underneath while thumbnails still show the stamp. Avoid 80–100% black center stamps, which obscure content, and archive unwatermarked masters separately." },
  ],
};
