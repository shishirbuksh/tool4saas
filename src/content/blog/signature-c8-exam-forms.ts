import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Exam and government application portals are strict about signatures in ways that feel arbitrary until you see the rejected upload notice. The box may demand exactly 140×60 pixels, a file between 20KB and 50KB, a plain white background and a format the portal accepts. A beautiful signature that misses one of those numbers is still rejected.</p>
<p>The reliable method is boring: read the notification, create a clean mark, resize to the required pixels first, then compress to the required file size. This guide walks through that order and the mistakes that cause most rejections. Make the mark in the <a href="/signature-maker">signature maker</a> and handle dimensions and bytes in the <a href="/image-compressor">image compressor</a>. For the broader workflow, see the <a href="/blog/signature-maker-guide">signature maker guide</a>.</p>

<h2 id="check-the-notification">Read the notification before you create anything</h2>
<p>Find the official instructions for the current application cycle. The signature specification is usually in a table near the photo specification, often under “Instructions to candidates” or “Upload guidelines”. Note the required pixel dimensions, the minimum and maximum file size, the accepted formats and any instruction about the background or ink color. Take a screenshot of that table so you can check it again after exporting.</p>
<p>Do not rely on a blog post from a previous cycle. Requirements change, and different documents in the same application can have different limits. A photograph might allow 100KB while the signature allows 50KB, and a thumb impression might allow 20KB. The same portal can also enforce a minimum size, so a 6KB file can fail just as easily as a 90KB one.</p>
<p>If the notification says “signature in black ink on white paper”, treat that as an instruction about how to produce the mark, not a suggestion. If it says “handwritten signature”, a typed cursive name may not qualify. Check before you spend time styling a font.</p>

<h2 id="size-requirements">Typical size and format requirements</h2>
<p>A common pattern is 140×60 pixels and 20KB to 50KB, usually in JPG or PNG. That is a wide, shallow box, and it is much smaller than the 1200×400 canvas the signature maker uses. The exact numbers vary by exam, state and document type, so the table below is a checklist rather than a promise.</p>
<table>
<thead><tr><th>Requirement</th><th>Typical range</th><th>What to verify</th></tr></thead>
<tbody>
<tr><td>Pixel dimensions</td><td>140×60</td><td>Exact width and height; whether the portal pads or stretches</td></tr>
<tr><td>File size</td><td>20KB to 50KB</td><td>Both the minimum and the maximum</td></tr>
<tr><td>Format</td><td>JPG or PNG</td><td>The exact extensions the portal lists</td></tr>
<tr><td>Background</td><td>Plain white</td><td>No gray cast, shadow, texture or ruled lines</td></tr>
<tr><td>Ink color</td><td>Black or dark blue</td><td>Whether the notification names a color</td></tr>
<tr><td>Signature style</td><td>Handwritten full name</td><td>Whether initials or a typed mark are allowed</td></tr>
</tbody>
</table>
<p>A 140×60 box has a 2.33:1 ratio, while a 1200×400 signature is 3:1. If you simply squash the wider image into the box, the letters become narrow and may look distorted. Fit the signature inside the box, keep its proportions, and let white space fill the remainder. If the portal requires exact dimensions, export a 140×60 canvas with the mark centered on white.</p>

