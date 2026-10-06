import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { POPULAR_GUIDES, RECENT_GUIDES, type Guide } from "@/content/home";

function GuideGrid({ guides }: { guides: Guide[] }) {
  return (
    <Grid container spacing={3}>
      {guides.map((g) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={g.href}>
          <Box sx={{ p: 3, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", height: "100%", contentVisibility: "auto", containIntrinsicSize: "auto 300px" }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main", mb: 1, fontSize: '0.75rem', letterSpacing: "0.06em" }}>
              {g.label} · <time dateTime={g.date}>{g.date}</time>
            </Typography>
            <Link href={g.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 700, mb: 1, lineHeight: 1.4 }}>
                {g.title}
              </Typography>
            </Link>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              {g.desc}
            </Typography>
            <Link href={g.href} aria-label={`Read guide: ${g.title}`} style={{ fontWeight: 700, fontSize: '0.875rem' }}>
              Read guide →
            </Link>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

// Popular + recent post grids.
export default function HomeGuides() {
  return (
    <>
      {/* Popular Posts — evergreen high-intent clusters */}
      <Container maxWidth="xl" sx={{ pb: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" id="popular-posts" aria-label="Popular posts" sx={{ scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}>
          <Box sx={{ textAlign: 'center', mb: 4, maxWidth: 700, mx: 'auto' }}>
            <Typography variant="body2" sx={{ letterSpacing: "0.08em", fontWeight: 700, color: "primary.main", mb: 1 }}>
              Popular — most-read tutorials
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', mb: 1 }}>
              Popular posts readers love
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Evergreen winners for jobs, QR payments, home loans, GST and word count.
            </Typography>
          </Box>
          <GuideGrid guides={POPULAR_GUIDES} />
        </Box>
      </Container>

      {/* Recent Posts — 6 pillars sorted by updated date (newest first) */}
      <Container maxWidth="xl" sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" id="recent-posts" aria-label="Recent posts" sx={{ scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}>
          <span id="guides" style={{ scrollMarginTop: 100 }} aria-hidden="true" />
          <Box sx={{ textAlign: 'center', mb: 4, maxWidth: 700, mx: 'auto' }}>
            <Typography variant="body2" sx={{ letterSpacing: "0.08em", fontWeight: 700, color: "primary.main", mb: 1 }}>
              Fresh — latest guides
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', mb: 1 }}>
              Recent posts and tutorials
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Newest pillar guides first. Each guide links back to its free tool.
            </Typography>
          </Box>
          <GuideGrid guides={RECENT_GUIDES} />
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Link href="/blog" aria-label="View all blog guides" style={{ fontWeight: 700 }}>
              View all guides →
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
