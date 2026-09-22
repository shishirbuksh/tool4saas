import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>My first freelance invoice said “Design stuff — $400”. The client replied: “Which stuff?” Two days lost to clarification. Six years later my invoices read like mini-contracts — and get paid in 6 days average. This is the <strong>freelancer invoice guide</strong>: what to include, when to send, and the exact payment terms that stop awkward money chases.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. Build yours in the <a href="/invoice-generator">free invoice generator</a> (or the <a href="/freelance-gst-invoice-generator">freelance GST invoice generator</a> for India). Price your work first with the <a href="/freelance-rate-calculator">freelance rate calculator</a> if needed.</p>

<h2 id="what-freelancers-get-wrong">What freelancers get wrong (the 4 classics)</h2>
<ul>
<li><strong>Vague line items:</strong> “Design stuff” → dispute. “3 homepage concepts + 2 revisions, Aug 2026” → paid.</li>
<li><strong>No advance:</strong> starting ₹40,000 projects with zero upfront. I lost one full project fee this way in 2021. Never again.</li>
<li><strong>Net 30 by default:</strong> why lend clients a month? New clients get <strong>Net 7–15</strong>; retainers get advance + Net 7.</li>
<li><strong>One channel only:</strong> email-only invoicing in India misses that many small clients pay faster on WhatsApp + UPI.</li>
</ul>

<h2 id="anatomy">Anatomy of a freelancer invoice that gets paid</h2>
<p>Seven blocks, in order. I use this exact sequence for every bill — design, writing, code, it does not matter.</p>
<ol>
<li><strong>Header:</strong> your name/studio, email, phone, UPI ID. Logo if you have one.</li>
<li><strong>Numbers:</strong> INV-2026-014, issued + due dates. Due date always a calendar date, never just “Net 15”.</li>
<li><strong>Client:</strong> human + company + email. B2B India: their GSTIN.</li>
<li><strong>Scope lines:</strong> deliverable, period, qty, rate. Reference the <a href="/quotation-generator">quote (QUO-2026-014)</a> or contract clause.</li>
<li><strong>Money math:</strong> subtotal, discount (if any), tax (GST/VAT or 0% + note), <strong>bold total with currency</strong>.</li>
<li><strong>How to pay:</strong> UPI + Razorpay or bank with IFSC (India — half my sub-₹25,000 bills arrive via UPI within 48 hours), Stripe or bank transfer (US/UK). One primary method printed, one backup.</li>
<li><strong>Terms + warmth:</strong> late fee (“2%/month after due”), plus “Thanks — loved working on the launch!”</li>
</ol>
<table>
<thead><tr><th>Freelance type</th><th>Line-item style that works</th><th>Terms that work</th></tr></thead>
<tbody>
<tr><td><strong>Design / video</strong></td><td>Deliverables + revisions (“3 concepts, 2 rounds”)</td><td>50% advance, Net 15, kill fee clause</td></tr>
<tr><td><strong>Writing / SEO</strong></td><td>Pieces + words + month (“12 posts, ~1,200w, Aug”)</td><td>100% upfront under ₹10k, else 50/50</td></tr>
<tr><td><strong>Dev / hourly</strong></td><td>Hours + rate + sprint (“22 hrs × $60, Sprint 14”)</td><td>Weekly for hourly, Net 7 for retainers</td></tr>
<tr><td><strong>Consulting</strong></td><td>Sessions + outcomes (“4 sessions + audit doc”)</td><td>Advance retainer, late fee stated</td></tr>
</tbody>
</table>

<h2 id="when-to-send">When to send: advance, milestone and final</h2>
<ul>
<li><strong>Projects above ₹25,000 / $500:</strong> 30–50% advance invoice before starting (proforma-style), balance on delivery. No advance, no start — I say this on discovery calls now.</li>
<li><strong>Milestones:</strong> invoice per approved milestone, not per month. “Homepage approved → invoice 2 of 3”.</li>
<li><strong>Retainers:</strong> invoice on day 1 of the month, Net 7. Late retainer = paused work. State this in the contract, repeat on the invoice.</li>
<li><strong>Small gigs (under ₹10,000):</strong> 100% upfront. The admin cost of chasing small bills exceeds the bill.</li>
</ul>
<h3>India specifics: GST, UPI and WhatsApp</h3>
<p>Unregistered? Bill without GST and note it. Registered? Use SAC codes and the right CGST/SGST vs IGST split — full breakdown in <a href="/blog/invoice-generator-guide/gst-invoice-format-india">GST invoice format India</a>. Always print UPI ID on the PDF; half my Indian payments arrive via UPI within 48 hours of a WhatsApp nudge with the PDF attached.</p>

