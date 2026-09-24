import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Guests asking “what's the WiFi password?” twenty times a day is a tax on every café, office and Airbnb. A framed <strong>WiFi QR code</strong> ends it: one scan, phone joins, no spelling “Correct-Horse-9” aloud. I set one up for a friend's salon in September 2026 — SSID with a space, 12-character password, printed 8 cm square at the counter. First-week result: zero password questions, three customers complimented it.</p>
<p>Part of the <a href="/blog/qr-code-generator-guide">free QR code generator guide</a>. Build yours in the <a href="/wifi-qr-generator">WiFi QR generator</a> (handles WPA/WEP, hidden SSIDs and special-character escaping automatically). General codes: <a href="/qr-code-generator">free QR code generator</a>.</p>

<h2 id="how-it-works">How WiFi QR codes work (30-second explainer)</h2>
<p>The code encodes a short string with your network name (SSID), password and security type. Modern Android and iPhone cameras parse it and offer a “Join network” button — no app needed. Older phones may need a scanner app; anything from the last ~6 years works natively. The code is <strong>static and never expires</strong> — change the router password and you reprint once. That is the only maintenance, ever.</p>

<h2 id="step-by-step">Make yours in 4 steps</h2>
<h3>Step 1 — Copy the SSID exactly</h3>
<p>Capitals, spaces and punctuation must match byte-for-byte. “Cafe-Guest” and “cafe-guest” are different networks. Photograph the router sticker rather than typing from memory — I once spent 20 minutes debugging a code whose SSID had a trailing space.</p>
<h3>Step 2 — Set security type and password</h3>
<p>Choose <strong>WPA/WPA2</strong> (most routers), WEP (old hardware) or No password (open guest networks). WPA passwords run 8–63 characters. Special characters like semicolons and colons break hand-written formats — the <a href="/wifi-qr-generator">WiFi tool escapes them automatically</a>, which is exactly why you should not hand-craft the string.</p>
<h3>Step 3 — Flag hidden SSIDs if needed</h3>
<p>If your network does not broadcast its name, toggle the hidden-network flag. Without it, phones scan successfully yet fail to join — the most confusing failure mode, and the first thing to check when “the QR doesn't work”.</p>
<h3>Step 4 — Download, print and place</h3>
<p>Download <strong>guest-wifi.png</strong>, print at least 5–8 cm for counter display (arm's length scanning), matte paper, black on white. Frame it — a framed sign survives spills that kill paper tents. Test with one Android and one iPhone before laminating ten copies.</p>

<h2 id="placement-sizes">Where to put it + what size</h2>
<table>
<thead><tr><th>Location</th><th>Print size</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>Café counter / reception</strong></td><td>8–10 cm, framed</td><td>Arm's length; add network name underneath for humans</td></tr>
<tr><td><strong>Hotel room / Airbnb</strong></td><td>5–6 cm tent card</td><td>Include checkout-time note on the same card</td></tr>
<tr><td><strong>Office lobby poster</strong></td><td>15–20 cm</td><td>Scanned from 1.5–2 m; use 2048px export</td></tr>
<tr><td><strong>Home fridge (family)</strong></td><td>5 cm</td><td>Saves spelling the password to every guest forever</td></tr>
</tbody>
</table>
<ul>
<li><strong>Label it:</strong> “Scan to join Guest WiFi” plus the SSID in text. Guests trust labeled codes; bare squares get ignored.</li>
<li><strong>Separate guest network:</strong> never QR-share your main network with its admin panel and smart devices. Guest SSID with client isolation is the correct setup — ask your ISP if unsure.</li>
<li><strong>Password changes:</strong> reprint the code the same day. Keep the PNG filename versioned (guest-wifi-2026-09.png) so old prints get binned.</li>
</ul>

<h2 id="guest-network-security">Guest network security: share freely without sharing everything</h2>
<p>A QR code removes typing friction — which means it also removes the friction that kept your network semi-private. Anyone who photographs the sign joins forever, and anyone they forward the photo to joins too. That is fine for a café; it is not fine for your home office network with its NAS, printers and smart locks. The fix is network separation, not QR avoidance.</p>
<ul>
<li><strong>Broadcast a dedicated guest SSID</strong> with client isolation (devices cannot see each other) and bandwidth limits. Share <em>that</em> via QR. Your private SSID stays unprinted and unphotographed.</li>
<li><strong>Rotate the guest password quarterly</strong> (cafés) or per tenant change (Airbnbs, PGs). Rotation means reprinting one framed sign — 10 minutes, ₹30. Keep the PNG versioned so old prints get binned, not stacked.</li>
<li><strong>Never QR-share networks with admin panels exposed</strong> — change default router passwords first. A guest who can open 192.168.1.1 owns your DNS.</li>
<li><strong>Offices:</strong> pair the QR with a captive-portal disclaimer if you handle customer data. The QR gets them on; the portal covers your compliance. Check local rules with your IT provider.</li>
</ul>

<h2 id="troubleshooting">When it will not join: checklist</h2>
<ol>
<li><strong>SSID mismatch</strong> — recheck capitals, spaces, trailing spaces. Re-copy from router settings page.</li>
<li><strong>Hidden network, flag off</strong> — toggle hidden SSID in the <a href="/wifi-qr-generator">generator</a> and reprint.</li>
<li><strong>Wrong security type</strong> — WPA code on a WEP router fails. Match the router's actual setting.</li>
<li><strong>Too small / glossy glare</strong> — enlarge to 8 cm, matte finish, flat surface. Full diagnosis in <a href="/blog/qr-code-generator-guide/qr-code-not-scanning-fix">QR not scanning fixes</a>.</li>
<li><strong>Ancient phone</strong> — pre-2018 cameras may need a scanner app; verify what the code contains with our <a href="/qr-scanner">QR scanner</a> first.</li>
</ol>
<h2 id="multi-network">Multi-network setups: home + office + events</h2>
<p>One code per network, labeled by purpose — the system scales cleanly. <strong>Home:</strong> main SSID unprinted, plus a guest-SSID fridge card for visitors (rotate when tenants change). <strong>Office:</strong> staff network (password via IT onboarding, never QR-posted) plus a lobby guest code framed at reception with the day's password version noted. <strong>Events:</strong> per-day codes work best — “ conf-wifi-day1” printed on badges, day 2 rotated, which also expires hallway access automatically when the event ends. <strong>PGs/hostels:</strong> per-floor SSIDs keep support sane (“which floor?” answers itself). Common failure: one shared code photographed and forwarded beyond its audience — scope each code's network to what its audience should reach, per the <a href="#guest-network-security">security section above</a>, and version filenames (lobby-guest-sep2026.png) so old prints get binned on rotation.</p>
<div class="cta-box"><strong>Make it now:</strong> open the <a href="/wifi-qr-generator">WiFi QR generator</a> — SSID, password, print, done in 2 minutes. Overview: <a href="/blog/qr-code-generator-guide">QR pillar guide</a> · Sizing math: <a href="/blog/qr-code-generator-guide/qr-code-size-print-guide">print guide</a>.</div>
`;

export const qrWifi: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "wifi-qr-code-guide",
  kind: "cluster",
  title: "WiFi QR Code: Share Guest WiFi With One Scan (2026)",
  description:
    "WiFi QR code guide: share guest WiFi with one scan. SSID tips, WPA/WEP, hidden networks, print sizes and join-failure fixes. Free generator.",
  keywords: [
    "wifi qr code generator",
    "qr code for wifi password",
    "share wifi with qr code",
    "wifi qr code for guests",
    "scan to join wifi",
  ],
  toolSlugs: ["wifi-qr-generator", "qr-code-generator", "qr-scanner"],
  relatedSlugs: ["how-to-create-qr-code", "qr-code-size-print-guide", "qr-code-not-scanning-fix"],
  published: "2026-09-22",
  updated: "2026-09-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "how-it-works", text: "How WiFi QR codes work", level: 2 },
    { id: "step-by-step", text: "Make yours in 4 steps", level: 2 },
    { id: "placement-sizes", text: "Placement + sizes", level: 2 },
    { id: "guest-network-security", text: "Guest network security", level: 2 },
    { id: "multi-network", text: "Multi-network setups", level: 2 },
    { id: "troubleshooting", text: "When it will not join", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I share my WiFi password with a QR code?", answer: "Enter the exact SSID, password and security type (WPA/WPA2 usually) in the WiFi QR generator, download the PNG, print at 5–8 cm and frame it. Guests scan with their camera and tap Join — no typing." },
    { question: "Does it work with hidden networks?", answer: "Yes, toggle the hidden-SSID flag when generating. Without it, phones scan fine but fail to join — the most common hidden-network failure." },
    { question: "Is sharing WiFi via QR safe?", answer: "Share a guest network, never your main one. Guest SSIDs with client isolation keep visitors off your private devices. Reprint the code whenever the password changes." },
    { question: "What if the QR scans but won't join?", answer: "Check SSID exactness (capitals, spaces), hidden-network flag, and security-type match. Then check size and glare — enlarge to 8 cm matte and retest with a second phone." },
    { question: "Do old phones support WiFi QR codes?", answer: "Cameras from roughly the last 6 years join natively. Older phones may need a scanner app. Verify code contents any time with the free QR scanner." },
  ],
};
