import { Container, Stack, Typography } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import ToolSearch from "@/components/ToolSearch";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools/counts";

const QUICK_LINKS = [
  { slug: "invoice-generator", label: "Invoice" },
  { slug: "qr-code-generator", label: "QR code" },
  { slug: "word-counter", label: "Word counter" },
  { slug: "json-formatter", label: "JSON formatter" },
  { slug: "pdf-merge", label: "PDF merge" },
  { slug: "image-compressor", label: "Image compressor" },
  { slug: "mortgage-calculator", label: "Mortgage" },
  { slug: "emi-calculator", label: "EMI calculator" },
  { slug: "bmi-calculator", label: "BMI calculator" },
  { slug: "percentage-calculator", label: "Percentage" },
];

// Hero — one keyword-led H1, one search field, five quick links.
export default function HomeHero() {
  return (
    <section
      aria-label="Free online tools"
      className="relative overflow-hidden border-b border-base-300 pt-16 md:pt-24 pb-16 md:pb-24 dark:[background-image:radial-gradient(1000px_480px_at_50%_-12%,_rgba(71,194,255,0.12)_0%,_rgba(13,116,206,0.05)_50%,_transparent_80%)]"
      style={{
        backgroundImage:
          "radial-gradient(1100px 520px at 50% -12%, rgba(207, 231, 255, 0.72) 0%, rgba(168, 200, 232, 0.24) 45%, transparent 75%)",
      }}
    >
      <Container maxWidth="xl" className="px-4 md:px-8">
        <Stack
          spacing={{ xs: 2.5, md: 3 }}
          className="items-center text-center max-w-[780px] mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-base-content/80 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {VISIBLE_TOOL_COUNT} free tools · no sign-up · local-first
          </div>

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

          <div className="w-full max-w-[620px] pt-1 md:pt-2">
            <ToolSearch
              id="hero-search"
              variant="hero"
              placeholder={`Search ${VISIBLE_TOOL_COUNT} tools — invoice, JSON, QR code…`}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center pt-1">
            {QUICK_LINKS.map((q) => (
              <Link key={q.slug} href={`/${q.slug}`} style={{ textDecoration: "none" }}>
                <div className="inline-flex items-center min-h-[38px] px-3.5 rounded-lg border border-base-300 bg-base-100 text-[0.875rem] font-medium text-base-content transition-all hover:border-base-content/30 hover:bg-base-200/50 hover:shadow-xs active:scale-[0.98]">
                  {q.label}
                </div>
              </Link>
            ))}
          </div>

          <Typography variant="body2" color="text.secondary" className="pt-1">
            No sign-up · Local-first · Free to use ·{" "}
            <Link href="#tools">Browse all {VISIBLE_TOOL_COUNT} tools</Link>
          </Typography>
        </Stack>
      </Container>
    </section>
  );
}