<h2 id="create-the-signature">Create a clean signature mark</h2>
<p>If the notification allows a digitally drawn or typed signature, open the <a href="/signature-maker">signature maker</a>. Draw with a mouse, touch or pen, or type your name in a cursive font. Use a dark, solid ink and a stroke that stays visible when the image is reduced to 140 pixels wide. Thin hairlines disappear at that size, so check the preview after scaling rather than judging on the large canvas.</p>
<p><strong>Example 1: a typed signature for a portal that allows it.</strong> An applicant types their full name, chooses a simple cursive font, sets the stroke to 3px and exports the transparent PNG. Because the form wants a white background, the image is placed on a white canvas during resizing, not left transparent. The resized file is checked at 140×60, then compressed to land inside the allowed range. The final file is named with the application number so it is easy to find if the portal asks for a replacement.</p>
<p>If the notification requires a handwritten signature, sign a clean white sheet with a dark pen. Use a full sheet rather than a small sticky note, and keep the signature well away from the edges. Photograph it from directly above in even daylight, or scan it if you have a scanner. Avoid shadows from your hand or phone, and do not photograph a screen. A screen photo adds moiré patterns and color casts that make the signature look altered.</p>
<p><strong>Example 2: a photographed handwritten signature.</strong> The applicant signs in black ink on plain white paper, photographs the page flat, and crops to the signature. The crop removes the desk and most of the empty paper, but it does not try to erase the paper texture. The image is resized to 140×60, compressed as JPG and checked for a clean white background at 100% zoom. If the paper looks gray, a brighter, more even photo is better than aggressive editing.</p>

<h2 id="resize-first">Resize first, because pixels drive the file size</h2>
<p>A phone photo can be 4000 pixels wide and several megabytes. At 140 pixels wide, most of that data is discarded. Resizing first does most of the work and preserves more visual quality than compressing a huge image repeatedly. In the <a href="/image-compressor">image compressor</a>, choose the resize view, enter the required dimensions and lock the aspect ratio if the portal allows it. If the portal demands an exact 140×60 canvas, create that canvas and fit the mark inside it with white space.</p>
<p>Do not enlarge a small signature to fill the box. Upscaling cannot invent detail, and the strokes will look soft. Start from a clean master at a larger size, then reduce it once. Keep the master file separate so you can produce a different size for another form without redoing the signature.</p>
<p>Check the result at 100% zoom after resizing. The signature should be recognizable, the ends of the strokes should not be clipped, and the background should be uniformly white. If the mark touches the edge of the box, add a little padding before compressing.</p>

<h2 id="compress-to-limit">Compress to the limit without destroying legibility</h2>
<p>Once the dimensions are correct, compress the file toward the required range. For JPG, start around 75% to 80% quality and adjust in small steps. For PNG, the file may already be small because the image is line art on white; if the portal accepts PNG, it often gives the cleanest edges. Use the format the notification lists, not the one that happens to produce the smallest file.</p>
<p>Watch both ends of the range. If the maximum is 50KB, a 30KB file is fine and gives you headroom for legibility. If the portal also enforces a 20KB minimum, a 12KB file may fail even though it looks clean. Adjust quality or dimensions within the allowed rules rather than adding meaningless data to inflate the file.</p>
<p>After compressing, verify four things: exact dimensions, file size within the range, accepted format and a background that still looks white. Open the file in a different viewer if possible, because some portals preview images differently from the editor you used. Keep the accepted file and its master; do not recompress the accepted file for the next form.</p>

