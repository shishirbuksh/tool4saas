import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>I used to think QR codes needed an app, an account, and ten minutes. Then I timed the browser flow: <strong>how to create a QR code free takes about 60 seconds</strong> — type, size, download, scan-tested. Here is the exact process I ran on September 20, 2026 for a menu URL, a WiFi network and a 200-character event note, plus the content-formatting details that decide whether phones open the right app.</p>
<p>This is part of the <a href="/blog/qr-code-generator-guide">free QR code generator guide</a> — the pillar covers the whole system, this tutorial is the hands-on walkthrough. Open <a href="/qr-code-generator">the free QR code generator</a> in the next tab and follow along. No signup, no watermark, works offline after load, codes never expire.</p>

<h2 id="what-you-need-first">What you need before you start (1-minute prep)</h2>
<p>Do not open the tool yet. Decide two things and the rest is mechanical. I learned this after generating a gorgeous code for a 340-character tracking URL that no budget phone could read.</p>
<ul>
<li><strong>The exact content:</strong> final URL (short beats long), exact text, phone with country code, or email with subject. Shorter content = sparser pattern = easier scanning.</li>
<li><strong>Where it will be scanned:</strong> phone screen and chat (512px), printed handout (512px), poster or storefront (2048px). Distance decides size — full math in <a href="/blog/qr-code-generator-guide/qr-code-size-print-guide">QR code size and print guide</a>.</li>
<li><strong>WiFi or payment?</strong> Those need special formatting — use the <a href="/wifi-qr-generator">WiFi QR generator</a> for networks and see <a href="/blog/qr-code-generator-guide/upi-payment-qr-code-india">UPI payment QR guide</a> for payee strings. Plain-text hacks fail silently.</li>
</ul>
<blockquote class="tip"><strong>Reader story (Mumbai tutor):</strong> she keeps a sticky note with her short course URL + UPI ID on the monitor. New code per batch takes 40 seconds. Boring system, zero failed prints in a year.</blockquote>

<h2 id="step-by-step">How to create a QR code in 5 steps</h2>
<h3>Step 1 — Enter the URL, text, phone or email</h3>
<p>Type or paste content into the generator. For URLs, use the shortest final link — https://example.com/menu beats a 200-character UTM monster. Every extra character densifies the pattern. If you must track clicks, use a short redirect you control, not a 340-character analytics URL printed at 2 cm.</p>
<h3>Step 2 — Pick 512px for screens, 2048px for print</h3>
<p><strong>512px PNG</strong> for websites, WhatsApp, slides, social posts. <strong>2048px PNG</strong> for posters, flyers, menus, anything scanned beyond arm's length. My rule: viewing distance over 1 meter → 2048px, always. Regenerate rather than upscale — a stretched 512px file blurs module edges.</p>
<h3>Step 3 — Preview and judge the density</h3>
<p>Eyeball the preview. Sparse grid (short URL) = scans from anywhere. Dense snowstorm (200 characters) = needs size. If yours looks like static noise, shorten the content or commit to a 4 cm+ print — never shrink dense codes. Density examples with photos logic in <a href="/blog/qr-code-generator-guide/qr-code-size-print-guide">the sizing guide</a>.</p>
<h3>Step 4 — Download with a sane filename</h3>
<p>Click Download → <strong>qr-menu-512.png</strong>, <strong>event-feedback-2048.png</strong>. Never “qr-final-v2”. PNG is lossless and print-safe; avoid re-saving as JPG, whose compression smudges the black-white edges scanners read.</p>
<h3>Step 5 — Test-scan on two phones before bulk printing</h3>
<p>Scan the screen preview with your phone, then print ONE copy and scan from the real distance and lighting. I caught a beige-on-cream contrast failure at this step that would have wasted ₹2,000 in flyers. Old Android + iPhone, sunlight, low brightness — one flagship in office light proves nothing. Failures? <a href="/blog/qr-code-generator-guide/qr-code-not-scanning-fix">QR not scanning fixes</a>.</p>

<h2 id="content-formats">Content formats that open the right app</h2>
<table>
<thead><tr><th>You want</th><th>Encode this way</th><th>Phone does</th></tr></thead>
<tbody>
<tr><td><strong>Open a website</strong></td><td>Full URL with https://</td><td>Opens browser</td></tr>
<tr><td><strong>Call a number</strong></td><td>Number with country code, e.g. +91 98765 43210</td><td>Opens dialer</td></tr>
<tr><td><strong>Send an email</strong></td><td>Address + subject line</td><td>Opens compose prefilled</td></tr>
<tr><td><strong>Show text</strong></td><td>Plain text, keep under ~200 chars</td><td>Displays note</td></tr>
<tr><td><strong>Join WiFi</strong></td><td>Use the <a href="/wifi-qr-generator">WiFi tool</a> (SSID exact)</td><td>Joins network</td></tr>
<tr><td><strong>Share contact</strong></td><td>vCard fields</td><td>Offers save-contact</td></tr>
</tbody>
</table>
<p>Contact cards deserve care — field order decides whether iPhone and Android both import cleanly. See <a href="/blog/qr-code-generator-guide/vcard-contact-qr-code">vCard QR guide</a>. For guest networks, the <a href="/blog/qr-code-generator-guide/wifi-qr-code-guide">WiFi QR guide</a> covers WPA/WEP, hidden SSIDs and special-character escaping.</p>

