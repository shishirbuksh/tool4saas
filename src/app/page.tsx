import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlotLazy";
import HeroButtons from "@/components/HeroButtons";
import { tools, toolsByCategoryCached } from "@/lib/tools";
import { siteConfig } from "@/lib/site";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata();

export default function HomePage() {
  return (
    <Box>
      {/* Hero */}
      <Box className="cinematic-hero" sx={{ py: { xs: 12, md: 12 }, position: "relative" }}>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            className="glass"
            sx={{
              p: { xs: 4, md: 7 },
              borderRadius: 5,
              maxWidth: 940,
              textAlign: { xs: "center", md: "left" },
              boxShadow: "0 30px 80px rgba(15,23,42,0.18)",
            }}
          >
            <Stack spacing={3} sx={{ alignItems: { xs: "center", md: "flex-start" } }}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                  color: "primary.main",
                  border: "1px solid",
                  borderColor: "divider",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 999,
                }}
              >
                100% FREE - PRIVACY-FIRST
              </Typography>
              <Typography
                variant="h1"
                className="text-gradient"
                sx={{
                  maxWidth: 760,
                  // fluid display — theme clamp, but ensure hero hits 60px on xl while keeping 1.1 LH, -0.03 tracking
                  fontFamily: "var(--font-display), Fraunces, Georgia, serif",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  textWrap: "balance",
                }}
              >
                Free productivity tools that just work
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  maxWidth: 620,
                  color: "text.secondary",
                  lineHeight: 1.6,
                  letterSpacing: "-0.015em",
                  textWrap: "pretty",
                }}
              >
                Generate professional invoices, QR codes, resumes and count your words — instantly, in your browser, with no account needed.
              </Typography>
              <HeroButtons firstSlug={tools[0].slug} />
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Tools grouped by category */}
      <Container maxWidth="lg" id="tools" sx={{ py: 8, scrollMarginTop: 88 }}>
        <Typography variant="h2" gutterBottom>
          Our tools
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 640 }}>
          Every tool runs locally in your browser. Your data never leaves your device unless you choose to download it.
        </Typography>
        {toolsByCategoryCached().map((group) => (
          <Box component="section" id={group.category.id} key={group.category.id} sx={{ mb: 6, scrollMarginTop: 88, contentVisibility: "auto", containIntrinsicSize: "0 600px" }}>
            <Typography variant="h3" gutterBottom>
              {group.category.label}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 640 }}>
              {group.category.description}
            </Typography>
            <Grid container spacing={3}>
              {group.tools.map((tool) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tool.slug}>
                  <ToolCard tool={tool} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>

      {/* Mid-page ad */}
      <Container maxWidth="lg">
        <AdSlot
          format="leaderboard"
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD || ""}
          label="Advertisement"
        />
      </Container>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {[
            { t: "100% Free", d: "All core features are free. No trials, no paywalls, no sign-up." },
            { t: "Private by design", d: "Processing happens in your browser. We don't store your inputs." },
            { t: "Fast & mobile-ready", d: "Lightweight pages that load instantly on any device." },
          ].map((f) => (
            <Grid size={{ xs: 12, md: 4 }}  key={f.t}>
              <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 3, border: "1px solid", borderColor: "divider", height: "100%" }}>
                 <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: 18, mb: 1 }}>{f.t}</Typography>
                <Typography variant="body2" color="text.secondary">{f.d}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {new Date().getFullYear()} {siteConfig.name}. Built for productivity.
        </Typography>
      </Container>
    </Box>
  );
}
