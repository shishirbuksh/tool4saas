import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import type { ToolLink } from "@/lib/tool-view";

// Prop-driven related-tool chips. The candidate list is computed on the server
// (same category first, then cross-category, noindex slugs excluded) so this
// component stays free of the tool registry.
export default function RelatedTools({
  tools: related,
  heading,
}: {
  tools: ToolLink[];
  heading: string;
}) {
  if (related.length === 0) return null;

  return (
    <Box component="section" aria-label="Related tools" sx={{ mt: 6 }}>
      <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}>
        {heading}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {related.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            underline="none"
            title={`${t.title} – ${t.short} (free, no signup)`}
            aria-label={`Open ${t.title} tool – ${t.short}, free`}
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
              typography: "body2",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { borderColor: "primary.main", color: "primary.main" },
            }}
          >
            {t.title}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
