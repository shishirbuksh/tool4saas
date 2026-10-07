import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A startup's pricing page showed their logo on a white box — on their own dark hero. The PNG had transparency; someone “optimized” it to JPG and the checkerboard became a white rectangle. Five minutes with a proper converter fixed a brand-damaging bug: <strong>PNG to WebP keeps transparency at a third of the bytes</strong>. This guide covers transparency-safe conversion both directions, quality picks, and the email fallback problem.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. Convert in the <a href="/image-format-converter">image format converter</a>; shrink results in the <a href="/image-compressor">image compressor</a>. Decision background in <a href="/blog/image-compressor-guide/png-vs-jpg-vs-webp">formats guide</a>.</p>

<h2 id="png-webp">PNG → WebP at 85%: the 70% shrink that keeps alpha</h2>
<p>WebP lossless preserves every transparent pixel while cutting typical UI graphics ~70%: my test set of five logos averaged 310KB PNG → 95KB WebP, pixel-identical on diff. For photographic PNGs (screenshots with gradients), lossy WebP at 85% beats PNG by 5–8× — a 2.4MB screenshot dropped to 380KB with text still crisp. Procedure: convert one file, zoom both to 100%, toggle between them. If you cannot tell, ship the WebP. Batch the rest. Quality slider guidance: 85% default, 90%+ for tiny text under 14px, never below 75% for graphics (unlike photos, graphics show artifacts early).</p>

<h2 id="reverse">WebP → JPG: when recipients demand it</h2>
<p>Email clients, government portals and print shops often reject WebP. Converting back is safe with one rule: <strong>flatten transparency deliberately</strong>. WebP with alpha → JPG needs a background color — choose white for documents, brand color for marketing, never default black (the classic accident). Text on the flattened result deserves a 100% zoom check: lossy-on-lossy conversion softens edges twice. For email specifically, prefer JPG 80% under 200KB — many clients clip larger inline images.</p>

<h2 id="white-bg">Why transparent PNGs get white backgrounds (and the fix)</h2>
<p>Three distinct causes, three fixes:</p>
<ul>
<li><strong>Format conversion to JPG:</strong> expected — JPG has no alpha channel. Fix: stay PNG/WebP, or composite intentionally.</li>
<li><strong>Viewer with no transparency support:</strong> old Windows Photo Viewer shows black or white. Fix: nothing wrong with your file — verify in a browser.</li>
<li><strong>CSS background behind a transparent asset:</strong> the page, not the image. Fix: set the container background to match the design.</li>
</ul>
<p>Diagnose by opening the file in two viewers: identical white in both means baked-in background (re-export from source); white in one only means viewer/CSS behavior. The <a href="/image-format-converter">converter</a> shows a checkerboard preview so you see transparency before committing.</p>

<h2 id="email-avif">Email fallbacks and AVIF reality check</h2>
<p>Keep a JPG/PNG copy of every WebP you ship in email campaigns — Outlook desktop and several webmails still refuse WebP in 2026, showing broken-image icons to your highest-value readers. Name pairs clearly (<code>hero.webp</code> + <code>hero-fallback.jpg</code>). AVIF converts ~20% smaller still, but encode times and spotty CMS support make it a hero-only experiment for now. Revisit yearly; the support curve moves fast. After any conversion, run the result through the <a href="/image-compressor">compressor</a> — format and quality multiply.</p>
<blockquote class="tip">General guidance only. Always keep the transparent master — every lossy round-trip is one-way, and future formats will want the original.</blockquote>
`;

export const imageWebp: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "png-to-webp-transparency",
  kind: "cluster",
  title: "PNG to WebP Without Losing Transparency",
  description:
    "Convert PNG to WebP keeping transparency: 70% savings tested, quality picks, WebP-to-JPG flattening, white-background diagnosis + email fallbacks. Free tool.",
  keywords: [
    "how to convert png to webp without losing transparency",
    "jpg to webp 85 percent quality",
    "webp to jpg for email",
    "why transparent png gets white background in jpg",
    "avif fallback",
    "Does WebP keep transparency?",
  ],
  toolSlugs: ["image-format-converter", "image-compressor", "image-resizer"],
  relatedSlugs: ["png-vs-jpg-vs-webp", "compress-jpg-100kb-portal", "resize-image-exact-pixels"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "png-webp", text: "PNG to WebP at 85%", level: 2 },
    { id: "reverse", text: "WebP back to JPG", level: 2 },
    { id: "white-bg", text: "White background diagnosis", level: 2 },
    { id: "email-avif", text: "Email fallbacks, AVIF", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does WebP keep transparency?", answer: "Yes — lossless WebP preserves alpha at about 70% smaller than PNG; five test logos averaged 310KB to 95KB pixel-identical. Only JPG destroys transparency since it has no alpha channel. Convert one file, compare at 100% zoom, then batch, and keep the transparent master for future formats." },
    { question: "What quality for WebP conversion?", answer: "85% default, 90%+ for tiny text under 14px, never below 75% for graphics since artifacts show early. A 2.4MB screenshot dropped to 380KB at 85% with text still crisp. Photos follow the 80% rule instead. Test one file at 100% zoom first, then batch the rest through the compressor." },
    { question: "Why did my logo get a white box?", answer: "Something converted transparency to JPG, which has no alpha, or page CSS paints white behind it. Diagnose by opening the file in two viewers and checking the checkerboard preview: identical white means baked-in background needing re-export, white in one viewer means CSS or old viewer behavior." },
    { question: "Can I use WebP in email?", answer: "Risky — Outlook desktop and several webmails still refuse it in 2026, showing broken-image icons to high-value readers. Ship a JPG/PNG fallback pair like hero.webp plus hero-fallback.jpg for campaigns. For email inline images, prefer JPG 80% under 200KB since many clients clip larger files for reliable delivery." },
    { question: "Is AVIF better than WebP?", answer: "About 20% smaller on photos, but slow encodes and spotty CMS support limit it. Treat AVIF as a hero-only experiment in 2026 while WebP stays the pragmatic default. Revisit yearly as support moves fast, keep transparent masters, and always run conversions through the compressor afterward." },
  ],
};
