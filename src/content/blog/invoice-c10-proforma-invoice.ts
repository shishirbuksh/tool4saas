import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A proforma invoice can move a project forward, but it cannot do the job of a tax invoice. Buyers use it to open a purchase order, arrange an advance or clear an import; sellers use it to confirm price and scope before supply. Confusing the two creates expensive paperwork: money collected against a document that was never a tax invoice, or tax charged on a proforma that never became a bill. This guide separates the documents, shows the conversion arithmetic and lists the fields that prevent rework.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. The examples use rupees and dollars; the rules here are general information, not tax or legal advice.</p>

<h2 id="what-is-a-proforma-invoice">What a proforma invoice is (and is not)</h2>
<p>A proforma invoice is a preliminary commercial document. It states what you intend to supply, at what price, on what terms and by when. It usually arrives after a quote is accepted but before goods ship or services are delivered. It can look almost identical to a tax invoice — same logo, line items, discount and shipping estimate — yet its legal job is different. It is not a demand for tax, it is not a statutory tax document, and it normally does not create a bookable sale.</p>
<p>Typical uses include requesting an advance, helping a buyer raise a purchase order, supporting an import licence or customs declaration, freezing a price for a stated period, and confirming a milestone before work starts. The label matters. Print <strong>PROFORMA INVOICE</strong> at the top, give it a separate sequence such as <strong>PI-2026-018</strong>, and add “not a tax invoice” where local rules or the buyer require it. A customer who needs to reclaim VAT or GST needs the tax invoice that follows, not the proforma.</p>

<h2 id="proforma-vs-tax-invoice">Proforma invoice vs tax invoice: the differences that matter</h2>
<p>Both documents can carry the same line items. The difference is what each one is allowed to do when money and tax are recorded.</p>
<table>
<thead><tr><th>Feature</th><th>Proforma invoice</th><th>Tax invoice</th></tr></thead>
<tbody>
<tr><td><strong>Purpose</strong></td><td>Confirms terms, supports a PO or requests an advance</td><td>Demands payment for a taxable supply</td></tr>
<tr><td><strong>Legal status</strong></td><td>Commercial document, not a statutory tax invoice</td><td>Statutory document that supports tax recovery and books</td></tr>
<tr><td><strong>Tax</strong></td><td>Estimates tax or omits it; no tax is charged by the document itself</td><td>Charges tax at the applicable rate with a clear breakdown</td></tr>
<tr><td><strong>Numbering</strong></td><td>Separate PI series, e.g. PI-2026-018</td><td>Invoice series, e.g. INV-2026-042</td></tr>
<tr><td><strong>Accounting</strong></td><td>No sales revenue or receivable in the usual sense</td><td>Recorded as a sale and a receivable</td></tr>
<tr><td><strong>Timing</strong></td><td>Before supply</td><td>On or after supply, within the time limit that applies</td></tr>
<tr><td><strong>What follows</strong></td><td>Converted to a tax invoice, often with a reference</td><td>Stands as the billing document; later changes use a credit or debit note</td></tr>
</tbody>
</table>
<p>The dividing line is timing and tax. A proforma says “this is what we agreed”; a tax invoice says “this is what you now owe, and this is the tax.” Once the supply happens, the proforma has done its job. Reusing it as the final bill is the mistake that causes most disputes.</p>

<h2 id="when-to-use-a-proforma">When to use a proforma (and when not to)</h2>
<ul>
<li><strong>Before an advance:</strong> send a proforma with the deposit amount, tax estimate and balance formula. The customer's finance team can pay against it while your tax invoice waits for the tax point.</li>
<li><strong>When the buyer needs a PO:</strong> enterprise procurement often cannot raise a purchase order from a quote alone. A proforma with a validity date and payment terms clears that step.</li>
<li><strong>For imports and customs:</strong> authorities may ask for a proforma showing value, origin, freight and terms. Keep it consistent with the commercial invoice that follows.</li>
<li><strong>To lock pricing:</strong> state “valid 30 days” and the currency. Without both, a slow signature can reopen a price you thought was closed.</li>
<li><strong>For milestone approval:</strong> a proforma can confirm the next payment slice without pretending the work is complete.</li>
</ul>
<p>Do not use a proforma after delivery has happened and the customer needs to recover tax. Do not print “tax invoice” on it to satisfy a buyer's portal. And do not assume an advance is tax-free: in India, tax on advances for goods can arise when the advance is received, and service timelines differ; EU and UK rules have their own tax points. Confirm the treatment with your accountant before you collect.</p>

