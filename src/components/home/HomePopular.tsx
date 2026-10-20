import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { liteGetTool } from "@/lib/tools/catalog-lite";
import { POPULAR_SLUGS } from "@/content/home";

const popular = POPULAR_SLUGS.map((p) => liteGetTool(p.slug)).filter(
  (t): t is NonNullable<typeof t> => Boolean(t)
);

// Most-used tools — compact cards instead of a pill list.
export default function HomePopular() {
  return (
    <Box
      component="section"
      id="popular"
      aria-label="Popular tools"
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        py: { xs: 7, md: 10 },
        scrollMarginTop: 100,
      }}
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
          <Box sx={{ maxWidth: 640 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                fontWeight: 700,
                letterSpacing: "-0.025em",
                mb: 0.5,
              }}
            >
              Popular free online tools
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: "0.9375rem", md: "1rem" } }}>
              The eight tools people open most. No sign-up for any of them.
            </Typography>
          </Box>
          <Link href="#tools" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
            See all tools →
          </Link>
        </Box>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {popular.map((tool) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={tool.slug}>
              <ToolCard tool={tool} dense />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
