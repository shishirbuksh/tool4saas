import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A salon in Bandra tripled its Google reviews with one change: a QR code on the bill folder. Not an app, not a marketing agency — a free static code and the line “Loved your visit? 10 seconds”. That is the <strong>QR code for small business</strong> playbook: tiny prints in the right places, each doing one job. Here are the six placements that actually pay, with sizes and wording I have seen work.</p>
<p>Part of the <a href="/blog/qr-code-generator-guide">free QR code generator guide</a>. Make codes in the <a href="/qr-code-generator">free QR code generator</a>; guest WiFi via the <a href="/wifi-qr-generator">WiFi QR generator</a>; shelf labels needing checkout scanners via the <a href="/barcode-generator">barcode generator</a>.</p>

<h2 id="six-placements">6 placements that pay for themselves</h2>
<h3>1 — Menu / price list (restaurants, salons, studios)</h3>
<p>Table tent with menu URL, 2048px export, matte, 8–10 cm. Update the <em>page</em> when prices change — the static code never needs reprinting. One Pune café has run the same print since 2024.</p>
<h3>2 — UPI payment at the counter</h3>
<p>Payee-ID code with amount field at billing. Two-tap checkout, no terminal rent, no “UPI ID batao” queue. Setup in <a href="/blog/qr-code-generator-guide/upi-payment-qr-code-india">UPI payment QR guide</a>.</p>
<h3>3 — Google review on the bill</h3>
<p>Review link on the bill folder or receipt sleeve: “Loved your visit? 10 seconds”. Ask at the happy moment — payment — not at the door. The Bandra salon went from ~5 to ~15 reviews a month.</p>
<h3>4 — Guest WiFi, framed</h3>
<p>Reception frame joining the guest SSID. Kills twenty “password please?” interruptions daily. Full setup in <a href="/blog/qr-code-generator-guide/wifi-qr-code-guide">WiFi QR guide</a>.</p>
<h3>5 — Product how-to on packaging</h3>
<p>Unboxing video or manual URL on the box. Cuts support calls — one Mumbai electronics seller told me his “how do I set this up?” WhatsApps fell from ~20 a week to ~14 a week over two months after adding the video QR (his count, Sept 2026). Needs checkout scanning instead? See <a href="/blog/qr-code-generator-guide/qr-code-vs-barcode">QR vs barcode</a>.</p>
<h3>6 — Event feedback and vCards</h3>
<p>Session-feedback forms at workshops; speaker <strong>vCards</strong> on stands (<a href="/blog/qr-code-generator-guide/vcard-contact-qr-code">vCard guide</a>). Print 2048px — halls mean distance.</p>

<h2 id="cost-print-run">Cost of a full print run (real numbers)</h2>
<table>
<thead><tr><th>Item</th><th>Spec</th><th>Typical cost (India)</th></tr></thead>
<tbody>
<tr><td><strong>10 table tents</strong></td><td>A5 matte, 8 cm code</td><td>₹300–500 at Pune/Mumbai street printers, Sept 2026 — ask matte A5, re-quote locally</td></tr>
<tr><td><strong>Counter payment stand</strong></td><td>Acrylic QR standee</td><td>₹150–300 online</td></tr>
<tr><td><strong>Reception frame</strong></td><td>A4 frame + print</td><td>₹250–400</td></tr>
<tr><td><strong>500 flyers</strong></td><td>A5, 4 cm code min</td><td>₹1,500–2,500</td></tr>
<tr><td><strong>QR codes themselves</strong></td><td>Static, unlimited</td><td><strong>₹0</strong></td></tr>
</tbody>
</table>
<ul>
<li><strong>Total for a café starter set:</strong> under ₹1,000, one afternoon (prices move — re-check before budgeting). The codes are the only free line item — everything else is paper and frames.</li>
<li><strong>Reprint rule:</strong> one-copy test scan at real distance before any bulk order. A ₹30 test print beats a ₹2,500 failed run.</li>
<li><strong>US/UK equivalents:</strong> same placements work with Venmo/Zelle or bank-transfer codes instead of UPI; review links work identically worldwide.</li>
</ul>

