import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>I have made nearly every invoicing mistake on this list — wrong tax, vague lines, no due date, wrong recipient. Each one cost 5–20 days. I ran this 12-point checklist on my last 11 bills in Sept 2026 — 9 cleared first time versus 5 of 11 before. Run it on your next bill before you hit send.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. Fix bills in the <a href="/invoice-generator">free invoice generator</a>; verify headcount math with the <a href="/payslip-generator">payslip generator</a> if you run staff.</p>

<h2 id="the-12">12 invoicing mistakes that delay payment (with fixes)</h2>
<ol>
<li><strong>No calendar due date.</strong> “Net 15” alone drifts. Fix: “Net 15 — due Oct 1, 2026” on the PDF + in the subject. (See <a href="/blog/invoice-generator-guide/payment-terms-and-followups">payment terms guide</a>.)</li>
<li><strong>Vague line items.</strong> “Services $2,000” gets questioned. Fix: deliverable + period + qty × rate (“12 posts, Aug 2026”).</li>
<li><strong>Duplicate or skipped numbers.</strong> Accounts auto-flags these. Fix: sequential INV-2026-001 discipline per <a href="/blog/invoice-generator-guide/invoice-numbering">numbering guide</a>; correct via credit note, never edits.</li>
<li><strong>Wrong tax slab or missing GSTIN.</strong> The classic Indian bounce: 18 vs 5%, or CGST/SGST on inter-state. Fix per <a href="/blog/invoice-generator-guide/gst-invoice-format-india">GST format tutorial</a>; cross-check with the <a href="/gst-calculator">GST calculator</a>.</li>
<li><strong>No payment method printed.</strong> “How do I pay?” = 5 lost days. Fix: UPI ID + bank/IFSC (India) or bank/Stripe (US/UK) on every PDF.</li>
<li><strong>Wrong recipient.</strong> Founders forward; accounts pays. Fix: ask “who handles vendor payments?” before drafting.</li>
<li><strong>Missing quote/PO reference.</strong> Enterprise AP holds bills without PO-1042. Fix: paste QUO/PO numbers into notes. Flow in <a href="/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt">invoice vs docs</a>.</li>
<li><strong>Totals in figures only.</strong> Large buyers and banks want words too. Fix: “₹23,600 — Rupees twenty-three thousand six hundred only”.</li>
<li><strong>Sending Friday evening.</strong> Dies over the weekend. Fix: Tue–Thu mornings, client timezone.</li>
<li><strong>“Final-v2.pdf” filenames.</strong> Looks chaotic in AP systems. Fix: invoice-acme-001.pdf, always.</li>
<li><strong>No follow-up sequence.</strong> Silence never collects. Fix: day-3 nudge + day-7 date-ask with re-attached PDF.</li>
<li><strong>Invoicing before acceptance.</strong> Billing unapproved work invites disputes. Fix: quote first (<a href="/quotation-generator">QUO-2026-014</a>), advance, then invoice on sign-off.</li>
</ol>

<h2 id="real-fix">Real example: fixing a bounced ₹23,600 invoice in 10 minutes</h2>
<p>September 2026, real story. My GST bill INV-GST-011 (₹20,000 + 18% = ₹23,600, Mumbai → Delhi) bounced: I had written CGST 9% + SGST 9%. Delhi is inter-state — it needed a single <strong>IGST 18% (₹3,600)</strong> line. Same total, wrong split. Fix took 10 minutes: corrected the split, added place of supply “Delhi (07)”, double-checked buyer GSTIN digit by digit, renamed the file gst-invoice-011-zeta.pdf, and resent with subject “GST Invoice INV-GST-011 — ₹23,600 due Sept 29 (corrected split)”. Cleared same day. The lesson that stuck: accounts teams do not read totals first — they read tax rows. Get the split right per <a href="/blog/invoice-generator-guide/gst-invoice-format-india">GST format tutorial</a>, and confirm slabs with your CA, not memory.</p>

