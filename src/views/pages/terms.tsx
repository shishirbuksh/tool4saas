import { Container, Typography, Box } from "@/components/ds";

import { siteConfig } from "@/lib/site";

export default function TermsView() {
  return (
    <Container maxWidth="md" className="py-12">
      <Typography variant="h1" className="text-[2.25rem] mb-4">Terms of Service</Typography>
      <Box className="text-base-content/70 leading-[1.8]">
        <Typography className="block mb-2"><strong>Last updated:</strong> <time dateTime="2026-09-09">September 9, 2026</time></Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Acceptance</Typography>
        <Typography className="block mb-2">By using Tool4SaaS you agree to these terms. All tools run locally in your browser; we provide them as-is without warranty.</Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Disclaimers</Typography>
        <Typography className="block mb-2">Calculators (BMI, loan, GST, tip, percentage, commission, discount, mortgage, SIP, compound interest, simple interest, retirement, auto loan, rent vs buy, freelance rate, inflation, salary, profit margin, income tax, calorie, water intake, macro, pregnancy, ovulation, sleep, body fat, ideal weight) are for informational purposes only and are not financial, tax, medical or legal advice. Verify results with a qualified professional. We are not liable for decisions made based on tool output.</Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Acceptable use</Typography>
        <Typography className="block mb-2">Do not misuse, attempt to disrupt, or reverse-engineer the site. Input content is your responsibility and must not violate law or third-party rights.</Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Intellectual property</Typography>
        <Typography className="block mb-2">Site design and code are © Tool4SaaS. You may use generated output (invoices, QR codes, resumes) for any lawful purpose.</Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Contact</Typography>
        <Typography className="block mb-2">Questions? Contact us at {siteConfig.email}. Do not use signature, invoice, or certificate outputs to forge another person&apos;s signature or misrepresent authorship. Respect YouTube Terms and owner copyright when using thumbnail previews. Test secrets only — never enter real card PANs, passwords, or private keys into shared devices.</Typography>
      </Box>
    </Container>
  );
}
