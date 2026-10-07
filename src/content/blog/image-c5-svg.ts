import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A client's 1.8MB logo SVG crashed their email builder — the export hid three embedded raster images and a full font subset. Cleaned: 34KB, identical rendering. <strong>SVGs are code, and exported code is messy</strong>: editor metadata, hidden layers, six-decimal precision, unused defs. This guide shows what to strip safely, what breaks logos (viewBox!), and how to validate at 16px and 200px before shipping.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. Optimize markup in the <a href="/svg-optimizer">SVG optimizer</a>; mint favicons in the <a href="/favicon-generator">favicon generator</a>. Raster fallback logic in <a href="/blog/image-compressor-guide/png-vs-jpg-vs-webp">formats guide</a>.</p>

<h2 id="safe-strips">What to strip safely (metadata, precision, defs)</h2>
<ul>
<li><strong>Editor metadata:</strong> Illustrator/Inkscape/Figma headers, comments, processing instructions — pure dead weight, often 30–50% of file size.</li>
<li><strong>Hidden layers and off-canvas art:</strong> designers hide drafts instead of deleting; each hidden group ships bytes and sometimes confidential content.</li>
<li><strong>Coordinate precision:</strong> six decimals → one or two. <code>12.345678</code> to <code>12.35</code> is invisible at every real size and saves ~20%.</li>
<li><strong>Unused defs and gradients:</strong> palette experiments never applied — safe to drop when unreferenced.</li>
<li><strong>Font subsets:</strong> embedded fonts for two words of text — convert text to paths for logos, or subset ruthlessly.</li>
</ul>

<h2 id="viewbox">The viewBox: touch it and the logo breaks</h2>
<p><code>viewBox="0 0 200 60"</code> defines the coordinate system everything scales from. Delete it and the SVG renders at unpredictable sizes; alter it and aspect ratios skew. Rules: never remove viewBox, never change its numbers unless you understand the transform, always pair with explicit <code>width</code>/<code>height</code> or CSS sizing. The #1 SVG bug I review is a “responsive” logo with viewBox stripped — perfect on the designer's screen, collapsed to 0×150px in production. Validate after every optimization: render at 16px (favicon), 48px (header mobile), and 200px (footer) before committing.</p>

<h2 id="svg-vs-png">SVG vs PNG: logo delivery rules</h2>
<table>
<thead><tr><th>Use SVG when</th><th>Use PNG/WebP when</th></tr></thead>
<tbody>
<tr><td>Geometric logos, icons, line art</td><td>Email signatures and newsletters</td></tr>
<tr><td>Anything needing infinite scaling</td><td>Social avatars with fixed pixels</td></tr>
<tr><td>File under ~50KB optimized</td><td>Complex gradients that bloat as vectors</td></tr>
<tr><td>Dark-mode variants via CSS</td><td>Legacy CMS without SVG upload</td></tr>
</tbody>
</table>
<p>Photographic content as “SVG” (embedded base64 raster) is the worst of both worlds — huge files with zero scalability. If your SVG exceeds 200KB, inspect it: embedded images mean it should have been JPG/WebP all along. For favicons, generate the full set (16/32/180/192/512) from the optimized master with the <a href="/favicon-generator">favicon generator</a>.</p>

<h2 id="validate">Validate: 16px, 200px, dark mode</h2>
<p>Three renders catch 95% of breakage: 16px favicon tab (details vanish? simplify paths), 200px header (strokes too thin? bump to 2px minimum), and dark-mode background (dark strokes invisible? add light variant or outline). Also confirm the file opens after stripping — over-aggressive minifiers occasionally eat required namespaces. Keep the unoptimized master archived; re-optimize from it when brand colors change rather than editing minified output.</p>
<blockquote class="tip">General guidance only. Complex illustrations with photographic gradients usually belong as WebP — vectorize drawings, rasterize paintings.</blockquote>
`;

export const imageSvg: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "optimize-svg-logos",
  kind: "cluster",
  title: "Optimize SVG Logos Without Breaking Them",
  description:
    "Optimize SVG logos safely: what to strip, the untouchable viewBox, SVG vs PNG rules + 16px/200px/dark validation. Free optimizer + favicon tool.",
  keywords: [
    "how to optimize svg for web",
    "svg file too large slow site",
    "svg vs png logo",
    "remove svg metadata safely",
    "svg to png for favicon",
    "How much can SVG optimization save?",
  ],
  toolSlugs: ["svg-optimizer", "favicon-generator", "image-format-converter"],
  relatedSlugs: ["png-vs-jpg-vs-webp", "resize-image-exact-pixels", "image-seo-size-alt"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "safe-strips", text: "Safe strips", level: 2 },
    { id: "viewbox", text: "The viewBox rule", level: 2 },
    { id: "svg-vs-png", text: "SVG vs PNG rules", level: 2 },
    { id: "validate", text: "Triple validation", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much can SVG optimization save?", answer: "Often 50–80%: a 1.8MB export with embedded rasters and metadata cleaned to 34KB with identical rendering. Precision rounding from six decimals to one or two saves about 20%, while editor metadata alone is often 30–50%. Hidden layers, unused defs and font subsets provide the remaining savings." },
    { question: "Can I delete the viewBox?", answer: "No — it defines the coordinate system everything scales from, like viewBox 0 0 200 60. Removing it collapses scaling unpredictably, often to 0×150px in production, while altering numbers skews aspects. Keep viewBox, control size with width/height or CSS, then validate at 16px, 48px and 200px." },
    { question: "SVG or PNG for my logo?", answer: "SVG for geometric logos on web with infinite scaling, tiny files under about 50KB and dark-mode CSS variants. PNG/WebP for email signatures, social avatars and legacy systems without SVG upload. Photographic content should never be SVG — embedded base64 rasters bloat past 200KB without scalability." },
    { question: "How do I make favicons from SVG?", answer: "Optimize the master first, then generate 16/32/180/192/512 sizes with the favicon generator. Test the 16px tab render and simplify paths if details vanish, check 200px headers for thin strokes, and keep the unoptimized master archived for future brand color changes. Bump thin strokes to 2px minimum and verify dark-mode backgrounds." },
    { question: "Why is my SVG file huge?", answer: "Usually embedded raster images, font subsets, or hidden layers. Three embedded rasters plus a full font subset once bloated a logo to 1.8MB, while editor metadata alone adds 30–50%. Inspect the markup: base64 blobs mean it should have been JPG/WebP, and hidden off-canvas drafts may leak confidential content." },
  ],
};
