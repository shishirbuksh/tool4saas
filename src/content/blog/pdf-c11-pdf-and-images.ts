import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A 14-page proposal needed nine project photos at the end. The proposal was already a PDF; the photos were JPGs on a laptop. There is no button that appends images to an existing PDF here. The reliable route is two steps: turn the images into their own PDF, then merge that PDF with the document in the order you want. This guide covers the limits at each step and the page-order traps after the merge.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Build the image pages in <a href="/image-to-pdf">image to PDF</a>, then join the result with your documents in <a href="/pdf-merge">PDF merge</a>. For image-only bundles, start with <a href="/blog/pdf-merge-guide/jpg-scans-single-pdf">JPG scans to one PDF</a>.</p>

<h2 id="two-step">The two-step method</h2>
<ol>
<li><strong>Build an image PDF.</strong> Open <a href="/image-to-pdf">image to PDF</a>, add up to 20 images, choose A4 or Letter and portrait or landscape, then generate the file. Each image becomes one page, fitted inside the margins and centered.</li>
<li><strong>Check the image PDF.</strong> Confirm the page count, the order of the images and the file size. If it is over 10MB, the merger will reject it as an input. Compress or resize the source images and build it again.</li>
<li><strong>Merge with the existing PDFs.</strong> Open <a href="/pdf-merge">PDF merge</a>, add the original documents and the image PDF in the order the final file should follow, then merge.</li>
<li><strong>Verify the combined PDF.</strong> Check the page count and sample the pages where the image section begins and ends. Confirm that every page is present and upright.</li>
</ol>
<p>If you only have images, stop after step 1; the image-to-PDF output is already a single PDF. The merger is only needed when another PDF must join it. One document and one image PDF make two files, which meets the minimum.</p>
<p>The merge cannot insert images between pages of an existing PDF on its own. The image PDF is one file, so its pages land as a block wherever you place that file. To put images in the middle, split the original PDF at the insertion point, then merge the first part, the image PDF and the second part in that order. The <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction guide</a> covers the split syntax.</p>

<h2 id="prepare-images">Prepare the image PDF within its limits</h2>
<p>The image builder accepts up to 20 images and 30MB in total per batch. It rejects images above 8192 pixels on either side or 16 megapixels, because a larger canvas can exhaust browser memory. A 48MP phone capture may need to be exported at a smaller size first. The builder has no DPI field: it embeds the image at its pixel dimensions and scales it to fit the page with 10mm margins.</p>
<p>Page size and orientation apply to the whole image PDF. Choose A4 or Letter to match the document it will join, and choose portrait or landscape based on the images. If a set mixes tall and wide images, build two image PDFs with different orientations instead of forcing one setting across all pages.</p>
<p>The builder does not crop. A 3:4 photo on an A4 portrait page leaves white bands at the top and bottom, which is normal. If the subject needs to fill the page, crop the image before adding it. The tool adds no text layer or OCR, so a scanned receipt will not become searchable.</p>
<p>Order is selection order. The numbered list shows the images in the sequence they will become pages, and there is no drag handle. If one is out of place, remove it and add it again at the end. Numeric file names such as <code>01-site.jpg</code> make the intended order easier to check. For more than 20 images, build several image PDFs and add each one as a separate file in the merge step.</p>

<h2 id="merge-order">Choose the merge order and page position</h2>
<p>The merger accepts 2 to 20 PDFs, 10MB per file and 200 pages in total. The image PDF counts as one file and all of its pages count toward the 200-page ceiling. Add the documents in final order; the list is numbered, but there is no drag reorder. Remove a file and add it again to move it. The same rule applies to the image PDF: its position in the list decides where its block of pages appears.</p>
<p>Plan the arithmetic before adding files. A 14-page proposal and a 9-page image PDF make 23 pages, well under the ceiling. Twenty existing PDFs and one image PDF make 21 files, which is over the file limit, even if the page total is small. In that situation, combine some documents first or build fewer image PDFs, then check that every input is still under 10MB.</p>
<p>Encrypted or corrupt files fail at merge time. Unlock protected PDFs before adding them, and download a fresh copy of anything that will not parse. The merge keeps each page's size and orientation, but it can flatten form fields, signatures and annotations into static content. Keep editable originals if you may need to change them later.</p>

<h2 id="page-size">Match page size and orientation</h2>
<p>An A4 image PDF merged after a Letter document produces a file with mixed page sizes. Most viewers display that without complaint, but printing and professional review look uneven. Choose the size of the main document, not the size that happens to suit the photos. If the main file is landscape, build the image PDF in landscape; if it is portrait, use portrait.</p>
<table>
<thead><tr><th>Source</th><th>Prepare it in</th><th>Output to expect</th><th>Merge role</th></tr></thead>
<tbody>
<tr><td><strong>PDF report or form</strong></td><td>No change, unless it is encrypted</td><td>Original pages keep their size</td><td>Add as one or more input files</td></tr>
<tr><td><strong>JPG or PNG photos</strong></td><td>Image to PDF, A4 or Letter</td><td>One page per image, fitted and centered</td><td>Add the image PDF where the block belongs</td></tr>
<tr><td><strong>Scanned receipts</strong></td><td>Compress first if heavy, then image to PDF</td><td>Image pages with no text layer</td><td>Check the 10MB per-file cap</td></tr>
<tr><td><strong>Wide site photos</strong></td><td>Image to PDF, landscape</td><td>Wide pages with smaller white bands</td><td>Build separately from portrait pages</td></tr>
<tr><td><strong>Images for the middle</strong></td><td>Image to PDF, matching size</td><td>A separate image PDF block</td><td>Split the host PDF, then merge three parts</td></tr>
</tbody>
</table>
<p>If the image PDF is over 10MB, do not add it and hope the size limit is advisory; it is checked. Compress the source images in the <a href="/image-compressor">image compressor</a>, rebuild the image PDF and confirm the new byte count. Receipt photos usually survive compression; inspect a portfolio image at 100% before rebuilding.</p>

