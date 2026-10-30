import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@/lib/astro/navigation";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CalculateIcon from "@mui/icons-material/Calculate";
import CodeIcon from "@mui/icons-material/Code";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SearchIcon from "@mui/icons-material/Search";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TransformIcon from "@mui/icons-material/Transform";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType } from "react";
import { CATEGORIES } from "@/lib/tools/categories";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";

const CATEGORY_ICONS: Record<string, ComponentType<SvgIconProps>> = {
  "text-documents": TextSnippetIcon,
  business: ReceiptLongIcon,
  developer: CodeIcon,
  converters: TransformIcon,
  generators: ShuffleIcon,
  "images-design": ImageIcon,
  pdf: PictureAsPdfIcon,
  calculators: CalculateIcon,
  finance: AccountBalanceIcon,
  health: FitnessCenterIcon,
  seo: SearchIcon,
  time: ScheduleIcon,
};

const counts = new Map(
  liteToolsByCategory().map((g) => [
    g.category.id,
    g.tools.filter((t) => !NOINDEX_SLUGS.has(t.slug)).length,
  ])
);

// Twelve category tiles replace the old horizontal pill scroller.
export default function HomeCategories() {
  return (
    <Box
      component="nav"
      id="categories"
      aria-label="Tool categories"
      sx={{
        py: { xs: 7, md: 10 },
        borderBottom: "1px solid",
        borderColor: "divider",
        scrollMarginTop: 100,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 }, maxWidth: 640, mx: "auto" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              fontWeight: 700,
              letterSpacing: "-0.025em",
              mb: 0.5,
            }}
          >
            Browse by category
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: "0.9375rem", md: "1rem" } }}>
            {CATEGORIES.length} collections, one browser tab.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] ?? TextSnippetIcon;
            const count = counts.get(category.id) ?? 0;
            return (
              <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      minHeight: 84,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: { xs: 1.75, md: 2 },
                      borderRadius: "16px",
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      transition:
                        "transform 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms ease, box-shadow 200ms ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        borderColor: "rgba(0,0,0,0.14)",
                        boxShadow:
                          "0 0 0 1px rgba(0,0,0,0.06), 0 8px 24px rgba(34,29,29,0.07)",
                      },
                      'html[data-theme="dark"] &': {
                        bgcolor: "background.paper",
                      },
                      'html[data-theme="dark"] &:hover': {
                        borderColor: "rgba(255,255,255,0.18)",
                        boxShadow:
                          "0 0 0 1px rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.4)",
                      },
                      "&:active": { transform: "scale(0.99)" },
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        flex: "0 0 auto",
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "rgba(0,0,0,0.04)",
                        color: "text.primary",
                        'html[data-theme="dark"] &': { bgcolor: "rgba(255,255,255,0.07)" },
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.875rem", md: "0.9375rem" },
                          fontWeight: 600,
                          lineHeight: 1.3,
                          letterSpacing: "-0.015em",
                        }}
                      >
                        {category.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.75rem", mt: 0.25 }}
                      >
                        {count} tools
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
