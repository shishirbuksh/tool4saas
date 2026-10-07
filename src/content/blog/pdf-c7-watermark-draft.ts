import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>I once received a contract draft with no watermark — forwarded twice, it reached a client who assumed it was final. Awkward calls followed. A diagonal <strong>DRAFT at 25% opacity</strong> would have prevented the entire incident for zero cost. Watermarks are status communication baked into pixels: draft, confidential, sample, do-not-copy. This guide covers wording, opacity math, placement strategy and the readability line you must not cross.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Stamp in <a href="/pdf-watermark">PDF watermark</a>; prepare the file with <a href="/pdf-merge">PDF merge</a> first if needed.</p>

<h2 id="wording">Wording: DRAFT, CONFIDENTIAL, SAMPLE, DO NOT COPY</h2>
<table>
<thead><tr><th>Stamp</th><th>Meaning</th><th>Use for</th></tr></thead>
<tbody>
<tr><td><strong>DRAFT</strong></td><td>Not final, feedback welcome</td><td>Reviews, iterations</td></tr>
<tr><td><strong>CONFIDENTIAL</strong></td><td>Restricted circulation</td><td>Contracts, HR, finance</td></tr>
<tr><td><strong>SAMPLE</strong></td><td>Example, not deliverable</td><td>Portfolios, demos</td></tr>
<tr><td><strong>DO NOT COPY</strong></td><td>Distribution ban</td><td>Pre-release, exams</td></tr>
</tbody>
</table>
<p>Rotate phrases per audience and version (DRAFT v2, DRAFT v3) so stale copies self-identify. Archive unwatermarked masters separately — watermarks deter casual sharing, not determined extraction.</p>

<h2 id="opacity-placement">Opacity and placement that stay readable</h2>
<table>
<thead><tr><th>Opacity</th><th>Placement</th><th>Readability</th><th>Use</th></tr></thead>
<tbody>
<tr><td><strong>20% gray</strong></td><td>Center diagonal</td><td>High</td><td>Draft review</td></tr>
<tr><td><strong>25% gray</strong></td><td>Center diagonal</td><td>High</td><td>Confidential (recommended)</td></tr>
<tr><td><strong>30% gray</strong></td><td>Corners</td><td>Very high</td><td>Near-final samples</td></tr>
<tr><td><strong>80–100% black</strong></td><td>Center</td><td>Low — avoid</td><td>Nothing (obscures)</td></tr>
</tbody>
</table>
<p>The reference recipe: DRAFT, 48pt, 25% slate, center-diagonal. At 100% zoom, body text reads cleanly underneath; at thumbnail scale, the stamp dominates — exactly the dual behavior you want. Test-print one page before wide circulation: screens forgive density that paper punishes.</p>

<h2 id="text-selectable">Text stays selectable (and what watermarks can't do)</h2>
<p>Overlay vectors render independently of content, so underlying characters remain selectable and copyable — watermarking is a social signal, not DRM. It will not stop screenshots (nothing does), survive aggressive redaction expectations, or work on image-only scans beyond visual deterrence. For true restriction, combine stamping with password permissions; for true secrecy, don't distribute. Keep version histories: <code>contract-draft.pdf</code> vs <code>contract-draft-watermarked.pdf</code>, masters never overwritten.</p>
<blockquote class="tip">General guidance only. Watermarks communicate status — for legal protection, consult counsel about notices and registrations.</blockquote>
`;

export const pdfWatermarkDraft: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "add-draft-watermark",
  kind: "cluster",
  title: "Add DRAFT Watermark to PDF Without Blocking Text",
  description:
    "Watermark PDFs readably: DRAFT/CONFIDENTIAL wording, 25% opacity recipe, placement matrix + what watermarks can't protect. Free stamper.",
  keywords: [
    "how to add draft watermark to pdf",
    "diagonal vs corner watermark",
    "25 percent opacity readable",
    "watermark vs stamp",
    "remove watermark keep original",
    "What opacity keeps watermarks readable?",
  ],
  toolSlugs: ["pdf-watermark", "pdf-merge", "pdf-split"],
  relatedSlugs: ["merge-multiple-pdfs-order", "compress-pdf-1mb-email", "fix-sideways-scans"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "wording", text: "Wording guide", level: 2 },
    { id: "opacity-placement", text: "Opacity + placement", level: 2 },
    { id: "text-selectable", text: "Limits", level: 2 },
  ],
  html,
  faqs: [
    { question: "What opacity keeps watermarks readable?", answer: "20–30% gray keeps readability, with 25% center-diagonal slate at 48pt as the reference for confidential drafts. Body text reads cleanly underneath at 100% zoom while thumbnails still show the stamp. Avoid 80–100% black in the center, which obscures content, and test-print one page before circulation." },
    { question: "Where should I place a watermark?", answer: "Center-diagonal for drafts and confidential files for maximum deterrence, since the stamp dominates thumbnails yet body text reads through. Corners for near-final samples for maximum discretion with very high readability. Test-print one page first because screens forgive density that paper punishes harshly across different review audiences." },
    { question: "Will a watermark stop copying?", answer: "No — underlying text stays selectable and copyable since overlay vectors render independently, making it a social signal rather than DRM. It will not stop screenshots, survive redaction expectations, or secure image-only scans beyond deterrence. Combine stamping with password permissions for restriction, and archive unwatermarked masters separately." },
    { question: "DRAFT or CONFIDENTIAL — which?", answer: "DRAFT for iterations inviting feedback and reviews, CONFIDENTIAL for restricted circulation like contracts, HR and finance. SAMPLE suits portfolios and demos as examples, while DO NOT COPY bans distribution for pre-release and exams. Rotate version phrases like DRAFT v2 so stale copies self-identify clearly across review cycles." },
    { question: "Can I remove a watermark later?", answer: "Keep the unwatermarked master and version files separately, such as contract-draft.pdf versus contract-draft-watermarked.pdf. Never overwrite masters since watermarks deter casual sharing rather than determined extraction. Archiving both ensures clean reissues for final distribution without rebuilding from scratch for reliable version control across distributed teams long term." },
  ],
};
