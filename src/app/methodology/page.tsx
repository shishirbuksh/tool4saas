import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = staticPageMetadata({
  title: "How We Test Tools — Accuracy You Can Verify",
  description:
    "How Tool4SaaS tests every tool: built locally, verified against known samples, checked across browsers, and kept up to date.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>How We Test Tools</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Last updated: <time dateTime="2026-09-09">September 9, 2026</time>
      </Typography>
      <Box component="div" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", color: "text.primary", mt: 3, mb: 1 }}>
          1. Build locally
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          Every <span translate="no">{siteConfig.name}</span> tool is built and tested in-house. Most tools run 100%
          locally in your browser with no sign-up and no uploads, so what you type never leaves your device.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", color: "text.primary", mt: 3, mb: 1 }}>
          2. Verify against known samples
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          We check outputs against known reference values before publishing. For example: a $100,000 loan at 5%
          over 30 years gives a monthly payment of $536.82, and 70 kg at 175 cm gives a BMI of 22.9.
        </Typography>
        <Box
          component="table"
          sx={{ width: "100%", borderCollapse: "collapse", mt: 2, mb: 1, fontSize: "0.875rem" }}
        >
          <Box component="caption" sx={{ textAlign: "left", pb: 1, color: "text.secondary" }}>
            Sample verification checks run before publishing
          </Box>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" scope="col" sx={{ textAlign: "left", p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Check
              </Box>
              <Box component="th" scope="col" sx={{ textAlign: "left", p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Input
              </Box>
              <Box component="th" scope="col" sx={{ textAlign: "left", p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Expected output
              </Box>
            </Box>
          </Box>
          <Box component="tbody">
            <Box component="tr">
              <Box component="th" scope="row" sx={{ textAlign: "left", p: 1, borderBottom: "1px solid", borderColor: "divider", fontWeight: 600 }}>
                Loan payment
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                $100,000 at 5% over 30 years
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                $536.82 / month
              </Box>
            </Box>
            <Box component="tr">
              <Box component="th" scope="row" sx={{ textAlign: "left", p: 1, borderBottom: "1px solid", borderColor: "divider", fontWeight: 600 }}>
                BMI
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                70 kg at 175 cm
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                22.9
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", color: "text.primary", mt: 3, mb: 1 }}>
          3. Browser matrix
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          We verify pages in current Chrome, Edge, Firefox, and Safari on desktop and mobile viewports,
          checking layout, input handling, and downloads or copy actions where applicable.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", color: "text.primary", mt: 3, mb: 1 }}>
          4. Update policy and limitations
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          We re-check pages as tools improve and re-verify calculator logic when rules change. Results are
          estimates for general information, not professional advice — see <Link href="/terms">/terms</Link>.
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <Typography component="li" sx={{ display: "list-item", mb: 0.5 }}>
            Re-run sample checks after every logic change before re-publishing.
          </Typography>
          <Typography component="li" sx={{ display: "list-item", mb: 0.5 }}>
            Re-verify finance logic when tax or interest rules change; label estimates as estimates.
          </Typography>
          <Typography component="li" sx={{ display: "list-item", mb: 0.5 }}>
            Re-check health ranges and conversions when reference guidance changes.
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", color: "text.primary", mt: 3, mb: 1 }}>
          5. Public references we check against
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          We cross-check behavior against public references: MDN Web Docs for JavaScript, date, and number
          behavior; published RBI and IRS formula guidance for loan and tax estimate logic (results remain
          estimates, not financial advice); and WHO BMI classification ranges for health calculators. See{" "}
          <Link href="/terms">/terms</Link> for limitations.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", color: "text.primary", mt: 3, mb: 1 }}>
          6. Testing rig in detail
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          Day-to-day verification runs on current stable Chrome, Edge, Firefox, and Safari, on desktop
          viewports from 1280 pixels up and mobile widths of 360 to 390 pixels. Each candidate page is
          exercised end to end: enter the sample input, read the output, then use copy, download, or print
          exactly as a visitor would. Layout must hold at both extremes, inputs must reject garbage with
          clear messages, and exports must open correctly — a PDF invoice must paginate on A4, a CSV must
          reopen with headers intact. <span translate="no">{siteConfig.name}</span> has operated this way
          since its 2026 launch, and failures block release until fixed.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", color: "text.primary", mt: 3, mb: 1 }}>
          7. Sampling, edge cases and YMYL care
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          Reference samples cover the happy path plus edges: leap-day birthdays, DST jumps in March, empty
          inputs, 1,000-row batches, and malformed JSON with a missing comma. Finance and health tools get a
          second pass because money and body decisions carry real consequences — every FAQ answer there
          averages well above our editorial floor, results are labeled estimates, and pages point readers to
          qualified professionals. Tax figures use clearly marked demo brackets, never live filing tables, so
          no visitor mistakes a planning sketch for filed advice.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", color: "text.primary", mt: 3, mb: 1 }}>
          8. Verification log
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          Recent verification passes, newest first:
        </Typography>
        <Box
          component="table"
          sx={{ width: "100%", borderCollapse: "collapse", mt: 1, mb: 1, fontSize: "0.875rem" }}
        >
          <Box component="thead">
            <Box component="tr">
              <Box component="th" scope="col" sx={{ textAlign: "left", p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Date
              </Box>
              <Box component="th" scope="col" sx={{ textAlign: "left", p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Scope
              </Box>
              <Box component="th" scope="col" sx={{ textAlign: "left", p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Result
              </Box>
            </Box>
          </Box>
          <Box component="tbody">
            <Box component="tr">
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider", whiteSpace: "nowrap" }}>
                September 2026
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                10 new tool guides
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Sample numbers re-checked; sibling links verified live
              </Box>
            </Box>
            <Box component="tr">
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider", whiteSpace: "nowrap" }}>
                September 2026
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Category introductions
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Top-3 picks and FAQ links checked across all 12 categories
              </Box>
            </Box>
            <Box component="tr">
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider", whiteSpace: "nowrap" }}>
                September 2026
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Browser matrix
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Chrome, Edge, Firefox, Safari on desktop and 360–390px mobile widths
              </Box>
            </Box>
            <Box component="tr">
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider", whiteSpace: "nowrap" }}>
                September 2026
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                YMYL review
              </Box>
              <Box component="td" sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                Finance and health FAQs confirmed above editorial floor with estimate labels
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        component="nav"
        aria-label="Related pages"
        sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2, color: "text.secondary" }}
      >
        <Typography variant="body2">
          <Link href="/author">Our authors</Link>
        </Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2">
          <Link href="/contact">Contact us</Link>
        </Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2">
          <Link href="/terms">Terms of Service</Link>
        </Typography>
      </Box>
    </Container>
  );
}
