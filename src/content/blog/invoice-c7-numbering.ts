import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Duplicate INV-2026-001. Skipped 004. A “final” invoice numbered “3b”. I have seen all three — and each one triggered an accounts query that cost days. <strong>Invoice numbering</strong> looks trivial until money depends on it. Here is the GST-compliant way to format numbers, plus HSN placement and tax-field rules that keep Indian, US and UK bills clean.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. Build numbered bills in the <a href="/invoice-generator">free invoice generator</a> (general) or <a href="/freelance-gst-invoice-generator">freelance GST invoice generator</a> (auto tax split). Convert totals to words with the <a href="/number-to-words">number to words converter</a>.</p>

<h2 id="format-rules">Numbering formats that pass audits (pick one, never change mid-year)</h2>
<table>
<thead><tr><th>Format</th><th>Example</th><th>Best for</th></tr></thead>
<tbody>
<tr><td><strong>Year-prefix sequential</strong></td><td>INV-2026-001 → 002 → 003</td><td>Freelancers, studios (my default)</td></tr>
<tr><td><strong>GST series</strong></td><td>INV-GST-011, INV-GST-012</td><td>Registered sellers, separate tax series</td></tr>
<tr><td><strong>Client-prefix</strong></td><td>ACME-2026-014</td><td>Retainers, 5+ bills per client</td></tr>
<tr><td><strong>Credit notes separate</strong></td><td>CN-001, CN-002</td><td>Refunds and corrections (never reuse INV)</td></tr>
</tbody>
</table>
<ul>
<li><strong>Unique + sequential, no gaps.</strong> I skipped 004 in Aug 2026 and spent 3 days answering my CA — auditors read gaps as missing income. Leave voids logged (“void — draft error”), never backfill.</li>
<li><strong>One series per financial year</strong> (India: April–March reset is common). Note the reset in your sheet.</li>
<li><strong>Never reuse.</strong> Correct with a credit note (CN-001 reverses INV-2026-001 line 3), not by editing history.</li>
<li><strong>Keep GST and non-GST apart</strong> if you issue both — INV-GST vs INV series prevents split confusion.</li>
</ul>

<h2 id="gstin-hsn-tax">GSTIN, HSN and tax fields: exact placement</h2>
<ul>
<li><strong>GSTIN:</strong> supplier top-right (27ABCDE1234F1Z5), buyer GSTIN in bill-to for B2B. Copy-paste from the portal — one wrong digit bounces.</li>
<li><strong>HSN/SAC:</strong> per line next to description (SAC 9983 design, 9984 IT). 4 digits under ₹5 cr turnover, 6 above.</li>
<li><strong>Tax split:</strong> CGST 9% + SGST 9% same-state; IGST 18% inter-state. Place-of-supply state code decides — see <a href="/blog/invoice-generator-guide/gst-invoice-format-india">GST format tutorial</a>.</li>
<li><strong>Total in words:</strong> “Rupees twenty-three thousand six hundred only” — use the <a href="/number-to-words">number to words tool</a> to avoid typos.</li>
<li><strong>US/UK:</strong> sales-tax jurisdiction + rate (US), VAT number + 20% split (UK). Keep 3–7 years (IRS) / 6 years (HMRC).</li>
</ul>
<h3>The 10-minute monthly check I do</h3>
<p>Last Friday of the month: export/list numbers 001→0NN, tick off paid (receipt RCP-0231 issued), nudge unpaid per <a href="/blog/invoice-generator-guide/payment-terms-and-followups">payment terms guide</a>, and confirm no duplicates. I caught a double-billed ₹12,000 retainer this way — client thanked me, trust went up.</p>

<h2 id="us-uk">US and UK numbering and tax-field equivalents</h2>
<p>Numbering discipline is universal — only the tax rows change. In the <strong>US</strong>, invoice numbers work identically (INV-2026-001 sequential), but sales tax appears only where you have nexus: show rate + jurisdiction (“8.5% NYC sales tax”) or write “No sales tax collected — no nexus”. Keep invoices 3–7 years for the IRS. In the <strong>UK</strong>, VAT-registered sellers show VAT number + net + VAT (usually 20%) + gross on every VAT invoice, sequential numbering included; non-registered sellers omit VAT entirely and note it. HMRC wants 6 years of records. I keep a separate yearly folder per country-client — Sept 2026 audit took 20 minutes because of it.</p>
<ul>
<li><strong>Multi-currency:</strong> one currency per invoice, stated next to the total ($550 USD, not just $550). Mixed-currency lines confuse AP software.</li>
<li><strong>Cross-check:</strong> run US totals through the <a href="/us-sales-tax-calculator">US sales tax calculator</a> and Indian ones through the <a href="/gst-calculator">GST calculator</a> before sending.</li>
<li><strong>Not advice:</strong> thresholds and nexus rules shift — confirm with your accountant. This page covers document format only.</li>
</ul>

