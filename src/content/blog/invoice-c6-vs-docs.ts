import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Quote, invoice, receipt, purchase order — mix these up and accounts teams bounce your paperwork. I once sent a <strong>proforma invoice</strong> instead of a <strong>quotation</strong> and the client treated it as a bill. Awkward calls followed. This guide draws the lines clearly: what each document is, when to use it, and which free tool makes it — so the <strong>difference between invoice and bill</strong> never costs you a week again.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. Tools: <a href="/invoice-generator">invoice generator</a> · <a href="/quotation-generator">quotation generator</a> · <a href="/receipt-generator">receipt generator</a> · <a href="/purchase-order-generator">purchase order generator</a>.</p>

<h2 id="four-docs">The 4 documents side by side</h2>
<table>
<thead><tr><th>Document</th><th>Purpose</th><th>When to send</th><th>Asks for money?</th></tr></thead>
<tbody>
<tr><td><strong>Quotation / Quote</strong> (QUO-2026-014)</td><td>Offer a price before work</td><td>After discovery, before advance</td><td>No — proposes</td></tr>
<tr><td><strong>Purchase order</strong> (PO-1042)</td><td>Buyer orders the work</td><td>Buyer → seller, accepting the quote</td><td>No — authorizes</td></tr>
<tr><td><strong>Invoice / Bill</strong> (INV-2026-001)</td><td>Request payment after work</td><td>On delivery / milestone</td><td><strong>Yes</strong></td></tr>
<tr><td><strong>Receipt</strong> (RCP-0231)</td><td>Confirm payment received</td><td>Same day as payment</td><td>No — confirms</td></tr>
</tbody>
</table>
<ul>
<li><strong>Invoice vs bill:</strong> same thing to most clients — I bill ₹23,600 as INV-2026-001 and my Mumbai client still calls it “the bill” on WhatsApp. Use “invoice” on paper: numbered, tax-ready, with UPI or Stripe printed.</li>
<li><strong>Invoice vs quotation:</strong> quote comes first (price offer, validity 15 days), invoice later (payment request referencing QUO-2026-014).</li>
<li><strong>Invoice vs receipt:</strong> invoice asks, receipt proves. Never send a second invoice after payment — send RCP-0231.</li>
<li><strong>Invoice vs purchase order:</strong> PO is the buyer telling you “go ahead”; invoice is you telling them “pay now”. Reference the PO number on your invoice.</li>
<li><strong>Proforma invoice:</strong> quote-like advance request. Looks like an invoice but is not a tax invoice — label it clearly.</li>
</ul>

<h2 id="flow">The correct order (quote-to-cash in 5 moves)</h2>
<ol>
<li><strong>Quote:</strong> <a href="/quotation-generator">QUO-2026-014</a> with scope, ₹23,600, 15-day validity, 50% advance.</li>
<li><strong>PO (enterprise):</strong> buyer returns <a href="/purchase-order-generator">PO-1042</a>. File it.</li>
<li><strong>Advance invoice:</strong> 50% of quote, Net 7. Start on receipt.</li>
<li><strong>Final invoice:</strong> <a href="/invoice-generator">INV-2026-001</a> referencing quote + PO + advance paid, balance Net 15.</li>
<li><strong>Receipt:</strong> <a href="/receipt-generator">RCP-0231</a> same day as money arrives.</li>
</ol>
<h3>What goes on each (field cheat-sheet)</h3>
<ul>
<li><strong>Quote:</strong> scope, price, validity, advance %, no tax demand yet (estimate OK).</li>
<li><strong>PO:</strong> supplier, ship-to, lines, tax, approvals.</li>
<li><strong>Invoice:</strong> everything in the <a href="/blog/invoice-generator-guide">pillar 12-point checklist</a> — number, dates, lines, tax split, bold total, terms.</li>
<li><strong>Receipt:</strong> seller, buyer, RCP number, date, method (UPI/bank), amount, invoice reference.</li>
</ul>

<h2 id="edge-cases">Proforma, credit notes and recurring bills: the edge cases</h2>
<p>Three documents confuse even experienced founders. Quick clarity: a <strong>proforma invoice</strong> is a polite advance request — “please pay 50% so we start” — and is <strong>not</strong> a tax invoice. Label it “PROFORMA — not a tax invoice” or accounts may book it wrong. I learned this when a client paid against my proforma and then asked “where is the GST invoice?” — two documents, one payment, messy reconciliation.</p>
<ul>
<li><strong>Credit note (CN-001):</strong> reverses part or all of an issued invoice. “CN-001 reverses INV-2026-001 line 3 (duplicate design hours, ₹8,000)”. Never edit a sent invoice — credit-note it.</li>
<li><strong>Recurring invoice:</strong> same retainer monthly (₹15,000 SEO, Sept 2026). Keep numbers sequential (INV-2026-008, 009, 010) and reference the retainer agreement each time.</li>
<li><strong>Timesheet attachment:</strong> hourly bills above $1,000 deserve a one-page timesheet with dates + hours. “22 hrs × $60, Sprint 14 (Sept 1–12)” attached to INV-2026-001 kills disputes before they start.</li>
</ul>
<p>Numbering discipline for all of these lives in <a href="/blog/invoice-generator-guide/invoice-numbering">invoice numbering guide</a>; tax treatment in <a href="/blog/invoice-generator-guide/gst-invoice-format-india">GST format India</a>. This is format guidance — confirm credit-note GST treatment with your CA.</p>

