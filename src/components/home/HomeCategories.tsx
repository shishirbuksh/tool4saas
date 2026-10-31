import { Container, Box, Grid, Typography } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { AccountBalance as AccountBalanceIcon, Calculate as CalculateIcon, Code as CodeIcon, FitnessCenter as FitnessCenterIcon, Image as ImageIcon, PictureAsPdf as PictureAsPdfIcon, ReceiptLong as ReceiptLongIcon, Schedule as ScheduleIcon, Search as SearchIcon, Shuffle as ShuffleIcon, TextSnippet as TextSnippetIcon, Transform as TransformIcon } from "@/components/ds/icons";
import type { ComponentType } from "react";
import { CATEGORIES } from "@/lib/tools/categories";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";

const CATEGORY_ICONS: Record<string, ComponentType<{ fontSize?: "small" | "medium" | "large"; className?: string }>> = {
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
      className="py-14 md:py-20 border-b border-base-300 scroll-mt-[100px]"
    >
      <Container maxWidth="xl" className="px-4 md:px-8">
        <Box className="text-center mb-6 md:mb-8 max-w-[640px] mx-auto">
          <Typography
            variant="h2"
            className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.025em] mb-1"
          >
            Browse by category
          </Typography>
          <Typography color="text.secondary" className="text-[0.9375rem] md:text-[1rem]">
            {CATEGORIES.length} collections, one browser tab.
          </Typography>
        </Box>

        <Grid container className="gap-3 md:gap-4">
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
                    className="h-full min-h-[84px] flex items-center gap-3 p-3.5 md:p-4 rounded-xl border border-base-300 bg-base-100 hover:[transform:translateY(-2px)] hover:border-[rgba(0,0,0,0.14)] hover:[box-shadow:0_0_0_1px_rgba(0,0,0,0.06),_0_8px_24px_rgba(34,29,29,0.07)] dark:bg-base-100 dark:[&_:hover]:border-[rgba(255,255,255,0.18)] dark:[&_:hover]:[box-shadow:0_0_0_1px_rgba(255,255,255,0.06),_0_8px_24px_rgba(0,0,0,0.4)] active:[transform:scale(0.99)]" style={{ transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms ease, box-shadow 200ms ease" }}
                  >
                    <Box
                      aria-hidden="true"
                      className="flex-[0_0_auto] w-10 h-10 rounded-xl grid bg-base-content/5 text-base-content dark:bg-base-content/10" style={{ placeItems: "center" }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Box className="min-w-[0px]">
                      <Typography
                        className="text-[0.875rem] md:text-[0.9375rem] font-semibold leading-[1.3] tracking-[-0.015em]"
                      >
                        {category.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="text-[0.75rem] mt-0.5"
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
