import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { HOME_GUIDES } from "@/content/home";

export default function HomeGuides() {
  return (
    <Box
      component="section"
      id="guides"
      aria-labelledby="guides-heading"
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
              component="h2"
              id="guides-heading"
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
          <Link href="/guides" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
            All guides →
          </Link>
        </Box>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {HOME_GUIDES.map((guide) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={guide.href}>
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
                  transition: "border-color 200ms ease, transform 200ms ease",
                  "&:hover": {
                    borderColor: "rgba(0,0,0,0.16)",
                    transform: "translateY(-2px)",
                  },
                  'html[data-theme="dark"] &:hover': {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
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
                  {guide.label} · <time dateTime={guide.date}>{guide.date}</time>
                </Typography>
                <Link href={guide.href} style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: { xs: "1.0625rem", md: "1.125rem" },
                      fontWeight: 700,
                      lineHeight: 1.35,
                      letterSpacing: "-0.015em",
                      mb: 0.75,
                      textWrap: "balance",
                    }}
                  >
                    {guide.title}
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
                  {guide.desc}
                </Typography>
                <Link
                  href={guide.href}
                  aria-label={`Read guide: ${guide.title}`}
                  style={{ fontWeight: 600, fontSize: "0.8125rem", marginTop: "auto" }}
                >
                  Read guide →
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
