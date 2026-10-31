import { Box, Typography, Link } from "@/components/ds";

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
    <Box component="section" aria-label="Related tools" className="mt-12">
      <Typography variant="h2" className="text-[1.5rem] md:text-[2rem] mb-4">
        {heading}
      </Typography>
      <Box className="flex flex-wrap gap-2">
        {related.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            underline="none"
            title={`${t.title} – ${t.short} (free, no signup)`}
            aria-label={`Open ${t.title} tool – ${t.short}, free`}
            className="inline-flex items-center justify-center px-4 py-1.5 min-h-[44px] rounded-full border border-base-300 text-base-content font-semibold no-underline hover:border-primary hover:text-primary"
          >
            {t.title}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
