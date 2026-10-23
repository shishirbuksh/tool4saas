import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getGuideSources } from "@/lib/blog-sources";

// Visible counterpart to the BlogPosting `citation` array. YMYL only; unknown
// pillars render nothing so non-YMYL posts are untouched.
export default function BlogSources({ pillar }: { pillar: string }) {
  const sources = getGuideSources(pillar);
  if (sources.length === 0) return null;
  return (
    <Box
      component="aside"
      aria-label="Sources and further reading"
      sx={{
        mt: 5,
        p: 3,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "action.hover",
      }}
    >
      <Typography component="h2" sx={{ fontSize: "1.1rem", fontWeight: 800, mb: 1 }}>
        Sources and further reading
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.7 }}>
        This guide is educational, not medical or financial advice. Primary references:
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
        {sources.map((source) => (
          <li key={source.href} style={{ marginBottom: 6 }}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 600 }}
            >
              {source.label}
            </a>
            <Typography component="span" variant="body2" color="text.secondary">
              {" "}
              ({new URL(source.href).hostname.replace(/^www\./, "")})
            </Typography>
          </li>
        ))}
      </Box>
    </Box>
  );
}
