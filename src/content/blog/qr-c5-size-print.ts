import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>The Pune glass-door sticker from the pillar story failed for three reasons at once: 2 cm size, yellow-on-white, curved glass. Any one might have been survivable; together they were hopeless. <strong>QR code print sizing</strong> is pure physics — distance, density and resolution — and this guide gives you the exact numbers for business cards, table tents, flyers, posters and billboards, all tested with real phones in September 2026.</p>
<p>Part of the <a href="/blog/qr-code-generator-guide">free QR code generator guide</a>. Generate at both sizes in the <a href="/qr-code-generator">free QR code generator</a> (512px + 2048px). Build basics in <a href="/blog/qr-code-generator-guide/how-to-create-qr-code">how to create a QR code</a>.</p>

<h2 id="two-rules">The only two rules you need</h2>
<h3>Rule 1 — size ≈ distance ÷ 10</h3>
<p>A code scanned from 30 cm (table tent) must be at least 3 cm wide. From 1 meter (wall sign): 10 cm. From 2 meters (poster): 20 cm. From 10 meters (billboard): 1 meter. I verify by walking the actual distance with a mid-range Android — if it scans in 2 seconds there, it works for customers.</p>
<h3>Rule 2 — minimum 2 cm, and denser needs bigger</h3>
<p><strong>2 cm × 2 cm</strong> is the floor for short-URL codes at arm's length. But density scales the minimum: 150+ character payloads need 3–4 cm at the same distance. Longer text = denser grid = bigger print. Shorten URLs before generating — it is the cheapest size upgrade there is.</p>

<h2 id="size-table">Size table: every common placement</h2>
<table>
<thead><tr><th>Placement</th><th>Viewing distance</th><th>Min code size</th><th>Export</th></tr></thead>
<tbody>
<tr><td><strong>Business card / vCard</strong></td><td>20–30 cm</td><td>2 cm</td><td>512px</td></tr>
<tr><td><strong>Bill folder / receipt</strong></td><td>30 cm</td><td>2–3 cm</td><td>512px</td></tr>
<tr><td><strong>Table tent / counter</strong></td><td>30–60 cm</td><td>3–5 cm</td><td>512px</td></tr>
<tr><td><strong>A5 flyer</strong></td><td>30–50 cm</td><td>3–4 cm</td><td>512px</td></tr>
<tr><td><strong>Reception frame (A4)</strong></td><td>0.5–1 m</td><td>8–10 cm</td><td>2048px</td></tr>
<tr><td><strong>Poster (A3/A2)</strong></td><td>1–2 m</td><td>10–20 cm</td><td>2048px</td></tr>
<tr><td><strong>Storefront / window</strong></td><td>1–3 m</td><td>15–30 cm</td><td>2048px</td></tr>
<tr><td><strong>Billboard</strong></td><td>10 m+</td><td>1 m+</td><td>2048px, test on site</td></tr>
</tbody>
</table>
<ul>
<li><strong>vCards run dense:</strong> contact codes carry name + phones + email, so use 2.5 cm minimum on cards. Details in <a href="/blog/qr-code-generator-guide/vcard-contact-qr-code">vCard guide</a>.</li>
<li><strong>Never upscale:</strong> a 512px file stretched to poster size blurs module edges. Regenerate at 2048px instead — 30 seconds, free.</li>
<li><strong>Quiet zone always:</strong> white margin ~4 modules on all sides. Borders or text touching the pattern is the #1 flyer failure I see.</li>
</ul>

<h2 id="density-exceptions">Density exceptions: WiFi, vCard and long URLs</h2>
<p>The table above assumes short URLs. Three common types break the assumption — plan them bigger from the start. <strong>WiFi codes</strong> carry SSID + password + security (often 60–100 characters): print café signs at 8–10 cm, not 5. <strong>vCards</strong> carry 5–6 contact fields (~150 characters): 2.5 cm minimum on business cards. <strong>Long URLs</strong> (150+ characters): add 1–2 cm over the table value, or better, shorten the link first per <a href="/blog/qr-code-generator-guide/how-to-create-qr-code">URL hygiene</a>.</p>
<ul>
<li><strong>Quick density check:</strong> compare your preview to a plain 20-character URL code. Noticeably busier? Go one size up.</li>
<li><strong>Old-phone margin:</strong> if your audience skews to budget devices (rural clinics, senior citizens), add 50% to every table value. Their fixed-focus cameras forgive nothing.</li>
<li><strong>Billboard honesty:</strong> long URLs on billboards are nearly hopeless — drivers have 2 seconds at 10 m+. Short domain + 1 m code minimum, or skip the code and print the URL big.</li>
</ul>

