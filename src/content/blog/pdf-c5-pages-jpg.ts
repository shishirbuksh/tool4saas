import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A conference uploader rejected PDFs and accepted only images. Six slides, one PDF, no admin rights. Rendering each page to JPG took a few minutes and produced six separate files. <strong>PDF-to-image is a rendering job</strong>: scale sets the pixel dimensions, JPEG quality sets the compression, and the two together determine file size. This guide covers the scale decision, quality settings, per-page download behavior and memory limits in the current tool.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Render pages in <a href="/pdf-to-jpg">PDF to JPG</a>. If you need selectable words instead, see <a href="/blog/pdf-merge-guide/extract-text-without-ocr">text extraction</a>.</p>

<h2 id="scale">Scale choices: 1x, 2x and 3x</h2>
<p>The scale slider runs from 1x to 3x. Scale multiplies the PDF page dimensions during rendering, so 2x creates four times as many pixels as 1x, and 3x creates nine times as many. More pixels usually means sharper output and a larger file. The browser downloads one JPG per page, so a six-page brochure produces six files such as <code>brochure-p1.jpg</code> through <code>brochure-p6.jpg</code>.</p>
<table>
<thead><tr><th>Scale</th><th>Relative pixels</th><th>Typical use</th></tr></thead>
<tbody>
<tr><td><strong>1x</strong></td><td>Baseline</td><td>Fast web previews, chat, tickets</td></tr>
<tr><td><strong>2x</strong></td><td>4x baseline</td><td>Slides, documents, general archives</td></tr>
<tr><td><strong>3x</strong></td><td>9x baseline</td><td>Large print or close inspection when memory allows</td></tr>
</tbody>
</table>
<p>Effective print DPI is not fixed by the scale alone. It depends on the original page size. A Letter-sized page rendered at 2x produces about 1224 by 1584 pixels, which is roughly 150 DPI across 8.5 by 11 inches, while an A4 page or a different scale changes the result. If a print vendor specifies a DPI, calculate the needed pixel dimensions first and choose the scale that reaches them. Test one page before converting a long document.</p>

<h2 id="quality">JPEG quality and file size</h2>
<p>Quality runs from 10 to 100 percent and affects compression artifacts rather than pixel dimensions. Around 85 percent is a sensible default for photos and mixed documents. Lower values shrink the file but introduce blocky edges around text and banding in smooth gradients. Higher values preserve detail but grow quickly. Raising quality cannot recover detail that a low scale never rendered, so choose the scale first and tune quality second.</p>
<p>The output is always JPEG, never PNG. A page with sharp line art or flat colors may show more compression artifacts than a PNG would, so raise quality rather than switching formats; the tool does not offer a PNG option. Transparent areas are flattened onto a white background to prevent black boxes in the JPG. Dark-mode source pages should be checked after export because they may not look the way they did in the original viewer.</p>

<h2 id="batch-memory">Per-page memory and download behavior</h2>
<p>Each page becomes a full canvas in memory before it is encoded and downloaded. The converter processes every page in the PDF and starts a separate download for each one. Browsers may ask for permission to download multiple files, and a long document can produce dozens of files. There is no ZIP bundle and no PNG export. If you need a single archive, save the JPGs first and pack them with a separate ZIP tool.</p>
<p>Every page is checked against a limit of 8192 pixels on either side and 16 megapixels. A large page at 3x can exceed that guard, and the conversion stops with an error naming the page. Lower the scale and retry. Close other tabs and keep the page in the foreground for long jobs. For a very large document, split it first with <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a> and convert each part separately. Two smaller passes are more reliable than one memory-heavy run, especially on a phone.</p>
<blockquote class="tip">Rendering is fixed at the chosen scale. Zoom the first output before converting the rest so a bad scale choice does not waste a long batch.</blockquote>
`;

export const pdfPagesJpg: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "pdf-pages-high-quality-jpg",
  kind: "cluster",
  title: "Convert PDF Pages to JPG Images",
  description:
    "Render PDF pages to separate JPG files at 1x to 3x scale. Learn quality settings, per-page downloads, 8192px limits and memory checks. No upload.",
  keywords: ["how to convert pdf pages to high quality jpg", "pdf to jpg scale quality", "render pdf pages as jpg", "pdf to jpg no upload", "pdf page to jpeg offline"],
  toolSlugs: ["pdf-to-jpg", "pdf-merge", "image-to-pdf"],
  relatedSlugs: ["extract-pages-range", "extract-text-without-ocr", "fix-sideways-scans"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "scale", text: "1x, 2x and 3x scale", level: 2 },
    { id: "quality", text: "JPEG quality and size", level: 2 },
    { id: "batch-memory", text: "Memory and downloads", level: 2 },
  ],
  html,
  faqs: [
    { question: "What scale should I choose for PDF to JPG?", answer: "Use 1x for fast previews, 2x for most slides and documents, and 3x only when you need more pixels and the device has enough memory. Scale multiplies the page dimensions, so 3x creates nine times the pixels of 1x. Test one page before converting a long document." },
    { question: "Does the tool export PNG or ZIP files?", answer: "No. Every page downloads as a separate JPG named from the PDF base name and page number. There is no PNG export and no ZIP bundle. If you need one archive, save the JPGs and pack them with a separate ZIP tool." },
    { question: "What JPEG quality should I use?", answer: "Around 85 percent is a good default. Lower quality shrinks files but adds blocky edges and gradient banding; higher quality preserves detail but grows quickly. Set the scale first for pixel dimensions, then tune quality for compression." },
    { question: "Why did a page fail at 3x?", answer: "Each page is limited to 8192 pixels per side and 16 megapixels. A large page at a high scale can exceed that guard. The converter stops with an error naming the page, so lower the scale and retry, or split the PDF into smaller parts first." },
    { question: "Why is my JPG background white or black?", answer: "Transparent areas are flattened onto white during export, so a dark-mode source page can look different from the original viewer. Check the first and last pages after conversion, and adjust the source file if the result is not what you need." },
  ],
};
