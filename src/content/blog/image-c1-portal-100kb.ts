import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>UPSC photo rejected: 214KB, limit 100KB. SSC: 173KB, limit 100KB. IBPS: 96KB — accepted, after three attempts and one cyber-café printout. Every admission season, lakhs of applicants discover that <strong>government portals enforce file-size limits ruthlessly</strong> while giving zero guidance on meeting them. This guide gives the exact method: resize to required pixels first, compress to land under 100KB (or 20–50KB), verify, upload — all offline, nothing uploaded.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. Do it in the <a href="/image-compressor">image compressor</a>; fix dimensions first in the <a href="/image-resizer">image resizer</a>. Format background in <a href="/blog/image-compressor-guide/png-vs-jpg-vs-webp">PNG vs JPG vs WebP</a>.</p>

<h2 id="know-limits">Know your portal's limits before touching a slider</h2>
<p>Limits vary by exam and document type — photo, signature and certificates often differ on the same form. Check the official notification PDF (usually “Instructions to candidates”, page 2–3) and note three numbers: max KB, required pixels, accepted formats. Common patterns:</p>
<table>
<thead><tr><th>Document</th><th>Typical limit</th><th>Typical pixels</th><th>Strategy</th></tr></thead>
<tbody>
<tr><td><strong>Photo</strong></td><td>100KB</td><td>413×531</td><td>Resize exact, then 75–80%</td></tr>
<tr><td><strong>Signature</strong></td><td>50KB</td><td>140×60-ish</td><td>Resize small first — bytes follow</td></tr>
<tr><td><strong>Certificates</strong></td><td>200–300KB</td><td>As scanned</td><td>80% quality, no resize</td></tr>
<tr><td><strong>Thumb impression</strong></td><td>20–50KB</td><td>Small</td><td>Grayscale helps massively</td></tr>
</tbody>
</table>
<p>Never trust last year's numbers — portals revise limits per cycle. Screenshot the requirement table before you start; you will reference it four times.</p>

<h2 id="method">The resize-first method (worked example: 4.2MB → 96KB)</h2>
<ol>
<li><strong>Resize to exact pixels in the <a href="/image-resizer">image resizer</a>:</strong> my 4032×3024 phone photo → 413×531. File drops 4.2MB → ~180KB before any quality change. This single step does 80% of the work.</li>
<li><strong>Compress at 80% in the <a href="/image-compressor">image compressor</a>:</strong> 180KB → ~140KB. Still over? Drop to 75% (~110KB), then 70% (~95KB). Accepted.</li>
<li><strong>Verify three things:</strong> byte count under limit, dimensions exactly as required, face clearly recognizable at 100% zoom. Portals reject blurry under-dimensioned photos more often than slightly-compressed correct ones.</li>
<li><strong>Keep the original:</strong> save the accepted file as <code>upsc-photo-96kb.jpg</code> and archive the original separately — re-compressing an accepted file for the next portal degrades it further.</li>
</ol>
<p>If you land at 110KB, drop quality 5 points rather than shrinking dimensions. If you land at 60KB with room to spare, nudge quality up — headroom is legibility insurance, not waste.</p>

<h2 id="signatures">Signatures and thumb impressions need different handling</h2>
<p>Signatures are line art on white: resize small first (bytes collapse because there is little detail), then 70–75% quality. A 2MB signature scan typically lands under 30KB. Thumb impressions: convert to grayscale if the portal allows — color data triples size for zero benefit on a print. Certificates with stamps and seals behave like photos: 80%, no resize unless dimensions are specified. Never photograph a screen to “convert” formats — moiré patterns inflate bytes and look fraudulent to verification officers.</p>

<h2 id="cyber-cafe">Cyber-café safety: nothing uploads, nothing remains</h2>
<p>Most applicants compress on shared machines. Browser-local tools are the safe choice: the photo never traverses the network, nothing is retained server-side, and closing the tab wipes the session. After uploading, clear downloads, empty the recycle bin, and log out of the portal — shoulder surfers harvest more applications than hackers do. Full privacy method in <a href="/blog/image-compressor-guide/strip-exif-before-upload">EXIF stripping</a> (yes, your photo also leaks GPS — strip it before uploading to any portal).</p>
<blockquote class="tip">General guidance only. Portal limits change per cycle — always verify against the current official notification, not last year's blog comments.</blockquote>
`;

export const imagePortal100kb: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "compress-jpg-100kb-portal",
  kind: "cluster",
  title: "Compress JPG to 100KB for Online Forms (UPSC/SSC Guide)",
  description:
    "Compress photos to 100KB for UPSC, SSC, IBPS portals: resize-first method with worked 4.2MB example, signatures, thumb tips + cyber-café safety. Free tool.",
  keywords: [
    "how to compress jpg to 100kb for online form",
    "compress photo to 100kb for upsc",
    "reduce image to 100kb without losing clarity",
    "photo size reducer for government portal",
    "signature compress 50kb online",
    "How do I compress a photo to 100KB for UPSC?",
  ],
  toolSlugs: ["image-compressor", "image-resizer", "image-format-converter"],
  relatedSlugs: ["png-vs-jpg-vs-webp", "resize-image-exact-pixels", "strip-exif-before-upload"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "know-limits", text: "Know portal limits", level: 2 },
    { id: "method", text: "Resize-first method", level: 2 },
    { id: "signatures", text: "Signatures and impressions", level: 2 },
    { id: "cyber-cafe", text: "Cyber-café safety", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I compress a photo to 100KB for UPSC?", answer: "Resize to the required pixels first (often 413×531), then compress at 75–80% in the image compressor. A 4032×3024 4.2MB phone photo drops to about 180KB on resize, then near 96KB at 70–75%. Verify byte count, exact dimensions and face legibility at 100% zoom per official notification." },
    { question: "Should I resize or lower quality first?", answer: "Resize first — it does 80% of the work. Dropping 4032px to 413px took 4.2MB to 180KB before any quality change, while reversing the order costs about 15% extra bytes. Lower quality only for the last stretch: if you land at 110KB, drop five points rather than shrinking dimensions." },
    { question: "Why was my photo rejected at 96KB?", answer: "Usually wrong dimensions or blur, not bytes. Portals check pixels too — a 96KB file at wrong dimensions still fails, and blurry under-dimensioned photos are rejected more often than slightly compressed correct ones. Match the notification's exact pixel spec, verify face clarity at 100% zoom, and screenshot the requirement table before starting." },
    { question: "Is it safe to compress on a cyber-café computer?", answer: "Use browser-local tools that upload nothing, then clear downloads and log out. The photo never traverses the network, nothing is retained server-side, and closing the tab wipes the session. After uploading, empty the recycle bin, log out of the portal, and strip EXIF GPS before uploading to any portal." },
    { question: "What about signatures and thumb impressions?", answer: "Resize small first since line art on white collapses fast, then use 70–75% quality — a 2MB signature scan typically lands under 30KB. Convert thumb impressions to grayscale if allowed, since color triples size for zero benefit on prints. Certificates with stamps need 80% with no resize, typically 200–300KB." },
  ],
};
