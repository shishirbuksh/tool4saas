import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {
  HOME_LATEST_GUIDES,
  HOME_POPULAR_GUIDES,
  type Guide,
} from "@/content/home";

function GuideGrid({ guides }: { guides: Guide[] }) {
  return (
    <Grid container spacing={{ xs: 1.5, md: 2 }}>
      {guides.map((g) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={g.href}>
          <Box
            sx={{
              p: { xs: 2, md: 2.5 },
              borderRadius: "16px",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              contentVisibility: "auto",
              containIntrinsicSize: "auto 200px",
              transition: "border-color 200ms ease, transform 200ms ease",
              "&:hover": { borderColor: "rgba(0,0,0,0.16)", transform: "translateY(-2px)" },
              'html[data-theme="dark"] &:hover': { borderColor: "rgba(255,255,255,0.2)" },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: "text.secondary",
                mb: 0.75,
                fontSize: "0.6875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {g.label} · <time dateTime={g.date}>{g.date}</time>
            </Typography>
            <Link href={g.href} style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                component="h4"
                sx={{
                  fontSize: { xs: "1.0625rem", md: "1.125rem" },
                  fontWeight: 700,
                  lineHeight: 1.35,
                  letterSpacing: "-0.015em",
                  mb: 0.75,
                  textWrap: "balance",
                }}
              >
                {g.title}
              </Typography>
            </Link>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.55,
                mb: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {g.desc}
            </Typography>
            <Link
              href={g.href}
              aria-label={`Read guide: ${g.title}`}
              style={{ fontWeight: 600, fontSize: "0.8125rem", marginTop: "auto" }}
            >
              Read guide →
            </Link>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

// Popular + recent guides merged into one compact section.
export default function HomeGuides() {
  return (
    <Box
      component="section"
      id="guides"
      aria-label="Guides and tutorials"
      sx={{ py: { xs: 7, md: 10 }, scrollMarginTop: 100 }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 2,
            mb: { xs: 3, md: 4 },
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ maxWidth: 620 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                fontWeight: 700,
                letterSpacing: "-0.025em",
                mb: 0.5,
              }}
            >
              Guides and tutorials
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: "0.9375rem", md: "1rem" } }}>
              Practical walkthroughs. Each guide links back to a free tool.
            </Typography>
          </Box>
          <Link href="/blog" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
            All guides →
          </Link>
        </Box>

        <Box id="popular-posts" sx={{ mb: { xs: 4, md: 5 }, scrollMarginTop: 100 }}>
          <Typography
            component="h3"
            variant="overline"
            sx={{ display: "block", color: "text.secondary", mb: 1.5, fontWeight: 700 }}
          >
            Most read
          </Typography>
          <GuideGrid guides={HOME_POPULAR_GUIDES} />
        </Box>

        <Box id="recent-posts" sx={{ scrollMarginTop: 100 }}>
          <Typography
            component="h3"
            variant="overline"
            sx={{ display: "block", color: "text.secondary", mb: 1.5, fontWeight: 700 }}
          >
            Latest
          </Typography>
          <GuideGrid guides={HOME_LATEST_GUIDES} />
        </Box>
      </Container>
    </Box>
  );
}
