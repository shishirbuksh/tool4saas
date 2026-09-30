import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Running a 6-person studio, I pay ₹1,999/mo for accounting — and still make quick bills in the free tool. Why? Because <strong>small business invoicing</strong> is 80% speed and 20% software. If you send under 20 invoices a month, you do not need a subscription. You need a numbering system, two templates (quote + invoice), and a 10-minute weekly routine. Here is the setup I recommend to every founder who asks.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. Core tools: <a href="/invoice-generator">free invoice generator</a>, <a href="/quotation-generator">quotation generator</a>, <a href="/receipt-generator">receipt generator</a>, <a href="/purchase-order-generator">purchase order generator</a>.</p>

<h2 id="setup-stack">The lean invoicing stack (₹0, 30-minute setup)</h2>
<ul>
<li><strong>Numbering:</strong> INV-2026-001 sequential, one series. Credit notes separate (CN-001). Details in <a href="/blog/invoice-generator-guide/invoice-numbering">invoice numbering guide</a>.</li>
<li><strong>Two documents:</strong> quote first (QUO-2026-014), invoice after approval referencing it. Never invoice from a WhatsApp “ok”.</li>
<li><strong>One tax preset:</strong> default GST 18% (India) / VAT 20% (UK) / sales-tax-by-state (US). Verify margins with the <a href="/profit-margin-calculator">profit margin calculator</a>.</li>
<li><strong>One payments block:</strong> UPI + bank/IFSC (India) or bank/Stripe (US/UK). Same block on every PDF.</li>
<li><strong>One folder:</strong> Google Drive / local folder named by year, files INV-2026-001-client.pdf. Audits become trivial.</li>
</ul>

<h2 id="quote-to-cash">Quote-to-cash workflow that prevents disputes</h2>
<ol>
<li><strong>Quote (day 0):</strong> send <a href="/quotation-generator">quotation</a> with scope, price, validity (15 days), 50% advance term.</li>
<li><strong>Advance invoice (day 1):</strong> 50% of QUO-2026-014, Net 7. Start work on receipt, not on promise.</li>
<li><strong>Delivery + final invoice:</strong> reference quote + advance paid, balance due Net 15.</li>
<li><strong>Receipt on payment:</strong> issue <a href="/receipt-generator">payment receipt</a> same day. Clients reorder from businesses that close loops.</li>
<li><strong>Friday 10-minute review:</strong> unpaid list, nudge day-3 and day-7 overdue. Templates in <a href="/blog/invoice-generator-guide/payment-terms-and-followups">payment terms guide</a>.</li>
</ol>
<table>
<thead><tr><th>Stage</th><th>Document</th><th>Number example</th><th>Tool</th></tr></thead>
<tbody>
<tr><td><strong>Offer</strong></td><td>Quotation</td><td>QUO-2026-014</td><td><a href="/quotation-generator">Quotation generator</a></td></tr>
<tr><td><strong>Order</strong></td><td>Purchase order (from buyer)</td><td>PO-1042</td><td><a href="/purchase-order-generator">PO generator</a></td></tr>
<tr><td><strong>Bill</strong></td><td>Tax invoice</td><td>INV-2026-001</td><td><a href="/invoice-generator">Invoice generator</a></td></tr>
<tr><td><strong>Proof</strong></td><td>Receipt</td><td>RCP-0231</td><td><a href="/receipt-generator">Receipt generator</a></td></tr>
</tbody>
</table>

<h2 id="pricing-taxes">Pricing, taxes and records without an accountant on staff</h2>
<p>You still need a CA at year-end — this is operations, not advice. Price with margin math (cost + 30–50% for services is common), add the right tax, and keep every PDF. India: GST bills need GSTIN + HSN/SAC + CGST/SGST vs IGST — see <a href="/blog/invoice-generator-guide/gst-invoice-format-india">GST format tutorial</a>. US: nexus-based sales tax (check the <a href="/us-sales-tax-calculator">US sales tax calculator</a>). UK: VAT at 20% if registered, 6-year retention for HMRC. Keep personal and business invoices in separate folders from day one — future-you during tax season says thanks.</p>
<h3>The weekly routine that kills late payments</h3>
<ul>
<li><strong>Monday:</strong> send new invoices Tue–Thu window opens. Draft today, send tomorrow morning.</li>
<li><strong>Wednesday:</strong> nudge day-3 overdue with re-attached PDF.</li>
<li><strong>Friday:</strong> 10-minute ledger: sent, paid, overdue. One line per invoice in a sheet — number, client, total, due, status.</li>
</ul>

<h2 id="when-to-upgrade">When to upgrade from free to paid software</h2>
<ul>
<li><strong>Stay free:</strong> under ~20 invoices/mo, one tax rate, no payroll, no inventory. The free maker + sheets is faster than configuring Zoho.</li>
<li><strong>Upgrade:</strong> 30+ invoices/mo, multi-state GST with e-invoicing, staff payroll, or clients demanding portal uploads. Then Zoho Books / QuickBooks pays for itself.</li>
<li><strong>Never:</strong> pay just for “professional templates”. The free PDF already looks professional — I have had zero client complaints in 2 years.</li>
</ul>
<div class="cta-box"><strong>Set it up today:</strong> make QUO-2026-014 in the <a href="/quotation-generator">quotation generator</a>, convert to INV-2026-001 in the <a href="/invoice-generator">free invoice generator</a>, and read <a href="/blog/invoice-generator-guide">the pillar</a> for the full checklist.</div>

