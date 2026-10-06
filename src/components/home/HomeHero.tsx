import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import HeroButtons from "@/components/HeroButtons";
import { EXPECTED_TOOL_COUNT, EXPECTED_CATEGORY_COUNT } from "@/lib/tools";

// Hero — H1 exact-match primary keyword, simple English.
export default function HomeHero({ firstSlug }: { firstSlug: string }) {
  return (
    <Box
      component="section"
      className="cinematic-hero"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, px: { xs: 2, md: 4 } }}>
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, lg: 7 }}>
        <Stack
          spacing={4}
          sx={{
            alignItems: "flex-start",
            textAlign: "left",
            maxWidth: 640,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              letterSpacing: "0.08em",
              fontWeight: 700,
              textTransform: "none",
              color: "primary.main",
              border: "1px solid",
              borderColor: "divider",
              px: 2,
              py: 0.75,
              borderRadius: "999px",
              bgcolor: "background.paper",
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)",
            }}
          >
            Most tools run local — no sign-ups.
          </Typography>
          <Typography
            variant="h1"
            sx={{
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              textWrap: "balance",
              fontSize: 'clamp(2.5rem, 1.6rem + 2.2vw, 4.25rem)',
              fontWeight: 800,
              color: "text.primary"
            }}
          >
            Free Online Tools – No Sign-Up, Right in Your Browser
          </Typography>
          <Typography
            variant="body1"
            className="speakable-hero-summary"
            sx={{
              fontWeight: 400,
              color: "text.secondary",
              lineHeight: 1.6,
              letterSpacing: "-0.015em",
              textWrap: "pretty",
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              maxWidth: 560,
            }}
          >
            Use 185 free online tools with no signup and no cost. Format JSON, compress images, and create QR codes in seconds. Your files stay on your device. See our <Link href="/privacy">privacy policy</Link>.
          </Typography>
          <Typography
            variant="body2"
            data-numeric
            sx={{ color: "text.secondary", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
            aria-label={`${EXPECTED_TOOL_COUNT} free tools across ${EXPECTED_CATEGORY_COUNT} categories`}
          >
            {EXPECTED_TOOL_COUNT} free tools · {EXPECTED_CATEGORY_COUNT} categories · no sign-up
          </Typography>
          <Box sx={{ pt: 2 }}>
            <HeroButtons firstSlug={firstSlug} />
          </Box>
        </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }} sx={{ display: { xs: "none", lg: "flex" }, justifyContent: "flex-end" }}>
            <Box
              aria-hidden="true"
              className="glass"
              sx={{
                width: "100%",
                maxWidth: 400,
                borderRadius: "16px",
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="body2" sx={{ letterSpacing: "0.08em", fontWeight: 700 }}>
                {EXPECTED_CATEGORY_COUNT} categories
              </Typography>
              <Typography variant="body1" data-numeric sx={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, fontVariantNumeric: "tabular-nums" }}>
                {EXPECTED_TOOL_COUNT}+ tools
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Free utilities, makers, and generators. Most run offline in your browser. Four tools need internet. See our privacy policy.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
