import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Tool → blog guide backlinks. Closes the silo loop: blog posts funnel
// down to money tool pages, and tool pages link back up to the guides.
// Only renders when guides exist for the slug — all other tools unaffected.
//
// Every href below is verified against src/lib/blog-registry.ts
// (pillar + cluster slugs in src/content/blog/*). No dead links.
// Tools without a relevant silo yet (sip-calculator,
// compound-interest-calculator, fd-calculator, ppf-calculator,
// image-compressor, pdf-merge, ...) stay unmapped — mapping them to
// unrelated posts would be irrelevant.
// unmapped until dedicated image/pdf pillars ship. Mapped hero
// (word-counter) links only to topically adjacent existing guides.
const GUIDES_BY_TOOL: Record<string, { href: string; title: string }[]> = {
  // ---- Mapped heroes (existing guides only) ----
  // word-counter maps to resume writing-quality guides (cover letters, ATS
  // wording) — the closest existing cluster for a writing tool. Image/PDF
  // heroes (image-compressor, pdf-merge) are intentionally unmapped until
  // dedicated image/pdf pillars ship — linking them to unrelated posts
  // would be topically misleading.
  "word-counter": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/cover-letter-guide", title: "Cover letter: 4-paragraph format that wins" },
    { href: "/blog/resume-builder-guide/ats-resume-guide", title: "ATS-friendly resume: beat tracking software" },
  ],
  // ---- Finance tools with topical guides ----
  "freelance-rate-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/freelancer-invoice-guide", title: "Freelancer invoice guide: get paid on time" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
  ],
  "salary-calculator": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
  ],
  "in-hand-salary-india": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
  ],
  "us-paycheck-calculator": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
  ],
  "payslip-generator": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
  ],
  // ---- Calculators & billing-adjacent tools ----
  "gst-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/gst-invoice-format-india", title: "GST invoice format India: fields, HSN & sample" },
  ],
  "number-to-words": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-numbering", title: "Invoice numbering: GST-compliant formats & sequences" },
  ],
  "commission-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
    { href: "/blog/invoice-generator-guide/freelancer-invoice-guide", title: "Freelancer invoice guide: get paid on time" },
  ],
  "discount-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
  ],
  "percentage-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/gst-invoice-format-india", title: "GST invoice format India: fields, HSN & sample" },
  ],
  "currency-converter": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/freelancer-invoice-guide", title: "Freelancer invoice guide: get paid on time" },
  ],
  "rent-receipt-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/payment-terms-and-followups", title: "Payment terms + follow-up scripts" },
  ],
  // ---- Writing tools → resume/cover-letter guides ----
  "readability-checker": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/cover-letter-guide", title: "Cover letter: 4-paragraph format that wins" },
  ],
  "grammar-checker": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/cover-letter-guide", title: "Cover letter: 4-paragraph format that wins" },
  ],
  "text-summarizer": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/ats-resume-guide", title: "ATS-friendly resume: beat tracking software" },
  ],
  // ---- Invoice family ----
  "invoice-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/how-to-create-invoice-online", title: "How to create an invoice online in 5 steps" },
    { href: "/blog/invoice-generator-guide/invoicing-mistakes-to-avoid", title: "12 invoice mistakes that delay payment" },
    { href: "/blog/invoice-generator-guide/invoice-numbering", title: "Invoice numbering: GST-compliant formats & sequences" },
    { href: "/blog/invoice-generator-guide/invoice-template-formats", title: "Free invoice templates: Word, Excel & PDF formats" },
  ],
  "freelance-gst-invoice-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/gst-invoice-format-india", title: "GST invoice format India: fields, HSN & sample" },
    { href: "/blog/invoice-generator-guide/freelancer-invoice-guide", title: "Freelancer invoice guide: get paid on time" },
    { href: "/blog/invoice-generator-guide/invoice-numbering", title: "Invoice numbering: GST-compliant formats & sequences" },
  ],
  "quotation-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt", title: "Invoice vs quotation vs receipt vs purchase order" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
    { href: "/blog/invoice-generator-guide/invoice-template-formats", title: "Free invoice templates: Word, Excel & PDF formats" },
  ],
  "receipt-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt", title: "Invoice vs quotation vs receipt vs purchase order" },
    { href: "/blog/invoice-generator-guide/payment-terms-and-followups", title: "Payment terms + follow-up scripts" },
    { href: "/blog/invoice-generator-guide/invoice-template-formats", title: "Free invoice templates: Word, Excel & PDF formats" },
  ],
  "purchase-order-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt", title: "Invoice vs quotation vs receipt vs purchase order" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
  ],
  // ---- QR family ----
  "qr-code-generator": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/how-to-create-qr-code", title: "How to create a QR code free in 60 seconds" },
    { href: "/blog/qr-code-generator-guide/qr-code-size-print-guide", title: "QR code size guide for print & distance" },
    { href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes", title: "Static vs dynamic QR codes: which to choose" },
    { href: "/blog/qr-code-generator-guide/upi-payment-qr-code-india", title: "UPI QR code for payments: setup & safety (India)" },
    { href: "/blog/qr-code-generator-guide/vcard-contact-qr-code", title: "vCard QR code: digital business card in 5 seconds" },
  ],
  "wifi-qr-generator": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/wifi-qr-code-guide", title: "WiFi QR code: share guest WiFi with one scan" },
    { href: "/blog/qr-code-generator-guide/qr-code-not-scanning-fix", title: "QR code not scanning? 5 causes & fixes" },
    { href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes", title: "Static vs dynamic QR codes: which to choose" },
  ],
  "qr-scanner": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/qr-code-not-scanning-fix", title: "QR code not scanning? 5 causes & fixes" },
    { href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes", title: "Static vs dynamic QR codes: which to choose" },
    { href: "/blog/qr-code-generator-guide/vcard-contact-qr-code", title: "vCard QR code: digital business card in 5 seconds" },
    { href: "/blog/qr-code-generator-guide/upi-payment-qr-code-india", title: "UPI QR code for payments: setup & safety (India)" },
  ],
  "barcode-generator": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/qr-code-vs-barcode", title: "QR code vs barcode: differences & when to use each" },
    { href: "/blog/qr-code-generator-guide/qr-code-for-business", title: "QR codes for small business: 6 placements" },
  ],
  // ---- Resume family ----
  "resume-builder": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/how-to-make-resume", title: "How to make a resume in 15 minutes + tailor it" },
    { href: "/blog/resume-builder-guide/resume-mistakes", title: "7 resume mistakes that kill interviews" },
    { href: "/blog/resume-builder-guide/ats-resume-guide", title: "ATS-friendly resume: beat tracking software" },
    { href: "/blog/resume-builder-guide/resume-vs-cv", title: "Resume vs CV vs biodata: differences & when to use each" },
  ],
  "ats-resume-checker": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/ats-resume-guide", title: "ATS-friendly resume: beat tracking software" },
    { href: "/blog/resume-builder-guide/resume-format-guide", title: "Resume format: sections, order & norms" },
    { href: "/blog/resume-builder-guide/resume-mistakes", title: "7 resume mistakes that kill interviews" },
  ],
  "cover-letter-builder": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/cover-letter-guide", title: "Cover letter: 4-paragraph format that wins" },
    { href: "/blog/resume-builder-guide/fresher-resume-guide", title: "Fresher resume guide: zero experience" },
    { href: "/blog/resume-builder-guide/resume-vs-cv", title: "Resume vs CV vs biodata: differences & when to use each" },
  ],
  "offer-letter-generator": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
    { href: "/blog/resume-builder-guide/experienced-resume-guide", title: "Resume for experienced professionals" },
  ],
  "mortgage-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/how-to-calculate-mortgage-payment", title: "How to calculate mortgage payment: formula + examples" },
    { href: "/blog/mortgage-calculator-guide/15-vs-30-year-mortgage", title: "15 vs 30 year mortgage: interest & payoff compared" },
    { href: "/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment", title: "Extra mortgage payments: interest saved" },
  ],
  "home-affordability-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/how-much-house-can-i-afford", title: "How much house can I afford? 28/36 rule" },
    { href: "/blog/mortgage-calculator-guide/rent-vs-buy-house", title: "Rent vs buy: 5% rule + break-even math" },
  ],
  "refinance-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/should-i-refinance-my-mortgage", title: "Should I refinance? Break-even rule + checklist" },
    { href: "/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment", title: "Extra mortgage payments: interest saved" },
  ],
  "mortgage-overpayment-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment", title: "Extra mortgage payments: interest saved" },
    { href: "/blog/mortgage-calculator-guide/mortgage-amortization-schedule", title: "Amortization schedule: how payments split" },
  ],
  "emi-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india", title: "Home loan EMI & eligibility India" },
  ],
  "home-loan-eligibility-india": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india", title: "Home loan EMI & eligibility India" },
  ],
  "loan-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/how-to-calculate-mortgage-payment", title: "How to calculate mortgage payment: formula + examples" },
    { href: "/blog/mortgage-calculator-guide/15-vs-30-year-mortgage", title: "15 vs 30 year mortgage: interest & payoff compared" },
  ],
  "rent-vs-buy-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/rent-vs-buy-house", title: "Rent vs buy: 5% rule + break-even math" },
    { href: "/blog/mortgage-calculator-guide/how-much-house-can-i-afford", title: "How much house can I afford? 28/36 rule" },
  ],
};

export default function RelatedGuides({ slug }: { slug: string }) {
  const guides = GUIDES_BY_TOOL[slug];
  if (!guides || guides.length === 0) return null;
  return (
    <Box component="section" aria-label="Related guides" sx={{ mt: 4, p: 3, border: "1px solid", borderColor: "divider", borderRadius: "12px", bgcolor: "background.paper" }}>
      <Typography variant="h2" sx={{ fontSize: "1.125rem", mb: 0.5 }}>
        Learn: guides & tutorials
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Deep dives from the Tool4SaaS blog — tested workflows, print sizes and fixes.
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 3, display: "flex", flexDirection: "column", gap: 1 }}>
        {guides.map((g) => (
          <Box component="li" key={g.href}>
            <Link href={g.href} style={{ fontWeight: 600 }}>
              {g.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
