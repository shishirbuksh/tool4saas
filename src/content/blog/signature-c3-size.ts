import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A signature can be perfectly drawn and still look wrong because it is the wrong size. Too wide and it collides with the date line. Too narrow and the strokes turn into gray smudges. Stretched to fill a box and the letters lean like a funhouse mirror. The fix is not a new signature; it is a placement decision made before the PNG goes into the document.</p>
<p>The <a href="/signature-maker">signature maker</a> exports a 1200 by 400 pixel transparent PNG. That fixed source gives you plenty of pixels to work with. This guide explains how to choose dimensions for PDFs, contracts and forms, how 150 DPI guidance translates into placement width, how to scale without stretching, and what to check when a portal imposes its own limits.</p>

<h2 id="why-size-matters">Why signature size is a document decision</h2>
<p>The image does not have a single “correct” size. The document decides. A signature that fills a 2.5-inch line on a contract may be far too large for a form field that is 1.5 inches wide, and far too detailed for an email footer that displays at 160 pixels. What stays constant is the shape: the maker's canvas is 3:1, so the placed image should remain 3:1 unless you deliberately crop it.</p>
<p>Size affects three things at once. Legibility is the first: thin strokes disappear when reduced too far. Balance is the second: a signature should look like it belongs on the line, not like a banner pasted over the page. File size is the third: a large placed image may still be a small PNG, but some portals limit bytes and dimensions independently, so a visually correct file can fail an upload check.</p>
<p>Start by measuring the destination, not by choosing a number that sounds professional. Note the width of the signature line, the height of the form box, the page size, and any pixel or byte limit printed in the portal instructions. Those measurements turn the rest of this guide into simple arithmetic.</p>

<h2 id="pixels-and-dpi">Pixels, inches and what 150 DPI means</h2>
<p>A digital image is measured in pixels. A printed page is measured in inches or millimeters. DPI, dots per inch, connects the two: at 150 DPI, one inch of paper holds 150 pixels. A two-inch-wide signature therefore uses about 300 pixels of image width. At 300 DPI, the same two inches would use 600 pixels.</p>
<p>The maker's 1200-pixel width supports a signature up to 8 inches wide at 150 DPI, or 4 inches wide at 300 DPI. That is far larger than a normal signature block, which is why the source file has room to spare. When you place the PNG at two inches wide, the effective resolution is 1200 divided by 2, or 600 DPI. The image is being downscaled, which generally keeps edges clean.</p>
<table>
<thead><tr><th>Placed width</th><th>Pixels needed at 150 DPI</th><th>Effective DPI from a 1200 px source</th><th>Typical use</th></tr></thead>
<tbody>
<tr><td><strong>1.5 inches</strong></td><td>225 px</td><td>800 DPI</td><td>Narrow form field</td></tr>
<tr><td><strong>2.0 inches</strong></td><td>300 px</td><td>600 DPI</td><td>Invoice or letter</td></tr>
<tr><td><strong>2.5 inches</strong></td><td>375 px</td><td>480 DPI</td><td>Contract signature block</td></tr>
<tr><td><strong>4.0 inches</strong></td><td>600 px</td><td>300 DPI</td><td>Large printed form</td></tr>
<tr><td><strong>8.0 inches</strong></td><td>1200 px</td><td>150 DPI</td><td>Practical upper limit</td></tr>
</tbody>
</table>
<p>Treat 150 DPI as a floor for printed work, not a target to hit exactly. A signature placed at 2 inches wide from the 1200-pixel master is comfortably above it. If a document will be printed at a large size, keep the placed width under four inches so the effective resolution stays at 300 DPI or better.</p>

<h2 id="placement-sizes">Starting dimensions for PDFs, contracts and forms</h2>
<p>The table below gives practical starting widths. These are not universal standards; they are sensible ranges that keep a signature readable without dominating the page. Adjust them to the document's actual line and the space around it.</p>
<table>
<thead><tr><th>Placement</th><th>Width range</th><th>Height at 3:1</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>PDF contract block</strong></td><td>2.0 to 2.5 inches</td><td>0.67 to 0.83 inches</td><td>Leave room for a printed name and date</td></tr>
<tr><td><strong>Offer letter</strong></td><td>2.0 to 2.5 inches</td><td>0.67 to 0.83 inches</td><td>Align the baseline with the signature rule</td></tr>
<tr><td><strong>Consent or exam form</strong></td><td>1.5 to 2.0 inches</td><td>0.50 to 0.67 inches</td><td>Match the printed box, not the page margin</td></tr>
<tr><td><strong>Invoice</strong></td><td>1.8 to 2.2 inches</td><td>0.60 to 0.73 inches</td><td>Keep clear of totals and payment terms</td></tr>
<tr><td><strong>Email footer</strong></td><td>150 to 220 pixels</td><td>50 to 73 pixels</td><td>Screen use; DPI does not apply</td></tr>
</tbody>
</table>
<p>For a PDF, the page size matters mainly because it limits the space around the signature block. A US Letter page is 8.5 by 11 inches; A4 is 8.27 by 11.69 inches. A 2.5-inch signature fits comfortably in either when the block is laid out correctly. The risk is not the page size but a cramped block where the signature overlaps a date, a title or another signature line.</p>

