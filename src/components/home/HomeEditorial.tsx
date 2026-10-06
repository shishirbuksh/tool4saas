import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import HeroButtons from "@/components/HeroButtons";
import { FAQS } from "@/content/home";

// What-is section (sits between the tools grid and the guides grids).
export function HomeWhatIs() {
  return (
    <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
      {/* What is Tool4SaaS — simple English + persona H3s */}
      <Box component="section" id="what-is" aria-label="What is Tool4SaaS" sx={{ maxWidth: 800, mx: "auto", scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 1200px" }}>
        <Typography variant="h2" sx={{ mb: 1, fontWeight: 700, letterSpacing: "-0.025em", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
          What is Tool4SaaS? Free tools in your browser
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Reviewed by the Tool4SaaS Editorial Team · Last updated <time dateTime="2026-10-01">October 1, 2026</time> · <Link href="/author">Authors</Link> · <Link href="/methodology">How we test</Link> · <Link href="/contact">Contact us</Link>
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          Tool4SaaS is a set of free online tools that run in your web browser. You open a tool, do your job, and get a clear result in seconds. There is no install, no wait, and no cost to start.
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
          Free tools for students — no signup
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          Paste a 1,500-word essay into the <Link href="/word-counter">word counter</Link> to fix length fast. Check grades with the <Link href="/gpa-calculator">GPA calculator</Link>. All work runs free in your browser. Nothing uploads to servers.
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
          Invoice maker for freelancers
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          Make a $550 bill free with the <Link href="/invoice-generator">invoice generator</Link> in minutes. Share work with a scannable <Link href="/qr-code-generator">QR code</Link> for menus and portfolios. Your data stays in your browser always.
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
          JSON formatter for developers
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          Paste a 500KB file into the <Link href="/json-formatter">JSON formatter</Link> to validate fast. Test patterns with the <Link href="/regex-tester">regex tester</Link> before you ship. You never upload code. Files stay on your device.
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          Most tools are local-first. That means your words, files, and photos stay on your own device. They are not sent to our servers. When you close the tab, your data is gone. Only 4 web tools need the net, like live money rates. Each page says so in plain words. See our <Link href="/privacy">privacy policy</Link> and <Link href="/methodology">methodology page</Link>.
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
          Try three top picks. The <Link href="/word-counter">word counter</Link> checks a 1,500-word essay and shows grade level plus read time. The <Link href="/loan-calculator">loan maker</Link> shows that a $100,000 loan at 5 percent for 30 years costs $536.82 a month. The <Link href="/qr-code-generator">QR generator</Link> makes a scan code for a shop menu in one click. Each utility is free, quick, and safe to try today.
        </Typography>
        <Box sx={{ p: 3, borderRadius: "12px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
          <Typography variant="h3" sx={{ fontSize: "1.125rem", fontWeight: 700, mb: 1 }}>
            Do you need an account or install? No.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            General patterns as of September 2026; individual tools differ. Tool4SaaS: no signup, no install, free, files stay local. Typical signup sites: need login, upload to servers, free with limits. Typical desktop apps: need install, stay local, often paid.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

// Workflows + FAQ + final CTA (page tail).
export function HomeClosing({ firstSlug }: { firstSlug: string }) {
  return (
    <>
      {/* Popular workflows + testing summary */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" id="workflows" aria-label="Popular workflows" sx={{ maxWidth: 800, mx: "auto", scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700, letterSpacing: "-0.025em", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            Popular workflows for work, finance and study
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
            How we test every tool
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            We build and test each utility in-house before it ships. We check outputs against known values. A $100,000 loan at 5 percent over 30 years equals $536.82 monthly. 70 kg at 175 cm reads a BMI of 22.9.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            Finance and health tools get extra review. We label estimates as estimates, never advice. Every tool ships with a 4-step how-to plus worked numbers. We check pages in Chrome, Edge, Firefox, and Safari. Read the full process on our <Link href="/methodology">methodology page</Link>.
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
            Why local-first matters
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Most of our 185 utilities run 100 percent locally in your browser. What you type or upload never leaves your device. Close the tab and your data is gone.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            Four tools need the internet. The <Link href="/currency-converter">currency converter</Link> needs live rates. YouTube thumbnails, SSL check, and voice input need the net too. Each page says so first. See our <Link href="/privacy">privacy policy</Link> for plain details.
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
            Workflows people love
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Developers <Link href="/json-formatter">format JSON</Link>, test <Link href="/regex-tester">regex patterns</Link>, and decode <Link href="/jwt-decoder">JWT expiry</Link> without pasting secrets elsewhere. Money planners compare a <Link href="/mortgage-calculator">$240,000 mortgage near $1,439 monthly</Link> against rent. They project a ₹5,000 SIP toward ₹11.5L. Creators <Link href="/qr-code-generator">make QR codes</Link> for menus and <Link href="/word-counter">count 1,500-word essays</Link> with read time. Start with <Link href="/category/developer">Developer Tools</Link> and <Link href="/category/finance">Finance planners</Link>.
          </Typography>
        </Box>
      </Container>

      {/* FAQ — static boxes, zero JS */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" id="faq" aria-label="Frequently asked questions" sx={{ maxWidth: 800, mx: "auto", scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}>
          <Typography variant="h2" sx={{ mb: 1, fontWeight: 700, letterSpacing: "-0.025em", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", textAlign: 'center' }}>
            Frequently asked questions about free tools
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Quick answers in plain English. Still stuck? <Link href="/contact">Contact us</Link>.
          </Typography>
          {FAQS.map((f, i) => (
            <Box key={f.q} component="details" open={i === 0} sx={{ mb: 2, p: 3, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", contentVisibility: "auto", containIntrinsicSize: "auto 72px" }}>
              <Typography component="summary" variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 700, cursor: 'pointer', '&:focus-visible': { outline: '3px solid', outlineOffset: '2px' } }}>
                {f.q}
              </Typography>
              <Typography color="text.secondary" className="speakable-faq-answer" sx={{ lineHeight: 1.7, mt: 1 }}>
                {f.a}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Final CTA */}
      <Container maxWidth="lg" sx={{ pb: { xs: 10, md: 14 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" aria-label="Get started" sx={{ maxWidth: 700, mx: "auto", textAlign: 'center', p: 4, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
          <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.5rem, 3vw, 2rem)', mb: 1 }}>
            Start with a free tool now, no account needed
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Pick a maker or generator above. Do the job in seconds. Learn more in our <Link href="/blog">guides</Link> or <Link href="/about">about us</Link>.
          </Typography>
          <HeroButtons firstSlug={firstSlug} />
        </Box>
      </Container>
    </>
  );
}
