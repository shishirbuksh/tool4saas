import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools";

// Short "What is Tool4SaaS" + final CTA.
export default function HomeClosing() {
  return (
    <Box
      component="section"
      id="about-tools"
      aria-label="About Tool4SaaS"
      sx={{
        py: { xs: 8, md: 12 },
        scrollMarginTop: 100,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box sx={{ maxWidth: 680 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  mb: 1,
                }}
              >
                What is Tool4SaaS?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Reviewed by the Tool4SaaS Editorial Team · Last updated{" "}
                <time dateTime="2026-10-20">October 20, 2026</time> ·{" "}
                <Link href="/author">Authors</Link> ·{" "}
                <Link href="/methodology">How we test</Link> ·{" "}
                <Link href="/contact">Contact us</Link>
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.75 }}>
                Tool4SaaS is a free collection of {VISIBLE_TOOL_COUNT} browser tools for
                text, files, images, and money. Students <Link href="/word-counter">count words</Link>{" "}
                and <Link href="/gpa-calculator">check grades</Link>; freelancers{" "}
                <Link href="/invoice-generator">make invoices</Link> and{" "}
                <Link href="/qr-code-generator">QR codes</Link>; developers{" "}
                <Link href="/json-formatter">format JSON</Link> and{" "}
                <Link href="/regex-tester">test regex</Link>. No account is needed.
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                Most tools run locally, so your files never leave your device. Every tool is
                built and tested in-house against known values — see our{" "}
                <Link href="/privacy">privacy policy</Link> and{" "}
                <Link href="/methodology">methodology</Link>.
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Box
              aria-label="Get started"
              sx={{
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                boxShadow: "var(--shadow-md)",
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: "1.375rem", md: "1.625rem" }, fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                Start with a tool, not a sign-up
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Open a tool, finish the job, and close the tab. No account, no uploads, no
                limits.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row", lg: "column" }} spacing={1.5}>
                <Button href="#tools" variant="contained" size="large">
                  Browse all {VISIBLE_TOOL_COUNT} tools
                </Button>
                <Button href="/blog" variant="outlined" size="large">
                  Read the guides
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
