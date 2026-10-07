import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two articles, same topic, same word count. One ranks with a rich thumbnail and clean snippet; the other shows a gray placeholder and truncated title. The difference was forty minutes of <strong>image SEO</strong>: sized files, descriptive alts, stable dimensions. This guide gives the full checklist — size budgets, alt formulas, dimension discipline and lazy-loading — plus how each item feeds both rankings and AI-search citations.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. Hit budgets with the <a href="/image-compressor">image compressor</a>; score the page in the <a href="/seo-analyzer">SEO analyzer</a>. Cover sizing in <a href="/blog/image-compressor-guide/resize-image-exact-pixels">resize presets</a>.</p>

<h2 id="budgets">Size budgets per slot (the numbers to hit)</h2>
<table>
<thead><tr><th>Slot</th><th>Budget</th><th>How</th></tr></thead>
<tbody>
<tr><td><strong>Hero / LCP image</strong></td><td>&lt;180KB, 1200×630</td><td>WebP 80%, the LCP element — every KB delays paint</td></tr>
<tr><td><strong>In-article image</strong></td><td>&lt;150KB each</td><td>800px wide max, JPG/WebP 80%</td></tr>
<tr><td><strong>Thumbnail</strong></td><td>&lt;50KB</td><td>400px, 75% quality fine</td></tr>
<tr><td><strong>OG share cover</strong></td><td>&lt;300KB, 1200×630</td><td>Absolute HTTPS URL, test per network</td></tr>
</tbody>
</table>
<p>Audit method: DevTools → Network → Img filter → sort by size. Anything over budget gets the resize-then-compress treatment. Re-score after with the <a href="/seo-analyzer">SEO analyzer</a> until image checks pass.</p>

<h2 id="alt-formula">Alt text formula (8–12 descriptive words)</h2>
<p>Alt serves two masters: screen readers (accessibility) and crawlers (relevance). Formula: <strong>subject + action/context + distinguishing detail</strong>. “Technician compressing a 4.2MB photo to 900KB on a laptop” beats “image1” and beats keyword-stuffed “compress jpg image compressor free online tool”. Rules: every meaningful image gets alt; decorative dividers get empty alt (<code>alt=""</code>); never stuff keywords (it reads as spam to both audiences); keep under ~125 characters. Descriptive alts also get <em>cited</em> by AI search engines — generic ones never surface.</p>

<h2 id="dimensions-cls">Dimensions discipline (kill layout shift)</h2>
<p>Images without width/height (or aspect-ratio CSS) push text around as they load — Cumulative Layout Shift, a ranking factor. Fix at the source: set explicit dimensions matching the file (1200×630 hero → <code>width="1200" height="630"</code>), or <code>aspect-ratio: 1200/630</code> in CSS for responsive scaling. Reserve space even for lazy images — the placeholder box holds layout while bytes stream in. Our card components bake 280px intrinsic sizes for exactly this reason. Verify in Lighthouse: CLS under 0.1 is the target, and image-caused shifts are the most common failure I audit.</p>

<h2 id="lazy-srcset">Lazy-load below fold, srcset for screens</h2>
<p>Two attributes, big wins: <code>loading="lazy"</code> on every below-fold image (never on the hero/LCP image — that delays the most important paint), and <code>srcset</code> serving 400/800/1200px variants so phones don't download desktop bytes. Export the widths once from the <a href="/image-resizer">resizer</a>, compress each with the <a href="/image-compressor">compressor</a>, and wire all three. Finish by previewing share cards in the <a href="/open-graph-preview">open graph preview</a> — social crops punish unprepared dimensions.</p>
<blockquote class="tip">General guidance only. Measure with Lighthouse field data after shipping — lab scores approximate, real-user metrics decide.</blockquote>
`;

export const imageSeo: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "image-seo-size-alt",
  kind: "cluster",
  title: "Image SEO: Size, Alt Text and Dimensions",
  description:
    "Image SEO checklist: per-slot size budgets, 8-12 word alt formula, CLS-killing dimensions + lazy/srcset wiring. Free compressor + page scorer.",
  keywords: [
    "image seo size and alt guide",
    "what image size for blog hero fast load",
    "how to write alt text seo",
    "lazy load vs compress",
    "1200px hero lighthouse score",
    "What image size is best for blog heroes?",
  ],
  toolSlugs: ["image-compressor", "seo-analyzer", "image-resizer"],
  relatedSlugs: ["resize-image-exact-pixels", "png-vs-jpg-vs-webp", "strip-exif-before-upload"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "budgets", text: "Size budgets", level: 2 },
    { id: "alt-formula", text: "Alt formula", level: 2 },
    { id: "dimensions-cls", text: "Dimensions discipline", level: 2 },
    { id: "lazy-srcset", text: "Lazy + srcset", level: 2 },
  ],
  html,
  faqs: [
    { question: "What image size is best for blog heroes?", answer: "1200×630 under 180KB in WebP 80%, which doubles as the OG share cover up to 300KB with absolute HTTPS URLs. It keeps the LCP element fast since every kilobyte delays paint. Audit with DevTools Network image filter, resize then compress over-budget files, and re-score with the SEO analyzer." },
    { question: "How do I write SEO alt text?", answer: "Subject plus action plus distinguishing detail in 8–12 words under about 125 characters, like technician compressing a 4.2MB photo to 900KB on a laptop. Give every meaningful image alt, use empty alt for decoration, never stuff keywords, and prefer descriptive phrasing that AI search can cite." },
    { question: "Should I lazy-load all images?", answer: "Everything below the fold, yes, using loading lazy with reserved placeholder space. Never lazy-load the hero or LCP image — that delays your most important paint and hurts scores. Export 400/800/1200 widths from the resizer, compress each variant, and wire responsive srcset so phones avoid desktop bytes." },
    { question: "How do images cause layout shift?", answer: "Missing dimensions let text reflow as images load, creating Cumulative Layout Shift, a ranking factor. Set explicit width and height like 1200×630 or aspect-ratio CSS so space reserves upfront. Our cards bake 280px intrinsic sizes, and Lighthouse targets CLS under 0.1 for stable layouts during loading for readers." },
    { question: "Do images affect AI search citations?", answer: "Descriptive alts and fast-loading figures get cited; generic filenames and heavy pages don't surface. The same forty-minute checklist — sized files, 8–12 word alts and stable dimensions — feeds both rankings and AI citations. Keep heroes under 180KB and verify share cards in the open graph preview." },
  ],
};
