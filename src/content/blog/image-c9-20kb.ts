import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Twenty kilobytes is not much. A single phone photo can be several megabytes, so a 20KB ceiling asks you to remove almost all of the file. When a form asks you to compress a JPG to 20KB, there is no single slider setting that guarantees success. Forms use that number for exam photos, signatures, visa portraits and staff directories, and they reject anything over the line without explaining which lever to pull. The reliable answer is a sequence: get the pixel dimensions right, compress in small quality steps, then check the actual byte count before you upload.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image compression guide</a>. Do the work in the image compressor and resizer, and use the <a href="/image-format-converter">image format converter</a> when a PNG must become a JPEG. If the form allows 100KB, the <a href="/blog/image-compressor-guide/compress-jpg-100kb-portal">100KB portal method</a> leaves more room for detail.</p>

<h2 id="what-20kb-means">What a 20KB limit actually measures</h2>
<p>A 20KB limit is a byte ceiling, not a quality score. Many forms count 1KB as 1,024 bytes, which makes the real ceiling 20,480 bytes; others count 1,000 bytes and stop at 20,000. Aim for roughly 19KB or less and you satisfy either reading. Windows and macOS often round file sizes, so open the file's properties and read the byte count rather than trusting a label that says 19 KB.</p>
<p>The same form usually checks more than bytes. It may require 413×531 pixels, a JPEG extension, a white background, or a minimum face size. A 12KB file can still fail for wrong dimensions. Read the instructions as a list of independent rules, then satisfy each one. Pixel dimensions come first because they decide how much detail the compressor has to preserve.</p>
<p>DPI is the other common source of confusion. A 413×531 image tagged at 300 DPI represents 35×45mm when printed, but the DPI tag does not change the pixel count. Most upload forms inspect pixels and bytes. Set the pixels the form asks for, and treat DPI as a print instruction rather than a compression setting.</p>

<h2 id="resize-first">Resize first, then make quality passes</h2>
<p>Compression works best after the image is the right size. If you compress a 4032px photo and then shrink it to 413px, you spent quality on pixels that were deleted. Resize first, then compress the small file. The same order applies to signatures and thumb impressions: cut the canvas to the required frame before touching quality.</p>
<p>The compressor exposes a quality slider from 10% to 100% in 5% steps and a maximum-width field. It preserves aspect ratio, so the height follows from the width. It can resize a correctly cropped image to the required width, but it cannot turn a 4:3 photo into a 7:9 photo. Crop first when the ratio is wrong. The resize view can set exact width and height when you need both numbers.</p>
<p>Start around 75–80% for a photo and inspect the result. If the file is over 20KB, drop five points and run it again. If it is under, keep the higher quality and stop; the limit is a ceiling, not a target. For a signature, start at 90% because line art on white needs far fewer bytes. If the target must be JPEG and the source is PNG, convert first: the compressor keeps PNG as PNG, and PNG ignores the quality slider.</p>

<h2 id="workflow">A repeatable 20KB workflow</h2>
<ol>
<li>Write down the form's byte limit, pixel size and accepted formats.</li>
<li>Crop to the required aspect ratio in the crop view, keeping the face or signature centered with the required margins.</li>
<li>Resize to the exact pixel dimensions in the resize view. Do not unlock the aspect ratio to force a different shape.</li>
<li>If the form requires JPEG and the file is PNG, convert it to JPEG at high quality in the format converter.</li>
<li>Open the JPEG in the compressor, set the maximum width to the required width, and start at 75–80%.</li>
<li>Check the byte count. Drop quality by five points per pass until the file is under the limit.</li>
<li>Open the result at 100% zoom. Confirm the face, text and signature edges are still clean.</li>
</ol>
<p>These are common pixel pairs, with a sensible starting point for each:</p>
<table>
<thead><tr><th>Use case</th><th>Target pixels</th><th>Starting quality</th><th>What to expect</th></tr></thead>
<tbody>
<tr><td><strong>Exam photo</strong></td><td>413×531</td><td>75–80%</td><td>Usually workable; 65–75% often lands near 20KB</td></tr>
<tr><td><strong>Signature</strong></td><td>140×60</td><td>90%</td><td>Line art often lands far below 20KB</td></tr>
<tr><td><strong>600×600 ID photo</strong></td><td>600×600</td><td>80%</td><td>Tight at 20KB; expect softness or recheck the limit</td></tr>
<tr><td><strong>Profile avatar</strong></td><td>400×400</td><td>80%</td><td>Usually comfortable at 20KB</td></tr>
</tbody>
</table>
<p>Those pairs are examples, not universal rules. A form can ask for 200×230 or 600×800. Use its numbers, and if it gives only millimetres, convert at 300 DPI: 35×45mm becomes 413×531 pixels.</p>

<h2 id="worked-examples">Two worked examples with byte outcomes</h2>
<p><strong>Example 1: a phone portrait for an exam form.</strong> The source was a 3024×4032 JPEG at 3.6MB. The form wanted 413×531 and 20KB. The photo was 3:4, not the 7:9 ratio of 35×45mm, so the first step was a crop to 3024×3888, then a resize to 413×531, then a conversion to JPEG. At 80% the JPEG was about 27KB. At 70% it was about 21KB. At 65% it landed near 18KB and the face still read clearly at 100% zoom. A busier background would have cost more bytes at the same settings.</p>
<p><strong>Example 2: a signature scan.</strong> The source was a 1600×600 PNG at 1.2MB. After a crop to 140×60 and a resize to the same pixels, the PNG was still too heavy for the form's format rule, so it was converted to JPEG. At 85% the file was roughly 6KB. That left room to raise quality to 95%, which produced about 8KB with cleaner letter edges. Stopping at 20KB would have been unnecessary; a signature benefits from the extra clarity.</p>
<blockquote class="tip">These are illustrative results from specific images. Your byte counts will differ with content, noise, background detail and the encoder in your browser. No tool can promise an exact KB output.</blockquote>