<h2 id="worked-examples">Two worked examples: advance and price validity</h2>
<h3>Example 1 — ₹80,000 project with a 50% advance</h3>
<p>PI-2026-018 shows a design sprint at ₹80,000, a 50% advance of ₹40,000 and IGST at 18% on the advance, ₹7,200. The proforma total is <strong>₹47,200</strong>. The customer pays that amount and work begins.</p>
<p>After delivery, INV-2026-042 bills the full taxable value of ₹80,000 with IGST of ₹14,400, for a total of ₹94,400. It then deducts the advance already received, ₹47,200, leaving <strong>₹47,200</strong> due. If the supply is intra-state, replace IGST with CGST of ₹3,600 and SGST of ₹3,600; the total stays the same. If you issued a tax invoice for the advance, reference that invoice number on the final bill so the customer's accounts team can match both entries without paying twice.</p>
<h3>Example 2 — a proforma that expires before signature</h3>
<p>PI-2026-019 quotes 120 hours at $45, a 5% early-commitment discount and 10% local tax for illustration. The arithmetic: 120 × $45 = $5,400; 5% of $5,400 = $270; net $5,130; tax $513; total <strong>$5,643</strong>. The proforma says “valid 30 days.”</p>
<p>The client signs on day 41. The supplier reissues at $48 per hour: 120 × $48 = $5,760; the same 5% discount is $288; net $5,472; tax at 10% is $547.20; total <strong>$6,019.20</strong>. The difference from the original is <strong>$376.20</strong>. The validity date did not prevent the increase, but it made the conversation honest: the old price expired, the new one was documented, and the buyer could compare both numbers. If you intend to honour the old price, say so in writing before the proforma lapses.</p>

<h2 id="mistakes-that-cost-money">Six mistakes that turn a proforma into a problem</h2>
<ol>
<li><strong>Using it as the tax invoice.</strong> The customer cannot recover tax, your books miss the sale, and the correction needs a proper invoice or credit note.</li>
<li><strong>Charging tax without a tax invoice.</strong> A line labelled “GST 18%” on a proforma is an estimate, not a tax charge. Issue the statutory document when the tax point arrives.</li>
<li><strong>Mixing numbering series.</strong> Keep PI and INV sequences separate. Reusing invoice numbers on proformas creates duplicates that are painful to unwind; see the <a href="/blog/invoice-generator-guide/invoice-numbering">invoice numbering guide</a>.</li>
<li><strong>Letting details drift.</strong> If the final invoice changes quantity, price or tax rate, the buyer's PO match fails. Note the reason for every change and reference the proforma.</li>
<li><strong>Omitting validity, currency or delivery terms.</strong> Cross-border proformas need an ISO currency code and the agreed Incoterm or service scope. “$5,000” is not a currency.</li>
<li><strong>Forgetting the advance.</strong> A final invoice that does not deduct the deposit gets short-paid or rejected. Show the advance as a negative line and attach the earlier document number.</li>
</ol>
<p>Tax treatment of advances, exports and reverse-charge supplies varies by country and changes over time. This page is general information, not tax or legal advice; confirm the tax point and invoice wording with a qualified adviser. For field-level GST rules, read the <a href="/blog/invoice-generator-guide/gst-invoice-format-india">GST invoice format guide</a>.</p>

