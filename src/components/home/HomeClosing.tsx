import { Container, Box, Grid, Stack, Typography, Button } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools/counts";
import { HOME_MODIFIED } from "@/lib/edit-dates.generated";

const lastUpdated = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${HOME_MODIFIED}T00:00:00Z`));

// Short "What is Tool4SaaS" + final CTA.
export default function HomeClosing() {
  return (
    <Box
      component="section"
      id="about-tools"
      aria-label="About Tool4SaaS"
      className="py-16 md:py-24 scroll-mt-[100px]"
    >
      <Container maxWidth="xl" className="px-4 md:px-8">
        <Grid container spacing={{ xs: 5, md: 8 }} className="items-center">
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box className="max-w-[680px]">
              <Typography
                variant="h2"
                className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.025em] mb-2"
              >
                What is Tool4SaaS?
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mb-4">
                Reviewed by the Tool4SaaS Editorial Team · Last updated{" "}
                <time dateTime={HOME_MODIFIED}>{lastUpdated}</time> ·{" "}
                <Link href="/author">Authors</Link> ·{" "}
                <Link href="/methodology">How we test</Link> ·{" "}
                <Link href="/contact">Contact us</Link>
              </Typography>
              <Typography color="text.secondary" className="mb-4 leading-[1.75]">
                Tool4SaaS is a free collection of {VISIBLE_TOOL_COUNT} browser tools for
                text, files, images, and money. Students <Link href="/word-counter">count words</Link>{" "}
                and <Link href="/gpa-calculator">check grades</Link>; freelancers{" "}
                <Link href="/invoice-generator">make invoices</Link> and{" "}
                <Link href="/qr-code-generator">QR codes</Link>; developers{" "}
                <Link href="/json-formatter">format JSON</Link> and{" "}
                <Link href="/regex-tester">test regex</Link>. No account is needed.
              </Typography>
              <Typography color="text.secondary" className="leading-[1.75]">
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
              className="rounded-xl border border-base-300 bg-base-100 shadow-[var(--shadow-md)] p-6 md:p-8 flex flex-col gap-4"
            >
              <Typography
                variant="h3"
                className="text-[1.375rem] md:text-[1.625rem] font-bold tracking-[-0.02em]"
              >
                Start with a tool, not a sign-up
              </Typography>
              <Typography color="text.secondary" className="leading-[1.6]">
                Open a tool, finish the job, and close the tab. No account. Most tools
                process files locally; live-data tools need an internet connection.
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