<h2 id="fixes">Fixes for the 4 most common numbering messes</h2>
<ol>
<li><strong>Duplicate number sent:</strong> do not edit. Issue credit note CN-00X, re-issue with next number, one-line apology.</li>
<li><strong>Skipped number:</strong> leave the gap, note “void — draft error” in your sheet. Auditors prefer honesty over backfilling.</li>
<li><strong>Two series collided:</strong> freeze one, rename forward (INV-GST-011 onward), log the change date.</li>
<li><strong>Wrong tax on numbered bill:</strong> credit-note the line, re-issue corrected split. Cross-check with the <a href="/gst-calculator">GST calculator</a>.</li>
</ol>
<h2 id="fy-reset">Financial-year resets (India April–March)</h2>
<p>Most Indian businesses restart numbering each financial year: INV-2026-001 runs April 2026–March 2027, then INV-2027-001 begins. Why it matters: GST filings, audits and TDS certificates all slice by financial year — continuous cross-year numbering forces awkward filtering every March. Implementation: prefix with FY (INV/FY26-27/001) or year (INV-2026-001) so sorts stay chronological; freeze the old series on March 31 with a logged closing number; open the new series April 1 even if old invoices are still being paid (payment date and invoice date differ legitimately). US/UK readers: calendar-year or continuous numbering both pass — pick one and document it in your books. Changing schemes mid-stream? Log the change date and keep both series searchable; auditors forgive documented transitions, never silent ones.</p>
<div class="cta-box"><strong>Number it right now:</strong> open the <a href="/invoice-generator">free invoice generator</a> with INV-2026-001 and sequential discipline. Pillar: <a href="/blog/invoice-generator-guide">free invoice generator guide</a> · Build steps: <a href="/blog/invoice-generator-guide/how-to-create-invoice-online">how to create an invoice online</a>.</div>
`;

export const invoiceNumbering: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "invoice-numbering",
  kind: "cluster",
  title: "Invoice Numbering: GST-Compliant Formats, HSN & Tax Fields (2026)",
  description:
    "Invoice numbering done right: sequential formats, GSTIN/HSN placement, CGST/SGST vs IGST fields + fixes for duplicates. Free generator walkthrough.",
  keywords: ["invoice number format", "hsn code on invoice", "how to do invoice numbering gst compliant", "where to put gstin on bill", "cgst sgst vs igst in invoice"],
  toolSlugs: ["invoice-generator", "freelance-gst-invoice-generator", "number-to-words"],
  relatedSlugs: ["how-to-create-invoice-online", "gst-invoice-format-india", "payment-terms-and-followups"],
  published: "2026-09-14",
  updated: "2026-09-18",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "format-rules", text: "Numbering formats that pass audits", level: 2 },
    { id: "gstin-hsn-tax", text: "GSTIN, HSN and tax field placement", level: 2 },
    { id: "us-uk", text: "US and UK equivalents", level: 2 },
    { id: "fy-reset", text: "Financial-year resets", level: 2 },
    { id: "fixes", text: "Fixes for 4 numbering messes", level: 2 },
  ],
  html,
  faqs: [
    { question: "How should I format invoice numbers?", answer: "Unique sequential with year prefix: INV-2026-001, 002, 003. One series per year, credit notes separate (CN-001). Never reuse or backfill gaps — log voids honestly." },
    { question: "Where does GSTIN go on the invoice?", answer: "Supplier GSTIN top-right, buyer GSTIN in the bill-to block for B2B. Copy from the GST portal. Wrong digits bounce at enterprise accounts." },
    { question: "Where do HSN/SAC codes go?", answer: "Per line next to the description. HSN for goods, SAC for services (e.g. 9983 design). 4 digits below ₹5 cr turnover, 6 above. Verify against the current master." },
    { question: "How do I fix a duplicate invoice number?", answer: "Do not edit history. Issue a credit note reversing it, re-issue with the next sequential number, and send a one-line correction note referencing both numbers." },
    { question: "Do US/UK invoices need the same fields?", answer: "Numbering discipline is universal. US adds sales-tax jurisdiction and rate where nexus applies; UK VAT invoices need VAT number plus net/VAT/gross split. Retain 3–7 years (IRS) or 6 years (HMRC)." },
  ],
};
