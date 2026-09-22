import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Tool → blog guide backlinks. Closes the silo loop: blog posts funnel
// down to money tool pages, and tool pages link back up to the guides.
// Only renders when guides exist for the slug — all other tools unaffected.
const GUIDES_BY_TOOL: Record<string, { href: string; title: string }[]> = {
  "invoice-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/how-to-create-invoice-online", title: "How to create an invoice online in 5 steps" },
    { href: "/blog/invoice-generator-guide/invoicing-mistakes-to-avoid", title: "12 invoice mistakes that delay payment" },
  ],
  "freelance-gst-invoice-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/gst-invoice-format-india", title: "GST invoice format India: fields, HSN & sample" },
    { href: "/blog/invoice-generator-guide/freelancer-invoice-guide", title: "Freelancer invoice guide: get paid on time" },
  ],
  "quotation-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt", title: "Invoice vs quotation vs receipt vs purchase order" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
  ],
  "receipt-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt", title: "Invoice vs quotation vs receipt vs purchase order" },
    { href: "/blog/invoice-generator-guide/payment-terms-and-followups", title: "Payment terms + follow-up scripts" },
  ],
  "purchase-order-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt", title: "Invoice vs quotation vs receipt vs purchase order" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
  ],
  "qr-code-generator": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/how-to-create-qr-code", title: "How to create a QR code free in 60 seconds" },
    { href: "/blog/qr-code-generator-guide/qr-code-size-print-guide", title: "QR code size guide for print & distance" },
    { href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes", title: "Static vs dynamic QR codes: which to choose" },
  ],
  "wifi-qr-generator": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/wifi-qr-code-guide", title: "WiFi QR code: share guest WiFi with one scan" },
    { href: "/blog/qr-code-generator-guide/qr-code-not-scanning-fix", title: "QR code not scanning? 5 causes & fixes" },
  ],
  "qr-scanner": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/qr-code-not-scanning-fix", title: "QR code not scanning? 5 causes & fixes" },
    { href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes", title: "Static vs dynamic QR codes: which to choose" },
  ],
  "barcode-generator": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/qr-code-vs-barcode", title: "QR code vs barcode: differences & when to use each" },
    { href: "/blog/qr-code-generator-guide/qr-code-for-business", title: "QR codes for small business: 6 placements" },
  ],
  "resume-builder": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/how-to-make-resume", title: "How to make a resume in 15 minutes + tailor it" },
    { href: "/blog/resume-builder-guide/resume-mistakes", title: "7 resume mistakes that kill interviews" },
    { href: "/blog/resume-builder-guide/ats-resume-guide", title: "ATS-friendly resume: beat tracking software" },
  ],
  "ats-resume-checker": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/ats-resume-guide", title: "ATS-friendly resume: beat tracking software" },
    { href: "/blog/resume-builder-guide/resume-format-guide", title: "Resume format: sections, order & norms" },
  ],
  "cover-letter-builder": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/cover-letter-guide", title: "Cover letter: 4-paragraph format that wins" },
    { href: "/blog/resume-builder-guide/fresher-resume-guide", title: "Fresher resume guide: zero experience" },
  ],
  "offer-letter-generator": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
    { href: "/blog/resume-builder-guide/experienced-resume-guide", title: "Resume for experienced professionals" },
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
