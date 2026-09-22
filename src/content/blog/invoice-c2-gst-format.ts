import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A GST invoice got rejected at my client's accounts desk because I wrote 18% as a single line instead of splitting 9% CGST + 9% SGST. Same total, wrong presentation — one week lost. This tutorial fixes that: the exact <strong>GST invoice format India</strong> requires, with HSN codes, GSTIN placement and a copy-paste sample, so your bill clears on first submission.</p>
<p>Part of the <a href="/blog/invoice-generator-guide">free invoice generator guide</a>. For the hands-on build, use the <a href="/freelance-gst-invoice-generator">freelance GST invoice generator</a> (auto CGST/SGST vs IGST) or the general <a href="/invoice-generator">free invoice generator</a>. This is format guidance, not tax advice — confirm slabs with your CA.</p>

<h2 id="mandatory-fields">GST invoice mandatory fields (the 14-point check)</h2>
<p>Under CGST rules every tax invoice needs these. Miss one and enterprise accounts bounces it. Bold them on your PDF.</p>
<ol>
<li><strong>Supplier name, address, GSTIN</strong> (e.g. 27ABCDE1234F1Z5) — top of the invoice.</li>
<li><strong>Invoice serial number</strong> — unique, sequential, e.g. INV-GST-011. Rules in <a href="/blog/invoice-generator-guide/invoice-numbering">invoice numbering guide</a>.</li>
<li><strong>Date of issue</strong> — plus time of supply for services where relevant.</li>
<li><strong>Buyer name, address, GSTIN</strong> (B2B) — plus place of supply with state code.</li>
<li><strong>HSN code (goods) / SAC code (services)</strong> — e.g. SAC 9983 for design. 4–6 digits depending on turnover.</li>
<li><strong>Description of goods/services</strong> — specific, with quantity and unit.</li>
<li><strong>Quantity, rate and taxable value</strong> — per line, e.g. 10 hrs × ₹2,000 = ₹20,000.</li>
<li><strong>Tax rate + amount split</strong> — <strong>CGST + SGST for same-state, IGST for inter-state</strong>.</li>
<li><strong>Total with tax</strong> — bold, e.g. <strong>₹23,600</strong>.</li>
<li><strong>Total in words</strong> — “Rupees twenty-three thousand six hundred only”.</li>
<li><strong>Place of supply + reverse-charge note</strong> where applicable.</li>
<li><strong>Bank / UPI details</strong> — account, IFSC, UPI ID for fast clearance.</li>
<li><strong>Signature / authorized signatory</strong> — digital signature block is fine.</li>
<li><strong>LUT / export note</strong> for zero-rated supplies.</li>
</ol>

<h2 id="cgst-sgst-vs-igst">CGST + SGST vs IGST: the split that trips everyone</h2>
<p>Same-state sale = split the GST in half. Inter-state = one IGST line. Same money, different rows — accounts cares deeply.</p>
<table>
<thead><tr><th>Supply</th><th>Tax lines on invoice</th><th>Example on ₹20,000 @ 18%</th></tr></thead>
<tbody>
<tr><td><strong>Intra-state (Mumbai → Mumbai)</strong></td><td>CGST 9% + SGST 9%</td><td>₹1,800 + ₹1,800 = ₹23,600 total</td></tr>
<tr><td><strong>Inter-state (Mumbai → Delhi)</strong></td><td>IGST 18%</td><td>₹3,600 = ₹23,600 total</td></tr>
<tr><td><strong>Export with LUT</strong></td><td>0% + LUT note</td><td>₹20,000, “LUT filed, no IGST”</td></tr>
<tr><td><strong>Unregistered freelancer</strong></td><td>No GST, status note</td><td>₹15,000, “unregistered supplier”</td></tr>
</tbody>
</table>
<p>The <a href="/freelance-gst-invoice-generator">freelance GST invoice generator</a> picks the split from place-of-supply state codes automatically — I tested Mumbai→Mumbai vs Mumbai→Bengaluru and it flipped correctly. Cross-check percentages with the <a href="/gst-calculator">GST calculator</a> before sending.</p>

<h2 id="hsn-sac-gstin">HSN, SAC and GSTIN: where they go on the bill</h2>
<ul>
<li><strong>HSN (goods):</strong> per line next to description. Turnover under ₹5 cr: 4 digits; above: 6 digits.</li>
<li><strong>SAC (services):</strong> same position. Common ones: 9983 (design), 9984 (IT), 9992 (consulting) — verify against the current master.</li>
<li><strong>GSTIN:</strong> supplier top-right, buyer in bill-to block. Wrong digit = rejection. Copy-paste from GST portal, never retype.</li>
<li><strong>State code + place of supply:</strong> drives CGST/SGST vs IGST. “Maharashtra (27)” style labels prevent confusion.</li>
</ul>
<h3>Freelancer specials: SAC mistakes I have seen</h3>
<p>Three real bounces: a writer used goods-HSN for editing services; a designer omitted SAC entirely; a developer billed inter-state as CGST+SGST. All fixed in 10 minutes once the code and split were right. When in doubt, mirror your last accepted invoice — consistency beats creativity here.</p>

