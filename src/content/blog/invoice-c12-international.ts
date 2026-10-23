import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>An international invoice has to satisfy three systems at once: the client's accounts payable team, your bank, and the tax authority on one or both sides of the border. A domestic invoice missing a currency code can still get paid. A cross-border invoice usually cannot. This guide covers the fields that change, the wording that prevents short payments, and two worked examples.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. Tax rules vary by country and by the nature of the supply; treat this as general information, not tax or legal advice.</p>

<h2 id="currency-and-exchange">Currency and exchange: say exactly what you expect</h2>
<p>State the invoice currency as an ISO code: USD, EUR, GBP, AED or INR. Write <strong>USD 4,800</strong>, not $4,800, because several currencies use a dollar sign and the buyer's accounts software may guess wrong. Use one currency for every line, the subtotal, the tax and the total. If you quote in one currency and expect settlement in another, put that in the contract and repeat it on the invoice.</p>
<p>A currency clause prevents a silent discount. The invoice can be paid in full and still leave a gap if the client's bank deducts a fee or converts at a weaker rate. Decide in advance who absorbs that difference. A simple clause: “Payment must be made in USD. All bank charges and correspondent fees are for the client's account. Any shortfall remains due.” Whether such a clause is enforceable depends on your contract and local law, so keep it consistent with what the client signed.</p>
<ul>
<li><strong>Invoice currency:</strong> the currency of the prices and tax on the document.</li>
<li><strong>Settlement currency:</strong> the currency that actually arrives in your account. If it differs, name the conversion rate or the source of the rate.</li>
<li><strong>Validity:</strong> exchange rates move. A 7-day or 30-day validity on the quote protects the price without hiding the risk.</li>
<li><strong>Rounding:</strong> show two decimals on unit prices and totals. Round only the final figure, and state the rounding convention if the client asks.</li>
</ul>
<p>The invoice generator lets you set the currency on the document, but the commercial terms around conversion still belong in your contract or invoice notes.</p>

<h2 id="tax-treatment">Tax treatment: name the basis, not just “0%”</h2>
<p>Cross-border tax starts with two questions: what is supplied, and where is it taxed? For services, the place of supply often follows the customer's location in business-to-business deals, which can push VAT or GST to the buyer through the reverse charge. For goods, export rules, Incoterms and import VAT all matter. Never print “0% tax” without a reason; state the legal basis in one short sentence.</p>
<table>
<thead><tr><th>Situation</th><th>Typical treatment</th><th>Wording to consider</th></tr></thead>
<tbody>
<tr><td><strong>B2B services to an EU VAT-registered client</strong></td><td>Place of supply is the customer's country; reverse charge applies</td><td>“VAT to be accounted for by the recipient. Customer VAT no. …”</td></tr>
<tr><td><strong>Indian export of services under LUT</strong></td><td>Zero-rated, with no IGST charged when the conditions are met</td><td>“Export of services under LUT. IGST not charged.”</td></tr>
<tr><td><strong>US client, no sales-tax nexus</strong></td><td>No US sales tax collected</td><td>“No US sales tax collected.”</td></tr>
<tr><td><strong>UK B2B services where the customer belongs abroad</strong></td><td>Outside the scope of UK VAT; reverse charge may apply</td><td>“Outside the scope of UK VAT. Reverse charge applies.”</td></tr>
<tr><td><strong>Goods sold DDP to an overseas buyer</strong></td><td>Seller arranges carriage and import clearance; import VAT or duty may be included</td><td>“DDP [named place]. Import VAT and duty included where stated.”</td></tr>
</tbody>
</table>
<p>Indian exporters should keep the LUT reference and shipping or service evidence with the invoice. EU suppliers should validate the customer's VAT number before using reverse-charge wording. US sellers need to know whether they have nexus in the buyer's state, because a foreign client does not automatically mean “no US tax”. Withholding tax is a separate layer: some countries require the buyer to deduct tax at source, so agree whether your fee is gross or net and whether a gross-up clause applies.</p>