<h2 id="proforma-checklist">Proforma invoice checklist before you send</h2>
<ul>
<li>Label reads “Proforma Invoice”, not “Tax Invoice”, and the number starts with PI.</li>
<li>Both parties' legal names, addresses and tax IDs are correct; the buyer's PO or contact is named.</li>
<li>Line items show quantity, unit, rate and a specific description, not “services”.</li>
<li>Currency is an ISO code; tax is labelled as an estimate or omitted with a note.</li>
<li>Validity date, payment terms, advance amount and balance formula are visible.</li>
<li>The document states what happens next: “A tax invoice will be issued on delivery.”</li>
</ul>
<div class="cta-box"><strong>Build both documents:</strong> open the <a href="/invoice-generator">free invoice generator</a> to draft the proforma, then convert it to a numbered tax invoice with the advance deducted. Keep the PI and INV files together so the customer's accounts team can match them.</div>
`;

export const invoiceProforma: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "proforma-vs-tax-invoice",
  kind: "cluster",
  title: "Proforma Invoice vs Tax Invoice: Key Differences",
  description:
    "Proforma invoice vs tax invoice explained: purpose, tax status, numbering and accounting, with two worked examples and a conversion checklist.",
  keywords: ["proforma invoice vs tax invoice", "proforma invoice meaning", "proforma invoice format", "when to issue proforma invoice", "convert proforma to tax invoice"],
  toolSlugs: ["invoice-generator"],
  relatedSlugs: ["gst-invoice-format-india", "invoice-numbering", "payment-terms-and-followups"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-is-a-proforma-invoice", text: "What a proforma invoice is", level: 2 },
    { id: "proforma-vs-tax-invoice", text: "Proforma vs tax invoice", level: 2 },
    { id: "when-to-use-a-proforma", text: "When to use a proforma", level: 2 },
    { id: "worked-examples", text: "Two worked examples", level: 2 },
    { id: "mistakes-that-cost-money", text: "Six mistakes to avoid", level: 2 },
    { id: "proforma-checklist", text: "Pre-send checklist", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is a proforma invoice a demand for payment?", answer: "No. A proforma invoice is a preliminary commercial document that confirms price, scope and terms before supply. It can support an advance request or a purchase order, but it is not a statutory tax invoice and not a demand for tax. The tax invoice issued at the tax point is the document that supports payment and tax recovery." },
    { question: "When does a proforma become a tax invoice?", answer: "It does not convert by renaming the file. You issue a new tax invoice with its own INV number when the supply or tax point occurs, then reference the proforma and deduct any advance already paid. In the example, a ₹80,000 project with a ₹40,000 advance becomes a ₹94,400 invoice with ₹47,200 still due after the deposit." },
    { question: "Can I charge GST on a proforma invoice?", answer: "A proforma can show an estimated tax amount so the buyer can budget, but the document itself does not charge tax. The actual charge belongs on the tax invoice with the correct rate and CGST/SGST or IGST split. Advances can create a tax point in some jurisdictions, so confirm timing with your accountant before collecting." },
    { question: "Should proforma and tax invoices use the same number series?", answer: "Keep them separate. Use PI-2026-018 for proformas and INV-2026-042 for tax invoices, then cross-reference them in the notes. Separate series prevent duplicates, make the audit trail readable and stop a buyer's accounts software from treating a preliminary document as a second bill." },
    { question: "What should a proforma invoice include for an overseas buyer?", answer: "Add an ISO currency code such as USD or EUR, the agreed Incoterm and named place for goods, the service scope and place of supply for services, a validity date and the payment route. State clearly that it is a proforma and that a tax invoice will follow. Without those fields, the buyer cannot raise a PO or arrange the transfer." },
    { question: "How do I handle an advance on the final invoice?", answer: "Show the full taxable value and tax first, then a negative line for the advance received, with the earlier invoice or receipt number. In the ₹80,000 example, the final total is ₹94,400 and the ₹47,200 deposit leaves ₹47,200 due. That layout lets the customer's accounts team match the payment without treating it as a duplicate." },
  ],
};
