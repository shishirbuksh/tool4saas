import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Gmail bounced it: 18MB, limit 25MB — technically under, practically blocked because the recipient's server capped at 10MB. The deck had to fly that night. Medium compression took it to 6MB in seconds, text still razor sharp, photos indistinguishable on screen. <strong>PDF compression is a level choice, not a button</strong>: Light, Medium and Strong trade bytes for fidelity differently per content type. This guide maps each level to email and portal scenarios with a zoom-to-verify protocol.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Compress in <a href="/pdf-compress">PDF compress</a>; slim oversized sources first via <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">merge planning</a>. Scanned-image limits in <a href="/blog/pdf-merge-guide/extract-text-without-ocr">text vs OCR</a>.</p>

<h2 id="levels">Light, Medium, Strong: pick by destination</h2>
<table>
<thead><tr><th>Level</th><th>Saving</th><th>Image DPI</th><th>Use when</th></tr></thead>
<tbody>
<tr><td><strong>Light</strong></td><td>~20%</td><td>Near-original</td><td>Archival copies, print handouts</td></tr>
<tr><td><strong>Medium</strong></td><td>~50%</td><td>~150 DPI</td><td>Email, uploads, portals</td></tr>
<tr><td><strong>Strong</strong></td><td>~70%</td><td>Aggressive</td><td>Phone viewing, strict 1–5MB caps</td></tr>
</tbody>
</table>
<p>My 18MB photo deck: Light → 14MB, Medium → 6MB, Strong → 3.4MB. Text stayed vector-sharp at every level (only images downsample) — which is why born-digital files compress so well and scanned pages (flat images, no text layer) save just 20–30%. My rule: Medium for everything unless a stakeholder names a different constraint.</p>

<h2 id="verify">Verify at 100%: the zoom protocol</h2>
<ol>
<li><strong>Zoom a photo page to 100%</strong> and compare faces, gradients and fine lines against the original.</li>
<li><strong>Zoom small text</strong> (footnotes, captions, axis labels) — the first casualty of Strong.</li>
<li><strong>Check file size against the destination cap</strong> with margin: Gmail 25MB theoretical, 10MB practical for corporate servers; portals per their notice.</li>
<li><strong>Keep the original archived</strong> — recompressing a compressed file compounds artifacts. Always compress from the master.</li>
</ol>

<h2 id="locked-scans">Locked files and scanned limits</h2>
<p>Two hard stops: encrypted PDFs refuse compression until unlocked with the owner password (user passwords merely open viewing — remove restrictions properly), and image-only scans save little because there is no vector text to preserve. A 300-page set over 200 pages should split first (see <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a>), compress parts, then rejoin. On phones, process under-50MB jobs per pass and keep the tab foreground — backgrounded tabs throttle workers.</p>
<blockquote class="tip">General guidance only. For print production, never compress the press file — compress a distribution copy and archive the print master separately.</blockquote>
`;

export const pdfCompress1mb: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "compress-pdf-1mb-email",
  kind: "cluster",
  title: "Compress PDF to 1MB for Email and Portals",
  description:
    "Compress PDFs for email: Light/Medium/Strong levels with tested savings, 100% zoom verification protocol + locked-file and scan limits. Free tool.",
  keywords: [
    "how to compress pdf to 1mb for email",
    "18MB report to 6MB medium",
    "150 dpi medium vs strong blur",
    "shrink pdf for 10MB portal",
    "compress without unlocking",
    "Which compression level for email?",
  ],
  toolSlugs: ["pdf-compress", "pdf-split", "pdf-merge"],
  relatedSlugs: ["merge-multiple-pdfs-order", "extract-pages-range", "jpg-scans-single-pdf"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "levels", text: "Compression levels", level: 2 },
    { id: "verify", text: "Zoom verification", level: 2 },
    { id: "locked-scans", text: "Locked files, scans", level: 2 },
  ],
  html,
  faqs: [
    { question: "Which compression level for email?", answer: "Medium at about 50% off and 150 DPI, since an 18MB deck hits 6MB with sharp text. Use Light near 20% savings for archival copies and print handouts, Strong near 70% only for strict 1–5MB caps after zoom-checking. Default to Medium unless a stakeholder names a different constraint." },
    { question: "Will compression blur my text?", answer: "No — text stays vector-sharp at every level since only images downsample. Light reached 14MB, Medium 6MB and Strong 3.4MB from 18MB without harming characters. Scanned pages are the exception as flat images with no text layer, saving only 20–30%, while born-digital files compress especially well." },
    { question: "How do I check quality after compressing?", answer: "Zoom a photo page and small text like footnotes, captions and axis labels to 100%, comparing faces, gradients and fine lines against the original. Confirm size under the destination cap with margin, since Gmail allows 25MB theoretically but corporate servers often enforce 10MB. Always compress from the archived master." },
    { question: "Why won't my PDF compress?", answer: "Usually owner-password encryption, since encrypted PDFs refuse compression until unlocked with proper credentials. User passwords merely open viewing without removing restrictions. Or it is already optimized, since recompressing compressed files compounds artifacts and yields little while risking quality so always compress from the archived master copy." },
    { question: "Can I compress a 300-page PDF?", answer: "Split into under-200-page parts first with range extraction, compress each part, then rejoin the outputs. Large sets run better on laptops than phones, and phones should process under-50MB jobs per pass with the tab foreground since backgrounded tabs throttle workers significantly for reliable completion without crashes." },
  ],
};
