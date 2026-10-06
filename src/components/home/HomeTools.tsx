import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import AdSlot from "@/components/AdSlotLazy";
import { EXPECTED_TOOL_COUNT, type Category } from "@/lib/tools";
// Lite groups: full Tool objects (faq/howTo/guide bodies) must never reach
// client props — they bloat the RSC payload + hydration parse on mobile.
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";

// Below-fold grid ships in its own chunk (SSR HTML preserved for SEO/crawlers,
// JS parses + hydrates off the critical path). Skeleton reserves layout (CLS).
const PaginatedToolGrid = dynamic(() => import("@/components/PaginatedToolGrid"), {
  loading: () => (
    <Box aria-hidden="true" sx={{ minHeight: { xs: 1200, md: 1600 } }}>
      <Skeleton variant="rounded" width="100%" height={1200} sx={{ maxHeight: "60vh" }} />
    </Box>
  ),
});

// Features grid + all-tools grid + mid-page ad.
export default function HomeTools({ hubA, hubB }: { hubA?: Category; hubB?: Category }) {
  return (
    <>
      {/* Features Grid — kept lean, proper H2 parent */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 }, borderBottom: '1px solid', borderColor: 'divider', overflowX: 'clip' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.4rem, 3vw, 2rem)', textAlign: 'center' }}>
            Why use Tool4SaaS free browser tools
          </Typography>
          <Grid container spacing={4}>
            {[
              { t: "Get it done.", d: "Draft invoices, decode JWTs, or preview Open Graph cards. One searchable library for dev, design, and daily jobs." },
              { t: "Local-first processing.", d: "Most tools shrink JPGs and diff files directly in the browser. Nothing is uploaded. Four tools need internet — see our privacy policy." },
              { t: "Instant exports.", d: "Copy HEX values in one click. Download PNG, SVG, and CSV files made for your workflow." },
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
                  <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: "-0.01em", fontSize: '1.125rem' }}>
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

      {/* Tools Section */}
      <Container maxWidth="xl" id="tools" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, scrollMarginTop: 100, overflowX: 'clip' }}>
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 700, mx: 'auto' }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Browse all free browser tools by category
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem' }}>
            Search or browse {EXPECTED_TOOL_COUNT} free utilities, makers, and generators. Most run locally. No paywalls, no limits.
          </Typography>
          {hubA && hubB && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
              Start with the <Link href={`/category/${hubA.id}`}>{hubA.label}</Link> and{" "}
              <Link href={`/category/${hubB.id}`}>{hubB.label}</Link> collections.
            </Typography>
          )}
        </Box>

        <PaginatedToolGrid groups={liteToolsByCategory()} />
      </Container>

      {/* Mid-page Ad — after value, below fold, lazy, fixed reserve kills CLS */}
      <Container maxWidth="xl" sx={{ pb: 6, px: { xs: 2, md: 4 } }}>
        <Box sx={{ minHeight: { xs: 100, md: 250 }, contentVisibility: "auto", containIntrinsicSize: "auto 250px" }}>
          <AdSlot
            format="leaderboard"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD || ""}
            label="Advertisement"
          />
        </Box>
      </Container>
    </>
  );
}
