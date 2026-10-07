import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Twelve phone scans, one rental agreement, zero scanner. The landlord needed a single PDF; I had IMG_20261007_1 through _12 and a deadline. Twenty minutes later: one A4 portrait PDF, pages ordered, 4.2MB, emailed. <strong>Phone scans to single PDF</strong> is the most common PDF job in India — admissions, KYC, rentals — and it fails most often on paper size and orientation, not technology. This guide nails both, plus the HEIC trap and the 50-image split rule.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Assemble in <a href="/image-to-pdf">image to PDF</a>; shrink oversized scans via <a href="/blog/image-compressor-guide/compress-jpg-100kb-portal">image compression</a> first. Then <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">merge</a> with other documents.</p>

<h2 id="setup">Paper setup: A4 vs Letter, portrait vs landscape</h2>
<table>
<thead><tr><th>Document</th><th>Size</th><th>Orientation</th></tr></thead>
<tbody>
<tr><td><strong>Agreements, applications</strong></td><td>A4 (210×297mm)</td><td>Portrait</td></tr>
<tr><td><strong>US forms, IRS docs</strong></td><td>Letter (8.5×11in)</td><td>Portrait</td></tr>
<tr><td><strong>Slide decks, wide charts</strong></td><td>A4 or Letter</td><td>Landscape</td></tr>
<tr><td><strong>Receipts, bills</strong></td><td>A4</td><td>Portrait, one per page</td></tr>
</tbody>
</table>
<p>Pick before generating — wrong paper means re-export, not a setting you fix later. Rename scans sequentially (scan-01…scan-12) so thumbnail order matches reading order automatically.</p>

<h2 id="method">Method: 12 scans to one PDF in minutes</h2>
<ol>
<li><strong>Pre-check each scan:</strong> legible at 100% zoom, upright, cropped to page edges. A blurry source makes a blurry PDF — no setting rescues it.</li>
<li><strong>Select up to 50 JPG/PNG</strong> (10MB each) in the <a href="/image-to-pdf">image to PDF tool</a>. HEIC photos and Word files must convert to JPG/PNG first — direct ingestion supports only those two.</li>
<li><strong>Drag thumbnails into order</strong> (page one first), choose A4 portrait, generate <code>scans-merged.pdf</code>. Twelve phone shots at 150 DPI assemble ~4.2MB in seconds.</li>
<li><strong>Verify pagination:</strong> flip every page, confirm sequence, check the last page exists (truncated exports hide at the end).</li>
</ol>

<h2 id="heic-split">HEIC trap and the 50-image split rule</h2>
<p>iPhones shoot HEIC by default — convert to JPG before importing (most phones offer “Most Compatible” in camera settings for future scans). Over 50 images or memory warnings on phones: split into two PDFs, then join with <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">PDF merge</a>. Scans above 10MB each should pass through the <a href="/image-compressor">image compressor</a> first. For portal uploads with byte caps, finish with the <a href="/blog/pdf-merge-guide/compress-pdf-1mb-email">1MB compression levels</a>.</p>
<blockquote class="tip">General guidance only. For legally binding filings, verify the recipient accepts assembled PDFs — some authorities require original scans per file.</blockquote>
`;

export const pdfScansPdf: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "jpg-scans-single-pdf",
  kind: "cluster",
  title: "JPG Scans to Single PDF: A4 Size + Order Guide",
  description:
    "Turn phone scans into one PDF: A4 vs Letter setup, 12-scan worked example, HEIC conversion + 50-image split rule. Free local tool, no upload.",
  keywords: [
    "how to convert jpg scans to single pdf",
    "scan 01-04 jpg to a4 portrait",
    "50 images to pdf split in 2",
    "150 dpi scan pdf size",
    "heic to jpg before pdf",
    "How do I combine JPG scans into one PDF?",
  ],
  toolSlugs: ["image-to-pdf", "pdf-merge", "image-compressor"],
  relatedSlugs: ["merge-multiple-pdfs-order", "extract-pages-range", "compress-pdf-1mb-email"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "setup", text: "Paper setup", level: 2 },
    { id: "method", text: "12 scans method", level: 2 },
    { id: "heic-split", text: "HEIC + split rule", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I combine JPG scans into one PDF?", answer: "Select up to 50 JPG or PNG files under 10MB each, then drag thumbnails into order with page one first. Choose A4 portrait before generating, since wrong paper means re-exporting. Twelve 150 DPI phone shots assemble locally in seconds to about 4.2MB as scans-merged.pdf for emailing." },
    { question: "A4 or Letter for my scans?", answer: "A4 at 210×297mm portrait for agreements, applications, receipts and most documents worldwide. Letter at 8.5×11 inch portrait for US and IRS forms. Landscape only for slide decks and wide charts. Rename scans like scan-01 through scan-12 so thumbnail order matches reading order automatically before generating your final PDF." },
    { question: "My iPhone photos won't import — why?", answer: "They are likely HEIC, since iPhones shoot HEIC by default. Convert to JPG before importing, or set camera to Most Compatible for future scans. Direct ingestion supports only JPG and PNG up to 10MB each, so Word files and HEIC originals must convert first through the image compressor." },
    { question: "What if I have more than 50 images?", answer: "Split into two PDFs, then join with PDF merge for the final bundle. Over-50 batches trigger memory warnings on phones, so process in smaller passes. Also compress oversized scans above 10MB each first, and verify pagination by flipping every page after joining including confirming the last page exists." },
    { question: "How do I keep the PDF small?", answer: "Resize scans before assembling, compress oversized images above 10MB first, then compress the finished PDF at Medium per the 1MB email levels guide. Pre-check legibility at 100% zoom since blurry sources stay blurry. For portal uploads with byte caps, finish with targeted compression levels afterward." },
  ],
};