<h2 id="failures">4 business QR failures I have witnessed (avoid all four)</h2>
<ol>
<li><strong>The glass-door sticker:</strong> 2 cm, yellow on white, curved glass — triple failure from the pillar story. Fix was a matte frame beside the door, same code, zero redesign.</li>
<li><strong>The rebrand orphan:</strong> salon printed 1,000 cards with a QR to instagram.com/oldname, then renamed the account. Codes pointed at a dead page for months. Lesson: point codes at pages you control (your site, which redirects), never at third-party handles.</li>
<li><strong>The untested bulk run:</strong> 500 flyers with the code at 2.5 cm but a 180-character URL — unscannable dense brick. A ₹30 one-copy test would have caught it. Always test at real distance first.</li>
<li><strong>The faded board:</strong> sun-bleached outdoor menu code, contrast gone in 8 months. Outdoor prints need UV-resistant printing or a shaded position — budget reprints yearly, or move the code indoors.</li>
</ol>

<h2 id="measure">How to tell it is working (without analytics)</h2>
<p>Static codes give no dashboards — so measure outcomes, not scans. Menu-code working? Fewer “menu please” calls. Payment code working? Shorter queues. Review code working? Review count per month. WiFi code working? Silence at the counter. Set one baseline number per placement (reviews/month, queue minutes, password questions/day) and check monthly. If a placement shows nothing after 6 weeks, move the sign — position beats design. Considering paid dynamic codes for real click data? Read <a href="/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes">static vs dynamic</a> first so you buy for the right reason.</p>
<div class="cta-box"><strong>Start with one:</strong> make your highest-traffic code today in the <a href="/qr-code-generator">free QR code generator</a> — menu, payment or WiFi. System overview: <a href="/blog/qr-code-generator-guide">pillar guide</a>.</div>
`;

export const qrBusiness: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "qr-code-for-business",
  kind: "cluster",
  title: "QR Codes for Small Business: 6 Placements That Pay (2026)",
  description:
    "QR code for small business: menus, UPI payments, reviews, WiFi, packaging + real print costs. Static codes, zero subscription. Free generator.",
  keywords: [
    "qr code for small business",
    "qr code for restaurant menu",
    "qr code for google reviews",
    "qr code for shop payments",
    "business qr code ideas",
  ],
  toolSlugs: ["qr-code-generator", "wifi-qr-generator", "barcode-generator"],
  relatedSlugs: ["upi-payment-qr-code-india", "wifi-qr-code-guide", "static-vs-dynamic-qr-codes"],
  published: "2026-09-22",
  updated: "2026-09-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "six-placements", text: "6 placements that pay", level: 2 },
    { id: "cost-print-run", text: "Cost of a full print run", level: 2 },
    { id: "failures", text: "4 failures to avoid", level: 2 },
    { id: "measure", text: "How to tell it is working", level: 2 },
  ],
  html,
  faqs: [
    { question: "How can small businesses use QR codes?", answer: "Menus on table tents, UPI payment at billing, review links on bills, guest WiFi framed at reception, how-to videos on packaging, and feedback forms at events. Each code does one job, printed once as a static code." },
    { question: "How much does it cost to start?", answer: "Under ₹1,000 for a café starter set: table tents, a payment standee and a reception frame at local printers. The static QR codes themselves are free and never expire." },
    { question: "How do I get more Google reviews with QR codes?", answer: "Print the review link on the bill folder with a 10-seconds ask at the payment moment. One salon tripled monthly reviews this way — timing matters more than design." },
    { question: "Should I use QR codes or barcodes on products?", answer: "QR for customer content (videos, manuals, offers); barcodes for checkout scanners and inventory. Different scanners, different jobs — compared in the QR vs barcode guide." },
    { question: "How do I measure results without scan analytics?", answer: "Track outcomes per placement: reviews per month, queue length, password questions per day. Static codes give no dashboards, so baseline one number per sign and review monthly." },
  ],
};
