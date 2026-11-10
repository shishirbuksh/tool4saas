import { Container, Grid, Typography } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { LandmarkIcon as AccountBalanceIcon, CalculatorIcon as CalculateIcon, CodeIcon, DumbbellIcon as FitnessCenterIcon, ImageIcon, FileTextIcon as PictureAsPdfIcon, ReceiptIcon as ReceiptLongIcon, ClockIcon as ScheduleIcon, SearchIcon, ShuffleIcon, FileTextIcon as TextSnippetIcon, ArrowLeftRightIcon as TransformIcon } from "@/components/ui/icons";
import type { ComponentType } from "react";
import { CATEGORIES } from "@/lib/tools/categories";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";

export const CATEGORY_ICONS: Record<string, ComponentType<{ fontSize?: "small" | "medium" | "large"; className?: string }>> = {
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
    <nav
      id="categories"
      aria-label="Tool categories"
      className="py-14 md:py-20 border-b border-base-300 scroll-mt-[100px]"
    >
      <Container maxWidth="xl" className="px-4 md:px-8">
        <div className="text-center mb-6 md:mb-8 max-w-[640px] mx-auto">
          <Typography
            variant="h2"
            className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.025em] mb-1"
          >
            Browse by category
          </Typography>
          <Typography color="text.secondary" className="text-[0.9375rem] md:text-[1rem]">
            {CATEGORIES.length} collections, one browser tab.
          </Typography>
        </div>

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
                  <div
                    className="h-full min-h-[80px] flex items-center gap-3.5 p-3.5 md:p-4 rounded-xl border border-base-300 bg-base-100 transition-all duration-150 hover:-translate-y-0.5 hover:border-base-content/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] active:scale-[0.99]"
                  >
                    <div
                      aria-hidden="true"
                      className="flex-[0_0_auto] w-10 h-10 rounded-xl grid place-items-center bg-base-200 text-base-content"
                    >
                      <Icon fontSize="small" />
                    </div>
                    <div className="min-w-[0px]">
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
                    </div>
                  </div>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </nav>
  );
}