<h2 id="templates-pack">Two templates that cover ninety percent of work</h2>
<p>Maintain one quotation template QUO-2026-014 with scope, price, 15-day validity, plus 50% advance terms, and one tax-invoice template INV-2026-001 referencing the approved quote plus advance paid. Both share identical numbering logic, tax presets, and payments blocks with UPI plus bank details so clients learn one layout. The <a href="https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping">IRS recordkeeping basics</a> and your local equivalents agree on essentials: sequential numbers, dates, line items, taxes, and totals retained for years. Generate both in the <a href="/quotation-generator">quotation generator</a> and <a href="/invoice-generator">invoice generator</a>, storing PDFs as INV-2026-001-client.pdf by year. Twins beat a dozen clever variants nobody can find during audits.</p>
<h2 id="late-proof">Late-payment proofs that collect without burning bridges</h2>
<p>Most overdue bills clear within 48 hours of one polite nudge with the PDF re-attached, so systematize follow-ups before threatening penalties. Day-3 template restates total, due date, plus payment details warmly; day-7 adds a calendar due date plus late-fee disclosure from your terms; day-14 offers a call to resolve disputes. The <a href="https://www.gov.uk/invoicing-and-taking-payment-from-customers">UK invoicing payment rules</a> illustrate statutory interest options where applicable — adapt to your jurisdiction with CA guidance. Send Tuesday through Thursday mornings with totals in subjects, log every touch on one ledger line, and issue <a href="/receipt-generator">receipts</a> same-day when paid. Clients reorder from firms that close loops gracefully.</p>
<h2 id="year-end">Year-end pack your accountant will love</h2>
<p>Close each fiscal year with a folder containing every invoice, credit note, receipt, plus purchase order matched by number, a one-page summary of sent, paid, and written-off totals, and tax preset documentation showing GST, VAT, or sales-tax logic applied. Reconcile bank deposits against invoice numbers monthly so December holds no surprises. Retain records six years for UK VAT and per local statutes elsewhere — separate personal plus business folders from day one. Your CA handles filing; this pack makes their review billable hours shrink while audit queries resolve in minutes instead of weeks.</p>


<h2 id="numbering-guardrails">Numbering guardrails that survive audits</h2>
<p>Sequential INV-2026-001 numbering with one series plus separate CN-001 credit notes prevents duplicate gaps that auditors flag. Never reuse numbers across years without prefixes, never invoice from chat approvals without quotations, and void mistakes with credit notes instead of deletions. Review sequences every Friday alongside unpaid lists, confirming every quote maps to an invoice or a documented loss. Clean series turn tax-season scrambles into ten-minute exports.</p>

`;

export const invoiceSmallBusiness: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "small-business-invoicing",
  kind: "cluster",
  title: "Small Business Invoicing Without Paid Software: Complete Setup",
  description:
    "Small business invoicing setup with ₹0 tools: numbering, quote-to-cash flow, GST/VAT basics and a 10-min weekly routine. Free generators included.",
  keywords: ["small business invoice generator", "invoicing for startups free tool", "small business billing software free alternative", "how small business send professional invoices"],
  toolSlugs: ["invoice-generator", "quotation-generator", "receipt-generator", "purchase-order-generator"],
  relatedSlugs: ["freelancer-invoice-guide", "invoice-vs-quotation-vs-receipt", "invoicing-mistakes-to-avoid"],
  published: "2026-09-12",
  updated: "2026-09-28",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "setup-stack", text: "Lean invoicing stack (₹0)", level: 2 },
    { id: "quote-to-cash", text: "Quote-to-cash workflow", level: 2 },
    { id: "pricing-taxes", text: "Pricing, taxes and records", level: 2 },
    { id: "when-to-upgrade", text: "When to upgrade to paid software", level: 2 },
    { id: "templates-pack", text: "Two templates", level: 2 },
    { id: "late-proof", text: "Late-payment proofs", level: 2 },
    { id: "year-end", text: "Year-end pack", level: 2 },
    { id: "numbering-guardrails", text: "Numbering guardrails", level: 2 },
  ],
  html,
  faqs: [
    { question: "Can a small business invoice without accounting software?", answer: "Yes, under ~20 invoices a month. Use a free invoice generator with sequential numbering, a quotation generator for quotes, and a weekly sheet review. Upgrade when volume, e-invoicing or payroll demands it." },
    { question: "What is the quote-to-cash flow?", answer: "Quote (QUO-2026-014) → advance invoice → delivery + final invoice referencing the quote → receipt on payment → Friday review with day-3/day-7 nudges for overdue bills." },
    { question: "How should small businesses handle GST/VAT?", answer: "India: GSTIN + HSN/SAC + CGST/SGST vs IGST on tax invoices. US: nexus-based sales tax. UK: 20% VAT if registered. Keep every PDF by year. Confirm filing with your CA — this is operations guidance, not tax advice." },
    { question: "How do I reduce late payments as a small business?", answer: "Net 15 with calendar due dates, 30–50% advances, Tue–Thu morning sends with total in the subject, and a fixed Friday nudge routine. Most late bills clear within 48 hours of the first polite follow-up." },
    { question: "When should I pay for invoicing software?", answer: "At 30+ invoices/month, multi-state GST e-invoicing, payroll, or portal-upload clients. Below that, free tools plus sheets are faster and ₹0. Never pay just for templates." },
    { question: "How many invoice templates does a small business need?", answer: "Two: a quotation QUO-2026-014 with validity plus advance terms, and a tax invoice INV-2026-001 referencing the quote. Shared numbering, tax presets, and payment blocks beat a dozen variants during audits." },
  ],
};
