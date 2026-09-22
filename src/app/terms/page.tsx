import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { staticPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = staticPageMetadata({
  title: "Terms of Service — Fair Use & Disclaimers",
  description: "Terms of Service for Tool4SaaS — use of free browser-based tools, disclaimers for calculators and content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>Terms of Service</Typography>
      <Box sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        <Typography sx={{ display: "block", mb: 1 }}><strong>Last updated:</strong> <time dateTime="2026-09-09">September 9, 2026</time></Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Acceptance</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>By using Tool4SaaS you agree to these terms. All tools run locally in your browser; we provide them as-is without warranty.</Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Disclaimers</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>Calculators (BMI, loan, GST, tip, percentage, commission, discount, mortgage, SIP, compound interest, simple interest, retirement, auto loan, rent vs buy, freelance rate, inflation, salary, profit margin, income tax, calorie, water intake, macro, pregnancy, ovulation, sleep, body fat, ideal weight) are for informational purposes only and are not financial, tax, medical or legal advice. Verify results with a qualified professional. We are not liable for decisions made based on tool output.</Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Acceptable use</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>Do not misuse, attempt to disrupt, or reverse-engineer the site. Input content is your responsibility and must not violate law or third-party rights.</Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Intellectual property</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>Site design and code are © Tool4SaaS. You may use generated output (invoices, QR codes, resumes) for any lawful purpose.</Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Contact</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>Questions? Contact us at {siteConfig.email}. Do not use signature, invoice, or certificate outputs to forge another person&apos;s signature or misrepresent authorship. Respect YouTube Terms and owner copyright when using thumbnail previews. Test secrets only — never enter real card PANs, passwords, or private keys into shared devices.</Typography>
      </Box>
    </Container>
  );
}
