import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A 120-page equipment manual, and the client needs “just the installation chapter, pages 10–20, plus the wiring diagram on page 5.” Emailing the whole manual buries the answer; screenshots lose vector sharpness. <strong>Page-range extraction</strong> pulls exactly <code>1-3,5</code> style selections into clean new files. This guide teaches the range syntax that never fails, live validation habits, and the split-first patterns behind chapter pulls, invoice quarantines and exhibit segregation.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Extract in <a href="/pdf-split">PDF split</a>; rejoin with <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">PDF merge</a>. Orientation fixes via <a href="/blog/pdf-merge-guide/fix-sideways-scans">split-rotate-merge</a>.</p>

<h2 id="syntax">Range syntax: <code>1-3,5</code> and every-Nth</h2>
<table>
<thead><tr><th>You type</th><th>You get</th><th>Use for</th></tr></thead>
<tbody>
<tr><td><strong>5</strong></td><td>Page 5 only</td><td>Single diagram, cover</td></tr>
<tr><td><strong>1-3,5</strong></td><td>Pages 1, 2, 3, 5</td><td>Front matter + key page</td></tr>
<tr><td><strong>10-20</strong></td><td>11-page chapter</td><td>Chapter extraction</td></tr>
<tr><td><strong>1-3,5,8-10</strong></td><td>7 mixed pages</td><td>Exhibit bundles</td></tr>
</tbody>
</table>
<p>Rules: numbering starts at 1 (the cover is page 1, always), ranges are inclusive both ends, commas separate, and reversed intervals like <code>5-3</code> are rejected — the live badge flags them before you click. Out-of-bounds requests beyond 200 pages bounce the same way. From the 120-page manual, <code>1-3,5,8-10</code> saves as <code>manual-pages-1-3-5-8-10.pdf</code> with the badge confirming 7 pages first.</p>

<h2 id="patterns">Three patterns: chapters, quarantine, sampling</h2>
<ul>
<li><strong>Chapter pull:</strong> scholars and trainers extract 10–20 for course packs. Cite original pagination when quoting — “p. 14 of the manual”, not “p. 2 of my extract”.</li>
<li><strong>Quarantine:</strong> admins isolate invoice pages from mixed scan bundles for accounting. Extract, forward, archive the original untouched.</li>
<li><strong>Periodic sampling:</strong> every-Nth mode harvests every 5th page for quality surveys across long reports.</li>
</ul>
<p>Mixed portrait-landscape originals keep per-sheet orientation, so extracted sets may look inconsistent — normalize with rotation after if needed.</p>

<h2 id="split-merge">Split is merge in reverse (the round-trip)</h2>
<p>Splitting and merging are one workflow, not two tools to learn separately: carve dossiers into fragments to isolate, then fuse fragments to publish. The mixed-orientation rescue (isolate pages 5–8, rotate, rejoin) uses both in sequence. Password-guarded portfolios resist both until owner credentials release them — unlock once, then split and merge freely. Keep originals archived; derivatives are cheap, sources are not.</p>
<blockquote class="tip">General guidance only. For court or compliance filings, confirm extracted sets carry required headers, footers and Bates numbering before submitting.</blockquote>
`;

export const pdfExtractRange: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "extract-pages-range",
  kind: "cluster",
  title: "Extract PDF Pages by Range: 1-3,5 Syntax Guide",
  description:
    "Split PDFs by page ranges: 1-3,5 syntax table, chapter/quarantine/sampling patterns + split-merge round-trips. Free local splitter with validation.",
  keywords: [
    "how to extract pages from pdf by range",
    "split pdf 1-3 5 meaning",
    "extract chapter 10-20",
    "every Nth page sampling",
    "split vs merge pdf workflow",
    "What does 1-3,5 mean in PDF splitting?",
  ],
  toolSlugs: ["pdf-split", "pdf-merge", "pdf-rotate"],
  relatedSlugs: ["merge-multiple-pdfs-order", "jpg-scans-single-pdf", "fix-sideways-scans"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "syntax", text: "Range syntax", level: 2 },
    { id: "patterns", text: "Three patterns", level: 2 },
    { id: "split-merge", text: "Split-merge round-trip", level: 2 },
  ],
  html,
  faqs: [
    { question: "What does 1-3,5 mean in PDF splitting?", answer: "Pages 1, 2, 3 and 5, since numbering starts at 1 with the cover always page one. Ranges are inclusive both ends and comma-separated, with live validation counting your selection before splitting. From a 120-page manual, 1-3,5,8-10 saves seven pages as manual-pages-1-3-5-8-10.pdf with badge confirmation." },
    { question: "Can I extract non-contiguous pages?", answer: "Yes — comma-separate ranges like 1-3,5,8-10 for seven mixed exhibit pages. Each range validates independently before splitting, while reversed intervals like 5-3 and out-of-bounds requests beyond 200 pages are rejected. Mixed portrait-landscape sheets keep per-sheet orientation, so normalize rotation afterward if needed for consistent reading across devices." },
    { question: "What is the page limit?", answer: "200 pages per file, so larger manuals split reliably in chunks across multiple passes. Oversized sets may slow phones, so work in smaller passes on mobile and keep laptops for heavy jobs. Split-merge round-trips let you carve fragments, process parts, then fuse published outputs without quality loss." },
    { question: "How do I put split pages back together?", answer: "Merge the extracts with PDF merge, since splitting and merging are inverse operations designed to round-trip. Carve dossiers into fragments to isolate chapters or invoices, then fuse fragments to publish. For mixed-orientation rescues, isolate pages 5–8, rotate upright, then rejoin all parts in reading order." },
    { question: "Do extracted pages keep quality?", answer: "Yes — extraction copies pages losslessly, including orientation, vectors and text layers without re-rendering. Screenshots would lose vector sharpness, but extracted sets preserve original clarity. Keep originals archived since derivatives are cheap while sources are not, and cite original pagination like p.14 when quoting for accurate academic references." },
  ],
};
