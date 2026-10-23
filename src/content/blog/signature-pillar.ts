import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A signature file is usually needed at the last minute: a lease arrives, a school form asks for a parent's mark, or a client sends a contract with an upload box. The <a href="/signature-maker">signature maker</a> turns a name into a clean image in minutes. Draw with a mouse, finger or pen, or type in a cursive face, adjust the ink, and download a transparent PNG.</p>
<p>This guide covers both methods, the stroke and color choices that survive scaling, transparency, and the dimensions that suit PDFs, forms and email. It also states the boundary: the tool makes a picture of a signature. It does not sign PDFs, verify identity, remove the background from an uploaded photo, or create a cryptographic e-signature.</p>
<p>Read in order for a full workflow, or jump to the section you need. Every cluster guide is linked at the end.</p>

<h2 id="what-signature-maker-does">What the signature maker does</h2>
<p>The canvas is fixed at 1200 by 400 pixels, a wide rectangle with room for a full name and a flourish. You create one signature at a time, either by drawing freehand or by typing a name in one of the cursive fonts. Stroke width and ink color stay adjustable, and the export is a PNG with a transparent background.</p>
<p>Everything runs on your device. The canvas is local, and the PNG is generated in the tab. No account is needed and no image is uploaded. Closing the tab clears the work, so download the file first.</p>
<p>The output is an image, not a signing event. Placing it on a contract is different from applying a certificate-based digital signature with a timestamp or audit trail. The tool does not edit PDFs or fill a signature field. It supplies a graphic for a document you already have: a signature block, an invoice, a consent form, a letterhead or an email footer.</p>
<p>Common placements include a signature line on a service agreement, an approval block on an invoice, a consent field on a school form and a sign-off at the end of a letter. The image is the same kind of mark in each case; only the required size and background change.</p>

<h2 id="draw-or-type">Draw or type: choosing your method</h2>
<p>Both methods produce a transparent PNG from the same canvas, but they fail differently. Drawing captures the variation of a hand. Typing produces a shape that repeats exactly across documents.</p>
<table>
<thead><tr><th>Method</th><th>Control</th><th>Consistency</th><th>Best for</th><th>Watch out</th></tr></thead>
<tbody>
<tr><td><strong>Draw</strong></td><td>Every curve comes from your hand</td><td>Varies between attempts</td><td>Personal contracts and letters</td><td>Shaky lines, uneven spacing</td></tr>
<tr><td><strong>Type</strong></td><td>Font choice, stroke and color</td><td>Identical on every export</td><td>Repeatable paperwork, forms, email</td><td>Less personal; small sizes blur</td></tr>
</tbody>
</table>
<p>Drawing works best when you slow down. A signature drawn at normal speed can look rushed once scaled into a contract, because every wobble is preserved. Use a pen or stylus if you have one, move in smooth arcs, and leave a margin around the name. If a stroke goes badly wrong, start a fresh signature rather than patching it.</p>
<p>Typing works best when the name is entered exactly as it should appear. Choose a cursive font by reading the full name at final size, not by judging the font name. A font that looks dramatic at full size can become tangled in a narrow form box. Check descenders on g, j and y, and confirm that the first and last letters stay distinct. The <a href="/blog/signature-maker-guide/drawn-vs-typed-signature">drawn versus typed guide</a> compares the styles in more depth.</p>

<h2 id="canvas-stroke-color">Canvas, stroke and color settings that matter</h2>
<p>The 1200 by 400 canvas has a 3:1 ratio, which suits a name that runs wider than it is tall. Keep the signature inside the central band and leave clear space at the top, bottom and sides. Those transparent margins protect a capital letter or trailing flourish when the image is placed. If the document aligns the signature to a baseline, place the image so the lowest stroke sits just above the line rather than floating in the middle of the block.</p>
<p>Stroke width controls how the signature holds up when reduced. A hairline can look elegant at full size and fade into a smudge in a small form field. A heavy stroke can overwhelm a printed contract. Thin strokes suit large display use, a medium stroke suits ordinary documents, and a heavy stroke suits bold branding. Preview at the final size before committing.</p>
<p>Color is a contrast decision. Near-black and deep navy read as conventional signatures on white paper. The transparent background takes on the page color, so the ink must contrast with whatever sits behind it. For a dark slide, export a second version with light ink instead of recoloring the first file.</p>
<p>Check the signature against both a white and a dark surface in the preview. Look for thin joins between letters, a capital that crowds the edge, and a baseline that drifts. A handwritten mark can be slightly uneven; a clipped letter cannot.</p>

