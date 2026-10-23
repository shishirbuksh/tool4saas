import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Making a signature image takes less time than finding a pen. The <a href="/signature-maker">signature maker</a> opens with a 1200 by 400 canvas, accepts a mouse, finger or stylus, and also renders a typed name in a cursive font. You adjust the ink, download a transparent PNG, and place it wherever the document needs it.</p>
<p>This walkthrough covers the complete sequence: preparing the name, drawing or typing it, choosing a stroke and color, exporting the PNG, and using the file without damaging its transparency. It also covers the problems that show up after export, which are usually placement mistakes rather than drawing mistakes.</p>

<h2 id="before-you-start">Before you start: decide the name and the destination</h2>
<p>Write the name exactly as you want it to appear. A formal contract may need a full first and last name, while an email footer may use a shorter form. Changing the name after you have drawn a signature means starting over, so settle that detail first.</p>
<p>Next, identify where the image will go and what color sits behind it. A white contract page needs dark ink, and a dark header needs light ink. One file cannot be visible on both backgrounds. Note the width of the signature line or form box as well, because that width guides the final placement.</p>
<p>No account or upload is needed. The tool runs locally, creates one signature at a time, and exports PNG only. It does not sign PDFs or verify identity.</p>

<h2 id="draw-your-signature">Draw your signature with a mouse, finger or pen</h2>
<p>Drawing is the more personal route. The canvas records your hand movement, so the result carries the small variations that make a signature look written. A stylus gives the most control, a touch screen is close, and a mouse works if you move slowly.</p>
<ol>
<li>Open the <a href="/signature-maker">signature maker</a> and choose the drawing option.</li>
<li>Set a medium stroke and a dark ink color as a starting point.</li>
<li>Draw the name across the middle of the canvas, leaving a margin at the top, bottom and sides.</li>
<li>Pause and inspect the joins between letters. If a stroke is badly placed, start a fresh signature rather than adding repairs.</li>
<li>Preview the result against a white and a dark background before exporting.</li>
</ol>
<p><strong>Example 1: a drawn signature for a lease.</strong> Maya uses a pen tablet to sign a printed lease that will be scanned and emailed. She draws “Maya Ortiz” with a medium black stroke, keeping the capital M about one third of the canvas height and leaving space below the tail of the y. She exports the PNG, places it at 2.4 inches wide on the signature line, and checks the printed page. Because the ink is dark and the paper is white, the transparent background is invisible and the signature sits naturally above the date line.</p>
<p>A mouse can produce a usable signature, but short, jerky strokes look like a polyline rather than handwriting. If your hand is unsteady, a typed signature may give a cleaner document mark.</p>

<h2 id="type-your-signature">Type your signature in a cursive font</h2>
<p>Typing gives you a repeatable shape. The tool renders the name in the available cursive faces, and you choose the one that keeps every letter readable. A font that looks dramatic in a large preview can become a tangle in a 1.5-inch form field, so judge it at final size.</p>
<ol>
<li>Select the typing option and enter the name exactly as it should appear.</li>
<li>Cycle through the cursive fonts and read the full name, not just the first letter.</li>
<li>Check letters with descenders and ascenders so nothing collides with the canvas edge.</li>
<li>Set the stroke weight and ink color for the intended background.</li>
<li>Export the transparent PNG and place it at the document's signature width.</li>
</ol>
<p><strong>Example 2: a typed signature for a freelance invoice.</strong> Daniel sends monthly invoices and wants a consistent mark on each one. He types “Daniel Okafor” in a cursive face with a medium navy stroke, exports the PNG once, and saves it as daniel-okafor-signature.png. On each invoice he places the image at 2.0 inches wide above the payment terms. At 150 DPI that is about 300 pixels from the 1200-pixel master, so the edges stay clean. The transparent background lets the white space show through.</p>
<p>Typed signatures do not need to imitate a hand perfectly; their advantage is consistency. If a recipient expects a handwritten mark, draw instead. The <a href="/blog/signature-maker-guide/drawn-vs-typed-signature">drawn versus typed comparison</a> explores the tradeoff.</p>

