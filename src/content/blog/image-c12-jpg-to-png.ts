import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A reader once sent me a 420KB JPG and asked for a PNG because a portal demanded that extension. The conversion took a second; the output was 3.1MB. It did not look sharper. That is the deal with JPG to PNG: the pixels are unpacked and stored again without additional loss, but nothing the JPG already discarded comes back. This guide explains what the conversion changes, when it is worth doing, and why the PNG often arrives several times larger.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. Convert in the <a href="/image-format-converter">image format converter</a>; resize or compress the result in the <a href="/image-compressor">image compressor</a>. For format decisions, read <a href="/blog/image-compressor-guide/png-vs-jpg-vs-webp">PNG vs JPG vs WebP</a>.</p>

<h2 id="what-changes">What the conversion actually changes</h2>
<p>A JPG is compressed with a lossy method: the encoder discards detail it expects your eye to miss, then stores the rest efficiently. PNG is lossless: every pixel of the decoded image is preserved exactly, then the file is compressed with a method that can reconstruct it byte for byte. Converting decodes the JPG once and writes those pixels into a PNG. The PNG is lossless from that point forward, but the source was not.</p>
<p>That distinction matters. JPG artifacts such as blocky skies, ringing around text and smeared fine detail are already part of the decoded image. PNG stores them faithfully. It cannot sharpen a face, recover a blown highlight or rebuild texture that the camera or the JPG encoder removed. A conversion is a repackaging job, not a restoration job.</p>
<p>Transparency is the other common misunderstanding. JPG has no alpha channel, so every converted PNG is fully opaque. The converter does not invent a transparent background, and it does not remove a white or black backdrop. If you need a cutout, edit the PNG in an image editor that supports masks or alpha; the format alone will not do it.</p>
<p>The <a href="/image-format-converter">converter</a> handles JPG, PNG and WebP, one file at a time, with a 10MB input limit. It does not resize. It also enforces 8192 pixels per side and 16 megapixels before processing, because a huge image can stall a browser tab. Those limits apply to the source, not to the PNG you download.</p>

<h2 id="when-it-helps">When converting helps, and when it does not</h2>
<p>Convert when a recipient explicitly requires a PNG file. Some portals, print shops and design handoff systems check the format rather than the content. If the rule says PNG, a JPG renamed to <code>.png</code> may fail validation because the bytes are still JPEG. Run the actual conversion and verify the downloaded extension and file type.</p>
<p>Convert when you will edit and re-save the image repeatedly. Every JPG save is another lossy generation, so a file edited five times can accumulate visible damage. A PNG intermediate avoids new compression loss during those edits. If you later export the finished work as JPG, that final export is still lossy, but it is one pass instead of many.</p>
<p>Convert when you plan to add transparency later, or when a downstream tool needs an alpha-capable format. The conversion gives you a PNG canvas with the full pixel data; you or an editor can then mask out a background. It also makes sense when you need to compare a lossless version against the JPG to see exactly what the JPG encoder changed.</p>
<p>Do not convert to make a file smaller. Do not convert to rescue a blurry photo, a low-resolution scan or an image with compression artifacts. Do not convert a photo for a byte-capped upload unless the portal accepts a much larger file or you are willing to resize first. If the recipient accepts JPG and size matters, keeping the JPG is usually the better decision.</p>

<h2 id="why-bigger">Why the PNG is often much larger</h2>
<p>PNG has to preserve all the pixels, including the noise and subtle gradients that JPG deliberately throws away. Photographic detail is expensive to store losslessly. Flat colors, screenshots and logos fare better because large areas repeat, but a converted JPG screenshot still carries the soft edges the JPG created.</p>
<table>
<thead><tr><th>Property</th><th>JPG</th><th>PNG</th></tr></thead>
<tbody>
<tr><td><strong>Compression</strong></td><td>Lossy, discards detail</td><td>Lossless, preserves decoded pixels</td></tr>
<tr><td><strong>Transparency</strong></td><td>No alpha channel</td><td>Supports alpha, but conversion does not create it</td></tr>
<tr><td><strong>Repeated saves</strong></td><td>Adds a new lossy generation each time</td><td>No new compression loss after conversion</td></tr>
<tr><td><strong>Typical photo</strong></td><td>Smaller, often by several times</td><td>Much larger for noisy or detailed photos</td></tr>
<tr><td><strong>Text and line art</strong></td><td>Soft or ringing edges</td><td>Exact decoded pixels, source artifacts included</td></tr>
<tr><td><strong>Quality control</strong></td><td>Quality slider applies</td><td>No quality slider; output is lossless</td></tr>
<tr><td><strong>Best use</strong></td><td>Photos, email, bandwidth-limited pages</td><td>Graphics, alpha, repeated editing</td></tr>
</tbody>
</table>
<p>The size jump is not a bug and not a sign that the converter did extra damage. It is the cost of storing every pixel. A 400KB photo can easily become a 3MB PNG, and a detailed 12MP photo can approach or exceed 10MB. The output may be larger than the converter's own 10MB input limit, because that limit is checked before conversion.</p>

<h2 id="workflow">A clean conversion workflow</h2>
<ol>
<li>Check the source size and dimensions. Keep the file under 10MB, 8192 pixels per side and 16 megapixels.</li>
<li>Confirm the destination really needs PNG. If it accepts JPG, converting may only make the upload larger.</li>
<li>Open the <a href="/image-format-converter">image format converter</a>, choose the JPG and set the target format to PNG.</li>
<li>Convert, then open the preview at 100% zoom. Compare it with the original JPG, not with your memory of the scene.</li>
<li>Read the output byte count. PNG ignores the quality slider, so there is no smaller quality setting to try.</li>
<li>If the PNG is too heavy for a byte limit, resize the source to smaller pixel dimensions first, then convert again. Resizing is a separate step in the <a href="/image-compressor">image compressor</a>.</li>
<li>Download the file, check the extension and keep the original JPG until the PNG is accepted.</li>
</ol>
<p>Do not rename a JPG to <code>.png</code> and call it converted. The extension changes, the encoding does not, and a validator that inspects file signatures will reject it. The converter writes new PNG bytes, which is the only reliable way to change the format.</p>

