import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { NOINDEX_SLUGS, tools, getTool, getCategory } from "@/lib/tools";

export default function RelatedTools({ slug }: { slug: string }) {
  const current = getTool(slug);
  if (!current) return null;
  const cat = getCategory(current.category);
  // Exclude NOINDEX_SLUGS so noindexed placeholders are never linked.
  const sameCat = tools
    .filter((t) => t.category === current.category && t.slug !== slug && !NOINDEX_SLUGS.has(t.slug));
  const crossCat = tools
    .filter((t) => t.category !== current.category && t.slug !== slug && !NOINDEX_SLUGS.has(t.slug));
  const related = [...sameCat, ...crossCat].slice(0, 6);
  if (related.length === 0) return null;

  return (
    <Box component="section" aria-label="Related tools" sx={{ mt: 6 }}>
      <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}>
        More {cat?.label ?? "tools"}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {related.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            underline="none"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
              py: 0.75,
              minHeight: 44,
              borderRadius: "999px",
              border: "1px solid",
              borderColor: "divider",
              color: "text.primary",
              fontSize: "0.875rem",
              bgcolor: "action.hover",
              transition: "border-color 150ms ease, color 150ms ease, background-color 150ms ease",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                bgcolor: "action.selected",
              },
            }}
          >
            {t.title}
          </Link>
        ))}
      </Box>
      {cat && (
        <Box sx={{ mt: 2 }}>
          <Link
            href={`/category/${cat.id}`}
            underline="hover"
            sx={{ fontSize: "0.875rem", fontWeight: 600, color: "primary.main" }}
            aria-label={`View all ${cat.label} tools`}
          >
            View all {cat.label} tools →
          </Link>
        </Box>
      )}
    </Box>
  );
}