<h2 id="adjust-stroke-and-color">Adjust stroke and color for the final size</h2>
<p>Stroke width is the setting most likely to look wrong after scaling. A delicate line can fade in a form field, while a bold line can swallow the gaps inside letters. Preview at the actual placement size, not at full canvas size.</p>
<table>
<thead><tr><th>Setting</th><th>Starting choice</th><th>Best for</th><th>Watch out</th></tr></thead>
<tbody>
<tr><td><strong>Stroke</strong></td><td>Medium</td><td>Contracts, forms, invoices</td><td>Thin strokes fade when reduced</td></tr>
<tr><td><strong>Dark ink</strong></td><td>Black or deep navy</td><td>White paper and light forms</td><td>Can disappear on dark themes</td></tr>
<tr><td><strong>Light ink</strong></td><td>White or pale gray</td><td>Dark slides and dark email templates</td><td>Invisible on white paper</td></tr>
<tr><td><strong>Margins</strong></td><td>Clear space on all sides</td><td>Every placement</td><td>Clipped capitals look like errors</td></tr>
</tbody>
</table>
<p>Color should contrast with the page, not with the preview panel. Deep navy reads as a formal signature and separates slightly from black body text. Pure black is stronger and reproduces well in print. If the document uses a colored header or a dark background, make a second export with light ink rather than recoloring the placed image.</p>
<p>Check the whole name after each change. A heavier stroke can close the loops in letters such as a, e and o, and a light color can make a thin stroke look weaker than expected.</p>

<h2 id="export-the-png">Export the transparent PNG</h2>
<p>When the preview looks right, download the file. The maker produces a PNG with an empty background, so the page color will show through wherever there is no ink. That is the feature that makes the image useful on contracts, letterheads and colored forms. It is also the feature that disappears if you later convert the file to JPG.</p>
<p>Give the download a descriptive name. Include the ink color if you keep both versions, for example signature-dark.png and signature-light.png. Save the master somewhere you can find it again. The tool does not keep a gallery, and the canvas is temporary; closing or refreshing the tab clears the work.</p>
<p>The export is a raster image, not an SVG. It has a fixed pixel grid of 1200 by 400. That is enough for ordinary document placement, especially at two or three inches wide. It is not a vector file that can be enlarged indefinitely without softening. If a designer asks for SVG, this tool is the wrong source; use a vector editor instead.</p>

<h2 id="use-the-png">Place the PNG in a document, form or email</h2>
<p>In a word processor, use the insert-image command, choose the PNG, and set the image to appear in front of or behind text as needed. Drag the corner handle to resize while holding the aspect lock, or type the width and let the height follow. The source ratio is 3:1, so a 2.4-inch-wide signature should be about 0.8 inches tall. If the box is shorter, reduce the width rather than squashing the height.</p>
<p>In a PDF editor, add the PNG as an image layer, position it over the signature line, and export a flattened copy if the recipient needs one file. The signature maker does not edit PDFs and cannot fill a signature field. It only creates the image. For a full placement workflow, see the <a href="/blog/signature-maker-guide/sign-pdf-without-printing">sign a PDF without printing guide</a>.</p>
<p>Web forms vary. Some accept a PNG upload, some demand JPG, and some enforce a pixel box or a file-size cap. If the portal refuses PNG, convert the file with the <a href="/image-format-converter">image format converter</a>, which handles JPG, PNG and WebP one file at a time up to 10MB and does not resize. If the portal also limits dimensions or bytes, use the <a href="/image-compressor">image compressor</a> to resize or compress the converted file. The <a href="/blog/signature-maker-guide/signature-size-for-pdf">signature size guide</a> covers the arithmetic.</p>
<p>For email, place the signature at a modest width so it does not dominate the message. A dark-ink file works in a white message body; a light-ink file is safer in a dark template. Test the message in the client you actually use, because some clients block images or render them at a different size.</p>

<h2 id="troubleshooting">Fix the problems that appear after export</h2>
<ol>
<li><strong>The background is white, not transparent.</strong> The file was saved or converted as JPG, or it is a screenshot. Re-export the PNG and place that file.</li>
<li><strong>The signature looks stretched.</strong> The width and height were changed independently. Reinsert the image and scale only by width, keeping the 3:1 ratio.</li>
<li><strong>The lines are too faint.</strong> The stroke was too thin for the final size. Create a new export with a heavier stroke and preview it at the document's width.</li>
<li><strong>A letter is clipped.</strong> The name touched the canvas edge. Redraw or retype it with a margin, then export again.</li>
<li><strong>The signature vanishes on a dark page.</strong> Dark ink on a transparent background cannot contrast with a dark surface. Make a light-ink version.</li>
<li><strong>The upload is rejected.</strong> Check the portal's format, dimensions and byte limit. Convert or resize a copy, and keep the original PNG as the master.</li>
</ol>
<p>One final check catches most of these before anyone else sees the document. Open the PNG on its own and confirm the checkerboard background. Place it in the document and zoom to the final size. If both views look clean, the export and the placement are doing their jobs.</p>