<h2 id="resolution-paper">Resolution, paper and finish</h2>
<ul>
<li><strong>512px PNG:</strong> crisp to ~5 cm print. Websites, chat, cards, folders, tents, flyers.</li>
<li><strong>2048px PNG:</strong> crisp to A3 and beyond. Posters, windows, banners, billboards.</li>
<li><strong>Matte over glossy:</strong> lamination glare kills scans in sunlight. Matte paper, matte laminate, or unlaminated frames.</li>
<li><strong>Flat surfaces:</strong> curves (cups, bottles, pillars) distort the grid. Flat walls, tents and cards scan; curved merch mostly decorates.</li>
<li><strong>Keep PNG masters:</strong> every JPG re-save (and every WhatsApp forward) softens edges. Archive the PNG; forward copies freely.</li>
</ul>
<h3>Pre-print ritual (₹30 saves ₹2,500)</h3>
<p>Print one copy at 100% scale. Scan from the real distance, in daylight and indoor light, with two phones. Check the quiet margin survived the printer's scaling (disable “fit to page” — it shrinks everything 5%). Only then order bulk. Scan-back any mystery code with the <a href="/qr-scanner">QR scanner</a> to confirm contents before a big run.</p>
<div class="cta-box"><strong>Size it right now:</strong> generate both sizes in the <a href="/qr-code-generator">free QR code generator</a> and test-walk your distance. Overview: <a href="/blog/qr-code-generator-guide">pillar guide</a> · Fixes: <a href="/blog/qr-code-generator-guide/qr-code-not-scanning-fix">not-scanning guide</a>.</div>
`;

export const qrSizePrint: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "qr-code-size-print-guide",
  kind: "cluster",
  title: "QR Code Size Guide: Minimum Sizes for Print & Distance (2026)",
  description:
    "QR code size guide: minimum print sizes, distance rule, 512px vs 2048px, paper and finish tips. Tested numbers for cards to billboards.",
  keywords: [
    "qr code size for print",
    "minimum qr code size",
    "qr code print size cm",
    "how big should qr code be",
    "qr code resolution for poster",
  ],
  toolSlugs: ["qr-code-generator", "qr-scanner", "wifi-qr-generator"],
  relatedSlugs: ["how-to-create-qr-code", "qr-code-not-scanning-fix", "vcard-contact-qr-code"],
  published: "2026-09-22",
  updated: "2026-09-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "two-rules", text: "The only two sizing rules", level: 2 },
    { id: "size-table", text: "Size table: every placement", level: 2 },
    { id: "density-exceptions", text: "Density exceptions", level: 2 },
    { id: "resolution-paper", text: "Resolution, paper and finish", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the minimum size for a printed QR code?", answer: "2 × 2 cm for short-URL codes scanned at arm's length. Dense codes with 150+ characters need 3–4 cm at the same distance. Shorter content scans smaller." },
    { question: "How big should a QR code be for a poster?", answer: "Use size ≈ viewing distance ÷ 10: 10 cm for 1 meter, 20 cm for 2 meters. Export 2048px PNG and test-walk the real distance with a mid-range phone." },
    { question: "512px or 2048px PNG?", answer: "512px for screens, cards, tents and flyers up to ~5 cm print. 2048px for posters, windows and anything scanned beyond a meter. Never upscale — regenerate at the bigger size." },
    { question: "Does paper finish matter?", answer: "Yes. Glossy lamination glares in sunlight and kills scans; matte paper or matte laminate works everywhere. Flat surfaces beat curved ones every time." },
    { question: "Why leave white space around the code?", answer: "Scanners need a quiet zone about 4 modules wide to find the pattern edges. Text or borders touching the code is the most common flyer failure." },
  ],
};
