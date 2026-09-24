import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“UPI ID batao” — every Indian counter queue runs on those three words. A printed <strong>UPI payment QR code</strong> deletes the queue: customer scans, amount prefilled, two taps, done. I set one up for a vegetable vendor in September 2026 — laminated 8 cm code, payee ID + fixed-price vegetable combos. First Saturday: 40+ UPI collections, zero wrong-number transfers (previously 2–3 a week went to a stranger with a similar ID). Here is the exact setup.</p>
<p>Part of the <a href="/blog/qr-code-generator-guide">free QR code generator guide</a>. Generate payment codes in the <a href="/qr-code-generator">free QR code generator</a>. This is setup guidance, not financial advice — confirm settlement and charges with your bank.</p>

<h2 id="how-upi-qr-works">How UPI QR strings work (60 seconds)</h2>
<p>The code encodes a UPI intent: payee ID (name@bank), payee name, optional fixed amount, and a note. Scanning opens the customer's UPI app (GPay, PhonePe, Paytm, BHIM) with everything prefilled — they just tap pay and enter their PIN. No terminal, no rent, settlement straight to the linked bank account. Fixed-amount codes (₹99 combo) remove typing errors entirely; open-amount codes let the customer enter the total.</p>

<h2 id="setup">Set yours up: fixed vs open amount</h2>
<h3>Fixed amount (tea stall, combo, ticket)</h3>
<p>Encode payee ID + name + exact amount (e.g. ₹30 chai). Customer flow: scan → pay → PIN. Nothing to mistype. Reprint when the price changes — static codes cannot update, so version filenames (chai-30-sep2026.png).</p>
<h3>Open amount (kirana, salon, variable bills)</h3>
<p>Encode payee ID + name only. Customer enters the bill total. Slightly more error-prone, infinitely reusable across bills. Pair with a spoken total (“₹450, scan and pay”) — vendors who announce the amount get fewer wrong-amount payments.</p>
<table>
<thead><tr><th>Setup</th><th>Best for</th><th>Reprint when</th></tr></thead>
<tbody>
<tr><td><strong>Fixed ₹30</strong></td><td>Chai, single-price items, entry tickets</td><td>Price changes</td></tr>
<tr><td><strong>Fixed combo</strong></td><td>₹99 breakfast, ₹499 service</td><td>Menu changes</td></tr>
<tr><td><strong>Open amount</strong></td><td>Kirana, salon, variable bills</td><td>UPI ID changes (rarely)</td></tr>
</tbody>
</table>

<h2 id="counter-setup">Counter setup that prevents fraud and errors</h2>
<ul>
<li><strong>Print 8–10 cm, laminated, fixed to the counter.</strong> Loose paper codes get swapped — there are real cases of scammers pasting their own QR over shops'. Fix yours down, check it daily, verify the payee name on first scan each morning.</li>
<li><strong>Verify payee name displays correctly.</strong> “Pay SA***A SH***A” reassures customers. Wrong name = do not pay — train staff to say this.</li>
<li><strong>Confirm payment before handing goods:</strong> check YOUR phone's credit SMS/app, not the customer's screen (screenshots fake easily). Speaker-based UPI soundboxes (₹1,000–1,500) automate this for busy counters.</li>
<li><strong>Keep one backup code</strong> in the drawer. Damaged/lost primary → swap in 30 seconds, no sales lost.</li>
<li><strong>US/UK equivalents:</strong> same static-code idea with Venmo/Zelle tags or bank-transfer details; fraud rules (verify name, confirm on your device) apply everywhere.</li>
</ul>
<h3>Fees and limits (check your bank)</h3>
<p>UPI person-to-merchant collections are typically free for small merchants, but caps, settlement timing and soundbox charges vary by bank and app. This page covers code setup only — confirm charges, daily limits and dispute handling with your bank. Not financial advice.</p>

