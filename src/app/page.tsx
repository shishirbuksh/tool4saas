import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AdSlot from "@/components/AdSlotLazy";
import HeroButtons from "@/components/HeroButtons";
import PaginatedToolGrid from "@/components/PaginatedToolGrid";
import { HomeToolsItemList } from "@/components/SiteJsonLd";
import { tools, toolsByCategoryCached, EXPECTED_TOOL_COUNT, EXPECTED_CATEGORY_COUNT } from "@/lib/tools";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata();

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'clip' }}>
      {/* Premium Hero Section */}
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
            <Grid size={{ xs: 12, md: 7 }}>
          <Stack
            spacing={4}
            sx={{
              alignItems: "flex-start",
              textAlign: "left",
              maxWidth: 640,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.15em",
                fontWeight: 700,
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
              100% LOCAL. ZERO SIGN-UPS.
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
              Every tool you need. Right in your browser.
            </Typography>
            <Typography
              variant="body1"
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
              Format JSON, compress images, and generate QR codes instantly. {EXPECTED_TOOL_COUNT} utilities that run locally on your device—without sending a single byte to a server.
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
              <HeroButtons firstSlug={tools[0].slug} />
            </Box>
          </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
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
                <Typography variant="overline" sx={{ letterSpacing: "0.2em", fontWeight: 700 }}>
                  {EXPECTED_CATEGORY_COUNT} categories
                </Typography>
                <Typography variant="h3" data-numeric sx={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, fontVariantNumeric: "tabular-nums" }}>
                  {EXPECTED_TOOL_COUNT}+ tools
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bento preview — first tool below is featured larger. Everything runs locally.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 }, borderTop: '1px solid', borderColor: 'divider', borderBottom: '1px solid', overflowX: 'clip' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            {[
              { t: "Get it done.", d: "Draft invoices, decode JWTs, or preview Open Graph cards. One searchable library for all your dev and design needs." },
              { t: "Zero server uploads.", d: "Shrink JPGs and diff files directly in the browser. Your data never leaves your device and clears when you close the tab." },
              { t: "Instant exports.", d: "Copy HEX values in one click, or download PNG, SVG, and CSV files optimized for your workflow." },
            ].map((f) => (
              <Grid size={{ xs: 12, md: 4 }} key={f.t}>
                <Stack 
                  spacing={1.5}
                  sx={{ 
                    p: 4, 
                    height: "100%",
                    borderRadius: "16px",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)",
                    contentVisibility: "auto",
                    containIntrinsicSize: "0 280px",
                    transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1)",
                    '&:hover': {
                      transform: 'translateY(-2px) scale(1.01)',
                      borderColor: "rgba(0,0,0,0.12)",
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 12px 32px rgba(34,29,29,0.08), 0 4px 12px rgba(34,29,29,0.05)"
                    },
                    '&:active': { transform: 'scale(0.99)', transitionDuration: '100ms' }
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}>
                    {f.t}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {f.d}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Mid-page Ad */}
      <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
        <AdSlot
          format="leaderboard"
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD || ""}
          label="Advertisement"
        />
      </Container>

      {/* Tools Section */}
      <Container maxWidth="xl" id="tools" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, scrollMarginTop: 100, overflowX: 'clip' }}>
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 700, mx: 'auto' }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            All Tools
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem' }}>
            Search or browse through {EXPECTED_TOOL_COUNT} local utilities. No paywalls, no limits.
          </Typography>
        </Box>
        
        <PaginatedToolGrid groups={toolsByCategoryCached()} />
      </Container>
    </Box>
  );
}
