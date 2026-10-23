import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two hundred kilobytes is a comfortable ceiling for many web photos, which is why it appears in marketplace rules, email guidelines and CMS upload forms. To compress a JPG to 200KB without visible loss, start with sensible dimensions and keep the highest quality that stays under the cap. The catch is that “without visible quality loss” depends on dimensions and content: a 1600px product photo at 200KB can look clean, while the same 200KB spent on a 4000px file forces obvious mush.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image compression guide</a>. Resize in the image compressor and resizer, convert formats in the <a href="/image-format-converter">image format converter</a>, and use the <a href="/blog/image-compressor-guide/resize-image-exact-pixels">exact-pixel resize method</a> when a slot has fixed dimensions.</p>

<h2 id="what-200kb-buys">What 200KB buys at different sizes</h2>
<p>Bytes per pixel is the useful mental model. A 200KB file spread across 1080×1080 pixels has more room for detail than the same 200KB spread across 3000×3000 pixels. That is why a photo can look excellent at 1200px wide and mediocre at 3000px wide even though both files are under the limit. If the image will display at 1200px, there is no reason to keep 3000px of detail and then crush the quality to pay for it.</p>
<p>For a typical photograph, 80–85% JPEG quality is a sensible starting range. At 1200–1600px wide, that range often lands under 200KB. At 1920px or larger, detailed scenes may need 75% or a modest downscale. Highly textured subjects such as foliage, crowds and fabric cost more bytes than a plain wall or a studio background.</p>
<table>
<thead><tr><th>Placement</th><th>Export pixels</th><th>Starting quality</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>Blog inline</strong></td><td>1200 wide</td><td>80–85%</td><td>Usually well under 200KB</td></tr>
<tr><td><strong>Blog hero</strong></td><td>1600×900</td><td>80%</td><td>200KB is a workable ceiling</td></tr>
<tr><td><strong>Marketplace square</strong></td><td>1500×1500</td><td>85%</td><td>Product detail needs the higher setting</td></tr>
<tr><td><strong>Email photo</strong></td><td>1000 wide</td><td>80%</td><td>Email clients may recompress again</td></tr>
<tr><td><strong>Full-width banner</strong></td><td>1920 wide</td><td>75–80%</td><td>Tight for detailed scenes; resize if needed</td></tr>
</tbody>
</table>
<p>Treat the table as a starting point. The correct quality is the highest one that stays under the limit while surviving a 100% zoom check.</p>

<h2 id="resize-before">Resize before you compress</h2>
<p>If a 4032px photo will appear at 1600px, discard the extra pixels first. Compressing the full-size image and then resizing it spends quality on detail that disappears. The compressor's maximum-width field handles this for aspect-correct images: set it to the display width and the height follows. When both dimensions are fixed, use the resize view, then convert the PNG output to JPEG if the destination requires JPEG.</p>
<p>Do not upscale a smaller image to reach a target. Enlarging adds no detail and makes the file larger for no visual gain. Crop instead when the composition does not fit the slot. A 4:3 photo forced into a 16:9 frame by stretching will look wrong no matter how carefully you compress it; the resize guide covers crop-before-resize in more detail.</p>

<h2 id="quality-passes">Quality passes without visible loss</h2>
<p>Start at 85% and compare the result with the original at 100% zoom. If the file is under 200KB, stop. There is no prize for landing exactly on the ceiling; a 150KB file at 85% is usually a better deliverable than a 199KB file at 70%. If the file is over, drop five points and run another pass. Each pass should be judged on the exported file, not on the preview thumbnail.</p>
<p>If quality reaches the low 70s and the file is still over 200KB, reduce dimensions before cutting further. Going from 1920px to 1600px often saves more bytes with less visible damage than dropping from 80% to 60%. Keep the aspect ratio locked and resize once; repeated resizes soften edges cumulatively. For images with text, try 90% first and accept a larger file if the destination allows it, because text shows JPEG artifacts sooner than skin or scenery does.</p>
<blockquote class="tip">A byte target is a ceiling, not a quality setting. Stop as soon as the file is comfortably under it and the image still looks right at its display size.</blockquote>

<h2 id="worked-examples">Two worked examples with byte outcomes</h2>
<p><strong>Example 1: a landscape photo for a 1600px-wide slot.</strong> The source was a 4032×3024 JPEG at 5.2MB. The slot was 1600px wide, so the compressor was set to a maximum width of 1600 and produced a 1600×1200 file. At 85% the file was about 255KB. At 80% it was about 190KB, with no obvious change in the foliage or building edges at 100% zoom. The 80% export was used. Dropping to 75% produced roughly 150KB, but the extra savings bought nothing visible.</p>
<p><strong>Example 2: a product photo for a marketplace listing.</strong> The source was a 3000×3000 JPEG at 4.4MB. The listing wanted a square image, so no crop was needed; the file was resized to 1500×1500. At 85% it was about 225KB. At 80% it was about 175KB, and the product label stayed legible. A plain background helped; a textured set would have produced larger files at the same settings. The 80% version cleared the limit without touching the dimensions again.</p>
<p>These numbers are illustrative, not guarantees. A noisy phone photo, a detailed pattern or a different browser encoder can move the result by tens of kilobytes in either direction.</p>