<h2 id="mistakes">3 mix-ups that delay payment</h2>
<ol>
<li><strong>Invoicing from a quote number.</strong> QUO-2026-014 is not payable. Convert to INV-2026-001 first — numbering rules in <a href="/blog/invoice-generator-guide/invoice-numbering">invoice numbering guide</a>.</li>
<li><strong>Sending an invoice instead of a receipt after payment.</strong> Accounts sees a duplicate demand and freezes. Send RCP-0231. Wording for the handover lives in <a href="/blog/invoice-generator-guide/payment-terms-and-followups">payment terms and reminders</a>.</li>
<li><strong>Skipping the PO reference.</strong> Enterprise AP filters by PO. No PO on invoice = auto-hold. Ask “who handles vendor payments and what PO do I quote?” on day one. Template picks in <a href="/blog/invoice-generator-guide/invoice-template-formats">invoice template guide</a>; build steps in <a href="/blog/invoice-generator-guide/how-to-create-invoice-online">how to create an invoice online</a>.</li>
</ol>
<h2 id="who-issues">Who issues what: the responsibility map</h2>
<p>Mix-ups happen because nobody taught the paperwork chain. Memorize this: the <strong>seller quotes</strong> (quotation, QUO-2026-014) → the <strong>buyer orders</strong> (purchase order, PO-1042) → the <strong>seller bills</strong> (invoice, INV-2026-001) → the <strong>seller confirms</strong> (receipt, RCP-0231). Buyer-initiated documents (PO, payment) versus seller-initiated (quote, invoice, receipt) — if you are the seller, you should never be waiting to “receive” an invoice; you send it. Freelancers: clients who say “send me the bill” mean invoice; clients who say “give me a quote first” mean quotation — same word “bill” in casual speech causes half the confusion in Indian small business. When a client sends YOU a document numbered like an invoice asking for payment, that is their purchase order wearing the wrong label — clarify before supplying.</p>
<div class="cta-box"><strong>Make the right doc now:</strong> quote with the <a href="/quotation-generator">quotation generator</a>, bill with the <a href="/invoice-generator">free invoice generator</a>, prove with the <a href="/receipt-generator">receipt generator</a>. Full system: <a href="/blog/invoice-generator-guide">pillar guide</a>.</div>
`;

export const invoiceVsDocs: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "invoice-vs-quotation-vs-receipt",
  kind: "cluster",
  title: "Invoice vs Quotation vs Receipt vs Purchase Order: Key Differences",
  description:
    "Invoice vs quotation vs receipt vs purchase order explained with a comparison table and quote-to-cash flow. Know when to send each + free tools.",
  keywords: ["invoice vs quotation vs receipt", "difference between invoice and bill", "what is purchase order vs invoice", "when to use quotation vs proforma invoice"],
  toolSlugs: ["invoice-generator", "quotation-generator", "receipt-generator", "purchase-order-generator"],
  relatedSlugs: ["invoice-template-formats", "small-business-invoicing", "invoicing-mistakes-to-avoid"],
  published: "2026-09-13",
  updated: "2026-09-18",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "four-docs", text: "4 documents side by side", level: 2 },
    { id: "flow", text: "Correct order: quote-to-cash", level: 2 },
    { id: "edge-cases", text: "Proforma, credit notes, recurring", level: 2 },
    { id: "who-issues", text: "Who issues what", level: 2 },
    { id: "mistakes", text: "3 mix-ups that delay payment", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the difference between an invoice and a bill?", answer: "Mostly wording. A bill is casual; an invoice is the numbered tax-ready request with lines, tax, total and terms. Use invoice numbers (INV-2026-001) for anything business." },
    { question: "When do I send a quotation vs an invoice?", answer: "Quotation first to propose price (QUO-2026-014, valid 15 days), invoice later to request payment referencing the quote. Never treat a quote as payable." },
    { question: "What is a purchase order vs an invoice?", answer: "A purchase order is the buyer authorizing the work (PO-1042); the invoice is the seller requesting payment. Reference the PO on your invoice so enterprise accounts clears it." },
    { question: "Do I send an invoice or receipt after payment?", answer: "Receipt (RCP-0231) — it confirms money received. A second invoice looks like a duplicate demand and can freeze accounts. Reference the paid invoice number on the receipt." },
    { question: "What is a proforma invoice?", answer: "A quote-like advance request before work, often for 50% upfront. Label it proforma clearly — it is not a tax invoice. Convert to a real tax invoice on delivery." },
  ],
};
