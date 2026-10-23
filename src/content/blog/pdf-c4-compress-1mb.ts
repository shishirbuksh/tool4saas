import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Gmail bounced it: an 18MB photo deck under the 25MB ceiling, but the recipient's corporate server capped at 10MB. The file had to fly that night, and there was no browser compressor to save it. The fixes were manual: re-export from the source, downsample the images, and send only the pages the recipient needed. <strong>PDF size reduction is a source problem, not a button</strong>, and this guide covers the workable methods and a verification protocol.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Check a file's size and page count in the <a href="/pdf-compress">PDF file checker</a>, then trim pages with <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a> before sending. Scans that need OCR instead are covered in <a href="/blog/pdf-merge-guide/extract-text-without-ocr">text vs OCR</a>.</p>

<h2 id="why-not">Why this site has no browser compressor yet</h2>
<p>The route at <a href="/pdf-compress">pdf-compress</a> is a <strong>file checker</strong>. It confirms the <code>%PDF-</code> header, enforces the 10MB input limit, and reports the page count and byte size. It does not recompress images, subset fonts, strip metadata, or emit a smaller download. That is deliberate: reliable browser-side compression means decoding every embedded image, choosing new quality settings, rewriting cross-reference tables, and keeping signatures and forms intact. A careless rewrite can make a file larger or corrupt it, so the page ships as a validator and says so until a real engine exists.</p>

<h2 id="methods">Methods that actually reduce PDF size</h2>
<table>
<thead><tr><th>Method</th><th>Typical gain</th><th>Best for</th></tr></thead>
<tbody>
<tr><td><strong>Re-export with compressed images</strong></td><td>Large</td><td>Documents you control in the source app</td></tr>
<tr><td><strong>Downscale images before embedding</strong></td><td>Large</td><td>Photo-heavy decks, scanned inserts</td></tr>
<tr><td><strong>Print to PDF with a quality preset</strong></td><td>Moderate</td><td>Quick one-off reduction</td></tr>
<tr><td><strong>Split and send only needed pages</strong></td><td>Variable</td><td>Portals that accept a chapter or form</td></tr>
</tbody>
</table>
<p>Start from the source file whenever possible. Word processors, presentation apps and design tools offer “reduce file size” or image-resolution presets during export, and those rewrite the document structure cleanly instead of guessing at an existing PDF. If the PDF was built from images, shrink those images first with an <a href="/blog/image-compressor-guide/compress-jpg-100kb-portal">image compression pass</a> and rebuild the document at a sensible resolution. Print-to-PDF at a lower quality setting works as a fallback for a file whose source is gone, but it rasterizes text and loses selectable content. When a portal only needs pages 3–9 of a report, do not compress anything: split out the range and send the smaller document.</p>

<h2 id="verify">Verify at 100% and mind the real caps</h2>
<p>Read the destination's actual limit before optimizing. Email attachments are often described as 25MB, yet many corporate servers reject anything over 10MB, and portals frequently cap at 5MB or less. Check the generated size in the checker or your file manager, keep a margin below the cap, and never recompress an already-compressed file: artifacts compound while savings shrink. Zoom photo pages and small text to 100% and compare against the original before sending.</p>
<p>Two situations resist reduction. Encrypted files must be unlocked with the owner password in a trusted application before any tool can rewrite them; a user password only opens viewing. Image-only scans save less than born-digital files because there is no vector text to preserve, though downsampling the embedded images can still help. OCR adds a text layer and usually increases size rather than reducing it, so run OCR only when searchability matters more than bytes.</p>
<blockquote class="tip">General guidance only. Keep the untouched master archived and compress a distribution copy, so a bad export never becomes your only version.</blockquote>
`;

export const pdfCompress1mb: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "compress-pdf-1mb-email",
  kind: "cluster",
  title: "Reduce PDF File Size Without a Browser Compressor",
  description:
    "Reduce PDF size without a browser compressor: re-export, downsample source images, split pages and verify at 100%. Honest limits, no upload required.",
  keywords: ["how to reduce pdf file size", "shrink pdf for email", "pdf too large to email", "reduce pdf size without adobe", "compress pdf offline alternative"],
  toolSlugs: ["pdf-compress", "pdf-merge"],
  relatedSlugs: ["merge-multiple-pdfs-order", "extract-pages-range", "jpg-scans-single-pdf"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-not", text: "Why no compressor yet", level: 2 },
    { id: "methods", text: "Methods that work", level: 2 },
    { id: "verify", text: "Verify and mind caps", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does this site compress PDFs?", answer: "No. The pdf-compress route is a file checker that validates the header, enforces the 10MB limit and reports page count and size. It does not rewrite images or produce a smaller file. Real compression happens in the source application, an image pre-pass, a print-to-PDF preset, or by sending fewer pages." },
    { question: "What is the fastest way to shrink a PDF for email?", answer: "Re-export from the source with a compressed-image or reduced-resolution preset, because that rewrites the document cleanly. If the source is gone, downscale the embedded images or use print-to-PDF at a lower quality setting. Keep a margin below the destination cap, since corporate servers often reject files above 10MB even when Gmail allows 25MB." },
    { question: "Can I just compress an already-compressed PDF again?", answer: "Not usefully. Recompressing compressed files compounds artifacts while savings shrink, and repeated lossy passes degrade photos and small text. Always work from the archived master, and check the result at 100% zoom before sending it anywhere important." },
    { question: "Why does my scanned PDF stay large?", answer: "Scans store page images rather than vector text, so there is little structure to remove. Downsampling the embedded images can help, but gains are smaller than for born-digital files. Running OCR adds a text layer and usually increases size, so use it only when searchable text matters more than bytes." },
    { question: "What about locked or encrypted PDFs?", answer: "They must be unlocked with the owner password in a trusted PDF application before any rewriting tool can work on them. A user password only opens the document for viewing; it does not remove the restriction that blocks changes. Once unlocked and re-saved, the normal reduction methods apply." },
  ],
};