<h2 id="transparent-png">Why export a transparent PNG</h2>
<p>Transparency makes the image usable. A PNG stores an alpha channel, so the empty pixels take on the color of the page underneath. Drop the file on a white contract and the background is white; drop it on a cream letterhead or a gray form and the background changes while the ink stays clean.</p>
<p>Editors show transparency as a gray and white checkerboard, which is not part of the image. It is a warning that those areas have no color. Convert the file to JPG and the checkerboard disappears while the converter fills the empty area, usually with white. On a white page the result may look fine. On a colored page it becomes a visible rectangle. The <a href="/blog/signature-maker-guide/transparent-signature-png">transparent PNG guide</a> explains the test and the JPG trap.</p>
<p>The maker exports PNG only, not SVG. At 1200 by 400 pixels there is enough resolution for ordinary documents, especially at two or three inches wide. Keep the PNG as your master, place copies, and avoid repeated screenshots or re-saves. Name the dark-ink and light-ink files so they are easy to tell apart. The original stays useful because every later placement can be scaled from it without revisiting the maker.</p>

<h2 id="signature-size">Sizing a signature for PDFs, forms and email</h2>
<p>The canvas is 1200 pixels wide, but the placed signature is usually much smaller. Size is a relationship between the image and the document. A contract block might be 2.5 inches wide, an email footer 160 pixels, and a form field 1.5 inches. The same PNG serves all three if it is scaled down with its proportions locked.</p>
<p>DPI is a placement guideline. At 150 DPI, one inch holds 150 pixels, so a two-inch signature needs about 300 pixels of source width. The 1200-pixel canvas covers up to 8 inches at 150 DPI, far more than a normal block. Downscaling keeps edges crisp; enlarging beyond the source pixels makes strokes soft.</p>
<table>
<thead><tr><th>Placement</th><th>Starting width</th><th>Pixels at 150 DPI</th></tr></thead>
<tbody>
<tr><td><strong>Contract block</strong></td><td>2.0 to 2.5 inches</td><td>300 to 375 px</td></tr>
<tr><td><strong>Form field</strong></td><td>1.5 to 2.0 inches</td><td>225 to 300 px</td></tr>
<tr><td><strong>Email footer</strong></td><td>1.0 to 1.5 inches</td><td>150 to 225 px</td></tr>
<tr><td><strong>Dark slide</strong></td><td>1.5 to 2.0 inches</td><td>225 to 300 px</td></tr>
</tbody>
</table>
<p>Treat those numbers as starting points. The document layout decides the final size. A signature wider than the line looks pasted on, and one much narrower looks timid. Keep the 3:1 ratio: set the width and let the height follow. Because the canvas is 3:1, the height is one third of whatever width you choose, so a 2.4-inch signature is about 0.8 inches tall. If a box is shorter, reduce the width or crop empty transparent margins rather than squashing the image. The <a href="/blog/signature-maker-guide/signature-size-for-pdf">signature size guide</a> works through the arithmetic.</p>

<h2 id="using-the-png">Using the PNG in documents, forms and email</h2>
<p>In a word processor, insert the PNG as an image, place it above the signature line, and size it by width. In a PDF editor, add it as an image layer, position it over the block, and export a flattened copy if the recipient needs one file. Flattening is a document-editor step, not something the maker performs. The maker only supplies the image.</p>
<p>Web forms vary. Some accept PNG, others demand JPG, and some enforce a pixel box or a byte cap. The <a href="/image-format-converter">image format converter</a> changes a file between JPG, PNG and WebP, one file at a time up to 10MB, and does not resize. If the portal also limits dimensions or bytes, use the <a href="/image-compressor">image compressor</a> afterward.</p>
<p>For email, keep the display width modest. A dark-ink file works in a white message body; a light-ink file is safer in a dark template. Test the message in the client you actually use, because some clients block images or render them at a different size.</p>
<p>Acceptance is separate from image quality. A recipient or portal may require a specific signing process, a handwritten original, or a verified service. This is general information, not legal advice. Check the document's instructions before relying on an image alone.</p>