<h2 id="sample-invoice">Sample GST invoice (copy the structure)</h2>
<p><strong>Header:</strong> Aarav Mehta Design, Mumbai, GSTIN 27ABCDE1234F1Z5 · Invoice INV-GST-011, Sept 14, 2026 · Bill to: Zeta Pvt Ltd, Delhi, GSTIN 07XYZAB1234C1Z5, Place of supply: Delhi (07).</p>
<p><strong>Lines:</strong> UI design, SAC 9983, 10 hrs × ₹2,000 = ₹20,000 taxable. <strong>Tax:</strong> IGST 18% = ₹3,600 (inter-state). <strong>Total: ₹23,600</strong> — Rupees twenty-three thousand six hundred only. <strong>Footer:</strong> UPI + bank/IFSC, “50% advance received vide QUO-2026-014”, signatory block.</p>
<ul>
<li>File name: <strong>gst-invoice-011-zeta.pdf</strong>. Subject: “GST Invoice INV-GST-011 — ₹23,600 due Sept 29”.</li>
<li>Made with: <a href="/freelance-gst-invoice-generator">freelance GST invoice generator</a> → Print to PDF. Verify with <a href="/invoice-generator">free invoice generator</a> for non-GST bills.</li>
<li>After payment: issue a <a href="/receipt-generator">payment receipt</a> referencing INV-GST-011.</li>
</ul>

<h2 id="common-rejections">5 rejection reasons (and the 10-minute fix)</h2>
<ol>
<li><strong>Missing buyer GSTIN</strong> for B2B — ask accounts before drafting, not after. (Numbering hygiene in <a href="/blog/invoice-generator-guide/invoice-numbering">numbering guide</a>.)</li>
<li><strong>Wrong split</strong> (CGST/SGST on inter-state) — flip to IGST per place of supply.</li>
<li><strong>No HSN/SAC</strong> — add codes; accounts software validates these now.</li>
<li><strong>Total in words missing</strong> — banks and large buyers require it. The full pre-send sweep is in <a href="/blog/invoice-generator-guide/invoicing-mistakes-to-avoid">12 invoice mistakes to avoid</a>.</li>
<li><strong>Duplicate series</strong> — keep GST bills in one sequence; credit notes separate (CN-001). Freelancers: the <a href="/blog/invoice-generator-guide/freelancer-invoice-guide">freelancer guide</a> shows advances + UPI wording that pairs with GST bills; payment chasing in <a href="/blog/invoice-generator-guide/payment-terms-and-followups">payment terms and reminders</a>.</li>
</ol>
<div class="cta-box"><strong>Make it now:</strong> open the <a href="/freelance-gst-invoice-generator">freelance GST invoice generator</a> — CGST/SGST vs IGST handled for you. Back to <a href="/blog/invoice-generator-guide">the pillar guide</a> for taxes in the US/UK and sending tips.</div>
`;

export const invoiceGstFormat: BlogPost = {
  pillar: "invoice-generator-guide",
  slug: "gst-invoice-format-india",
  kind: "cluster",
  title: "GST Invoice Format India: Mandatory Fields, HSN & Sample (2026)",
  description:
    "GST invoice format India explained: 14 mandatory fields, CGST/SGST vs IGST split, HSN/SAC codes, GSTIN placement + sample. Free generator included.",
  keywords: [
    "gst invoice format india",
    "gst bill format with hsn code",
    "gst invoice mandatory fields gstin",
    "freelance gst invoice india free",
    "cgst sgst vs igst invoice",
  ],
  toolSlugs: ["freelance-gst-invoice-generator", "invoice-generator", "gst-calculator"],
  relatedSlugs: ["how-to-create-invoice-online", "invoice-numbering", "freelancer-invoice-guide"],
  published: "2026-09-11",
  updated: "2026-09-18",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "mandatory-fields", text: "14 mandatory GST fields", level: 2 },
    { id: "cgst-sgst-vs-igst", text: "CGST + SGST vs IGST split", level: 2 },
    { id: "hsn-sac-gstin", text: "HSN, SAC and GSTIN placement", level: 2 },
    { id: "sample-invoice", text: "Sample GST invoice structure", level: 2 },
    { id: "common-rejections", text: "5 rejection reasons + fixes", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is mandatory on a GST invoice in India?", answer: "Supplier and buyer GSTIN, serial number, date, HSN/SAC codes, qty, rate, taxable value, CGST/SGST or IGST split, place of supply, total in figures and words, bank details and signatory. Enterprise buyers reject bills missing any of these." },
    { question: "When do I use CGST+SGST vs IGST?", answer: "Same-state supply: split GST into CGST + SGST (e.g. 9% + 9%). Inter-state: single IGST line (18%). The split follows place of supply, not your office. The freelance GST generator picks this automatically." },
    { question: "Where do HSN and SAC codes go?", answer: "Per line next to the description. Goods use HSN, services use SAC (e.g. 9983 for design). 4 digits below ₹5 cr turnover, 6 above. Copy from the official master — wrong codes bounce." },
    { question: "Do freelancers need GSTIN on every invoice?", answer: "Only if registered. Unregistered freelancers bill without GST and note their status. Once registered, every tax invoice needs your GSTIN plus buyer GSTIN for B2B. Thresholds change — check with your CA." },
    { question: "Can I make a GST invoice free without signup?", answer: "Yes. Use the freelance GST invoice generator: enter supplier info with GSTIN, add service lines with SAC and GST%, review the auto CGST/SGST vs IGST split, then Print to PDF. Everything stays in your browser." },
  ],
};
