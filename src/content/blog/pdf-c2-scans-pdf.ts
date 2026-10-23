import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Twelve phone scans, one rental agreement, no scanner. The landlord wanted a single PDF; I had IMG_20261007_1 through _12 and a deadline. The job is not technical. It fails on paper size, file order and file weight, usually in that order. This guide handles all three, with the current batch limits and the DPI arithmetic that tells you when a phone photo already has enough pixels.</p>
<p>This is part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Assemble in <a href="/image-to-pdf">image to PDF</a>, shrink oversized JPGs at <a href="/image-compressor">image compressor</a>, then join the result with other documents at <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">PDF merge</a>.</p>

<h2 id="setup">Choose paper size and orientation first</h2>
<p>Page size and orientation apply to the whole document. The builder gives every image its own page, fits the entire image inside 10mm margins, and centers it. It does not crop. A 3:4 phone photo on A4 leaves white bands at the top and bottom; that is normal and keeps the full page visible. Pick the page before generating, because changing it later means rebuilding the file.</p>
<table>
<thead><tr><th>Document</th><th>Page size</th><th>Orientation</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>Rental agreements, applications, KYC</strong></td><td>A4 (210 x 297mm)</td><td>Portrait</td><td>The common standard in most countries</td></tr>
<tr><td><strong>US forms and IRS documents</strong></td><td>Letter (8.5 x 11in)</td><td>Portrait</td><td>Matches the paper the form was designed for</td></tr>
<tr><td><strong>Wide charts, slides, site plans</strong></td><td>A4 or Letter</td><td>Landscape</td><td>Keeps the wide content large instead of shrinking it</td></tr>
<tr><td><strong>Receipts, bills, single checks</strong></td><td>A4</td><td>Portrait</td><td>One image per page, easy to paginate</td></tr>
</tbody>
</table>
<p>A4 and Letter are close but not identical. Letter is about 6mm wider and 18mm shorter than A4. A scan designed for one size will show slightly different margins on the other. That rarely matters for a scan sent by email, but it matters when a form is printed and aligned with a pre-printed template. Choose the size the recipient expects, not the one your phone happens to use.</p>
<p>Orientation is document-wide. If 11 pages are portrait agreements and one is a landscape site plan, build the 11-page PDF and the one-page PDF separately, then merge them. The merge view keeps each page's size and orientation, so the plan stays wide while the agreement stays tall.</p>

<h2 id="dpi-sizing">Pixels, DPI and A4: the only arithmetic you need</h2>
<p>The PDF page is measured in millimetres; the image is measured in pixels. Effective DPI is the pixel width divided by the printed width in inches. A4 at 300 DPI needs about 2480 x 3508 pixels. A4 at 150 DPI needs about 1240 x 1754. With the builder's 10mm margins, the image box is 190mm wide, or 7.48 inches. A 1240-pixel-wide scan fitted there lands at roughly 166 effective DPI, which is fine for reading and email.</p>
<p>A modern 12MP portrait phone photo is around 3024 x 4032 pixels. Fitted to A4, that is roughly 400 effective DPI: sharp, and usually heavier than the job needs. A 12MP JPEG at 3MB each makes a 12-page PDF near 36MB before any overhead, which exceeds the builder's 30MB batch limit. Re-encode the JPGs at lower quality before selecting them. The image compressor's quality slider keeps the pixel dimensions and reduces bytes; the PDF builder then embeds the smaller JPEG.</p>
<p>The builder has no DPI field. It embeds the image at its pixel dimensions and scales it to the page, so DPI is an outcome of pixels divided by printed size. You control it by controlling the source file. Do not upscale a 600-pixel scan to A4 and expect more detail; you will get a larger, softer file. As a rule of thumb, 200 to 300 effective DPI is comfortable for text that will be printed, around 150 is acceptable for screen review, and below 100 small type starts to soften.</p>