<h2 id="url-hygiene">Shorten before you encode: URL hygiene that halves failures</h2>
<p>The single biggest quality lever is the URL itself. A 40-character link encodes as a sparse, forgiving grid; a 300-character tracking URL encodes as a dense brick that needs 4 cm+ to scan. Before generating, strip what scanners do not need: remove UTM parameters for print codes (keep them for digital-only use), use your site's short slugs (/menu not /pages/restaurant-menu-final-2026), and prefer your own domain over third-party shorteners — if bit.ly ever breaks or flags the link, your 500 flyers die with it.</p>
<ul>
<li><strong>Print codes:</strong> under ~60 characters ideal. Test: if the preview looks airy, you are safe at 2–3 cm.</li>
<li><strong>Digital codes (chat, slides):</strong> length barely matters — screens render perfectly and viewers pinch-zoom. Long URLs acceptable here.</li>
<li><strong>Never encode:</strong> links behind logins (gym member portal), expiring drive shares, or staging URLs. The code outlives all three, and customers land on errors.</li>
<li><strong>HTTPS always:</strong> phones warn on plain http:// links; some corporate devices block them outright. Five characters that cost nothing.</li>
</ul>

<h2 id="mistakes">5 first-timer mistakes (I made 3)</h2>
<ol>
<li><strong>Printing untested.</strong> 500 flyers, zero scans. Always one-copy test first.</li>
<li><strong>Tracking-URL bloat.</strong> 300-character URLs make unscannable bricks. Shorten first.</li>
<li><strong>JPG re-saves.</strong> Each JPG save blurs edges. Keep PNG end to end.</li>
<li><strong>No quiet margin.</strong> Pattern touching text or borders fails. White space is functional.</li>
<li><strong>Assuming one phone proves all.</strong> Test old + new, Android + iPhone, sun + shade.</li>
</ol>
<div class="cta-box"><strong>Your turn:</strong> open the <a href="/qr-code-generator">free QR code generator</a>, make your first code in ~60 seconds, and scan it with two phones. Then read <a href="/blog/qr-code-generator-guide">the full pillar guide</a> for sizing, business uses and static-vs-dynamic.</div>
`;

export const qrHowToCreate: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "how-to-create-qr-code",
  kind: "cluster",
  title: "How to Create a QR Code Free in 60 Seconds (PNG, No Signup)",
  description:
    "How to make a QR code free: 5-step walkthrough with sizing, content formats and test-scan routine. Static codes that never expire. No signup.",
  keywords: [
    "how to create qr code free",
    "how to make qr code online",
    "generate qr code png free",
    "create qr code for link free",
    "qr code maker no signup",
  ],
  toolSlugs: ["qr-code-generator", "qr-scanner", "wifi-qr-generator"],
  relatedSlugs: ["qr-code-size-print-guide", "qr-code-not-scanning-fix", "wifi-qr-code-guide"],
  published: "2026-09-22",
  updated: "2026-09-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-you-need-first", text: "What you need before you start", level: 2 },
    { id: "step-by-step", text: "Create a QR code in 5 steps", level: 2 },
    { id: "content-formats", text: "Formats that open the right app", level: 2 },
    { id: "url-hygiene", text: "URL hygiene that halves failures", level: 2 },
    { id: "mistakes", text: "5 first-timer mistakes", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I create a QR code for free?", answer: "Enter your URL or text in the free QR code generator, pick 512px for screens or 2048px for print, preview the pattern, download the PNG and test-scan with two phones. About 60 seconds, no signup, and the static code never expires." },
    { question: "Which size should I download?", answer: "512px PNG for websites, chat, slides and small prints up to ~5 cm. 2048px for posters, flyers and anything scanned beyond arm's length. Never upscale a small file — regenerate at the bigger size." },
    { question: "Why does content length matter?", answer: "Longer text makes a denser module pattern that needs larger prints to scan. A short URL scans at 2 cm; a 200-character payload needs 3–4 cm. Shorten URLs before encoding." },
    { question: "PNG or JPG for QR codes?", answer: "PNG always for the master file — it is lossless, so module edges stay razor sharp. JPG recompression blurs edges and causes scan failures, especially after multiple re-saves or WhatsApp forwarding." },
    { question: "How do I know my code works before printing?", answer: "Scan the screen preview, then print one copy and scan from the real viewing distance and lighting with two different phones (old Android + iPhone ideally). Only then print in bulk." },
  ],
};