<h2 id="quality-floor">Where 20KB starts to hurt</h2>
<p>Quality loss shows up first in smooth gradients, fine hair, fabric texture and small text. JPEG breaks an image into blocks, so skies can develop visible steps and sharp edges can pick up a halo. At 413×531 you may not see those defects at normal viewing size, but an examiner comparing the photo with your face will notice a smeared jawline or a washed-out signature.</p>
<p>Use a floor, not a race. If the photo is still over 20KB at 60%, check whether the dimensions are larger than the form requires. A 600×600 portrait at 20KB has very little room for detail; if the form truly demands both, accept mild softness and confirm the face is recognizable. Never shrink below the required pixels or stretch the image to make it fit. A correctly sized, slightly soft photo is usually accepted; a sharp but undersized or distorted one is not.</p>
<p>For signatures and thumb impressions, grayscale can cut bytes substantially if the form allows it. Convert to grayscale in your phone editor before resizing; the compressor does not have a grayscale switch. Keep the background clean and evenly lit, because noise is expensive at this size.</p>

<h2 id="verify">Verify before you upload</h2>
<p>Open the downloaded file's properties and confirm three things: the byte count is under the limit, the pixel dimensions match the form, and the extension matches the accepted format. Then open the image at 100% and check the face, text and edges. If the form shows a preview, compare it with your file before submitting.</p>
<p>Keep the original and the accepted derivative separately. Recompressing an already-compressed 18KB file for a second portal adds artifacts and may push it over a different limit. Start from the original each time. Re-encoding also strips EXIF, including GPS, which is useful before uploading any personal photo; the EXIF guide covers what gets removed.</p>
<p>One last check: do not rename a PNG to .jpg and assume the form will accept it. The file's internal format does not change with the extension, and some upload validators reject the mismatch. Convert properly in the format converter, then compress the JPEG.</p>

<div class="cta-box"><strong>Ready to try it?</strong> Open the <a href="/image-compressor">image compressor</a>, crop and resize to the form's pixels, then lower quality in 5% steps until the byte count clears the limit. Nothing is uploaded.</div>
`;

export const image20kb: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "compress-jpg-20kb",
  kind: "cluster",
  title: "Compress JPG to 20KB: Pass Strict Upload Limits",
  description:
    "Compress a JPG to 20KB for strict forms: resize to exact pixels, run quality passes, verify bytes and keep a master. Worked examples and free tools.",
  keywords: ["compress jpg to 20kb", "20kb photo for online form", "reduce image size to 20kb", "20kb signature image", "compress jpeg under 20kb"],
  toolSlugs: ["image-compressor", "image-format-converter"],
  relatedSlugs: ["compress-jpg-100kb-portal", "resize-image-exact-pixels", "compress-jpg-200kb"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-20kb-means", text: "What 20KB measures", level: 2 },
    { id: "resize-first", text: "Resize first", level: 2 },
    { id: "workflow", text: "Repeatable workflow", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "quality-floor", text: "Where 20KB hurts", level: 2 },
    { id: "verify", text: "Verify before upload", level: 2 },
  ],
  html,
  faqs: [
    { question: "Can any tool guarantee exactly 20KB?", answer: "No. JPEG output size depends on image content, dimensions and the browser encoder. The dependable method is to resize to the required pixels, compress at 75–80%, then lower quality in five-point steps until the file is under the limit. A result at 18KB is better than a technically exact file that looks damaged." },
    { question: "Why is my 20KB photo blurry?", answer: "Usually because the dimensions were left large and quality was crushed to compensate. Resize to the form's exact pixels first; a 413×531 photo needs fewer bytes than a 1600px one. If the form demands 600×600 and 20KB, some softness is unavoidable, so check that the face is still recognizable." },
    { question: "Can I rename a PNG to JPG to meet the format rule?", answer: "No. The extension does not change the internal encoding, and validators can reject the mismatch. Convert the PNG to JPEG in the format converter, then compress the JPEG. If the form accepts PNG, keep PNG and remember that the quality slider does not apply to it." },
    { question: "Is 20KB enough for a passport or visa photo?", answer: "It depends on the pixel spec. At 413×531 a portrait is usually workable around 65–75% quality. At 600×600 the same byte ceiling is tight and may look soft. Check the current form: some visa portals allow a much larger file and the 20KB figure may belong to a different document." },
    { question: "Should I strip EXIF before uploading?", answer: "Yes, especially for personal photos. Re-encoding through the compressor removes metadata such as GPS coordinates and camera details, and can trim a few bytes. Keep an untouched original archived, and verify the exported copy rather than assuming every export route strips the same fields." },
    { question: "Why does a file under 20KB still get rejected?", answer: "Bytes are only one rule. The portal may check exact pixels, file format, filename, background colour or face position. Read the error text and compare every requirement. A common failure is correct bytes with wrong dimensions, or a JPEG extension on a file that is still internally PNG." },
  ],
};