<h2 id="worked-example">Worked example: 12 scans to one PDF</h2>
<ol>
<li><strong>Rename in reading order.</strong> Change IMG_20261007_1 through _12 to <code>scan-01.jpg</code> through <code>scan-12.jpg</code>. The builder appends images in the order the picker hands them over and has no drag reorder, so file names are your page order. Alphabetical sorting also keeps <code>scan-10</code> after <code>scan-09</code> instead of next to <code>scan-01</code>.</li>
<li><strong>Check each scan.</strong> Confirm it is upright, legible at 100% zoom, cropped to the page edges, under 10MB and under 16 megapixels. A blurry source stays blurry in the PDF.</li>
<li><strong>Select all 12.</strong> Open <a href="/image-to-pdf">image to PDF</a>, add the files and read the numbered list. It should run 1 through 12 in the same order as the scans. If a file is out of place, clear the list and add the files again in the correct order; there is no drag handle.</li>
<li><strong>Choose A4 portrait.</strong> Generate the PDF. The download is named <code>images.pdf</code>; rename it <code>rental-agreement-2026-10.pdf</code> immediately.</li>
<li><strong>Verify pagination.</strong> Flip every page in a viewer and check the last page exists. A missed file at the end is the most common silent failure.</li>
</ol>
<p>At 2MB per JPEG, the 12-page PDF lands near 24MB with a little overhead, which is under the 30MB batch cap but above many email attachment limits. If you need a smaller file, re-encode the JPGs at 80% quality before building. A 12MP scan still has plenty of detail after that pass, and 80% quality usually keeps document text clean.</p>
<p><strong>Second example: a 30-page KYC bundle.</strong> The builder caps a batch at 20 images and 30MB total, so one 30-image selection will be rejected. Re-encode the photos so each half stays under 30MB, build the first 15 pages as <code>01-kyc-a.pdf</code> and the second 15 as <code>02-kyc-b.pdf</code>, then merge them in that order at <a href="/pdf-merge">PDF merge</a>. Confirm the merged count is 30. This two-pass habit also keeps memory use lower on a phone.</p>

<h2 id="orientation-heic">HEIC, EXIF and sideways photos</h2>
<p>iPhones shoot HEIC by default, and the builder's accept list does not include HEIC. Convert first: on iOS, set Camera > Formats > Most Compatible for future scans, or share/export the photo as JPG. On Windows, the HEIF Image Extensions package may be needed before the file can be opened at all. Android phones usually produce JPG, but check the file extension before blaming the tool.</p>
<p>Phone photos also carry an EXIF orientation flag. A gallery app reads that flag and shows the photo upright; the PDF builder may embed the stored pixels instead, so a page that looked fine on the phone arrives sideways in the PDF. If every page is wrong, the quick fix is to rotate the finished PDF once, but the pages become landscape. For a portrait A4 delivery, rotate the source JPGs in the phone's editor and rebuild. If one page is wrong, rotate that photo before rebuilding, or split the page out with the <a href="/blog/pdf-merge-guide/extract-pages-range">range syntax</a>, rotate it and merge it back. Do not rotate the whole file to rescue one receipt.</p>
<p>Portrait versus landscape is a separate decision. A tall agreement belongs on a portrait page. A wide receipt or chart belongs on a landscape page, but the setting applies to every page in that batch, so build it separately if the rest of the bundle is portrait. The page orientation does not rotate the photo inside the page; fix a sideways photo before import or repair the finished PDF after.</p>

<h2 id="limits">Batch limits and oversized files</h2>
<ul>
<li><strong>20 images per batch.</strong> The picker rejects the 21st image. Split the set across two or more PDFs and merge the results.</li>
<li><strong>10MB per image.</strong> Re-encode a heavier JPG at <a href="/image-compressor">image compressor</a>, or export a smaller copy from the phone.</li>
<li><strong>30MB total per batch.</strong> This is the practical constraint for 20 pages: an average of 1.5MB each. A set of 3MB photos needs to be split or re-encoded.</li>
<li><strong>16 megapixels and 8192 pixels per side.</strong> A 12MP phone photo fits. A 48MP high-resolution capture may not, so export a smaller JPG before adding it.</li>
<li><strong>One image per page.</strong> The builder does not add OCR, page numbers, headers or compression settings, and it does not accept a custom output name. Rename <code>images.pdf</code> after download.</li>
</ul>
<p>Formats beyond JPG and PNG may pass the picker, but scans should stay JPG or PNG for predictable results. The PDF contains the images, not a text layer, so a scanned PDF will not be searchable without OCR. If the recipient needs selectable text, run OCR separately and keep this file as the visual record.</p>

