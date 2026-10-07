import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>The conference needed my slides as images for a legacy uploader that rejected PDFs. Six pages, ten minutes, no admin rights to install anything. Each page rendered at double scale, downloaded as JPGs, zipped, uploaded — done before coffee cooled. <strong>PDF-to-image is a rendering job</strong>: scale sets sharpness, quality sets weight, and the two multiply. This guide covers the 1×/2× decision, JPEG-vs-PNG exports, batch memory discipline and ZIP delivery.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Render in <a href="/pdf-to-jpg">PDF to JPG</a>; bundle outputs with the ZIP Creator approach below. Text instead? See <a href="/blog/pdf-merge-guide/extract-text-without-ocr">text extraction</a>.</p>

<h2 id="scale">1× vs 2×: 96 DPI previews vs 192 DPI print</h2>
<table>
<thead><tr><th>Scale</th><th>Effective DPI</th><th>6-page ZIP</th><th>Use for</th></tr></thead>
<tbody>
<tr><td><strong>1×</strong></td><td>~96</td><td>Small</td><td>Web previews, chat, tickets</td></tr>
<tr><td><strong>2×</strong></td><td>~192</td><td>Medium</td><td>Print, slides, archives</td></tr>
<tr><td><strong>2× PNG</strong></td><td>~192</td><td>Large</td><td>Diagrams, sharp text</td></tr>
</tbody>
</table>
<p>My 6-page brochure: 1× JPEG landed a featherweight ZIP, 2× JPEG stayed crisp at full-page print, 2× PNG ballooned (correctly — diagrams demand it). Rule: match scale to the viewing medium, not your ambition. Test one page first; the first render predicts the batch.</p>

<h2 id="jpeg-png">JPEG 85% vs PNG: photos compress, diagrams don't</h2>
<p>JPEG at 85% quality is the photo default — smooth gradients, small files, invisible loss. PNG preserves razor text and flat colors at 3–5× the bytes. So: brochure portraits → JPG; architecture diagrams → PNG; mixed decks → JPG unless a page is diagram-heavy (then PNG that page). Below 70% JPEG quality, gradient banding appears — hold 85% as the floor for anything public. Transparency flattens to white on export; check thumbnails for black-background surprises from dark-mode sources.</p>

<h2 id="batch-memory">Batch memory: 50 pages per pass on phones</h2>
<p>Each rendered page is a full bitmap in RAM: 200 pages at 2× can stall phones and even breathed-hard laptops. Discipline: under 50 pages per batch on mobile, close redundant tabs, prefer 1× on old devices, and download the ZIP between batches (don't accumulate hundreds of object URLs). Very large PDFs split first at <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a> — two 100-page passes beat one crashed 200-page attempt. Filenames arrive as <code>page-01.jpg</code> sequences; rename the ZIP (<code>brochure-images.zip</code>) before distributing.</p>
<blockquote class="tip">General guidance only. Rendering is pixel-exact at the chosen scale — zoom the first output before batching the rest.</blockquote>
`;

export const pdfPagesJpg: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "pdf-pages-high-quality-jpg",
  kind: "cluster",
  title: "Convert PDF Pages to High-Quality JPG Images",
  description:
    "PDF to JPG at 1x vs 2x scale: DPI table, JPEG 85% vs PNG rules, phone batch limits + ZIP delivery. Free local renderer, no upload.",
  keywords: [
    "how to convert pdf pages to high quality jpg",
    "pdf to jpg 2x vs 1x 96 dpi",
    "brochure 6 pages to zip",
    "jpeg 85% vs png diagrams",
    "pdf to image no upload",
    "What scale for PDF to JPG?",
  ],
  toolSlugs: ["pdf-to-jpg", "pdf-split", "image-to-pdf"],
  relatedSlugs: ["extract-pages-range", "compress-pdf-1mb-email", "extract-text-without-ocr"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "scale", text: "1x vs 2x scale", level: 2 },
    { id: "jpeg-png", text: "JPEG vs PNG", level: 2 },
    { id: "batch-memory", text: "Batch memory discipline", level: 2 },
  ],
  html,
  faqs: [
    { question: "What scale for PDF to JPG?", answer: "1× at about 96 DPI for web previews, chat and tickets, versus 2× at about 192 DPI for print, slides and archives. Test one page first since the first render predicts the whole batch. Match scale to the viewing medium, not ambition, then render all six brochure pages consistently." },
    { question: "JPEG or PNG for PDF pages?", answer: "JPEG 85% for photos with smooth gradients and small files, PNG for diagrams and sharp text despite 3–5× bytes. Mixed decks default to JPG unless a page is diagram-heavy, then use PNG for that page. Hold 85% as the floor for public files since below 70% causes gradient banding." },
    { question: "Why did my conversion stall?", answer: "Too many pages at 2× for device RAM, since each rendered page is a full bitmap. Stay under 50 pages per batch on phones, use 1× on old devices, close redundant tabs, and split large PDFs with range extraction. Two 100-page passes beat one crashed 200-page attempt on laptops and mobiles." },
    { question: "How do I download all pages at once?", answer: "Pages export as page-01.jpg sequences bundled into one ZIP for delivery. Download the ZIP between batches rather than accumulating hundreds of object URLs. Rename it like brochure-images.zip before distributing, and verify thumbnails for black-background surprises from dark-mode sources for clean handoff to legacy uploaders reliably." },
    { question: "Why is my JPG background black?", answer: "Transparency flattened against black, usually from dark-mode sources. Rendering flattens transparency to white normally, so check thumbnails after export for surprises. Re-export with white flattening, test one page at 2× for print or 1× for web, and keep quality at 85% for consistent public results everywhere." },
  ],
};
