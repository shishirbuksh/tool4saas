import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlotLazy";
import HeroButtons from "@/components/HeroButtons";
import { tools, toolsByCategoryCached } from "@/lib/tools";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata();

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Premium Hero Section */}
      <Box 
        component="section" 
        className="cinematic-hero" 
        sx={{ 
          pt: { xs: 16, md: 24 }, 
          pb: { xs: 12, md: 20 }, 
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Stack 
            spacing={4} 
            sx={{ 
              alignItems: "center", 
              textAlign: "center", 
              maxWidth: 860, 
              mx: "auto" 
            }}
          >
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.2em",
                fontWeight: 700,
                color: "primary.main",
                border: "1px solid",
                borderColor: "divider",
                px: 2,
                py: 0.75,
                borderRadius: 999,
                bgcolor: "background.paper",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
              }}
            >
              100% FREE • PRIVACY-FIRST
            </Typography>
            <Typography
              variant="h1"
              className="text-gradient"
              sx={{
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                textWrap: "balance",
                fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
                fontWeight: 800,
              }}
            >
              Productivity tools that just work.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                lineHeight: 1.7,
                letterSpacing: "-0.01em",
                textWrap: "balance",
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                maxWidth: 700,
                mx: "auto",
              }}
            >
              Generate professional invoices, QR codes, resumes and count your words — instantly, in your browser, with zero friction and no account required.
            </Typography>
            <Box sx={{ pt: 2 }}>
              <HeroButtons firstSlug={tools[0].slug} />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 }, borderTop: '1px solid', borderColor: 'divider', borderBottom: '1px solid' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              { t: "100% Free Always", d: "All core features are completely free. No trials, no paywalls, no hidden fees, and absolutely no sign-up required." },
              { t: "Private by Design", d: "Your data is yours. Processing happens entirely in your local browser. We never store or transmit your sensitive inputs." },
              { t: "Lightning Fast", d: "Built for speed. Lightweight, optimized pages that load instantly on any device, getting you straight to what matters." },
            ].map((f) => (
              <Grid size={{ xs: 12, md: 4 }} key={f.t}>
                <Stack 
                  spacing={1.5}
                  sx={{ 
                    p: 4, 
                    height: "100%",
                    borderRadius: 4,
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
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
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <AdSlot
          format="leaderboard"
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD || ""}
          label="Advertisement"
        />
      </Container>

      {/* Tools Section */}
      <Container maxWidth="lg" id="tools" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 100 }}>
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 700, mx: 'auto' }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700, letterSpacing: "-0.03em" }}>
            Explore our tools
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem' }}>
            Every tool runs locally in your browser. Fast, secure, and ready when you are.
          </Typography>
        </Box>
        
        {toolsByCategoryCached().map((group) => (
          <Box component="section" id={group.category.id} key={group.category.id} sx={{ mb: 10, scrollMarginTop: 100 }}>
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                {group.category.label}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '1.125rem' }}>
                {group.category.description}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {group.tools.map((tool) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.slug}>
                  <ToolCard tool={tool} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