<h2 id="scale-without-stretching">Scaling without stretching</h2>
<p>Stretching happens when width and height are changed by different amounts. The letters become wider or taller than they should be, and the signature looks artificial even if the ink is clean. The cure is to scale by one dimension and let the other follow, or to type both values in the same 3:1 relationship.</p>
<p>For a 1200 by 400 source, the height is always one third of the width. A 2.4-inch-wide placement should be 0.8 inches high. A 300-pixel-wide placement should be 100 pixels high. If the destination box is 2.4 by 0.7 inches, do not force the height to 0.7; reduce the width to 2.1 inches so the signature fits at its natural ratio.</p>
<p>Some editors offer a “fit to frame” command that changes both dimensions independently. Avoid it for signatures. Use “fit width” or hold the aspect-lock key while dragging a corner. If the signature must fill a box with a different ratio, pad the transparent canvas around the image rather than distorting the strokes. That preserves the letter shapes and keeps the background invisible.</p>
<p>Cropping is the other legitimate way to change the ratio. Trimming empty transparent margins can make a wide canvas fit a narrower box without touching the ink. Do that on a copy, keep the full master, and check that no flourish or descender was cut off.</p>

<h2 id="portal-limits">Portal-specific limits and how to meet them</h2>
<p>Upload portals rarely share one standard. Before you resize anything, read the instructions for four numbers: maximum width, maximum height, maximum file size, and accepted format. Some portals state a pixel box, some state a physical size in inches or millimeters, and some state only a byte limit. Each constraint needs a different response.</p>
<ul>
<li><strong>Pixel box:</strong> resize a copy to fit inside the box while keeping the 3:1 ratio. A 300 by 100 box matches the canvas exactly. A 600 by 200 box is the same shape at twice the size.</li>
<li><strong>Physical size:</strong> convert to pixels at the portal's DPI. A 2-inch width at 150 DPI is 300 pixels; at 300 DPI it is 600 pixels. One inch equals 25.4 millimeters.</li>
<li><strong>Byte cap:</strong> compress a copy after resizing. The <a href="/image-compressor">image compressor</a> can resize and compress; lower the quality setting gradually and check the result at 100 percent zoom.</li>
<li><strong>Format:</strong> the <a href="/image-format-converter">image format converter</a> handles JPG, PNG and WebP, one file at a time up to 10MB, but it does not resize. Convert a resized copy, not the master.</li>
</ul>
<p>A portal that demands an exact box with a different ratio is the awkward case. If the box is 400 by 150 pixels, the 3:1 signature would be 400 by 133 pixels, leaving a 17-pixel gap. Padding the transparent canvas to 400 by 150 keeps the ink undistorted. Stretching the signature to fill the box is faster but visibly wrong.</p>
<p>Upload limits can also reject a file that looks small on screen. Keep the original PNG, work on copies, and test the upload before an important deadline. If the portal shows a preview, inspect it: some portals resize or re-encode uploads, and the preview is the version that matters.</p>

<h2 id="compression">Compress only after the dimensions are right</h2>
<p>Resizing and compressing solve different problems. Resizing changes the pixel dimensions; compressing changes how many bytes those pixels occupy. Do the dimensions first, because compressing a 1200-pixel image that will be displayed at 300 pixels wastes effort and can soften detail that was about to be discarded anyway.</p>
<p>The signature maker's PNG often stays small because most of the canvas is transparent and the ink covers a limited area. If a portal still imposes a byte cap, open a copy in the <a href="/image-compressor">image compressor</a>, resize to the required box if needed, and reduce the quality setting until the file fits. Check the strokes at 100 percent zoom after each pass; a signature that meets the byte limit but turns fuzzy has solved the wrong problem.</p>
<p>Keep the transparent PNG master. Compression can introduce faint artifacts around anti-aliased edges, especially on colored pages. A compressed copy for one portal should not replace the clean file you use everywhere else. If the portal accepts PNG, prefer it; if it demands JPG, remember that transparency will be lost and the background will become solid.</p>

<h2 id="worked-examples">Two worked examples</h2>
<p><strong>Example 1: a contract with a 2.2-inch signature line.</strong> The line is 2.2 inches wide on a white page. At 150 DPI, the placement needs 330 pixels of width. The 1200-pixel master is more than enough, so the image is downscaled and the effective resolution is about 545 DPI. The height follows the 3:1 ratio: 2.2 divided by 3 is about 0.73 inches. That leaves room above the printed name and below the date. No stretching is needed because the signature line and the canvas share a wide shape.</p>
<p><strong>Example 2: an exam form with a 300 by 100 pixel box.</strong> The portal states an exact pixel box, so the 1200 by 400 canvas maps to 300 by 100 by dividing both dimensions by four. The ratio is unchanged and the strokes stay proportional. If the form also caps the file at a modest byte size, the resized copy goes through the compressor, and the result is checked in the portal preview. If the box were 400 by 150 instead, the signature would be placed at 400 by 133 and the transparent canvas padded to 150 pixels high rather than stretching the letters.</p>

