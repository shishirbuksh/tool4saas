import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A credit note and a debit note both adjust an invoice that already exists. One reduces what the buyer owes; the other increases it. Problems start when they arrive as informal emails, when the original invoice is never referenced, or when tax is adjusted without a paper trail. This guide explains the direction, the wording and the arithmetic, with a return example and an extra-scope example.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. The figures are illustrative and this page is general information, not tax or legal advice.</p>

<h2 id="what-is-a-credit-note">What a credit note is</h2>
<p>A credit note is a document a seller issues to reduce the amount a buyer owes on a previous invoice. It fits a return, an overcharge, a cancelled order, a post-invoice discount, damaged goods, or a correction to quantity, price or tax. It must point back to the original invoice, state the reason, show the taxable value being reduced and split the tax adjustment the same way the original invoice split it. Number it in a separate series such as <strong>CN-2026-007</strong>.</p>
<p>Two boundaries matter. A credit note is not a refund receipt: it reduces the debt, while the refund is the movement of money, recorded separately. And it is not a new sale with a negative price; it is an adjustment to an existing supply. If the invoice was never sent, correct or void it before sending rather than issuing a note for a document the buyer never saw. Keep the note short and factual: the original invoice carries the full description, and the note only needs to explain what changed.</p>

<h2 id="what-is-a-debit-note">What a debit note is</h2>
<p>A debit note increases the amount owed on a prior invoice. It fits underbilling, work added after the invoice, a price revision agreed later, omitted freight or tax charged at the wrong rate. Like a credit note, it references the original invoice number and date, explains the reason and shows the added taxable value with its tax. Number it separately, for example <strong>DN-2026-004</strong>. Some businesses call this a supplementary invoice, but the label should match the local tax rules and your numbering policy rather than change from client to client.</p>
<p>The phrase has a second life in bookkeeping: a buyer may raise a debit note against a supplier for a purchase return. That is an internal accounts document, not the supplier's tax adjustment. Keep the direction clear in the description so the two meanings do not collide. The rest of this guide uses the supplier's meaning: a debit note that increases the customer's balance.</p>

<h2 id="key-differences">Credit note vs debit note: the key differences</h2>
<p>The simplest test is direction. Ask whether the amount on the original invoice should go down or up. Down means a credit note; up means a debit note.</p>
<table>
<thead><tr><th>Feature</th><th>Credit note</th><th>Debit note</th></tr></thead>
<tbody>
<tr><td><strong>Effect</strong></td><td>Reduces the amount owed</td><td>Increases the amount owed</td></tr>
<tr><td><strong>Typical trigger</strong></td><td>Return, overbilling, cancellation, later discount</td><td>Extra work, underbilling, price revision, short-charged tax</td></tr>
<tr><td><strong>Tax adjustment</strong></td><td>Reverses the proportionate tax</td><td>Adds the proportionate tax</td></tr>
<tr><td><strong>Numbering</strong></td><td>Separate CN series, e.g. CN-2026-007</td><td>Separate DN series, e.g. DN-2026-004</td></tr>
<tr><td><strong>Link to original</strong></td><td>Original invoice number and date are mandatory</td><td>Original invoice number and date are mandatory</td></tr>
<tr><td><strong>Books</strong></td><td>Reduces revenue and the receivable</td><td>Adds revenue and the receivable</td></tr>
<tr><td><strong>Common confusion</strong></td><td>Treated as a cash refund</td><td>Used for a brand-new order</td></tr>
</tbody>
</table>
<p>Both notes preserve history. Editing the original invoice after the buyer has received it hides the change and breaks the customer's PO match. A note keeps the original visible and adds a second, traceable entry that explains the movement.</p>

<h2 id="worked-examples">Two worked examples: a return and extra scope</h2>
<h3>Example 1 — credit note for two returned units</h3>
<p>INV-2026-031 bills 10 units at ₹6,000 with IGST at 18%. The taxable value is ₹60,000, IGST is ₹10,800 and the total is <strong>₹70,800</strong>. The buyer returns two units.</p>
<p>CN-2026-007 covers 2 × ₹6,000 = ₹12,000 taxable, IGST of ₹2,160 and a credit total of <strong>₹14,160</strong>. The outstanding balance becomes ₹70,800 − ₹14,160 = <strong>₹56,640</strong>. That also matches the eight units kept: 8 × ₹6,000 = ₹48,000 taxable, ₹8,640 tax and ₹56,640 total. Show the note as a negative line on the customer statement. If the customer already paid, decide whether the credit becomes a refund or an offset against the next invoice, and record which one you agreed.</p>
<h3>Example 2 — debit note for approved extra hours</h3>
<p>INV-2026-036 bills a three-month retainer at ₹15,000 per month: ₹45,000 taxable, IGST of ₹8,100 and a total of <strong>₹53,100</strong>. After delivery, the client approves 10 extra hours at ₹1,600, which is ₹16,000, with IGST of ₹2,880. DN-2026-004 totals <strong>₹18,880</strong>.</p>
<p>The revised taxable value is ₹45,000 + ₹16,000 = ₹61,000, tax is ₹8,100 + ₹2,880 = ₹10,980, and the revised total is <strong>₹71,980</strong>. That matches ₹53,100 + ₹18,880. Reference both documents in the covering email and state the new balance. Do not edit the original invoice to hide the added work; the note is the record that the scope changed after billing.</p>

