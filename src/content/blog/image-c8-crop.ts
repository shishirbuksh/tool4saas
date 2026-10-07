import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Passport office, counter 3: “Photo rejected — wrong size.” The applicant had a perfect photo at the wrong aspect ratio, stretched to fit by a helpful cousin. Faces 15% wider, ears cropped, application delayed a week. <strong>Cropping is not resizing</strong>: resizing scales everything, cropping cuts composition. ID photos, visas and avatars need cuts — this guide shows exact sizes, the crop-before-resize order, and the stretched-face check.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. Frame in the <a href="/image-cropper">image cropper</a>; finish pixels in the <a href="/image-resizer">image resizer</a>; shrink bytes in the <a href="/image-compressor">image compressor</a>.</p>

<h2 id="id-sizes">Exact ID sizes (India + international)</h2>
<table>
<thead><tr><th>Document</th><th>Size</th><th>Background</th></tr></thead>
<tbody>
<tr><td><strong>Indian passport</strong></td><td>51×51mm (600×600px commonly)</td><td>White</td></tr>
<tr><td><strong>US visa</strong></td><td>2×2 inch (600×600px)</td><td>White, strict</td></tr>
<tr><td><strong>PAN / Aadhaar photo</strong></td><td>As specified (often 35×45mm)</td><td>White/light</td></tr>
<tr><td><strong>LinkedIn / profile</strong></td><td>400×400 minimum</td><td>Any clean</td></tr>
</tbody>
</table>
<p>Always verify against the current notification — sizes revise. The method below works for any spec: only the numbers change.</p>

<h2 id="method">Crop → resize → compress (worked example)</h2>
<ol>
<li><strong>Crop composition</strong> in the <a href="/image-cropper">image cropper</a>: face centered, head 70–80% of frame height, required margins visible. For 35×45mm from a 4:3 photo, cut sides — never squeeze width.</li>
<li><strong>Resize to exact pixels</strong> in the <a href="/image-resizer">image resizer</a>: 600×600 for square specs. One resize only — repeated resizes soften edges cumulatively.</li>
<li><strong>Compress to the byte limit</strong> in the <a href="/image-compressor">image compressor</a>: 80% default; drop 5 points at a time if over. See the <a href="/blog/image-compressor-guide/compress-jpg-100kb-portal">100KB portal method</a> for limit-hitting tactics.</li>
<li><strong>Stretched-face check:</strong> compare ears-to-face-width against the original. Any widening means aspect broke — redo the crop, don't ship it. Officers reject distorted photos on sight.</li>
</ol>

<h2 id="avatar-rules">Avatar and profile rules</h2>
<p>Square crops for LinkedIn/GitHub/Twitter: center the face, keep 10–15% headroom above, export 400×400 minimum (retina displays punish 100px uploads). Dark-mode check: avatars with transparency render on unpredictable backgrounds — flatten onto white or brand color first (see <a href="/blog/image-compressor-guide/png-to-webp-transparency">transparency handling</a>). For teams, standardize one crop spec and background so directories look deliberate, not assembled.</p>

<h2 id="print-prep">Print prep: DPI, margins, test strip</h2>
<p>Screen pixels ≠ print quality: a 600×600 photo prints 2 inches at 300 DPI (studio standard) but 6+ inches from a 150 DPI export. For studio prints, export at 300 DPI equivalent and keep the master. Home printing: run one 4×6 test strip before committing to a full sheet — color shifts on inkjets surprise first-timers. Matte paper forgives compression artifacts that glossy exposes; choose matte for ID work.</p>
<blockquote class="tip">General guidance only. Document specs revise periodically — the current official notification outranks any guide, including this one.</blockquote>
`;

export const imageCrop: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "crop-passport-photos",
  kind: "cluster",
  title: "Crop Passport Photos to Exact Size at Home",
  description:
    "Crop passport and ID photos to exact size: spec table, crop-resize-compress order, stretched-face check, avatars + print prep. Free cropper.",
  keywords: [
    "passport photo size and crop guide india",
    "35x45mm passport crop online",
    "crop square avatar without stretching",
    "visa photo 2x2 inch pixels",
    "image cropper vs resizer",
    "What size is an Indian passport photo?",
  ],
  toolSlugs: ["image-cropper", "image-resizer", "image-compressor"],
  relatedSlugs: ["resize-image-exact-pixels", "compress-jpg-100kb-portal", "png-vs-jpg-vs-webp"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "id-sizes", text: "Exact ID sizes", level: 2 },
    { id: "method", text: "Crop-resize-compress", level: 2 },
    { id: "avatar-rules", text: "Avatar rules", level: 2 },
    { id: "print-prep", text: "Print prep", level: 2 },
  ],
  html,
  faqs: [
    { question: "What size is an Indian passport photo?", answer: "51×51mm, commonly 600×600px, white background. US visas use 2×2 inch at 600×600px, while PAN and Aadhaar often require 35×45mm on white or light backgrounds. Always verify the current notification since specs revise, though the crop-resize-compress method works for any numbers before cropping your original photo at home." },
    { question: "Should I crop or resize for ID photos?", answer: "Crop first for composition, then resize for pixels, then compress for bytes. Cropping cuts framing while resizing scales everything, so cut sides from 4:3 to 35×45mm rather than squeezing width. Never stretch to fit — distorted faces with widened ears get rejected on sight by officers." },
    { question: "How do I avoid stretched faces?", answer: "Lock aspect ratio always and compare ears-to-face-width against the original. A helpful stretch widened faces 15% and cropped ears, delaying an application a week. Any widening means aspect broke — redo the crop, don't ship it, and perform only one resize since repeats soften edges." },
    { question: "What size for LinkedIn avatars?", answer: "400×400 minimum, face centered with 10–15% headroom above. Retina displays punish 100px uploads, so export larger than minimum. Flatten transparency onto white or brand color first since dark-mode backgrounds shift, and standardize one crop spec so team directories look deliberate for consistent professional profiles across networks." },
    { question: "Cropper vs resizer — which first?", answer: "Cropper for composition changes, resizer for exact pixels after. Frame in the cropper with head at 70–80% of frame height and visible margins, then resize once to 600×600 for square specs. Different jobs in fixed order: crop, resize, compress, with byte limits handled last for reliable ID acceptance." },
  ],
};
