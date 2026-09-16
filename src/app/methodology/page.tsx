import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = staticPageMetadata({
  title: "How We Test Tools",
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
