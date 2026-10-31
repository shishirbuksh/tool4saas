import { Box, Typography } from "@/components/ds";

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
      className="mt-10 p-6 rounded-[12px] border border-base-300 bg-base-200/50"
    >
      <Typography component="h2" className="text-[1.1rem] font-extrabold mb-2">
        Sources and further reading
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-3 leading-[1.7]">
        This guide is educational, not medical or financial advice. Primary references:
      </Typography>
      <Box component="ul" className="m-0 pl-5">
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