<h2 id="related-guides">Related signature guides</h2>
<ul>
<li><a href="/blog/signature-maker-guide/how-to-create-signature-online">How to create a signature online</a> covers the drawing, typing and export steps.</li>
<li><a href="/blog/signature-maker-guide/transparent-signature-png">Transparent signature PNG</a> explains checkerboards, clean edges and the JPG trap.</li>
<li><a href="/blog/signature-maker-guide/sign-pdf-without-printing">Sign a PDF without printing</a> walks through placing the image in a PDF.</li>
<li><a href="/blog/signature-maker-guide/signature-for-exam-forms">Signature for exam forms</a> covers strict form boxes and upload rules.</li>
<li>The <a href="/blog/signature-maker-guide">signature maker guide</a> connects every post in this silo.</li>
</ul>
<div class="cta-box"><strong>Get the dimensions right:</strong> make the signature first in the <a href="/signature-maker">free signature maker</a>, then resize or compress a copy with the <a href="/image-compressor">image compressor</a> if a document or portal demands a specific size. Both tools run locally with no account.</div>
`;

export const signatureSize: BlogPost = {
  pillar: "signature-maker-guide",
  slug: "signature-size-for-pdf",
  kind: "cluster",
  title: "Signature Size for PDF: Dimensions, DPI and Scaling",
  description:
    "Choose signature dimensions for PDFs, contracts and forms, scale a 1200x400 PNG without stretching, and follow portal size limits.",
  keywords: ["signature size for pdf", "signature dimensions for documents", "signature 150 dpi", "resize signature png", "signature size for forms", "signature image scaling"],
  toolSlugs: ["signature-maker", "image-compressor"],
  relatedSlugs: ["how-to-create-signature-online", "transparent-signature-png", "sign-pdf-without-printing", "signature-for-exam-forms"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-size-matters", text: "Why signature size matters", level: 2 },
    { id: "pixels-and-dpi", text: "Pixels, inches and 150 DPI", level: 2 },
    { id: "placement-sizes", text: "Starting dimensions for documents", level: 2 },
    { id: "scale-without-stretching", text: "Scaling without stretching", level: 2 },
    { id: "portal-limits", text: "Portal-specific limits", level: 2 },
    { id: "compression", text: "Compress after resizing", level: 2 },
    { id: "worked-examples", text: "Two worked examples", level: 2 },
    { id: "related-guides", text: "Related signature guides", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the best signature size for a PDF contract?", answer: "Start with 2.0 to 2.5 inches wide, which usually matches the printed signature line. At 150 DPI that is 300 to 375 pixels. The 1200-pixel master is downscaled, so the edges stay clean. Keep the original 3:1 ratio and let the height follow, rather than typing separate width and height values." },
    { question: "How many pixels is 150 DPI for a signature?", answer: "At 150 DPI, multiply the width in inches by 150. A two-inch signature needs about 300 pixels, and a 2.5-inch signature needs about 375 pixels. The maker's 1200-pixel canvas covers up to 8 inches at 150 DPI, though normal document placement is much smaller and therefore sharper." },
    { question: "Why does my signature look stretched in the form?", answer: "The width and height were changed independently. The canvas is 3:1, so a 2.4-inch-wide image should be 0.8 inches high. Fit the width, lock the aspect ratio, or pad the transparent canvas when the box has a different shape. Do not use a fit-to-frame command that changes both dimensions." },
    { question: "Can I resize the signature with the image compressor?", answer: "Yes. The image compressor can resize and compress an image, so it is the right tool when a portal enforces a pixel box or a byte limit. Work on a copy, keep the PNG master, and check the strokes at 100 percent zoom after resizing. The image format converter changes formats but does not resize." },
    { question: "What if the portal demands a specific pixel box?", answer: "Resize a copy to fit inside the box while keeping the 3:1 ratio. A 300 by 100 box matches the canvas exactly, and a 600 by 200 box is the same shape at twice the size. If the box has a different ratio, pad the transparent canvas rather than stretching the signature. Check the portal preview before submitting." },
    { question: "Does DPI metadata matter more than pixel dimensions?", answer: "For most printing and document placement, pixel dimensions and the placed size matter most. DPI is a relationship between pixels and inches. Some portals read a DPI tag, so follow their instructions if they mention one. The maker focuses on a 1200 by 400 pixel canvas, and you control the placed width in the document." },
  ],
};
