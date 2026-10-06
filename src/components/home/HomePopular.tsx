import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { getTool, toolsByCategoryCached } from "@/lib/tools";
import { POPULAR_SLUGS } from "@/content/home";

type HubGroups = ReturnType<typeof toolsByCategoryCached>;

// Popular pills + categories teaser.
export default function HomePopular({ hubGroups }: { hubGroups: HubGroups }) {
  return (
    <>
      {/* Popular Tools — 8 pills, SSR links */}
      <Box component="section" id="popular" aria-label="Popular tools" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: { xs: 4, md: 6 }, scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 200px" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.4rem, 3vw, 2rem)', mb: 1 }}>
            Popular free online tools, no sign-up needed
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            8 most-used free tools for code, money, text, and daily jobs.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
            {POPULAR_SLUGS.map((p) => {
              const t = getTool(p.slug);
              const label = t?.title ?? p.slug;
              return (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  aria-label={`${label} — ${p.benefit}`}
                  data-track="popular-pill"
                  data-slug={p.slug}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: 44,
                      padding: '0 20px',
                      borderRadius: 999,
                      border: '1px solid',
                      borderColor: 'divider',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'text.primary',
                    }}
                  >
                    {label}
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Categories teaser — pill scroll, no H3s, no descs (dedup) */}
      <Box component="nav" id="categories" aria-label="Tool categories" sx={{ bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider', py: 3, scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 120px" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', textAlign: 'center', mb: 2 }}>
            Browse 12 free tool categories (no sign-up)
          </Typography>
          {/* Desktop: wrapped centered grid (all 12 visible, no cut-off).
              Mobile: snap scroll with hidden scrollbar + edge fade. */}
          <Box
            component="ul"
            sx={{
              display: 'flex',
              gap: 1,
              listStyle: 'none',
              m: 0,
              p: 0,
              pb: { xs: 1, md: 0 },
              flexWrap: { xs: 'nowrap', md: 'wrap' },
              overflowX: { xs: 'auto', md: 'visible' },
              justifyContent: { xs: 'flex-start', md: 'center' },
              scrollSnapType: { xs: 'x mandatory', md: 'none' },
              scrollbarWidth: { xs: 'none', md: 'auto' },
              '&::-webkit-scrollbar': { display: { xs: 'none', md: 'block' } },
              maskImage: { xs: 'linear-gradient(to right, black 94%, transparent)', md: 'none' },
              WebkitMaskImage: { xs: 'linear-gradient(to right, black 94%, transparent)', md: 'none' },
            }}
          >
            {hubGroups.map((g) => {
              const visible = g.tools.filter((t) => t.slug !== "pdf-compress").length;
              return (
                <Box component="li" key={g.category.id} sx={{ flex: { xs: '0 0 auto', md: '0 1 auto' }, scrollSnapAlign: { xs: 'start', md: 'none' } }}>
                  <Link href={`/category/${g.category.id}`} aria-label={`View all ${visible} ${g.category.label} tools`} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 16px', borderRadius: 999, border: '1px solid', borderColor: 'divider', fontWeight: 600, fontSize: '0.875rem', color: 'text.primary', bgcolor: 'background.paper', whiteSpace: 'nowrap' }}>
                      {g.category.label} — {visible}
                    </Box>
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </>
  );
}