<h2 id="common-rejections">Common rejection reasons and how to avoid them</h2>
<p><strong>A photo of a screen.</strong> Moiré lines, reflections and color shifts make the signature look edited. Sign paper and photograph the paper, or create the mark digitally.</p>
<p><strong>Wrong dimensions.</strong> A file that is 140×60 in the editor may be saved at a different size by the export dialog. Check the actual pixel dimensions after saving, not just the numbers you typed.</p>
<p><strong>Wrong format.</strong> A PNG renamed to .jpg is still a PNG. Use the export control in the tool and confirm the extension matches the portal’s list.</p>
<p><strong>Shadow or gray background.</strong> A phone shadow across the paper reads as a dirty scan. Use even light and a plain white sheet, and check the background at 100% zoom.</p>
<p><strong>Clipped strokes.</strong> A signature that runs to the edge of the crop looks cut off. Leave a margin around the mark and center it in the box.</p>
<p><strong>Initials instead of a full name.</strong> Some forms require the full signature, not initials. Read the instruction and match the name on the application.</p>
<p><strong>Over-compressed or over-sized files.</strong> Both fail the portal’s check. Aim for the middle of the allowed range and confirm the byte count in the file properties.</p>
<p>After uploading, download the preview if the portal offers one and compare it with your local file. If the preview looks stretched or cropped differently, the portal may be applying its own resize. In that case, matching the exact canvas dimensions is more important than matching the visual proportions you prefer. For more on transparent versus white backgrounds, see <a href="/blog/signature-maker-guide/transparent-signature-png">transparent signature PNG</a>. If the same signature will also appear on a PDF, <a href="/blog/signature-maker-guide/signature-size-for-pdf">signature size for PDF</a> covers the print dimensions.</p>
<div class="cta-box"><strong>Prepare the signature:</strong> open the <a href="/signature-maker">signature maker</a> to draw or type your mark, then use the <a href="/image-compressor">image compressor</a> to resize it to the form’s exact pixels and compress it toward the required file size. Both run on your device.</div>
`;

export const signatureExamForms: BlogPost = {
  pillar: "signature-maker-guide",
  slug: "signature-for-exam-forms",
  kind: "cluster",
  title: "Signature for Exam Forms: 20-50KB and 140x60 Rules",
  description:
    "Prepare a signature for exam forms: check the notification, resize to 140×60, then compress toward 20–50KB. Use a clean white background, not a screen photo.",
  keywords: ["signature for exam forms", "signature 140x60 20kb 50kb", "exam form signature size", "compress signature for government form", "signature upload rejected"],
  toolSlugs: ["signature-maker", "image-compressor"],
  relatedSlugs: ["how-to-create-signature-online", "transparent-signature-png", "signature-size-for-pdf"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "check-the-notification", text: "Read the notification", level: 2 },
    { id: "size-requirements", text: "Typical size and format", level: 2 },
    { id: "create-the-signature", text: "Create a clean signature", level: 2 },
    { id: "resize-first", text: "Resize first", level: 2 },
    { id: "compress-to-limit", text: "Compress to the limit", level: 2 },
    { id: "common-rejections", text: "Common rejection reasons", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the signature size for exam forms?", answer: "A common requirement is 140×60 pixels and 20KB to 50KB, usually JPG or PNG. The exact numbers vary by exam, state and document, and some portals enforce a minimum as well as a maximum. Always use the current official notification for your application instead of a previous cycle’s numbers." },
    { question: "Should I resize or compress the signature first?", answer: "Resize first. Dropping a large phone photo to 140×60 removes most of the data and does more for the file size than quality changes alone. Compress the resized file afterward to reach the portal’s range. This order also keeps the strokes cleaner than compressing a huge image and shrinking it repeatedly." },
    { question: "Why was my signature rejected even though it was under 50KB?", answer: "The bytes may be fine while the dimensions, format or background are wrong. Check the exact pixels, the extension, the white background and whether the mark is clipped. Some portals also require a minimum file size, so a very small file can fail. Compare the uploaded preview with the notification requirements." },
    { question: "Are JPG and PNG both accepted for exam signatures?", answer: "That depends on the portal. Many accept both, while others list only JPG or only PNG. Use the format the notification names. JPG usually produces a smaller file, while PNG can keep line art crisp on a white background. Do not rename a PNG to .jpg; export the correct format from the tool." },
    { question: "Can I type my signature instead of signing by hand?", answer: "Only if the notification allows it. Some forms accept a typed or digitally drawn signature, while others specifically require a handwritten mark. If handwriting is required, sign on white paper and photograph it flat. A typed cursive name is not a substitute when the instructions ask for a handwritten signature." },
    { question: "How do I get a clean white background for the signature?", answer: "Sign in dark ink on plain white paper, photograph it from directly above in even light, and crop away the desk and edges. Avoid shadows and screen photos. The signature maker does not remove the background from a photograph, so a clean sheet and careful lighting are more reliable than trying to erase a textured background later." },
  ],
};
