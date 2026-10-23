import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
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
      sx={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid",
        borderColor: "divider",
        pt: { xs: 7, md: 11 },
        pb: { xs: 8, md: 12 },
        backgroundImage:
          "radial-gradient(900px 380px at 50% -8%, rgba(17,17,17,0.05), transparent 72%)",
        'html[data-theme="dark"] &': {
          backgroundImage:
            "radial-gradient(900px 380px at 50% -8%, rgba(255,255,255,0.06), transparent 72%)",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Stack
          spacing={{ xs: 2.5, md: 3 }}
          sx={{ alignItems: "center", textAlign: "center", maxWidth: 780, mx: "auto" }}
        >
          <Typography
            variant="body2"
            sx={{
              letterSpacing: "0.08em",
              fontWeight: 700,
              color: "text.secondary",
              border: "1px solid",
              borderColor: "divider",
              px: 2,
              py: 0.75,
              borderRadius: "999px",
              bgcolor: "background.paper",
            }}
          >
            {VISIBLE_TOOL_COUNT} free tools · no sign-up · local-first
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: "clamp(2.4rem, 1.6rem + 2.4vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              fontWeight: 800,
              textWrap: "balance",
            }}
          >
            Free online tools, right in your browser
          </Typography>

          <Typography
            variant="body1"
            className="speakable-hero-summary"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1.0625rem", md: "1.1875rem" },
              lineHeight: 1.6,
              textWrap: "pretty",
              maxWidth: 640,
            }}
          >
            Format JSON, merge PDFs, compress images, or make an invoice in seconds. No
            account needed — most tools run entirely on your device.
          </Typography>

          <Box sx={{ width: "100%", maxWidth: 620, pt: { xs: 0.5, md: 1 } }}>
            <ToolSearch
              variant="hero"
              placeholder={`Search ${VISIBLE_TOOL_COUNT} tools — invoice, JSON, QR code…`}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
              pt: 0.5,
            }}
          >
            {QUICK_LINKS.map((q) => (
              <Link key={q.slug} href={`/${q.slug}`} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 44,
                    px: 2,
                    borderRadius: 999,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "text.primary",
                    transition: "border-color 150ms ease, transform 150ms ease",
                    "&:hover": { borderColor: "text.primary", transform: "translateY(-1px)" },
                  }}
                >
                  {q.label}
                </Box>
              </Link>
            ))}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ pt: 0.5 }}>
            No sign-up · Local-first · Free to use ·{" "}
            <Link href="#tools">Browse all {VISIBLE_TOOL_COUNT} tools</Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
