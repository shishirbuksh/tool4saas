import Link from "@/lib/astro/navigation";
import { Container, Typography, Breadcrumbs, Grid } from "@/components/ds";

import ToolCard from "@/components/ToolCard";
import { CATEGORIES } from "@/lib/tools/categories";
import { LITE_TOOLS, liteToolsByCategory } from "@/lib/tools/catalog-lite";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { introForCategory, faqContentForCategory } from "@/lib/category-content";
import { CATEGORY_ICONS } from "@/components/home/HomeCategories";
import { FileTextIcon as TextSnippetIcon } from "@/components/ui/icons";


export default function CategoryView({ id }: { id: string }) {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) return null;
  const allGroups = liteToolsByCategory();
  const visibleTools = LITE_TOOLS.filter((t) => t.category === id && !NOINDEX_SLUGS.has(t.slug));
  const faqContent = faqContentForCategory(id);
  const labelLower = category.label.toLowerCase();
  const categoryNoun = labelLower.endsWith("tools") ? labelLower : `${labelLower} tools`;
  const categoryFaqs = [
    {
      q: `What are the best free ${categoryNoun}?`,
      a: faqContent[0].text,
      link: { slug: faqContent[0].linkSlug, label: faqContent[0].linkLabel },
    },
    {
      q: `Are ${categoryNoun} on Tool4SaaS really free?`,
      a: faqContent[1].text,
      link: { slug: faqContent[1].linkSlug, label: faqContent[1].linkLabel },
    },
    {
      q: `Is my data safe when using ${categoryNoun}?`,
      a: faqContent[2].text,
      link: { slug: faqContent[2].linkSlug, label: faqContent[2].linkLabel },
    },
    {
      q: `How do I use ${categoryNoun} offline?`,
      a: faqContent[3].text,
      link: { slug: faqContent[3].linkSlug, label: faqContent[3].linkLabel },
    },
    {
      q: `Where do I get help for ${categoryNoun}?`,
      a: faqContent[4].text,
      link: { slug: faqContent[4].linkSlug, label: faqContent[4].linkLabel },
    },
  ];

  return (
    <Container maxWidth="xl" className="py-16 md:py-24 px-4 md:px-8 overflow-x-clip">
      <Breadcrumbs className="mb-4" aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="text.primary">{category.label}</Typography>
      </Breadcrumbs>
      <Typography variant="h1" className="text-[2rem] md:text-[2.5rem] mb-2">
        {category.label}
      </Typography>
      {(() => {
        const intro = introForCategory(id);
        return (
          <div className="mb-8 max-w-[760px]">
            <Typography color="text.secondary" className="mb-4 leading-[1.8]">
              {intro.body}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-2">
              Popular in {category.label}:{" "}
              {intro.picks.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && " · "}
                  <Link href={`/${p.slug}`}>{p.label}</Link>
                </span>
              ))}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Questions? Each tool page has an FAQ — start with the{" "}
              <Link href={`/${intro.faqSlug}`}>{intro.faqLabel}</Link>. See also our{" "}
              <Link href="/methodology">testing methodology</Link>.
            </Typography>
          </div>
        );
      })()}
      <Grid container spacing={3}>
        {visibleTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.slug}>
            <ToolCard tool={tool} />
          </Grid>
        ))}
      </Grid>
      <section
        aria-label={`Frequently asked questions about ${category.label}`}
        className="mt-12 max-w-[800px]"
      >
        <Typography variant="h2" className="text-[22px] font-extrabold mb-2">
          Frequently asked questions about {category.label}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-4">
          Reviewed by the Tool4SaaS Editorial Team · <Link href="/author">Authors</Link> ·{" "}
          <Link href="/methodology">How we test</Link>
        </Typography>
        {categoryFaqs.map((f) => {
          const link = (f as { link?: { slug: string; label: string } }).link;
          const parts = link && f.a.includes(link.label) ? f.a.split(link.label) : null;
          return (
            <details
              key={f.q}
              className="collapse collapse-arrow mb-3 rounded-xl border border-base-300 bg-base-100 transition-colors hover:border-base-content/20"
            >
              <summary className="collapse-title text-[1rem] md:text-[1.05rem] font-semibold cursor-pointer py-4 px-5 list-none select-none [&::-webkit-details-marker]:hidden">
                {f.q}
              </summary>
              <div className="collapse-content px-5 pb-5 pt-0">
                <Typography color="text.secondary" className="faq-passage speakable-answer-first leading-[1.7]">
                  {parts ? (
                    <>
                      {parts.map((part, idx) => (
                        <span key={idx}>
                          {part}
                          {idx < parts.length - 1 && <Link href={`/${link!.slug}`}>{link!.label}</Link>}
                        </span>
                      ))}
                    </>
                  ) : (
                    f.a
                  )}
                </Typography>
              </div>
            </details>
          );
        })}
      </section>
      <div className="mt-14">
        <Typography variant="h2" className="text-[1.375rem] font-semibold tracking-[-0.02em] mb-4">
          Browse all categories
        </Typography>
        <Grid container spacing={2.5}>
          {allGroups.map((g) => {
            const Icon = CATEGORY_ICONS[g.category.id] ?? TextSnippetIcon;
            const count = g.tools.filter((t) => !NOINDEX_SLUGS.has(t.slug)).length;
            const isCurrent = g.category.id === id;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={g.category.id}>
                <Link
                  href={`/category/${g.category.id}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
                >
                  <div
                    className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border bg-base-100 h-full min-h-[76px] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] active:scale-[0.99] ${
                      isCurrent
                        ? "border-base-content/40 bg-base-200/50 shadow-xs ring-1 ring-base-content/10"
                        : "border-base-300 hover:border-base-content/25"
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className="flex shrink-0 w-9 h-9 rounded-lg grid place-items-center bg-base-200 text-base-content"
                    >
                      <Icon fontSize="small" />
                    </div>
                    <div className="min-w-0">
                      <Typography
                        variant="h3"
                        className="text-[0.875rem] sm:text-[0.9375rem] font-semibold tracking-[-0.015em] leading-[1.25] text-base-content"
                      >
                        {g.category.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="text-xs mt-0.5">
                        {count} tools
                      </Typography>
                    </div>
                  </div>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Container>
  );
}