<h2 id="worked-examples">Two worked examples</h2>
<p><strong>Example 1: a proposal and nine site photos.</strong> The proposal was a 14-page A4 portrait PDF at 6.2MB. The photos were 1200×1600 JPGs totaling 8.6MB. I built a 9-page A4 portrait image PDF at about 8.4MB, then merged the proposal first and the image PDF second. The result was 23 pages, each input under 10MB and the total far below 200 pages. Page 15 started the photo section, and page 23 was the last photo.</p>
<p><strong>Example 2: an invoice and six receipts that started too large.</strong> The invoice was a 5-page PDF at 2.1MB. Six receipt photos totaled 14.4MB, producing an image PDF near 14.3MB. That file was under the image builder's 30MB batch cap but over the merger's 10MB per-file cap, so the merge rejected it. I compressed the six photos to roughly 5.6MB in total, rebuilt the image PDF at about 5.5MB, and merged it after the invoice. The final file had 11 pages. At 100% zoom the receipt totals were still readable, which is the check that matters before accepting the quality loss.</p>
<blockquote class="tip">Two different ceilings apply: 30MB total for the image batch, then 10MB per PDF at merge time. A successful image PDF can still be too large to merge until you compress and rebuild it.</blockquote>

<h2 id="limits">Limits and failure modes</h2>
<p>The image builder caps a batch at 20 images and 30MB total, with 8192 pixels per side and 16 megapixels per image. The merger caps a run at 20 PDFs, 10MB per file and 200 pages total. The image PDF's pages count toward the page ceiling, and the file counts toward the 20-file limit. The merger adds no OCR, page numbers, headers or bookmarks, and the images cannot be edited after they become pages.</p>
<p>Because the image PDF is built first, changing one photo means rebuilding that PDF and merging again. Keep the source images and the component PDFs until the final file is accepted. If the combined document needs images in several places, build several image PDFs and place each block deliberately; do not assume the merger can interleave them with pages from a host document. The clean pattern is split, place, merge, verify.</p>
<p>Finally, check the output in a real PDF viewer, not only in the browser preview. Confirm the total page count, the first and last image pages, rotation and legibility. Check the file size against the recipient's limit and keep the sources.</p>
<div class="cta-box"><strong>Build the combined file:</strong> make the image pages in <a href="/image-to-pdf">image to PDF</a>, then join them with your documents in <a href="/pdf-merge">PDF merge</a>. Both run locally, so the images and PDFs stay on your device.</div>
`;

export const pdfCombineImages: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "combine-pdf-and-images",
  kind: "cluster",
  title: "Combine PDF and Images Into One File",
  description:
    "Combine a PDF with images in two steps: build an image PDF, then merge it with your documents in order. Page limits, size caps and worked examples.",
  keywords: ["combine pdf and images into one file", "add images to pdf", "merge pdf with jpg", "pdf and photos one document", "image pdf merge order"],
  toolSlugs: ["pdf-merge", "image-to-pdf"],
  relatedSlugs: ["jpg-scans-single-pdf", "merge-multiple-pdfs-order", "pdf-pages-high-quality-jpg"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "two-step", text: "The two-step method", level: 2 },
    { id: "prepare-images", text: "Prepare the image PDF", level: 2 },
    { id: "merge-order", text: "Merge order and position", level: 2 },
    { id: "page-size", text: "Page size and orientation", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "limits", text: "Limits and failure modes", level: 2 },
  ],
  html,
  faqs: [
    { question: "Can I add images directly to an existing PDF?", answer: "Not with this tool. The image builder creates a separate PDF, and the merger joins that PDF with your documents. Adding images to an existing PDF would require a PDF editor with page-content insertion. The two-step route is to build the image PDF, then merge it in the correct position." },
    { question: "How do I put images in the middle of a PDF?", answer: "Split the host PDF at the insertion point, then merge the first part, the image PDF and the second part in that order. The merger cannot interleave pages from two files. Use page-range extraction for the split, and confirm the page count after the three-part merge." },
    { question: "How many images can I combine with a PDF?", answer: "Up to 20 images per image PDF, with 30MB total, 8192 pixels per side and 16 megapixels per image. The merger then accepts 2 to 20 PDFs at 10MB each and 200 pages total. For more than 20 images, build several image PDFs and add each one in order." },
    { question: "Why does the merger reject my image PDF?", answer: "The most common reason is size: the image builder allows a 30MB batch, but the merger accepts only 10MB per file. Compress the source images, rebuild the image PDF and check the output size. Encrypted or corrupt PDFs, more than 20 files, or more than 200 total pages also fail." },
    { question: "Should the image PDF use A4 or Letter?", answer: "Match the main document. An A4 image PDF after a Letter report creates mixed page sizes, which viewers handle but printing can look uneven. Orientation applies to the whole image PDF, so build a separate landscape batch if a few wide images need it rather than forcing every page sideways." },
    { question: "Will the images in the PDF be searchable?", answer: "No. Each image becomes a page with no text layer, so OCR is not performed and receipt text cannot be selected or searched. If you need searchable text, run OCR separately after the merge and keep this visual file as the record. The merger also adds no page numbers, headers or bookmarks." },
  ],
};
