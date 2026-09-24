import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“Due soon” got me paid in 23 days. “Due Oct 1, 2026 (Net 15)” got me paid in 6. Same client, same work — different words on the invoice. <strong>Invoice payment terms</strong> are not legal wallpaper; they are the highest-ROI lines on the page. Here are the terms, due-date formats and reminder scripts I use to get paid 2× faster without sounding rude.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. Print terms from the <a href="/invoice-generator">free invoice generator</a>; close paid bills with a <a href="/receipt-generator">receipt</a>; start jobs with a <a href="/quotation-generator">quotation</a>.</p>

<h2 id="terms-that-work">Payment terms that actually work (copy these)</h2>
<table>
<thead><tr><th>Term</th><th>Means</th><th>Use when</th></tr></thead>
<tbody>
<tr><td><strong>Due on receipt</strong></td><td>Pay immediately</td><td>Small gigs under ₹10k, walk-in work</td></tr>
<tr><td><strong>Net 7 / Net 15</strong></td><td>7 / 15 days from issue</td><td>New clients, retainers (my default: Net 15)</td></tr>
<tr><td><strong>Net 30</strong></td><td>30 days</td><td>Large enterprises only, slow AP cycles</td></tr>
<tr><td><strong>50% advance</strong></td><td>Half before start</td><td>Projects above ₹25k / $500</td></tr>
<tr><td><strong>2%/month late fee</strong></td><td>Interest after due</td><td>Always print it — rarely enforce, always respect</td></tr>
</tbody>
</table>
<ul>
<li><strong>Always pair “Net X” with a calendar date:</strong> “Net 15 — due Oct 1, 2026”. Dates beat terms; together they are bulletproof.</li>
<li><strong>Name the method on the PDF:</strong> “UPI: name@upi · Bank: HDFC XXXX1234, IFSC …” If they must ask how to pay, you lose 5 days.</li>
<li><strong>New clients = shorter terms.</strong> I start everyone on Net 15; Net 30 is earned after 3 on-time payments. Say this kindly on the call.</li>
</ul>

<h2 id="email-templates">3 copy-paste emails (send, nudge, firm)</h2>
<h3>1 — Send (day 0, Tue–Thu morning)</h3>
<p>Subject: <strong>Invoice INV-2026-001 — $550 due Sept 29</strong><br/>Body: “Hi Priya — invoice INV-2026-001 for $550 (design, Aug) due Sept 29. UPI/bank on the PDF. Anything accounts needs, just reply here. Thanks!” Attach <strong>invoice-acme-001.pdf</strong>.</p>
<h3>2 — Polite nudge (day 3 overdue)</h3>
<p>Subject: <strong>Re: Invoice INV-2026-001 — quick check</strong><br/>Body: “Nudging INV-2026-001 ($550, was due Sept 29). Anything held up on your side? Re-attached the PDF. Thanks!” Re-attach. 60% of my late bills clear within 48 hours of this one.</p>
<h3>3 — Firm + date (day 7 overdue)</h3>
<p>Subject: <strong>INV-2026-001 overdue — please confirm payment date</strong><br/>Body: “Following up on INV-2026-001 ($550, due Sept 29, 7 days overdue). Please confirm the payment date so I can plan. Late terms (2%/mo) apply after the 14th. Thanks!” Still warm, now specific.</p>

<h2 id="late-fee-wording">Late-fee wording that is firm but professional</h2>
<p>Print this on every invoice: “<strong>Payment due Oct 1, 2026 (Net 15). 2% per month applies after due date. Work pauses on retainers 14+ days overdue.</strong>” Enforce rarely, print always — the line itself halves delays. For retainers, add “paused work” explicitly; I have paused twice in 6 years and both clients paid within 24 hours. Full doc-type flow in <a href="/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt">invoice vs quotation vs receipt</a>; numbering hygiene in <a href="/blog/invoice-generator-guide/invoice-numbering">numbering guide</a>.</p>
<ul>
<li><strong>India:</strong> UPI + bank both printed; WhatsApp nudge with PDF works, email stays the record.</li>
<li><strong>US/UK:</strong> ACH/bank or Stripe links; morning sends in client timezone; VAT-registered UK clients get VAT-split PDFs.</li>
<li><strong>Never:</strong> threaten on first nudge, add surprise fees, or CC the CEO on day 3. Escalate warmth-first.</li>
</ul>
<h2 id="retainer-terms">Retainer and milestone terms (recurring money)</h2>
<p>One-off invoice terms fail retainers — recurring money needs recurring rules. Print these on every retainer invoice: billing day (1st of month), due in 7 days, pause clause (“work pauses 14+ days overdue and resumes on payment”), and rate-lock period (“Rs 30,000/month locked 6 months, revises April”). Milestone projects need a payment schedule table inside the quote itself: 30% advance, 40% on beta, 30% on launch — each milestone invoiced separately referencing QUO-2026-014 and prior receipts. The pause clause is the entire game: I have paused twice in 6 years and both clients paid within 24 hours, because paused work costs them more than the invoice. Without it, retainers drift into 60-day arrears while you keep delivering — the most expensive sentence you will ever omit.</p>
<div class="cta-box"><strong>Put it on paper now:</strong> add Net 15 + calendar date + UPI/bank in the <a href="/invoice-generator">free invoice generator</a>, then send with the subject formula. System overview: <a href="/blog/invoice-generator-guide">pillar guide</a>.</div>
`;

export const invoicePaymentTerms: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "payment-terms-and-followups",
  kind: "cluster",
  title: "Invoice Payment Terms + Follow-Up Scripts That Get You Paid Faster",
  description:
    "Invoice payment terms examples (Net 7/15/30, advances, late fees) + 3 copy-paste reminder emails. Polite scripts that cut payment time in half.",
  keywords: ["invoice payment terms examples", "how to politely ask client for payment", "invoice due upon receipt meaning", "late payment fee wording on invoice", "payment reminder email invoice"],
  toolSlugs: ["invoice-generator", "receipt-generator", "quotation-generator"],
  relatedSlugs: ["how-to-create-invoice-online", "freelancer-invoice-guide", "invoice-numbering"],
  published: "2026-09-14",
  updated: "2026-09-18",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "terms-that-work", text: "Payment terms that work", level: 2 },
    { id: "email-templates", text: "3 copy-paste email scripts", level: 2 },
    { id: "late-fee-wording", text: "Late-fee wording (firm, polite)", level: 2 },
    { id: "retainer-terms", text: "Retainer + milestone terms", level: 2 },
  ],
  html,
  faqs: [
    { question: "What are the best invoice payment terms?", answer: "Net 15 with a calendar due date for most clients, Net 7 for retainers, 50% advance above ₹25k/$500, due-on-receipt for small gigs. Always print method (UPI/bank/Stripe) and a 2%/month late line." },
    { question: "What does due upon receipt mean?", answer: "Pay immediately on receiving the invoice. Use for small or walk-in jobs. Pair with the payment method printed on the PDF so immediate actually happens." },
    { question: "How do I politely ask for payment?", answer: "Day-3 nudge asks if anything is held up and re-attaches the PDF; day-7 asks for a specific payment date. Warm tone, specific numbers, always the invoice number and total in the subject." },
    { question: "Should I charge a late fee?", answer: "Print 2%/month on every invoice; enforce selectively. The printed line itself halves delays. For retainers add paused-work-after-14-days — it resolves most stalls within a day." },
    { question: "When should I send invoices for fastest payment?", answer: "Tuesday–Thursday mornings in the client timezone, with number + total + due date in the subject. Avoid Monday pile-ups and Friday disappearances." },
  ],
};
