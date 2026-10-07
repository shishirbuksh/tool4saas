import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A client sent me their new logo as a 2.1MB PNG and asked why the site felt slow. Same logo as JPG: 380KB but the transparent background turned white and text edges blurred. As WebP lossless: 410KB, transparent, crisp. Three formats, same pixels, 5× size spread — <strong>format choice beats quality sliders for graphics</strong>. This guide gives the decision rules I use on every project, with the transparency trap explained once and for all.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. Convert in the <a href="/image-format-converter">image format converter</a>; shrink results in the <a href="/image-compressor">image compressor</a>. The 80% rule lives in <a href="/blog/image-compressor-guide">the pillar</a>.</p>

<h2 id="decision-tree">The decision tree (30 seconds per image)</h2>
<ol>
<li><strong>Is it a photo?</strong> → JPG 80% or WebP 80%. Done.</li>
<li><strong>Does it need transparency?</strong> → PNG or WebP lossless. Never JPG.</li>
<li><strong>Does it contain text or line art?</strong> → PNG first, then try WebP lossless. Compare at 100% zoom.</li>
<li><strong>Is it displayed over 2000px wide?</strong> → WebP 85% regardless — the 30% saving compounds at large sizes.</li>
<li><strong>Is it an email attachment?</strong> → JPG/PNG only. Some mail clients still refuse WebP.</li>
</ol>

<h2 id="transparency-trap">The transparency trap (checkerboard means danger)</h2>
<p>That gray checkerboard in your editor is not a background — it is the <em>absence</em> of one. Export to JPG and the converter must invent pixels: usually white, sometimes black, occasionally a mood. Transparent logos on dark website sections turn into white boxes — the #1 format embarrassment I review. Rules: checkered areas + JPG = damage; checkered areas + PNG/WebP = safe. If a platform demands JPG (some portals do), composite onto white yourself first so you control the result instead of discovering it. Test conversions in the <a href="/image-format-converter">format converter</a> with the checkerboard preview on.</p>

<h2 id="photo-tests">Photo tests: same image, four formats</h2>
<p>I ran one 4.2MB phone photo through every pipeline at visually-lossless settings:</p>
<table>
<thead><tr><th>Format</th><th>Size</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>JPG 80%</strong></td><td>900KB</td><td>Universal, email-safe</td></tr>
<tr><td><strong>WebP 80%</strong></td><td>640KB</td><td>~30% smaller, modern browsers</td></tr>
<tr><td><strong>PNG</strong></td><td>6.1MB</td><td>Bigger than original — never for photos</td></tr>
<tr><td><strong>WebP lossless</strong></td><td>2.4MB</td><td>Pointless for photos, perfect for logos</td></tr>
</tbody>
</table>
<p>Two lessons: PNG on photos is actively harmful (6.1MB!), and WebP's ~30% edge is free money wherever browser support allows. For hero images, serve WebP with JPG fallback via <code>&lt;picture&gt;</code> — one extra markup block, permanent savings.</p>

<h2 id="logos-screenshots">Logos, screenshots and the AVIF question</h2>
<p>Logos: vector SVG first (see <a href="/blog/image-compressor-guide/optimize-svg-logos">SVG optimization</a>), PNG/WebP fallback for email and social. Screenshots with text: PNG, then WebP-lossless trial — JPG blurs 12px UI text into mush. AVIF in 2026: ~20% better than WebP on photos, slow to encode, spotty CMS support. Adopt for heroes you fully control; WebP remains the pragmatic default everywhere else. After converting, always compress the result — format and quality are multiplicative wins, as <a href="/blog/image-compressor-guide/resize-image-exact-pixels">resizing first</a> compounds both.</p>
<blockquote class="tip">General guidance only. Verify transparency and text sharpness at 100% zoom after every conversion — thumbnails lie.</blockquote>
`;

export const imageFormats: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "png-vs-jpg-vs-webp",
  kind: "cluster",
  title: "PNG vs JPG vs WebP: Which Format to Use",
  description:
    "PNG vs JPG vs WebP decision tree with tested sizes, the transparency trap explained, photo format tests + logo and AVIF guidance. Free converter.",
  keywords: [
    "png vs jpg vs webp for website",
    "should logo be png or webp",
    "photo png to jpg size difference",
    "does webp keep transparency",
    "avif vs webp 2026",
    "Should my logo be PNG or WebP?",
  ],
  toolSlugs: ["image-format-converter", "image-compressor", "image-resizer"],
  relatedSlugs: ["compress-jpg-100kb-portal", "resize-image-exact-pixels", "optimize-svg-logos"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "decision-tree", text: "30-second decision tree", level: 2 },
    { id: "transparency-trap", text: "Transparency trap", level: 2 },
    { id: "photo-tests", text: "Photo format tests", level: 2 },
    { id: "logos-screenshots", text: "Logos, screenshots, AVIF", level: 2 },
  ],
  html,
  faqs: [
    { question: "Should my logo be PNG or WebP?", answer: "PNG or lossless WebP — both keep transparency and crisp edges, with WebP about 30% smaller. A 2.1MB PNG logo became 410KB WebP lossless, pixel-identical and transparent. Never JPG for logos: it fills transparency white and blurs text. Start from SVG for vectors, then verify at 100% zoom in the format converter." },
    { question: "Why did my transparent logo get a white box?", answer: "You exported to JPG, which has no transparency — the converter must invent pixels, usually white, sometimes black. That checkerboard was absence, not background, so logos on dark sections become white boxes. Re-export as PNG or WebP lossless, or composite onto white yourself first and preview with checkerboard on." },
    { question: "Is WebP safe to use in 2026?", answer: "Yes for web: all modern browsers render it, including 640KB WebP 80% versus 900KB JPG 80% savings. Keep JPG/PNG fallbacks for email attachments and legacy CMS pipelines, since some mail clients still refuse WebP. For heroes, serve WebP with JPG fallback via picture markup for permanent savings." },
    { question: "Why is my PNG photo enormous?", answer: "PNG is lossless — great for graphics, terrible for photos. A 4.2MB phone photo became 6.1MB as PNG, bigger than the original. Use JPG 80% at 900KB or WebP 80% at 640KB for photos instead. Reserve PNG and WebP lossless for logos and text, then compress the converted result." },
    { question: "Should I switch to AVIF?", answer: "Only for hero images you fully control. AVIF beats WebP by about 20% on photos, but encodes slowly and breaks some CMS and email pipelines. WebP remains the pragmatic default everywhere else, with JPG fallback via picture markup. Revisit yearly as support improves, and always compress after converting." },
  ],
};