<h2 id="visible-loss">What visible loss actually looks like</h2>
<p>JPEG divides the image into small blocks and compresses each one. At aggressive settings, smooth skies develop blocky patches, high-contrast edges pick up a faint halo, and fine texture turns into mush. Saturated reds and blues can shift first because JPEG spends fewer bits on colour detail than on brightness. Text and logos show ringing around letters, which is why screenshots and graphics often need a different format rather than a lower slider.</p>
<p>Judge the export at 100% on the screen where it will be viewed. Fit-to-window previews hide artifacts, and phone screens can make them look worse than a desktop monitor or the reverse. Compare the compressed file with the original side by side, then look at the areas a viewer will notice: faces, product labels, headline text and the centre of the frame.</p>

<h2 id="format-choice">Format choice and honest limits</h2>
<p>For the web, WebP often produces a smaller file than JPEG at a similar visual quality, and it can keep transparency. Some marketplaces and government portals still accept only JPEG, so check the rule before converting. The format converter here handles JPEG, PNG and WebP. It does not read HEIC files from iPhones, does not write AVIF, and does not convert SVG; export those to JPEG or PNG in the source app first.</p>
<p>A PNG screenshot converted to JPEG may fit under 200KB at 90% quality, but small text may soften. If the destination accepts PNG and the file is already under the limit, keep PNG. If it accepts WebP, test the result in the actual upload preview rather than assuming every platform renders it. Conversion does not resize, so set the dimensions first and convert second.</p>

<h2 id="verify">Verify and preserve the master</h2>
<p>Check the exported file's byte count, pixel dimensions and extension before uploading. Open it at 100%, then check the upload preview if one is offered. Keep the original camera file or design export untouched; re-compressing an already-compressed JPEG adds artifacts and can push the file over a different limit later. Re-encoding also drops EXIF metadata, including GPS, which is helpful for privacy but means you should archive the original separately.</p>
<p>Name the accepted file clearly, such as <code>product-1500-175kb.jpg</code>, so the next person does not have to guess which export was approved. If a second destination needs a different size, start from the master rather than from the compressed copy.</p>

<div class="cta-box"><strong>Try it now:</strong> open the <a href="/image-compressor">image compressor</a>, set the display width, start at 85%, and step down only while the file stays above the limit. Processing happens locally and no image is uploaded.</div>
`;

export const image200kb: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "compress-jpg-200kb",
  kind: "cluster",
  title: "Compress JPG to 200KB Without Visible Quality Loss",
  description:
    "Compress JPG to 200KB without visible quality loss: pick sensible dimensions, run quality passes, spot artifacts and avoid double compression. Free tool.",
  keywords: ["compress jpg to 200kb", "reduce photo to 200kb", "200kb image without losing quality", "compress image for marketplace", "jpg 200kb web upload"],
  toolSlugs: ["image-compressor", "image-format-converter"],
  relatedSlugs: ["resize-image-exact-pixels", "compress-jpg-20kb", "png-vs-jpg-vs-webp"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-200kb-buys", text: "What 200KB buys", level: 2 },
    { id: "resize-before", text: "Resize before compressing", level: 2 },
    { id: "quality-passes", text: "Quality passes", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "visible-loss", text: "Visible loss", level: 2 },
    { id: "format-choice", text: "Format choice", level: 2 },
    { id: "verify", text: "Verify and preserve", level: 2 },
  ],
  html,
  faqs: [
    { question: "Will a 200KB JPG always look lossless?", answer: "No. At 1200–1600px wide, a 200KB JPEG often looks clean at normal viewing size, but detailed scenes may need a lower quality setting. At 3000px or larger, the same byte ceiling forces visible softness. Match the pixel dimensions to the display size before judging the result." },
    { question: "Should I aim for exactly 200KB?", answer: "No. Treat 200KB as a maximum and keep the highest quality setting that stays under it. A 140KB export at 85% usually looks better than a 199KB export at 70%. Lowering quality after the file already passes the limit only removes detail the viewer could have seen." },
    { question: "Is it better to resize or lower quality?", answer: "Resize first when the image is larger than its display size. Going from 1920px to 1600px often saves more bytes with less visible damage than dropping quality by ten points. If the dimensions are already correct, then step quality down in five-point increments and inspect the export each time." },
    { question: "Why does my photo look worse on a phone?", answer: "A smaller screen raises pixel density and can make compression artifacts more obvious, especially around text and high-contrast edges. Brightness and colour profiles also differ. Check the export at 100% on the device where it will be viewed, not only in a desktop preview at fit-to-window size." },
    { question: "Can I use WebP instead of JPG?", answer: "Yes for many websites, and WebP often lands smaller at similar quality. Some portals and marketplaces still require JPEG, so read the upload rule first. The converter here supports JPEG, PNG and WebP; it does not handle HEIC, AVIF or SVG, so export those formats before using the tool." },
    { question: "Does compressing to 200KB remove EXIF data?", answer: "Canvas-based re-encoding typically drops EXIF, including camera details and GPS coordinates. That helps privacy, but it also means the archived master should stay untouched. If you need metadata for licensing or provenance, keep a separate original and verify the exported copy rather than assuming every tool strips the same fields." },
  ],
};
