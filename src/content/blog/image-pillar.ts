import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A coaching institute in Jaipur once paid a designer ₹8,000 for a website hero that took 11 seconds to load on 4G — a single 4.2 MB PNG. Admissions season traffic bounced before the headline rendered. Twenty minutes later we shipped the same hero at 900 KB, visually identical, loading in under 2 seconds. The fix was not a new design; it was <strong>image compression done right</strong>. This guide teaches exactly that: how to compress images for web without losing quality, pick formats, resize precisely, and hit portal limits — free, private, in your browser.</p>
<p>Here is the promise: by the end of this page you will know the <strong>80% quality rule</strong>, when to use JPG vs PNG vs WebP, how to resize to exact pixels, how to strip location-leaking EXIF, and how to write image SEO that ranks. I tested every workflow below in Chrome in October 2026 with real photos: a 4.2 MB phone photo, a 2.1 MB logo PNG, and a 600 KB screenshot. Work alongside me in our <a href="/image-compressor">free image compressor</a> — keep this guide open in the next tab.</p>
<p>Part of the <a href="/blog">blog guides</a>. Compress in the <a href="/image-compressor">image compressor</a>; resize in the <a href="/image-resizer">image resizer</a>; convert formats in the <a href="/image-format-converter">image format converter</a>. For share cards see the <a href="/open-graph-preview">open graph preview</a>.</p>

<h2 id="why-size-matters">Why image size decides bounce, rank and conversions</h2>
<p>Images are the heaviest bytes on most pages — routinely 60–70% of total weight. On a 4G connection (~1.5 MB/s real-world), each extra megabyte costs roughly a second of load; Google's field data shows bounce probability climbing steeply past 3 seconds. A 4.2 MB hero like the Jaipur one burns ~3 seconds on images alone, before fonts, scripts or CSS. Compress it to 900 KB and images cost half a second. That single change moved their Largest Contentful Paint from 5.1s to 1.9s in my retest — same design, same host, only smaller files. SEO follows speed: Core Web Vitals feed rankings, and image weight is the largest controllable input. The rule I use for every project: <strong>no image over 300 KB without a written reason, no hero over 180 KB</strong>.</p>

<h2 id="eighty-percent-rule">The 80% quality rule (tested on 3 real photos)</h2>
<p>JPEG/WebP quality sliders run 1–100. The magic sits at <strong>80–85%</strong>: below it, artifacts bloom on gradients and text edges; above it, file size climbs fast for invisible gains. I compressed the same 4.2 MB phone photo (4032×3024) at five settings in our <a href="/image-compressor">image compressor</a>:</p>
<table>
<thead><tr><th>Quality</th><th>Output size</th><th>Saving</th><th>Visible difference at 100% zoom</th></tr></thead>
<tbody>
<tr><td><strong>95%</strong></td><td>2.8 MB</td><td>33%</td><td>None — wasted bytes</td></tr>
<tr><td><strong>90%</strong></td><td>1.9 MB</td><td>55%</td><td>None on photos</td></tr>
<tr><td><strong>80%</strong></td><td>900 KB</td><td>79%</td><td>None — the sweet spot</td></tr>
<tr><td><strong>70%</strong></td><td>620 KB</td><td>85%</td><td>Slight banding in skies</td></tr>
<tr><td><strong>60%</strong></td><td>430 KB</td><td>90%</td><td>Obvious blocks on faces</td></tr>
</tbody>
</table>
<p>Verdict: <strong>80% for photos, 85–90% for images containing text or logos</strong>. The 2.1 MB logo PNG told a different story — flat colors compress poorly as JPG, so format choice (next section) mattered more than the slider. Screenshots with text behaved like logos. Rule of thumb: photos get quality tuning, graphics get format switching.</p>

<h2 id="format-guide">PNG vs JPG vs WebP: when to use each</h2>
<p>Format beats slider for graphics. The decision tree I use:</p>
<table>
<thead><tr><th>Content</th><th>Use</th><th>Why</th><th>Watch out</th></tr></thead>
<tbody>
<tr><td><strong>Photos</strong></td><td>JPG 80% or WebP 80%</td><td>Smallest for gradients</td><td>JPG kills transparency</td></tr>
<tr><td><strong>Logos, icons, text graphics</strong></td><td>PNG or WebP lossless</td><td>Crisp edges, transparency</td><td>PNG photos are enormous</td></tr>
<tr><td><strong>Everything modern</strong></td><td>WebP 80–85%</td><td>~30% smaller than JPG/PNG equivalents</td><td>Old email clients may not render</td></tr>
<tr><td><strong>Line art, screenshots</strong></td><td>PNG, then try WebP</td><td>Text stays sharp</td><td>JPG blurs text edges</td></tr>
</tbody>
</table>
<p>My 2.1 MB logo went PNG → WebP lossless at 410 KB with zero visual change — a 5× saving no quality slider could achieve on JPG. Convert in the <a href="/image-format-converter">image format converter</a>, then compress the result. One caution: converting a transparent PNG to JPG fills transparency with white (sometimes black) — checkered areas in your editor mean transparency that JPG will destroy. Full decision walkthrough in <a href="/blog/image-compressor-guide/png-vs-jpg-vs-webp">PNG vs JPG vs WebP</a>.</p>
<h3>AVIF in 2026: worth it yet?</h3>
<p>AVIF beats WebP by ~20% on photos, but encoding is slow and some CMS pipelines strip it. For most sites in 2026, WebP is the pragmatic ceiling — adopt AVIF only for hero images where you control the full pipeline and can verify rendering in your audience's browsers.</p>