<h2 id="related-guides">Related signature guides</h2>
<p>The creation workflow is the first step. These guides cover the details that follow.</p>
<ul>
<li><a href="/blog/signature-maker-guide/transparent-signature-png">Transparent signature PNG</a> explains the checkerboard, clean edges and the JPG white-background trap.</li>
<li><a href="/blog/signature-maker-guide/signature-size-for-pdf">Signature size for PDF</a> covers dimensions, 150 DPI arithmetic and scaling without stretching.</li>
<li><a href="/blog/signature-maker-guide/drawn-vs-typed-signature">Drawn versus typed signature</a> compares the two methods for different documents.</li>
<li><a href="/blog/signature-maker-guide/sign-pdf-without-printing">Sign a PDF without printing</a> walks through placing the image in a PDF editor.</li>
<li>The <a href="/blog/signature-maker-guide">signature maker guide</a> connects every guide in this silo.</li>
</ul>
<div class="cta-box"><strong>Ready to try it?</strong> Open the <a href="/signature-maker">free signature maker</a>, draw or type your name on the 1200 by 400 canvas, adjust the ink, and download a transparent PNG. The tool runs locally, handles one signature at a time, and needs no account.</div>
`;

export const signatureCreate: BlogPost = {
  pillar: "signature-maker-guide",
  slug: "how-to-create-signature-online",
  kind: "cluster",
  title: "How to Create a Signature Online (Step-by-Step)",
  description:
    "Draw or type a signature on a 1200x400 canvas, adjust stroke and color, then export a transparent PNG and place it in documents.",
  keywords: ["how to create a signature online", "make signature online free", "draw signature with mouse", "type signature cursive font", "signature transparent png download", "create signature for documents"],
  toolSlugs: ["signature-maker"],
  relatedSlugs: ["transparent-signature-png", "signature-size-for-pdf", "drawn-vs-typed-signature", "sign-pdf-without-printing"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "before-you-start", text: "Before you start", level: 2 },
    { id: "draw-your-signature", text: "Draw your signature", level: 2 },
    { id: "type-your-signature", text: "Type your signature", level: 2 },
    { id: "adjust-stroke-and-color", text: "Adjust stroke and color", level: 2 },
    { id: "export-the-png", text: "Export the transparent PNG", level: 2 },
    { id: "use-the-png", text: "Place the PNG in a document", level: 2 },
    { id: "troubleshooting", text: "Fix common problems", level: 2 },
    { id: "related-guides", text: "Related signature guides", level: 2 },
  ],
  html,
  faqs: [
    { question: "How long does it take to make a signature?", answer: "A single signature usually takes a couple of minutes. Most of that time goes into choosing the name form and checking the preview at the size it will appear. Drawing takes longer than typing if you want smooth strokes, while typing is faster when you already know which cursive font reads clearly." },
    { question: "Can I make a signature on a phone?", answer: "Yes. The canvas accepts touch input, so you can draw with a finger on a phone or tablet. Use the full width of the screen, move slowly, and pinch-zoom the page if the canvas feels small. A stylus improves control, but a finger works for a simple name." },
    { question: "Why does my downloaded signature have a white background?", answer: "The maker exports a transparent PNG, so a white background usually means the file was converted to JPG or captured as a screenshot. JPG has no alpha channel and fills empty areas with a solid color. Re-download the PNG and place that file directly; do not pass it through a JPG conversion." },
    { question: "Can I use the signature to sign a PDF?", answer: "You can place the PNG on a PDF with a PDF editor, but the maker itself does not edit or sign PDFs. It also does not create a certificate-based signature or an audit trail. If the document requires a recognized e-signature process, use the service the document specifies rather than an image alone." },
    { question: "What size is the exported PNG?", answer: "The export comes from a 1200 by 400 pixel canvas with a transparent background. That is a 3:1 shape, wide enough for a full name. Place it at the width of the signature line, typically 2 to 2.5 inches for a contract, and let the height scale with it." },
    { question: "Does the tool store my signature?", answer: "No. Drawing, typing and export happen locally in the browser, and there is no account or cloud library. The canvas is temporary, so refreshing or closing the tab clears it. Download the PNG and keep your own master copy for future documents." },
  ],
};