<h2 id="tax-and-recordkeeping">Tax and recordkeeping rules that keep the notes credible</h2>
<ul>
<li><strong>Mirror the original tax split.</strong> If the invoice used IGST, the note uses IGST. If it split CGST and SGST, the note repeats that split. A different tax type on the adjustment invites a query.</li>
<li><strong>Show the reason in words.</strong> “Return of 2 units, INV-2026-031” is auditable. A bare negative amount is not.</li>
<li><strong>Keep separate sequences.</strong> Never reuse an invoice number for a note. A clean CN or DN series makes reconciliation and audits much easier; the <a href="/blog/invoice-generator-guide/invoice-numbering">invoice numbering guide</a> covers the format rules.</li>
<li><strong>Respect timing rules.</strong> Credit notes usually reduce output tax in the period they are issued, subject to local conditions and time limits; debit notes add tax. Those rules differ by jurisdiction and change, so confirm the treatment before filing.</li>
<li><strong>Reconcile monthly.</strong> Opening balance, invoices, credit notes, debit notes, payments and closing balance should tell one story. A note that exists in email but not in the ledger is a future dispute.</li>
</ul>
<p>Under GST, a credit note generally needs the original invoice reference, the reason and the tax adjustment, and the recipient's input tax credit may need a corresponding reversal. The exact conditions and deadlines are jurisdiction-specific. Use the <a href="/blog/invoice-generator-guide/gst-invoice-format-india">GST invoice format guide</a> for field placement, and ask your accountant about disclosure and timing. This page is general information, not tax or legal advice.</p>

<h2 id="mistakes-to-avoid">Five mistakes that make adjustments worse</h2>
<ol>
<li><strong>Issuing a note with no original reference.</strong> The buyer cannot match it to a PO, and the ledger shows an unexplained credit or charge.</li>
<li><strong>Calling a refund a credit note.</strong> The note reduces the debt; the refund moves cash. Record both, with dates and the payment method.</li>
<li><strong>Using a debit note for a new order.</strong> New work needs a new invoice. A debit note is for a change to an existing supply, not a substitute invoice series.</li>
<li><strong>Leaving out the tax breakdown.</strong> A single “adjustment” line hides whether tax was reversed or added, which is exactly what accounts and auditors need to see.</li>
<li><strong>Deleting or overwriting the original.</strong> Keep the original invoice unchanged and let the note carry the correction. If the invoice was never sent, void it instead of inventing a paper trail.</li>
</ol>
<div class="cta-box"><strong>Keep the trail clean:</strong> open the <a href="/invoice-generator">free invoice generator</a> to create the original invoice, then issue the credit or debit note with the same tax split and a clear reference. Store both PDFs under the customer name and invoice number.</div>
`;

export const invoiceCreditNote: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "credit-note-vs-debit-note",
  kind: "cluster",
  title: "Credit Note vs Debit Note: When to Use Each",
  description:
    "Credit note vs debit note: what each adjusts, when to issue one, GST wording, numbering and two worked examples with the original invoice math.",
  keywords: ["credit note vs debit note", "credit note format", "debit note meaning", "when to issue credit note", "credit note under gst"],
  toolSlugs: ["invoice-generator"],
  relatedSlugs: ["invoice-numbering", "gst-invoice-format-india", "invoice-template-formats"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-is-a-credit-note", text: "What a credit note is", level: 2 },
    { id: "what-is-a-debit-note", text: "What a debit note is", level: 2 },
    { id: "key-differences", text: "Credit note vs debit note", level: 2 },
    { id: "worked-examples", text: "Two worked examples", level: 2 },
    { id: "tax-and-recordkeeping", text: "Tax and recordkeeping", level: 2 },
    { id: "mistakes-to-avoid", text: "Five mistakes to avoid", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the difference between a credit note and a debit note?", answer: "A credit note reduces the balance on an earlier invoice, usually after a return, overcharge or cancellation. A debit note increases that balance for extra work, underbilling or a later price change. Both reference the original invoice and adjust its tax proportionately. The direction of the adjustment is the whole distinction." },
    { question: "When should I issue a credit note instead of a refund?", answer: "Issue the credit note when the debt itself needs to go down, for example two returned units on a ₹70,800 invoice. The note reduces the receivable to ₹56,640. A refund is the separate movement of cash if the customer already paid. Record the note and the refund as two events so the ledger shows both the reduced sale and the payment." },
    { question: "Can a debit note be used for a new order?", answer: "No. A new order needs a new invoice with its own number and a fresh description of the supply. A debit note adjusts an existing invoice, such as ₹16,000 of extra hours added to a ₹45,000 retainer. Using a debit note as a substitute invoice confuses the series and can break the customer's PO match." },
    { question: "Does a credit note need to reference the original invoice?", answer: "Yes. Include the original invoice number, its date, the reason for the adjustment, the taxable value being reduced and the tax split. Without that link, the buyer's accounts team cannot match the note to the purchase, and the tax adjustment looks unexplained. The note should stand on its own as an audit trail." },
    { question: "How is tax handled on credit and debit notes?", answer: "Mirror the original invoice. If it charged IGST at 18%, the note adjusts IGST at 18% on the returned or added value. If it split CGST and SGST, repeat that split. Credit notes usually reduce output tax and debit notes add it, subject to local timing conditions. Confirm the filing treatment with your accountant." },
    { question: "What numbering should credit and debit notes use?", answer: "Use separate sequences such as CN-2026-007 and DN-2026-004, never the invoice series. Keep the numbers sequential and log each note against the original invoice. Separate series make reconciliation readable and prevent a note from being mistaken for a duplicate bill. Never reuse or backfill numbers." },
  ],
};