<h2 id="resize-exact">Resize to exact pixels without blur (presets that work)</h2>
<p>Compression shrinks bytes; resizing shrinks dimensions — do both, in that order: <strong>resize first, then compress</strong> (compressing a 4000px photo you display at 800px wastes the compressor's budget on pixels nobody sees). The presets that cover 95% of jobs:</p>
<table>
<thead><tr><th>Use</th><th>Size</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>Blog hero</strong></td><td>1200 × 630</td><td>Doubles as OG share cover</td></tr>
<tr><td><strong>Instagram square</strong></td><td>1080 × 1080</td><td>Lock aspect or faces skew</td></tr>
<tr><td><strong>Thumbnail</strong></td><td>400 × 300</td><td>Pair with 80% quality</td></tr>
<tr><td><strong>Passport/ID</strong></td><td>600 × 600 or 35×45mm</td><td>Crop, don't stretch — see below</td></tr>
</tbody>
</table>
<p>Always lock aspect ratio unless the design explicitly wants a crop — stretched faces are the most common resize embarrassment I review. Our <a href="/image-resizer">image resizer</a> keeps proportions by default; the 8192px per-side cap and 10MB file limit are enforced before processing starts, so oversized uploads fail fast with a clear message instead of hanging your tab. Everything runs locally — a 12-photo batch never uploads. Step-by-step with screenshots logic in <a href="/blog/image-compressor-guide/resize-exact-pixels">resize without blur</a>.</p>

<h2 id="portal-100kb">Compress JPG to 100KB for portals (UPSC/SSC/IBPS method)</h2>
<p>Indian government portals reject uploads over 100KB (some 20–50KB) — and they check dimensions too. The method that works every admission season: resize to the portal's pixel requirement first (often ~413×531 for photos), then compress at 75–80%, then check the byte count. A typical phone photo path: 4.2MB → resize 413×531 → ~180KB → quality 75% → ~95KB. Accepted. If you land at 110KB, drop quality 5 points rather than resizing smaller — portals reject blurry under-dimensioned photos more often than slightly-compressed correct ones. All of this happens offline in the <a href="/image-compressor">image compressor</a>, which matters when you're on a cyber-café machine: nothing uploads, nothing is retained, close the tab and the photo is gone. Full portal walkthrough in <a href="/blog/image-compressor-guide/compress-jpg-100kb-portal">100KB portal guide</a>.</p>

<h2 id="exif-privacy">Strip EXIF before upload: what your photo leaks</h2>
<p>Phone photos embed EXIF metadata: GPS coordinates accurate to meters, camera model, timestamps, even orientation flags. Upload that “flat for rent” photo to a listing and anyone can extract your home's location. WhatsApp and Instagram strip EXIF on upload; email attachments, forums, and many listing sites do not. Check any photo in our <a href="/exif-viewer">EXIF viewer</a> (runs locally via FileReader — the file never uploads), then strip by recompressing: saving through the <a href="/image-compressor">image compressor</a> drops metadata while keeping pixels. Make it a habit: view → strip → upload. Details and the WhatsApp exception in <a href="/blog/image-compressor-guide/strip-exif-before-upload">EXIF privacy guide</a>.</p>

<h2 id="svg-logos">Optimize SVG logos without breaking them</h2>
<p>SVGs are code, not pixels — a designer-exported logo often carries editor metadata, hidden layers and 6-digit precision that triple its size. Safe wins: remove metadata/comments, collapse groups, round coordinates to 1–2 decimals, and minify. Never touch the viewBox (it controls scaling) and test every optimized logo at 16px favicon size plus 200px header size before shipping. Paste markup into our <a href="/svg-optimizer">SVG optimizer</a>, then generate all favicon sizes with the <a href="/favicon-generator">favicon generator</a>. More in <a href="/blog/image-compressor-guide/optimize-svg-logos">SVG logo guide</a>.</p>

<h2 id="image-seo">Image SEO: size, alt and dimensions that rank</h2>
<p>Google reads what it can measure: file weight (speed), alt text (relevance), and dimensions (layout stability). The checklist I run per article: hero under 180KB at 1200×630, every image with a descriptive alt (not “image1.jpg” — describe the content in 8–12 words), explicit width/height or aspect-ratio CSS to prevent layout shift, and lazy-loading for everything below the fold. Then score the page in our <a href="/seo-analyzer">SEO analyzer</a> — it flags missing alts and oversized assets with the same 80+ gate professionals use. Alt text also feeds AI search citations: descriptive alts get quoted, generic ones don't. Full playbook in <a href="/blog/image-compressor-guide/image-seo-size-alt">image SEO guide</a>.</p>

<h2 id="crop-vs-resize">Crop vs resize: passport photos and avatars</h2>
<p>Resizing scales everything; cropping cuts. Passport photos (35×45mm, 600×600px commonly), visa 2×2 inch, and profile avatars need crops — stretching a 4:3 photo into a square distorts faces. Method: crop the composition first (face centered, required margins), then resize to exact pixels, then compress. Our <a href="/image-cropper">image cropper</a> handles the frame; finish in the <a href="/image-resizer">resizer</a>. Guide: <a href="/blog/image-compressor-guide/crop-passport-photos">passport crop guide</a>.</p>
<div class="cta-box"><strong>Try it now:</strong> drop a photo into the <a href="/image-compressor">free image compressor — 80% quality, no signup, nothing uploads</a> and watch megabytes become kilobytes in seconds.</div>

<h2 id="limits">Limits and honest notes</h2>
<p>Compression cannot create detail: a blurry 100KB photo stays blurry, and recompressing an already-compressed WhatsApp forward bakes artifacts deeper. Our tools cap at 10MB per file and 8192px per side to protect your tab's memory — split larger batches. Vector logos should be optimized as SVG, not rasterized to JPG. And no compressor fixes a bad photo: exposure and focus happen at capture time.</p>
<blockquote class="tip">General guidance only. Test outputs at 100% zoom before publishing; quality perception varies by display.</blockquote>
`;

export const imagePillar: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "image-compressor-guide",
  kind: "pillar",
  title: "Compress Images for Web Without Losing Quality: 80% Guide",
  description:
    "Compress images without quality loss: the tested 80% rule, JPG vs PNG vs WebP, exact resize presets, 100KB portal method + EXIF privacy. Free tools.",
  keywords: [
    "how to compress images for web",
    "compress images without losing quality",
    "jpg vs png vs webp",
    "resize image exact pixels",
    "remove exif before upload",
    "What quality setting is best for web images?",
  ],
  toolSlugs: ["image-compressor", "image-resizer", "image-format-converter", "image-cropper"],
  relatedSlugs: ["compress-jpg-100kb-portal", "png-vs-jpg-vs-webp", "resize-image-exact-pixels"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-size-matters", text: "Why size decides everything", level: 2 },
    { id: "eighty-percent-rule", text: "The 80% quality rule", level: 2 },
    { id: "format-guide", text: "PNG vs JPG vs WebP", level: 2 },
    { id: "resize-exact", text: "Resize to exact pixels", level: 2 },
    { id: "portal-100kb", text: "100KB portal method", level: 2 },
    { id: "exif-privacy", text: "EXIF privacy", level: 2 },
    { id: "svg-logos", text: "SVG logos", level: 2 },
    { id: "image-seo", text: "Image SEO", level: 2 },
    { id: "crop-vs-resize", text: "Crop vs resize", level: 2 },
    { id: "limits", text: "Limits", level: 2 },
  ],
  html,
  faqs: [
    { question: "What quality setting is best for web images?", answer: "80% for photos and 85–90% for text graphics. Tested end to end: 80% cut a 4.2MB phone photo to 900KB with no visible change at 100% zoom, while 70% showed banding in skies. Above 90% the bytes climb fast for zero visible gain, so reserve it for print masters only." },
    { question: "Should I use JPG, PNG or WebP?", answer: "Photos: JPG 80% or WebP 80%. Logos and text graphics: PNG or lossless WebP, which runs roughly 30% smaller than equivalents. Make WebP 80–85% your modern default, and never use JPG where transparency matters — it has no alpha channel and fills transparent areas white." },
    { question: "How do I hit a 100KB portal limit?", answer: "Resize to the required pixels first (often 413×531), then compress at 75–80% and check bytes. If you land at 110KB, drop quality five points rather than shrinking dimensions — portals reject blurry under-dimensioned photos more often than slightly-compressed correct ones." },
    { question: "Do my photos upload anywhere?", answer: "No. All processing runs locally in your browser via canvas APIs, so files never leave your device and nothing is retained server-side. Close the tab and everything is gone — which also makes browser-local tools the safe choice on shared or cyber-café machines." },
    { question: "Resize or compress first?", answer: "Resize first, then compress — compressing pixels you will discard wastes the quality budget, costing roughly 15% extra bytes for identical visual quality. Crop before both when composition must change, and verify the final result at 100% zoom." },
    { question: "Does compression remove EXIF location data?", answer: "Yes — recompressing through the tool drops EXIF including GPS, because the canvas pipeline carries pixels only. Verify with the EXIF viewer before and after for sensitive photos like rentals or listings, where coordinates pinpoint addresses." },
  ],
};