<h2 id="worked-examples">Two worked examples</h2>
<p><strong>Example 1: a website photo with a text overlay.</strong> The source was an 1800×1200 JPG at 420KB, exported from a photo editor at about 82% quality. The PNG output was roughly 3.1MB at the same 1800×1200 pixels. At 100% zoom the two looked the same, including the slightly soft edges around the overlaid caption. The PNG was worth keeping only because the designer planned several rounds of edits and wanted to avoid more JPG passes. It would have failed a 2MB upload cap, so the final web export went back to JPG at 80%.</p>
<p><strong>Example 2: a phone photo for a PNG-only form.</strong> A 2400×3200 JPG at 1.8MB converted to a PNG of about 9.2MB. The source was 7.68 megapixels, inside the 16MP guard, and the input was well under 10MB. The form accepted files up to 5MB, so the PNG was still too large. Resizing to 1200×1600 first and then converting produced a PNG near 2.4MB. The smaller file had fewer pixels by design, but it kept the same crop and looked clean at form-preview size. That is a resize decision, not a compression trick.</p>
<blockquote class="tip">These byte counts come from specific images and a browser canvas encoder. Your PNG may be smaller or larger depending on noise, detail and dimensions. The visual result is the part you can rely on: no new detail appears.</blockquote>

<h2 id="limits">Limits and mistakes to avoid</h2>
<p>The converter accepts one file at a time, up to 10MB, with a maximum of 8192 pixels per side and 16 megapixels. It does not resize, crop, rotate or batch. If your source exceeds a limit, resize or re-export it first; do not keep retrying the same file. The PNG output can be any size the browser can produce, including files larger than the 10MB input cap.</p>
<p>Large images also consume memory during decoding and encoding. On a phone, close other tabs before converting a many-megapixel photo. If the tab reloads, the result is lost and you start again. Work from a copy, not your only original, and download the PNG before closing the page.</p>
<p>Finally, check what the recipient actually enforces. Some forms require PNG and a byte ceiling that a photographic PNG cannot meet. Others accept PNG but expect transparency that a JPG never had. Read the rules as separate constraints, then decide whether PNG is the right output or whether the job needs a resize, a different format or a different source file. PNG is excellent at preserving pixels; it cannot create information that was never captured.</p>

<div class="cta-box"><strong>Convert a JPG now:</strong> open the <a href="/image-format-converter">image format converter</a>, choose PNG and compare the result at 100% zoom. Nothing is uploaded, and the original stays untouched. If the PNG is too large, resize it first in the <a href="/image-compressor">image compressor</a>.</div>
`;

export const imageJpgToPng: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "jpg-to-png",
  kind: "cluster",
  title: "JPG to PNG: Convert Without Losing Quality",
  description:
    "Convert JPG to PNG in your browser: what actually changes, why files grow, when the switch helps, and two worked examples. Free, local conversion.",
  keywords: ["jpg to png", "convert jpg to png without losing quality", "jpg to png file size bigger", "png vs jpg conversion", "convert jpeg to png online"],
  toolSlugs: ["image-format-converter"],
  relatedSlugs: ["png-vs-jpg-vs-webp", "png-to-webp-transparency", "resize-image-exact-pixels"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-changes", text: "What conversion changes", level: 2 },
    { id: "when-it-helps", text: "When converting helps", level: 2 },
    { id: "why-bigger", text: "Why PNG files grow", level: 2 },
    { id: "workflow", text: "Conversion workflow", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "limits", text: "Limits and mistakes", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does converting JPG to PNG improve image quality?", answer: "No. The conversion preserves the pixels the JPG decoder produces, including its existing artifacts. PNG is lossless from that point forward, but it cannot recover detail the JPG encoder discarded. A converted image may be larger and easier to edit repeatedly, yet it will not look sharper than the source." },
    { question: "Why is the PNG so much bigger than the JPG?", answer: "JPG throws away detail to save space, while PNG stores every decoded pixel losslessly. Noisy photos and fine textures are expensive to preserve, so a 400KB JPG can become a 3MB PNG. Flat graphics and screenshots usually grow less, but a converted JPG screenshot still carries the soft edges of the original." },
    { question: "Can I get a transparent background by converting JPG to PNG?", answer: "No. JPG has no alpha channel, so the converted PNG is fully opaque. The converter cannot guess which pixels should be transparent. To create transparency, open the PNG in an editor that supports masks and remove the background there; the format change alone does not do it." },
    { question: "Is JPG to PNG conversion lossless?", answer: "The PNG encoding step is lossless, but the source is already lossy. You get an exact copy of the decoded JPG pixels, not a copy of the original scene. That is why artifacts remain visible. The practical benefit is avoiding additional JPG loss during repeated edits, not restoring the photo." },
    { question: "Why can't I change the quality slider for PNG?", answer: "PNG is a lossless format, so a quality percentage has no meaning in this converter. The slider is disabled when PNG is selected. To reduce the file, resize the image to fewer pixels before converting, or choose JPG or WebP when the recipient accepts a lossy format and a smaller file." },
    { question: "Can I convert a file over 10MB?", answer: "Not directly. The converter accepts one file up to 10MB, with 8192 pixels per side and 16 megapixels. Re-export a smaller copy or resize it first. The PNG output itself can exceed 10MB because the cap applies to the input, so check the downloaded byte count before uploading." },
  ],
};