<h2 id="verify">Verify before you send</h2>
<p>Check the page count against the number of images, then read the first page, the middle and the last. Confirm the order by the page numbers printed on the scans, not just the file names. Check rotation and legibility at 100% zoom, and confirm the file size against the email or portal cap. Name the PDF with the content and month, such as <code>rental-agreement-2026-10.pdf</code>, and keep the original JPGs until the recipient confirms the upload.</p>
<div class="cta-box"><strong>Your turn:</strong> open <a href="/image-to-pdf">image to PDF</a>, rename your scans in reading order, choose A4 portrait and build the file. If you have more than 20 images, build two PDFs and join them at <a href="/pdf-merge">PDF merge</a>. The <a href="/blog/pdf-merge-guide">full PDF workflow guide</a> covers compression, rotation and text extraction.</div>
<blockquote class="tip">General guidance only. For legally binding filings, confirm that the recipient accepts an assembled PDF, because some authorities require each scan as a separate file or a specific paper size.</blockquote>
`;

export const pdfScansPdf: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "jpg-scans-single-pdf",
  kind: "cluster",
  title: "JPG Scans to Single PDF: A4 Size and Order Guide",
  description:
    "Turn JPG phone scans into one A4 PDF: page size, effective DPI, a 12-scan walkthrough, HEIC conversion and the 20-image batch limit, all local.",
  keywords: ["jpg scans to single pdf", "combine phone scans into pdf", "a4 portrait jpg to pdf", "heic to jpg before pdf", "scan dpi for pdf"],
  toolSlugs: ["image-to-pdf", "pdf-merge", "image-compressor"],
  relatedSlugs: ["merge-multiple-pdfs-order", "extract-pages-range", "extract-text-without-ocr"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "setup", text: "Paper size and orientation", level: 2 },
    { id: "dpi-sizing", text: "Pixels, DPI and A4", level: 2 },
    { id: "worked-example", text: "12 scans to one PDF", level: 2 },
    { id: "orientation-heic", text: "HEIC and sideways photos", level: 2 },
    { id: "limits", text: "Batch limits", level: 2 },
    { id: "verify", text: "Verify before sending", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I combine JPG scans into one PDF?", answer: "Rename the scans in reading order, select up to 20 JPGs of 10MB each in the image to PDF tool, choose A4 portrait and generate the file. The download is images.pdf, so rename it by content and month. Check the numbered list before generating because the tool appends images in the order the file picker returns them and has no drag reorder." },
    { question: "Should I choose A4 or Letter?", answer: "A4 for agreements, applications and most documents outside the US; Letter for US forms and IRS paperwork. Letter is about 6mm wider and 18mm shorter than A4, so margins shift slightly. For wide charts or slides, use landscape and build that page separately if the rest of the bundle is portrait." },
    { question: "Why won't my iPhone photos import?", answer: "They are probably HEIC files, which the image to PDF tool does not accept. Convert to JPG by setting the iPhone camera to Most Compatible or by exporting the photo as JPG, then add the new file. Android phones usually produce JPG, but check the extension before retrying." },
    { question: "How many images can I put in one PDF?", answer: "The current batch cap is 20 images, 10MB each and 30MB total, with 16 megapixels and 8192 pixels per side. For a 30-page bundle, build two 15-page PDFs and merge them in order. JPEG bytes are embedded in the PDF, so the total size tracks the source images closely." },
    { question: "What DPI will the PDF use?", answer: "There is no DPI field. The tool embeds the image at its pixel size and scales it to the page, so effective DPI is pixel width divided by printed width in inches. A4 at 300 DPI is about 2480 by 3508 pixels; at 150 DPI it is about 1240 by 1754. A 12MP phone photo fitted to A4 is roughly 400 DPI." },
    { question: "Why are my scans sideways in the PDF?", answer: "A phone photo can look upright in the gallery because the app reads its EXIF orientation flag, while the PDF builder embeds the stored pixels and ignores the flag. Rotate the photo in the phone editor before importing, or fix the finished PDF with the Rotate view if every page is wrong. For one bad page, split, rotate and merge." },
  ],
};
