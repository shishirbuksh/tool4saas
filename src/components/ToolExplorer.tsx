"use client";

/**
 * ToolExplorer — category-filtered, progressively revealed tool directory.
 *
 * The initial SSR HTML renders the first 12 tools of the "All" view so the
 * homepage stays light and the ItemList JSON-LD can mirror exactly what is
 * visible. The remaining cards are revealed only with the explicit "Show more"
 * button, which keeps the page length predictable and the guides/FAQ reachable.
 * Every tool stays crawlable via sitemap.xml.
 */
import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToolCard from "@/components/ToolCard";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import type { LiteGroup } from "@/lib/tools/catalog-lite";

const INITIAL_VISIBLE = 12;
const STEP = 12;

export default function ToolExplorer({ groups }: { groups: LiteGroup[] }) {
  const [active, setActive] = React.useState<string>("all");
  const [visible, setVisible] = React.useState(INITIAL_VISIBLE);

  const filteredGroups = React.useMemo(
    () =>
      groups
        .map((g) => ({
          category: g.category,
          tools: g.tools.filter((t) => !NOINDEX_SLUGS.has(t.slug)),
        }))
        .filter((g) => g.tools.length > 0),
    [groups]
  );

  const categoryCounts = React.useMemo(
    () =>
      new Map(
        filteredGroups.map((g) => [
          g.category.id,
          g.tools.length,
        ])
      ),
    [filteredGroups]
  );

  const activeGroups = React.useMemo(
    () =>
      active === "all"
        ? filteredGroups
        : filteredGroups.filter((g) => g.category.id === active),
    [active, filteredGroups]
  );

  const total = React.useMemo(
    () => activeGroups.reduce((acc, g) => acc + g.tools.length, 0),
    [activeGroups]
  );

  const allTotal = React.useMemo(
    () => filteredGroups.reduce((acc, g) => acc + g.tools.length, 0),
    [filteredGroups]
  );

  const canLoadMore = visible < total;

  const handleFilter = React.useCallback((id: string) => {
    setActive(id);
    setVisible(INITIAL_VISIBLE);
  }, []);

  const handleLoadMore = React.useCallback(() => {
    setVisible((v) => Math.min(v + STEP, total));
  }, [total]);

  let remaining = visible;
  const visibleGroups: LiteGroup[] = [];
  for (const g of activeGroups) {
    if (remaining <= 0) break;
    const slice = g.tools.slice(0, remaining);
    if (slice.length > 0) {
      visibleGroups.push({ category: g.category, tools: slice });
      remaining -= slice.length;
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: { xs: "nowrap", md: "wrap" },
          overflowX: { xs: "auto", md: "visible" },
          justifyContent: { xs: "flex-start", md: "center" },
          scrollSnapType: { xs: "x mandatory", md: "none" },
          scrollbarWidth: { xs: "none", md: "auto" },
          "&::-webkit-scrollbar": { display: { xs: "none", md: "block" } },
          pb: { xs: 1.5, md: 0 },
          mb: { xs: 4, md: 6 },
        }}
        role="group"
        aria-label="Filter tools by category"
      >
        <Box
          component="button"
          type="button"
          onClick={() => handleFilter("all")}
          aria-pressed={active === "all"}
          sx={(theme) => ({
            flex: "0 0 auto",
            scrollSnapAlign: "start",
            minHeight: 44,
            px: 2,
            borderRadius: 999,
            border: "1px solid",
            borderColor: active === "all" ? "primary.main" : "divider",
            bgcolor: active === "all" ? "primary.main" : "background.paper",
            color: active === "all" ? "primary.contrastText" : "text.primary",
            font: "inherit",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
            "&:hover": {
              borderColor: active === "all" ? "primary.main" : "text.primary",
            },
            "&:focus-visible": {
              outline: `3px solid ${theme.palette.primary.main}`,
              outlineOffset: 2,
            },
          })}
        >
          All {allTotal}
        </Box>
        {filteredGroups.map((g) => {
          const isActive = active === g.category.id;
          return (
            <Box
              component="button"
              type="button"
              key={g.category.id}
              onClick={() => handleFilter(g.category.id)}
              aria-pressed={isActive}
              sx={(theme) => ({
                flex: "0 0 auto",
                scrollSnapAlign: "start",
                minHeight: 44,
                px: 2,
                borderRadius: 999,
                border: "1px solid",
                borderColor: isActive ? "primary.main" : "divider",
                bgcolor: isActive ? "primary.main" : "background.paper",
                color: isActive ? "primary.contrastText" : "text.primary",
                font: "inherit",
                fontSize: "0.875rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
                "&:hover": {
                  borderColor: isActive ? "primary.main" : "text.primary",
                },
                "&:focus-visible": {
                  outline: `3px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                },
              })}
            >
              {g.category.label} {categoryCounts.get(g.category.id) ?? 0}
            </Box>
          );
        })}
      </Box>

      {visibleGroups.map((group) => {
        const fullCount =
          filteredGroups.find((g) => g.category.id === group.category.id)?.tools.length ??
          group.tools.length;
        return (
          <Box
            component="section"
            id={group.category.id}
            key={group.category.id}
            sx={{ mb: 8, scrollMarginTop: 100 }}
          >
            <Box
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Link
                  href={`/category/${group.category.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, letterSpacing: "-0.02em", fontSize: "1.25rem" }}
                  >
                    {group.category.label}
                  </Typography>
                </Link>
                <Typography
                  color="text.secondary"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    mt: 0.5,
                    fontSize: "0.9375rem",
                    maxWidth: 760,
                  }}
                >
                  {group.category.description}
                </Typography>
              </Box>
              <Link
                href={`/category/${group.category.id}`}
                style={{ textDecoration: "none" }}
                aria-label={`View all ${fullCount} ${group.category.label} tools`}
              >
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "primary.main", fontWeight: 600, whiteSpace: "nowrap" }}
                >
                  View all {fullCount} →
                </Typography>
              </Link>
            </Box>
            <Grid container spacing={{ xs: 1.5, md: 2 }}>
              {group.tools.map((tool) => (
                <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={tool.slug}>
                  <ToolCard tool={tool} dense />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}

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
          <Button
            variant="contained"
            size="large"
            onClick={handleLoadMore}
            aria-label={`Load more tools, currently showing ${Math.min(visible, total)} of ${total}`}
          >
            Show more tools
          </Button>
        ) : (
          <Typography variant="body2" color="text.secondary">
            All tools shown — browse a category for the full collection.
          </Typography>
        )}
      </Box>
    </>
  );
}