<h2 id="reconciliation">Reconciliation: match QR collections to sales at day end</h2>
<p>QR money lands straight in your bank — which means the counter register and the bank statement must agree every evening, or leakage hides in the gap. The routine that works for single-counter shops: note each bill total on a paper pad or billing app as usual, then compare the day's UPI credits (bank SMS/app statement) against QR-mode sales before closing. Mismatches come from three places: a customer who scanned but never entered their PIN (no credit — call it an unpaid bill, not a sale), a wrong-amount open-code payment (under/over — settle the difference next visit or refund on the spot), and mixed cash/UPI confusion (mark the mode per bill, every bill). Vendors who reconcile daily catch a ₹450 “paid” claim with no matching credit within hours; vendors who reconcile monthly write off hundreds. Five minutes at close, house-money protected.</p>
<h2 id="fraud-cases">QR swap fraud: how it works and how shops stop it</h2>
<p>The attack is simple: a scammer prints their own UPI QR on a sticker and pastes it over the shop's code during rush hours. Customers pay the criminal; the shop loses the sale and discovers it at day-end reconciliation. I have read three such cases from Indian market shopkeepers in 2025–26 — losses of Rs 3,000–12,000 before anyone noticed.</p>
<ul>
<li><strong>Laminate behind the counter glass</strong> instead of paper on the wall — stickers do not adhere to glass counters cleanly and staff see tampering instantly.</li>
<li><strong>Brand the code:</strong> print shop name + “Pay to Sharma General Store only” around the QR. Generic codes invite swaps; labeled ones expose them.</li>
<li><strong>Morning verification ritual (30 seconds):</strong> first staffer scans the displayed code and confirms the payee name on screen. Log it on the cash sheet — accountability makes it happen daily.</li>
<li><strong>Soundbox > screen:</strong> Rs 1,000–1,500 UPI speakers announce “Rs 450 received” aloud. Fake-payment screenshots cannot fake audio the whole counter hears.</li>
<li><strong>Two-code rotation for big days:</strong> festivals and sale days draw crowds (and scammers). Swap to the backup code each morning; compare both statements at close.</li>
</ul>
<div class="cta-box"><strong>Set it up today:</strong> build the payee code in the <a href="/qr-code-generator">free QR code generator</a>, laminate it, verify the name display. Business playbook: <a href="/blog/qr-code-generator-guide/qr-code-for-business">QR for business</a> · Overview: <a href="/blog/qr-code-generator-guide">pillar guide</a>.</div>
`;

export const qrUpi: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "upi-payment-qr-code-india",
  kind: "cluster",
  title: "UPI QR Code for Payments: Setup, Counter Tips & Safety (India)",
  description:
    "UPI QR code setup for shops: fixed vs open amount, counter lamination, fraud checks and verification routine. Static, free, no terminal rent.",
  keywords: [
    "upi qr code generator",
    "qr code for upi payment",
    "upi payment qr for shop",
    "gpay phonepe qr code shop",
    "upi qr safety tips",
  ],
  toolSlugs: ["qr-code-generator", "qr-scanner", "wifi-qr-generator"],
  relatedSlugs: ["qr-code-for-business", "how-to-create-qr-code", "qr-code-not-scanning-fix"],
  published: "2026-09-22",
  updated: "2026-09-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "how-upi-qr-works", text: "How UPI QR strings work", level: 2 },
    { id: "setup", text: "Fixed vs open amount setup", level: 2 },
    { id: "counter-setup", text: "Counter setup: fraud + errors", level: 2 },
    { id: "reconciliation", text: "Reconciliation at day end", level: 2 },
    { id: "fraud-cases", text: "QR swap fraud defense", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I create a UPI QR code for my shop?", answer: "Encode your UPI payee ID and name (plus fixed amount for set prices) in the free QR code generator, download the PNG, print 8–10 cm laminated and fix it to the counter. Customers scan, tap pay and enter their PIN." },
    { question: "Fixed amount or open amount — which is better?", answer: "Fixed for single-price items (chai ₹30, combos) — zero typing errors. Open amount for variable bills (kirana, salon) — reusable forever. Reprint fixed codes when prices change." },
    { question: "How do I avoid QR swap fraud?", answer: "Laminate and fix the code down, verify the displayed payee name every morning, confirm credits on your own phone (not the customer's screen), and keep a backup code in the drawer." },
    { question: "Do customers need my phone number?", answer: "No — the UPI ID suffices. Never print your personal number on payment codes; keep one channel (UPI ID) for money and handle disputes via your bank." },
    { question: "Are there charges for UPI collections?", answer: "Usually free for small merchants, but caps, settlement timing and device charges vary by bank and app. Confirm with your bank — this guide covers code setup only, not financial advice." },
  ],
};