<h2 id="limits-and-privacy">What the tool does not do</h2>
<p>The limits are part of choosing the tool. It handles one signature at a time on a fixed 1200 by 400 canvas and exports a transparent PNG. It does not export SVG, batch-process names or store a library. It does not remove the background from a photo of a signature on paper. It does not sign, edit or flatten PDFs, verify identity, or provide a certificate-based signature with an audit trail.</p>
<p>Privacy is the strong point. Drawing and typing happen locally, and nothing is sent to a server. There is no account and no cloud copy. The tradeoff is that the work is temporary: refreshing or closing the tab clears the canvas. Download the PNG as soon as it looks right.</p>
<p>The tool cannot recover a lost signature, sync between devices or confirm a download. It is a creation tool, not a record keeper. Treat it like a desk: work quickly and privately, then take the paper with you. When a document requires a recognized signing process, use what the document specifies. The <a href="/blog/signature-maker-guide/electronic-signature-validity">validity guide</a> covers that distinction; this page makes no legal claim about any particular use.</p>

<h2 id="workflow">A repeatable workflow, with two worked examples</h2>
<p>The same sequence works for most jobs: measure the placement, choose the method, set the ink, preview at final size, export, and place. The examples show how the choices change.</p>
<ol>
<li><strong>Measure the space.</strong> Note the signature line or form box width and the background color.</li>
<li><strong>Choose the method.</strong> Draw for a personal mark, type for repeatable paperwork.</li>
<li><strong>Set the ink.</strong> Use medium dark ink for white pages, a light version for dark surfaces.</li>
<li><strong>Preview at final size.</strong> Shrink the view until it matches the document placement.</li>
<li><strong>Export and name the PNG.</strong> Keep the transparent original before closing the tab.</li>
<li><strong>Place, then check.</strong> Lock the aspect ratio and inspect the printed or exported result.</li>
</ol>
<p><strong>Example 1: a typed signature for a consulting contract.</strong> Priya needs a signature for a two-page agreement with a 2.2-inch line on a white page. She types “Priya Nair” in a cursive face, sets a medium stroke in deep navy, and checks that the descender of the y clears the bottom margin. She exports the 1200 by 400 PNG and places it at 2.2 inches wide. At 150 DPI that placement uses about 330 source pixels, so the master is downscaled and the edges stay sharp. The transparent background lets the white page show through.</p>
<p><strong>Example 2: a drawn signature for a form and an email footer.</strong> Arjun draws with a pen tablet, using a medium black stroke and leaving space around the letters. For a form with a 2.5-inch box, he places the PNG at 2.5 inches wide, about 375 pixels at 150 DPI. For his email footer, he uses the same file at 160 pixels wide. The form is white and the email background is light gray, so dark ink works in both. If the template turns dark, he exports a light-ink version rather than recoloring the placed image. In both examples the source stays at 1200 by 400 and the document receives a scaled copy, which keeps one master while serving different placements.</p>

<h2 id="mistakes">Common mistakes and a final check</h2>
<ol>
<li><strong>Screenshot instead of export.</strong> A screenshot captures the page background. Download the PNG.</li>
<li><strong>Converting to JPG.</strong> JPG has no transparency and fills the background with white. Keep PNG for placement.</li>
<li><strong>Stretching to fit.</strong> Forcing a 3:1 signature into a square distorts the letters. Scale by width.</li>
<li><strong>Too thin a stroke.</strong> Hairlines disappear in small form fields. Preview at final size.</li>
<li><strong>Dark ink on a dark page.</strong> The background takes on the page color. Export a light version.</li>
<li><strong>Expecting it to sign a PDF.</strong> The maker produces an image. Use a document editor to place it.</li>
</ol>
<p>Before sending anything, view the placed signature at 100 percent zoom and at print size. Check that no letter is clipped, that the baseline sits naturally, and that the ink contrasts with the page. Then open the PNG once more to confirm the background is transparent. A clean checkerboard in the preview and a clean page in the document are the two signs that the export worked. A few seconds of checking at the destination prevents most rework.</p>