<h2 id="incoterms-and-place-of-supply">Incoterms and place of supply: different tools for goods and services</h2>
<p>Incoterms describe goods, not services. Name the term and the place: <strong>DAP Rotterdam</strong>, <strong>FOB Nhava Sheva</strong> or <strong>DDP Berlin</strong>. The term decides who pays freight, insurance and import duty, and where risk passes. DAP leaves import clearance and duty to the buyer; DDP puts them on the seller. That difference can be larger than your margin, so never leave the term implied.</p>
<p>Service invoices do not use Incoterms. Use place of supply and a reverse-charge statement instead. Putting FOB on a consulting invoice signals that the document was copied from a goods template, and the buyer's tax team will query it. For a mixed contract, split the goods and services into separate lines with the right treatment for each, or issue separate invoices.</p>
<p>Check the named place against the buyer's address. “DAP France” is not precise enough for a carrier or a customs broker; “DAP 75008 Paris” is. If the buyer arranges collection, say so and use the correct term rather than inventing a hybrid.</p>

<h2 id="payment-details">Payment details and terms that survive the journey</h2>
<ul>
<li><strong>Legal name and address</strong> exactly as held on the bank account. A trading name that differs from the account name can trigger a compliance hold.</li>
<li><strong>Account number or IBAN, SWIFT/BIC and currency.</strong> Add the intermediary bank when your bank requires one.</li>
<li><strong>Payment reference:</strong> the invoice number, so the remittance advice matches the bill.</li>
<li><strong>Fee clause:</strong> state whether the client pays correspondent charges. “SHA” usually splits them; “OUR” puts them on the sender. Spell out the commercial intent rather than relying on the code alone.</li>
<li><strong>Verification:</strong> confirm any change of bank details by phone using a number you already know. Email interception and fake supplier invoices are common.</li>
<li><strong>Terms:</strong> Net 15 or Net 30 with a calendar due date, and a late-payment clause that fits the contract.</li>
</ul>
<p>Put the bank block in text on the PDF, not only in the email body. If the client forwards the PDF internally, the payment details travel with it. Keep the invoice and the remittance advice together; they are the evidence you will need if a transfer is traced or reversed. The <a href="/blog/invoice-generator-guide/payment-terms-and-followups">payment terms and follow-up guide</a> covers reminder timing and wording.</p>

<h2 id="worked-examples">Two worked examples: a short payment and a VAT mistake</h2>
<h3>Example 1 — a $35 fee becomes a real shortfall</h3>
<p>INV-2026-058 bills 20 days at $240, for a total of <strong>USD 4,800</strong>, with no tax under the applicable export treatment. The client's bank deducts a $35 correspondent fee and remits <strong>USD 4,765</strong>. Your bank converts at 83.10, producing ₹395,971.50. Had the full USD 4,800 arrived at the same rate, the credit would have been ₹398,880.</p>
<p>The gap is ₹2,908.50, which is exactly $35 × 83.10. The invoice was “paid” but not settled. If the terms say bank charges are for the client's account, issue a small debit note or ask for the difference; if they do not, you have just absorbed the fee. Reconcile the received amount against the invoice total before marking it paid, not after month-end.</p>
<h3>Example 2 — reverse charge versus an accidental VAT line</h3>
<p>INV-2026-059 bills €9,500 of consulting to a VAT-registered EU business under the reverse charge. VAT is 0% with the note “VAT to be accounted for by the recipient”, so the total is <strong>€9,500</strong>. If the invoice wrongly adds 20% VAT, the VAT line is €1,900 and the total becomes €11,400.</p>
<p>The client's accounts payable team self-accounts the VAT and may pay only the net €9,500, leaving €1,900 open. Or it may reject the invoice outright because the VAT treatment contradicts the purchase order. The fix is a credit note for €1,900 referencing the original invoice, followed by a corrected invoice at €9,500. That is more work than getting the wording right the first time.</p>

