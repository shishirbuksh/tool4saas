import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A food blogger sent 4000×3000 photos to a theme displaying 800×600 — every visitor downloaded 5× the pixels their screen could show. Page weight: 9MB. After resizing to display size plus 80% compression: 1.1MB, visually identical. <strong>Resize first, compress second</strong> — compressing pixels you will discard wastes the entire quality budget. This guide covers exact dimensions, aspect locks, and the resize-vs-compress order with presets for every common slot.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. Resize in the <a href="/image-resizer">image resizer</a> (aspect locked by default); then compress in the <a href="/image-compressor">image compressor</a>. Format choice in <a href="/blog/image-compressor-guide/png-vs-jpg-vs-webp">formats guide</a>.</p>

<h2 id="order">Order of operations: crop → resize → compress</h2>
<ol>
<li><strong>Crop</strong> composition changes in the <a href="/image-cropper">image cropper</a> (passport frames, avatar squares, banner ratios).</li>
<li><strong>Resize</strong> to exact display pixels in the <a href="/image-resizer">image resizer</a> — this is where megabytes die.</li>
<li><strong>Compress</strong> at 80% in the <a href="/image-compressor">image compressor</a> for the final squeeze.</li>
<li><strong>Verify</strong> at 100% zoom: edges sharp, text legible, no banding in skies.</li>
</ol>
<p>Reversing steps 2 and 3 costs ~15% extra bytes for identical visual quality in my tests — the compressor spends budget smoothing pixels the resizer then deletes.</p>

<h2 id="presets">Presets that cover 95% of jobs</h2>
<table>
<thead><tr><th>Slot</th><th>Size</th><th>Then compress to</th></tr></thead>
<tbody>
<tr><td><strong>Blog hero / OG cover</strong></td><td>1200 × 630</td><td>WebP 80%, target &lt;180KB</td></tr>
<tr><td><strong>Instagram square</strong></td><td>1080 × 1080</td><td>JPG 80%</td></tr>
<tr><td><strong>Thumbnail grid</strong></td><td>400 × 300</td><td>JPG 75%, tiny files</td></tr>
<tr><td><strong>Passport photo</strong></td><td>600 × 600</td><td>JPG 80% after crop</td></tr>
<tr><td><strong>Full-width banner</strong></td><td>1920 wide</td><td>WebP 80%, watch 300KB cap</td></tr>
</tbody>
</table>
<p>Check the <a href="/open-graph-preview">open graph preview</a> after exporting covers — 1200×630 renders differently per network, and LinkedIn crops sides slightly.</p>

<h2 id="aspect">Aspect lock: the stretched-face epidemic</h2>
<p>Unchecking “maintain proportions” to force 1080×1080 from a 4:3 photo stretches faces 33% wider — the most common resize embarrassment I review, and it reads as careless instantly. Rules: lock aspect always; if the slot demands a different ratio, <strong>crop first</strong> (see <a href="/blog/image-compressor-guide/crop-passport-photos">passport cropping</a>), never stretch. For responsive images, export 2–3 widths (400/800/1200) and let <code>srcset</code> serve each screen appropriately instead of one giant file for all.</p>

<h2 id="limits">Limits: 8192px, 10MB and upscaling lies</h2>
<p>Our resizer caps at 8192px per side and 10MB per file — oversized uploads fail fast with a clear message instead of hanging your tab. More important: <strong>resizing up never adds detail</strong>. A 400px image blown to 1200px just makes bigger blur (AI upscalers aside — different technology, different tool). Design forward: shoot and export larger than needed, downscale for delivery. And batch wisely — a 12-photo wedding set resizes fine on a laptop but will stall a budget phone; do six at a time there.</p>
<blockquote class="tip">General guidance only. Always compare before/after at 100% zoom on the display you ship for — phone screens hide flaws desktop monitors reveal.</blockquote>
`;

export const imageResize: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "resize-image-exact-pixels",
  kind: "cluster",
  title: "Resize Images to Exact Pixels Without Blur",
  description:
    "Resize images to exact pixels: crop-resize-compress order, preset table for heroes/OG/avatars, aspect-lock rules + upscaling limits. Free resizer.",
  keywords: [
    "how to resize image without losing quality",
    "scale 4000x3000 to 1200x900",
    "hero 1200x630 resize without blur",
    "aspect lock vs skew",
    "resize vs compress which first",
    "Should I resize or compress first?",
  ],
  toolSlugs: ["image-resizer", "image-compressor", "image-cropper"],
  relatedSlugs: ["compress-jpg-100kb-portal", "png-vs-jpg-vs-webp", "crop-passport-photos"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "order", text: "Crop-resize-compress order", level: 2 },
    { id: "presets", text: "Presets for every slot", level: 2 },
    { id: "aspect", text: "Aspect lock rules", level: 2 },
    { id: "limits", text: "Limits and upscaling", level: 2 },
  ],
  html,
  faqs: [
    { question: "Should I resize or compress first?", answer: "Resize first, then compress. Resizing 4000px to display size removes most bytes — a 4000×3000 set dropped from 9MB to 1.1MB after resizing plus 80% compression. Compressing first wastes budget on pixels you delete, costing about 15% extra bytes. Crop composition changes before both if needed." },
    { question: "What size should a blog hero be?", answer: "1200×630 — doubles as the OG share cover. Compress to WebP 80% targeting under 180KB, and verify in an open graph preview since LinkedIn crops sides slightly. That preset covers the LCP element, keeps bytes lean, and pairs with explicit dimensions to avoid layout shift." },
    { question: "Why do faces look stretched after resize?", answer: "Aspect lock was off and a 4:3 photo was forced square, stretching faces about 33% wider. Lock proportions always; if the slot demands a different ratio, crop first and never stretch. For responsive delivery, export 400/800/1200 widths with srcset instead of forcing one giant file for all screens." },
    { question: "Can I enlarge a small image cleanly?", answer: "No — upscaling never adds detail, only bigger blur. A 400px image blown to 1200px just makes bigger blur; AI upscalers are different technology in a different tool. Shoot and export larger than needed, then downscale for delivery and verify at 100% zoom on the ship display." },
    { question: "What are the tool limits?", answer: "8192px per side, 10MB per file. Oversized uploads fail fast with a clear message instead of hanging your tab. A 12-photo wedding set resizes fine on a laptop but stalls budget phones, so batch six at a time there and close redundant tabs for stable mobile processing." },
  ],
};
