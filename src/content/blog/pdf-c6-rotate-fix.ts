import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>The flatbed scanner delivered 40 pages of meeting notes — every single one sideways. Neck craned, I read three pages before accepting reality: fix the files, not my posture. Ten seconds later all 40 stood upright. <strong>Sideways scans have three causes</strong> (flatbed orientation, phone rotation flags, mixed bundles), and each has a different fix. This guide diagnoses yours and repairs it — including the mixed bundle that needs split-rotate-merge surgery.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Rotate in <a href="/pdf-rotate">PDF rotate</a>; isolate pages with <a href="/pdf-split">PDF split</a>; rejoin with <a href="/pdf-merge">PDF merge</a>.</p>

<h2 id="diagnose">Diagnose: flatbed, phone flag, or mixed bundle</h2>
<table>
<thead><tr><th>Symptom</th><th>Cause</th><th>Fix</th></tr></thead>
<tbody>
<tr><td><strong>All pages sideways, same direction</strong></td><td>Flatbed/document feeder orientation</td><td>Rotate all 90° once</td></tr>
<tr><td><strong>All pages upside down</strong></td><td>180° feed or import flip</td><td>Rotate all 180° once</td></tr>
<tr><td><strong>Correct on phone, sideways on desktop</strong></td><td>Embedded orientation flag vs encoded pixels</td><td>Normalize explicitly (rotate + save)</td></tr>
<tr><td><strong>Only some pages sideways</strong></td><td>Mixed scans bundle</td><td>Split-rotate-merge (below)</td></tr>
</tbody>
</table>
<p>Photos with orientation flags preview correctly yet encode sideways — explicit rotation normalizes them permanently. When in doubt, rotate a copy and compare thumbnails side by side before committing the original.</p>

<h2 id="uniform">Uniform rotation: 90/180/270 in one click</h2>
<p>When every page shares the error, the fix is one angle for all: 90° clockwise for portrait flatbed output, 180° for upside-down imports, 270° for counter-clockwise skews. Check the first-page thumbnail flips upright with headers reading correctly, then apply and save as <code>scan-upright.pdf</code>. Annotation anchors can drift marginally after rotation — acceptable for reading copies; retain masters for archival distributions.</p>

<h2 id="mixed-surgery">Mixed bundles: split-rotate-merge surgery</h2>
<ol>
<li><strong>Split</strong> the sideways range (e.g. pages 5–8) out at <a href="/pdf-split">PDF split</a> using <code>5-8</code> syntax from <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a>.</li>
<li><strong>Rotate</strong> only that 4-page segment to upright — the 116 good pages stay untouched.</li>
<li><strong>Merge</strong> original-part + fixed segment + remainder back in order at <a href="/pdf-merge">PDF merge</a>.</li>
<li><strong>Verify</strong> by sampling first, middle and final pages plus running heads continuity.</li>
</ol>
<p>This three-tool round-trip is the canonical answer to “rotate only specific pages” — uniform tools plus range surgery cover every orientation case without exceptions.</p>
<blockquote class="tip">General guidance only. For archival scans, keep a pre-rotation master — rotation metadata varies subtly across viewers.</blockquote>
`;

export const pdfRotateFix: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "fix-sideways-scans",
  kind: "cluster",
  title: "Fix Sideways Scans: Rotate PDF Pages Upright",
  description:
    "Fix sideways PDF scans: diagnose flatbed vs flag vs mixed causes, one-click uniform rotation + split-rotate-merge surgery. Free local tools.",
  keywords: [
    "why scans come out sideways and how to fix",
    "sideways flatbed scan upright",
    "rotate all pages 90 degrees",
    "mixed orientation split-rotate-merge",
    "orientation flag vs encode",
    "Why are my scans sideways?",
  ],
  toolSlugs: ["pdf-rotate", "pdf-split", "pdf-merge"],
  relatedSlugs: ["extract-pages-range", "merge-multiple-pdfs-order", "compress-pdf-1mb-email"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "diagnose", text: "Diagnose the cause", level: 2 },
    { id: "uniform", text: "Uniform rotation", level: 2 },
    { id: "mixed-surgery", text: "Split-rotate-merge", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why are my scans sideways?", answer: "Flatbed orientation, phone rotation flags, or mixed bundles cause it. All pages sideways means flatbed feed needing one 90° rotation, while correct-on-phone but sideways-on-desktop means embedded flag issues. Only some pages sideways signals a mixed bundle requiring split-rotate-merge surgery with range extraction for reliable diagnosis before fixing." },
    { question: "How do I rotate all PDF pages at once?", answer: "Pick 90, 180 or 270 degrees and apply to all pages at once. Use 90° clockwise for portrait flatbed output, 180° for upside-down imports and 270° for counter-clockwise skews. Preview the first thumbnail upright with headers reading correctly, then save as scan-upright.pdf for distribution after verifying all forty pages." },
    { question: "Can I rotate only some pages?", answer: "Yes via surgery: split out the sideways range like 5–8 with PDF split, rotate only that four-page segment upright, then merge original parts and fixed segments back in order. The good pages stay untouched, and final verification samples first, middle and final pages plus running heads." },
    { question: "Why does my PDF look fine on phone but sideways on desktop?", answer: "Embedded orientation flag versus encoded pixels causes disagreement. Phones honor the flag for preview while desktops show encoded pixels sideways. Normalize with an explicit rotate-and-save so all viewers agree permanently. When in doubt, rotate a copy and compare thumbnails side by side first before committing the original file." },
    { question: "Will rotation harm my document?", answer: "Text stays selectable while annotation anchors may drift slightly, which is acceptable for reading copies. Retain masters for archival distributions since rotation metadata varies subtly across viewers. For mixed bundles, the split-rotate-merge round-trip keeps 116 good pages untouched while fixing only the sideways segment for dependable long-term preservation." },
  ],
};