<h2 id="pre-send-checklist">International invoice checklist before you send</h2>
<p>A reusable international invoice template should carry every field below. Leaving one to a covering email is how short payments and tax queries start.</p>
<ul>
<li>Currency appears as an ISO code on every amount and matches the contract.</li>
<li>Tax basis is stated: reverse charge, zero-rated export, outside scope or no nexus, with the customer's tax ID where relevant.</li>
<li>Goods invoices name the Incoterm and the precise place; service invoices state the place of supply.</li>
<li>Bank details include the account name, IBAN or account number, SWIFT/BIC, currency and payment reference.</li>
<li>Bank charges and any conversion shortfall are addressed in the terms.</li>
<li>Due date is a calendar date, and the late-payment clause matches the contract.</li>
<li>The PDF uses the same language as the contract, or includes a translated summary.</li>
<li>File name follows a predictable pattern such as invoice-acme-058.pdf, and the invoice number is on every page.</li>
</ul>
<div class="cta-box"><strong>Draft the next one:</strong> open the <a href="/invoice-generator">free invoice generator</a>, set the currency and tax notes, add the bank block and print a clean PDF. For layout choices and field placement, see the <a href="/blog/invoice-generator-guide/invoice-template-formats">invoice template formats guide</a>.</div>
`;

export const invoiceInternational: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "international-client-invoicing",
  kind: "cluster",
  title: "Invoice International Clients: Currency, Tax & Terms",
  description:
    "Invoice international clients with confidence: currency and FX clauses, VAT/GST reverse charge, Incoterms, bank details and two worked examples.",
  keywords: ["international invoice template", "invoice international clients", "export invoice format", "foreign currency invoice", "reverse charge invoice wording"],
  toolSlugs: ["invoice-generator"],
  relatedSlugs: ["invoice-template-formats", "gst-invoice-format-india", "payment-terms-and-followups"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "currency-and-exchange", text: "Currency and exchange", level: 2 },
    { id: "tax-treatment", text: "Tax treatment across borders", level: 2 },
    { id: "incoterms-and-place-of-supply", text: "Incoterms and place of supply", level: 2 },
    { id: "payment-details", text: "Payment details and terms", level: 2 },
    { id: "worked-examples", text: "Two worked examples", level: 2 },
    { id: "pre-send-checklist", text: "Pre-send checklist", level: 2 },
  ],
  html,
  faqs: [
    { question: "What should an international invoice include?", answer: "Include both parties' legal names and addresses, an invoice number and date, ISO currency codes, a specific description of the goods or services, unit prices and totals, the tax basis and any customer tax ID, the Incoterm and named place for goods or the place of supply for services, bank details, payment terms and a due date." },
    { question: "Should I invoice in my currency or the client's?", answer: "Invoice in the currency agreed in the contract, and state it as an ISO code such as USD or EUR. If the client pays in a different currency, name the conversion basis and decide who absorbs the difference. A clear currency clause prevents a full payment from leaving a shortfall after bank fees or a weaker exchange rate." },
    { question: "When do I use reverse-charge wording?", answer: "Use it when the place of supply is the customer's country and local rules shift the VAT obligation to the buyer, typically for B2B services within the EU. Include the customer's VAT number and a line saying the recipient accounts for VAT. Confirm the rule for the specific country and service before relying on it." },
    { question: "Do Incoterms apply to service invoices?", answer: "No. Incoterms apply to goods and describe freight, insurance, import clearance and risk. Service invoices use place-of-supply and reverse-charge wording instead. For a mixed contract, separate goods and services into different lines or invoices so each gets the correct treatment and the buyer's tax team can review it." },
    { question: "Who pays the bank fees on an international invoice?", answer: "Decide before invoicing and say so on the document. Correspondent fees and conversion costs can turn a full payment into a short settlement. If the client bears them, state that all bank charges are for the client's account and reconcile the amount received against the invoice total. If you bear them, price the fee into your rate." },
    { question: "How do I handle withholding tax on a cross-border invoice?", answer: "Find out whether the buyer's country requires tax to be deducted at source. If it does, agree whether your fee is gross or net and whether the contract includes a gross-up clause. Keep the withholding certificate with the invoice and remittance advice. This is general information, so confirm the treaty position with a tax adviser." },
  ],
};