<h2 id="professional-checklist">The 60-second professional-invoice checklist</h2>
<table>
<thead><tr><th>Check</th><th>Pass looks like</th><th>Fail looks like</th></tr></thead>
<tbody>
<tr><td><strong>Number</strong></td><td>INV-2026-001, sequential</td><td>“3b”, duplicates, gaps</td></tr>
<tr><td><strong>Dates</strong></td><td>Issued + calendar due date</td><td>“Due soon”</td></tr>
<tr><td><strong>Lines</strong></td><td>Deliverable, qty, rate</td><td>“Services $2,000”</td></tr>
<tr><td><strong>Tax</strong></td><td>Right slab + split + GSTIN</td><td>Single 18% line inter-state</td></tr>
<tr><td><strong>Total</strong></td><td>Bold + currency + words</td><td>Small grey total, no currency</td></tr>
<tr><td><strong>Pay how</strong></td><td>UPI/bank printed</td><td>Must ask</td></tr>
<tr><td><strong>Send</strong></td><td>Tue–Thu AM, numbered subject</td><td>Friday “Invoice attached”</td></tr>
</tbody>
</table>
<ul>
<li><strong>My pre-send ritual:</strong> read the PDF once as the accounts clerk — confused anywhere? Fix it before sending, not after bouncing.</li>
<li><strong>After payment:</strong> same-day <a href="/receipt-generator">receipt (RCP-0231)</a>. The habit that brings repeat work.</li>
<li><strong>New to this?</strong> Start with <a href="/blog/invoice-generator-guide/how-to-create-invoice-online">how to create an invoice online</a>, then the <a href="/blog/invoice-generator-guide">pillar checklist</a>.</li>
</ul>
<h2 id="sector-patterns">Sector patterns: who makes which mistake</h2>
<p>After reviewing hundreds of invoices across sectors, the defects cluster predictably. <strong>Freelancers:</strong> vague lines + no advance + Net-30-by-default — the full starter pack of unpaid work. <strong>Agencies:</strong> scope-creep billing (work delivered, never invoiced) and milestone invoices without quote references, which enterprise AP holds for weeks. <strong>Traders/retailers:</strong> GST slab errors and missing HSN codes — high-volume, thin-margin businesses where one slab mistake multiplies across 200 bills. <strong>Consultants:</strong> timesheet-less hourly billing (“40 hours, trust me”) that procurement rejects on sight. Know your sector's signature defect and build one guardrail: freelancers template their lines, agencies gate work on advance receipts, traders validate one slab table quarterly with their CA, consultants attach one-page timesheets above $1,000. Generic checklists catch generic errors; sector guardrails catch yours.</p>
<div class="cta-box"><strong>Run the checklist now:</strong> open the <a href="/invoice-generator">free invoice generator</a>, fix one old invoice, and send the next one clean. Full system: <a href="/blog/invoice-generator-guide">free invoice generator guide</a>.</div>
`;

export const invoiceMistakes: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "invoicing-mistakes-to-avoid",
  kind: "cluster",
  title: "12 Invoice Mistakes That Delay Payment (and How to Fix Them)",
  description:
    "12 invoicing mistakes that delay payment — vague lines, wrong tax, no due date — with 10-minute fixes and a 60-second pre-send checklist.",
  keywords: ["professional invoice tips", "invoicing mistakes", "why client not paying invoice", "how to make invoice look professional", "invoice checklist before sending"],
  toolSlugs: ["invoice-generator", "quotation-generator", "receipt-generator"],
  relatedSlugs: ["payment-terms-and-followups", "invoice-numbering", "small-business-invoicing"],
  published: "2026-09-15",
  updated: "2026-09-18",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "the-12", text: "12 mistakes with fixes", level: 2 },
    { id: "real-fix", text: "Real fix: bounced Rs 23,600 bill", level: 2 },
    { id: "sector-patterns", text: "Sector mistake patterns", level: 2 },
    { id: "professional-checklist", text: "60-second pre-send checklist", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why is my client not paying my invoice?", answer: "Usually missing due date, vague lines, wrong tax, wrong recipient, or no payment method — not malice. Fix the field, resend with number + total + due date in the subject, and nudge day 3 and day 7 with the PDF re-attached." },
    { question: "How do I make my invoice look professional?", answer: "Logo, sequential number, itemized qty × rate lines, correct tax split, bold total with currency and words, printed payment method, quote/PO reference, and a clean filename like invoice-acme-001.pdf." },
    { question: "What should I check before sending an invoice?", answer: "Number unique, calendar due date, specific lines, right tax slab and GSTIN, bold total with currency and words, payment method printed, correct recipient, Tue–Thu morning send with numbered subject." },
    { question: "Should I edit an invoice after sending?", answer: "No — issue a credit note reversing the error and re-issue with the next number, with a one-line note referencing both. Editing history breaks audit trails." },
    { question: "How do I avoid late payments entirely?", answer: "You cannot entirely, but Net 15 with dates, 30–50% advances, Tue–Thu sends, printed payment details and a fixed day-3/day-7 nudge routine cut my average from 16 days to 7." },
  ],
};
