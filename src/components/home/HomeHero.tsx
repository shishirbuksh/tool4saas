import { Container, Box, Stack, Typography } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import ToolSearch from "@/components/ToolSearch";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools/counts";

const QUICK_LINKS = [
  { slug: "invoice-generator", label: "Invoice" },
  { slug: "qr-code-generator", label: "QR code" },
  { slug: "word-counter", label: "Word counter" },
  { slug: "json-formatter", label: "JSON formatter" },
  { slug: "pdf-merge", label: "PDF merge" },
];

// Hero — one keyword-led H1, one search field, five quick links.
export default function HomeHero() {
  return (
    <Box
      component="section"
      aria-label="Free online tools"
      className="relative overflow-hidden border-b border-base-300 pt-14 md:pt-22 pb-16 md:pb-24 dark:[background-image:radial-gradient(900px_380px_at_50%_-8%,_rgba(255,255,255,0.06),_transparent_72%)]" style={{ backgroundImage: "radial-gradient(900px 380px at 50% -8%, rgba(17,17,17,0.05), transparent 72%)" }}
    >
      <Container maxWidth="lg" className="px-4 md:px-8">
        <Stack
          spacing={{ xs: 2.5, md: 3 }}
          className="items-center text-center max-w-[780px] mx-auto"
        >
          <Typography
            variant="body2"
            className="tracking-[0.08em] font-bold text-base-content/70 border border-base-300 px-4 py-1.5 rounded-full bg-base-100"
          >
            {VISIBLE_TOOL_COUNT} free tools · no sign-up · local-first
          </Typography>

          <Typography
            variant="h1"
            className="text-base-content text-[clamp(2.4rem,_1.6rem_+_2.4vw,_4rem)] leading-[1.05] tracking-[-0.04em] font-extrabold text-balance"
          >
            Free online tools, right in your browser
          </Typography>

          <Typography
            variant="body1"
            className="speakable-hero-summary text-base-content/70 text-[1.0625rem] md:text-[1.1875rem] leading-[1.6] text-pretty max-w-[640px]"
            
          >
            Format JSON, merge PDFs, compress images, or make an invoice in seconds. No
            account needed — most tools run entirely on your device.
          </Typography>

          <Box className="w-full max-w-[620px] pt-1 md:pt-2">
            <ToolSearch
              variant="hero"
              placeholder={`Search ${VISIBLE_TOOL_COUNT} tools — invoice, JSON, QR code…`}
            />
          </Box>

          <Box
            className="flex flex-wrap gap-2 justify-center pt-1"
          >
            {QUICK_LINKS.map((q) => (
              <Link key={q.slug} href={`/${q.slug}`} style={{ textDecoration: "none" }}>
                <Box
                  className="inline-flex items-center min-h-[44px] px-4 rounded-[7992px] border border-base-300 bg-base-100 text-[0.875rem] font-semibold text-base-content hover:border-base-content hover:[transform:translateY(-1px)]" style={{ transition: "border-color 150ms ease, transform 150ms ease" }}
                >
                  {q.label}
                </Box>
              </Link>
            ))}
          </Box>

          <Typography variant="body2" color="text.secondary" className="pt-1">
            No sign-up · Local-first · Free to use ·{" "}
            <Link href="#tools">Browse all {VISIBLE_TOOL_COUNT} tools</Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
