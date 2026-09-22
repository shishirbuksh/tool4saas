"use client";

/**
 * PaginatedToolGrid — client wrapper around the homepage ToolCard Grid.
 *
 * - Renders only INITIAL_VISIBLE (=24) ToolCards in the initial SSR HTML to reduce LCP / DOM weight
 *   (was previously a flat 121/123-card Grid). Remaining cards are progressively revealed via useState +
 *   IntersectionObserver sentinel (auto-load) and an explicit “Load More” button (a11y fallback).
 * - Each ToolCard already has `contentVisibility: auto` + `containIntrinsicSize: 0 280px` for off-screen
 *   rendering savings; pagination ensures the initial HTML itself is 24 nodes, not 121+.
 * - SEO: all tool URLs remain crawlable via `src/app/sitemap.ts` (toolRoutes) even though they are not all
 *   in the initial homepage HTML. The sitemap is the crawlable source of truth.
 */
import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToolCard from "@/components/ToolCard";
import { NOINDEX_SLUGS } from "@/lib/tools";
import type { Category, Tool } from "@/lib/tools";

type Group = {
  category: Category;
  tools: Tool[];
};

const INITIAL_VISIBLE = 12;
const STEP = 12;

export default function PaginatedToolGrid({ groups }: { groups: Group[] }) {
  const [visible, setVisible] = React.useState(INITIAL_VISIBLE);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  // Filter NOINDEX_SLUGS (e.g. pdf-compress placeholder) so the visible
  // grid, counts and no-JS fallback match the sitemap / ItemList exclusion.
  const filteredGroups: Group[] = React.useMemo(
    () =>
      groups
        .map((g) => ({
          category: g.category,
          tools: g.tools.filter((t) => !NOINDEX_SLUGS.has(t.slug)),
        }))
        .filter((g) => g.tools.length > 0),
    [groups]
  );

  const total = React.useMemo(
    () => filteredGroups.reduce((acc, g) => acc + g.tools.length, 0),
    [filteredGroups]
  );

  const canLoadMore = visible < total;

  const handleLoadMore = React.useCallback(() => {
    setVisible((v) => Math.min(v + STEP, total));
  }, [total]);

  React.useEffect(() => {
    if (!canLoadMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + STEP, total));
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [canLoadMore, total]);

  // Preserve category grouping while globally capping to `visible` tools.
  // Iterate groups in order, slicing each group's tools by remaining budget.
  let remaining = visible;
  const visibleGroups: Group[] = [];
  for (const g of filteredGroups) {
    if (remaining <= 0) break;
    const slice = g.tools.slice(0, remaining);
    if (slice.length > 0) {
      visibleGroups.push({ category: g.category, tools: slice });
      remaining -= slice.length;
    }
  }

  return (
    <>
      {visibleGroups.map((group) => {
        const fullCount =
          filteredGroups.find((g) => g.category.id === group.category.id)?.tools
            .length ?? group.tools.length;
        return (
        <Box
          component="section"
          id={group.category.id}
          key={group.category.id}
          sx={{ mb: 10, scrollMarginTop: 100 }}
        >
          <Box sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 1 }}>
            <Link
              href={`/category/${group.category.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {group.category.label}
              </Typography>
            </Link>
            <Typography color="text.secondary" sx={{ fontSize: "1.125rem" }}>
              {group.category.description}
            </Typography>
            <Link
              href={`/category/${group.category.id}`}
              style={{ textDecoration: "none" }}
              aria-label={`View all ${fullCount} ${group.category.label} tools`}
            >
              <Typography
                variant="body2"
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                View all {fullCount} tools →
              </Typography>
            </Link>
          </Box>
          <Grid container spacing={3}>
            {group.tools.map((tool, _idx) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={tool.slug}
              >
                <ToolCard tool={tool} />
              </Grid>
            ))}
          </Grid>
        </Box>
        );
      })}

      {/* No-JS / crawler fallback: category hubs stay reachable even though the
          grid paginates to INITIAL_VISIBLE cards and load-more needs JS. */}
      <noscript>
        <ul>
          {filteredGroups.map((g) => (
            <li key={g.category.id}>
              <a href={`/category/${g.category.id}`}>
                {g.category.label} — all {g.tools.length} tools
              </a>
            </li>
          ))}
        </ul>
      </noscript>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {Math.min(visible, total)} of {total} tools
        </Typography>
        {canLoadMore ? (
          <>
            <Button
              variant="contained"
              size="large"
              onClick={handleLoadMore}
              sx={{
                borderRadius: "12px",
                px: 4,
                py: 1.25,
                textTransform: "none",
                fontWeight: 700,
                minHeight: 44,
                minWidth: 44,
              }}
              aria-label={`Load more tools, currently showing ${Math.min(
                visible,
                total
              )} of ${total}`}
            >
              Load more
            </Button>
            {/* IntersectionObserver sentinel — auto-loads next page when scrolled near */}
            <Box
              ref={sentinelRef}
              aria-hidden="true"
              sx={{ width: "100%", height: 1 }}
            />
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            All tools displayed — explore via search or categories.
          </Typography>
        )}
      </Box>
    </>
  );
}