<h2 id="payment-terms-scripts">Payment terms + copy-paste follow-ups</h2>
<p>Terms to print: “<strong>Net 15. 2% per month after due date. Pay via UPI / bank transfer.</strong>” Then this sequence:</p>
<ul>
<li><strong>Day 0 (send):</strong> “Hi [Name] — invoice INV-2026-014 for ₹23,600 due Sept 29. PDF attached, UPI: name@upi. Thanks!”</li>
<li><strong>Day 3 overdue:</strong> “Quick nudge — INV-2026-014 (₹23,600) was due Sept 29. Anything accounts needs from me? Re-attached.”</li>
<li><strong>Day 7 overdue:</strong> “Following up on INV-2026-014. Please confirm payment date so I can plan. Thanks!”</li>
</ul>
<p>More templates and the psychology behind them in <a href="/blog/invoice-generator-guide/payment-terms-and-followups">payment terms and reminders</a>. After payment, send a <a href="/receipt-generator">receipt</a> — it doubles repeat business in my experience.</p>

<h2 id="checklist-before-send">60-second checklist before you hit send</h2>
<ol>
<li>Number unique and sequential? (See <a href="/blog/invoice-generator-guide/invoice-numbering">numbering guide</a>.)</li>
<li>Due date = calendar date, not just “Net 15”?</li>
<li>Lines specific enough that a stranger understands them?</li>
<li>Tax slab + GSTIN right? Total bold with currency?</li>
<li>Payment method printed (UPI/bank/Stripe)? Right recipient (accounts, not just founder)?</li>
</ol>
<div class="cta-box"><strong>Freelancer action:</strong> price with the <a href="/freelance-rate-calculator">freelance rate calculator</a>, build with the <a href="/invoice-generator">free invoice generator</a>, and back up with <a href="/blog/invoice-generator-guide">the pillar guide</a>. Your future self — paid on time — says thanks.</div>
`;

export const invoiceFreelancer: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "freelancer-invoice-guide",
  kind: "cluster",
  title: "Freelancer Invoice Guide: What to Include & Get Paid on Time",
  description:
    "Freelancer invoicing done right: line items, advances, Net terms, GST/UPI tips for India + follow-up scripts. Free invoice maker walkthrough.",
  keywords: [
    "freelancer invoice template",
    "invoice for freelancers",
    "how do freelancers invoice clients",
    "freelance invoice without gst india",
    "freelancer payment terms invoice",
  ],
  toolSlugs: ["invoice-generator", "freelance-gst-invoice-generator", "freelance-rate-calculator"],
  relatedSlugs: ["how-to-create-invoice-online", "gst-invoice-format-india", "payment-terms-and-followups"],
  published: "2026-09-12",
  updated: "2026-09-18",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-freelancers-get-wrong", text: "4 mistakes freelancers make", level: 2 },
    { id: "anatomy", text: "Anatomy of an invoice that gets paid", level: 2 },
    { id: "when-to-send", text: "When to send: advance & milestones", level: 2 },
    { id: "payment-terms-scripts", text: "Payment terms + follow-up scripts", level: 2 },
    { id: "checklist-before-send", text: "60-second pre-send checklist", level: 2 },
  ],
  html,
  faqs: [
    { question: "What should a freelancer include on an invoice?", answer: "Your details, client contact, unique number, issue and due dates, specific line items with qty and rate, subtotal, tax or zero-tax note, bold total with currency, payment method (UPI/bank/Stripe), quote reference and late-fee terms." },
    { question: "How much advance should freelancers ask for?", answer: "30–50% for projects above ₹25,000/$500, 100% upfront under ₹10,000, and day-1 billing with Net 7 for retainers. State it on the discovery call and repeat on the quote and invoice." },
    { question: "How do freelancers invoice without GST in India?", answer: "Set tax to 0%, note unregistered status, keep sequential numbering, and add UPI/bank details. Add GST only when registered — confirm threshold and slabs with your CA." },
    { question: "When should I follow up on an unpaid invoice?", answer: "Day 0 send with clear subject, polite nudge day 3 overdue, firmer check day 7 asking for a payment date. Always re-attach the PDF. Most of my late bills clear within 48 hours of the first nudge." },
    { question: "Should I use Net 15 or Net 30?", answer: "Net 7–15 for new clients and retainers; Net 30 only for large enterprises with slow accounts cycles. Shorter terms get paid faster with no pushback in my tests — always pair with a calendar due date." },
  ],
};