<h2 id="silo-map">All signature guides in this silo</h2>
<p>Each guide below solves one part of the job. Start with the creation walkthrough, then follow the size and transparency guides as your documents demand.</p>
<ul>
<li><a href="/blog/signature-maker-guide/how-to-create-signature-online">How to create a signature online</a> — the drawing, typing and export workflow.</li>
<li><a href="/blog/signature-maker-guide/transparent-signature-png">Transparent signature PNG</a> — checkerboard checks and the JPG trap.</li>
<li><a href="/blog/signature-maker-guide/signature-size-for-pdf">Signature size for PDF</a> — dimensions, DPI, scaling and portal limits.</li>
<li><a href="/blog/signature-maker-guide/drawn-vs-typed-signature">Drawn versus typed signature</a> — which method fits which document.</li>
<li><a href="/blog/signature-maker-guide/sign-pdf-without-printing">Sign a PDF without printing</a> — placing an image in a PDF workflow.</li>
<li><a href="/blog/signature-maker-guide/signature-image-for-email">Signature image for email</a> — sizing and contrast for footers.</li>
<li><a href="/blog/signature-maker-guide/electronic-signature-validity">Electronic signature validity</a> — image versus recognized signing process.</li>
<li><a href="/blog/signature-maker-guide/signature-for-exam-forms">Signature for exam forms</a> — strict form boxes and upload limits.</li>
</ul>
<div class="cta-box"><strong>Make your signature:</strong> open the <a href="/signature-maker">free signature maker</a>, draw or type your name on the 1200 by 400 canvas, adjust the ink, and download a transparent PNG. Everything runs locally, one signature at a time, with no account required.</div>
`;

const toc = [
  { id: "what-signature-maker-does", text: "What the signature maker does", level: 2 as const },
  { id: "draw-or-type", text: "Draw or type: choosing your method", level: 2 as const },
  { id: "canvas-stroke-color", text: "Canvas, stroke and color settings", level: 2 as const },
  { id: "transparent-png", text: "Why export a transparent PNG", level: 2 as const },
  { id: "signature-size", text: "Sizing a signature for PDFs, forms and email", level: 2 as const },
  { id: "using-the-png", text: "Using the PNG in documents and forms", level: 2 as const },
  { id: "limits-and-privacy", text: "What the tool does not do", level: 2 as const },
  { id: "workflow", text: "A repeatable workflow with examples", level: 2 as const },
  { id: "mistakes", text: "Common mistakes and a final check", level: 2 as const },
  { id: "silo-map", text: "All signature guides in this silo", level: 2 as const },
];

export const signaturePillar: BlogPost = {
  pillar: "signature-maker-guide",
  slug: "signature-maker-guide",
  kind: "pillar",
  title: "Signature Maker Guide: Draw, Type & Download a Transparent PNG",
  description:
    "Create a signature online: draw with mouse, touch or pen, type in cursive fonts, then export a transparent PNG for PDFs, forms and email.",
  keywords: ["signature maker guide", "how to make a signature online", "transparent signature png", "draw signature online", "typed signature cursive font", "signature size for pdf", "signature png 1200x400", "free signature maker offline"],
  toolSlugs: ["signature-maker"],
  relatedSlugs: ["how-to-create-signature-online", "transparent-signature-png", "signature-size-for-pdf", "drawn-vs-typed-signature", "sign-pdf-without-printing", "signature-image-for-email", "electronic-signature-validity", "signature-for-exam-forms"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc,
  html,
  faqs: [
    { question: "Can I draw a signature with a mouse, finger or pen?", answer: "Yes. The canvas accepts mouse, touch and stylus input. A pen or stylus gives the smoothest curves, while a finger or mouse works for a simple name. Slow the stroke down, leave a margin around the letters, and preview the result at the size it will appear in the document. If a stroke goes wrong, start a fresh signature rather than trying to repair it." },
    { question: "Does the signature maker export SVG or only PNG?", answer: "It exports a transparent PNG. There is no SVG export. The 1200 by 400 pixel canvas gives enough resolution for contracts, forms and email when the image is placed at two or three inches wide. Keep the PNG as your master and avoid repeated screenshots or format conversions, which can soften the edges." },
    { question: "Does the tool sign PDFs or verify my identity?", answer: "No. It creates an image of a signature. It does not edit or sign PDFs, verify identity, issue a certificate or provide an audit trail. You insert the PNG into a document with a word processor or PDF editor. If a document requires a recognized electronic signature service or a handwritten original, follow the process it specifies." },
    { question: "Why is my signature background white instead of transparent?", answer: "You are probably looking at a JPG or a screenshot. JPG has no alpha channel, so transparent areas are filled with a solid color, usually white. The maker's PNG keeps the background empty. Open the PNG in an editor and look for the checkerboard pattern, which indicates transparency, then place that PNG on the page." },
    { question: "What size should I place the signature at?", answer: "Match the document's signature line. A contract block commonly sits around 2.0 to 2.5 inches wide, a form field around 1.5 to 2.0 inches, and an email footer around 150 to 225 pixels. At 150 DPI, a 2-inch placement uses about 300 pixels. Always scale by width and keep the original 3:1 ratio to avoid stretching." },
    { question: "Is my signature uploaded anywhere?", answer: "No. Drawing, typing and PNG generation run locally in your browser. There is no account and no server copy. The tradeoff is that the canvas is temporary: refreshing or closing the tab clears the signature. Download the PNG before you leave and keep a master copy for future documents." },
  ],
};
