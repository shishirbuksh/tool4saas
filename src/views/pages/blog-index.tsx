import Link from "@/lib/astro/navigation";
import { Container, Typography, Grid, Breadcrumbs } from "@/components/ds";

import { BLOG_PILLARS } from "@/lib/blog-pillars";

type BlogSection = {
  meta: (typeof BLOG_PILLARS)[number];
  words: number;
  clusters: { slug: string; pillar: string; title: string }[];
};

export default function BlogIndexView({ sections = [] }: { sections?: BlogSection[] }) {
  return (
    <Container maxWidth="xl" className="py-16 md:py-24 px-4 md:px-8">
      <Breadcrumbs className="mb-6" aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="text.primary">Blog</Typography>
      </Breadcrumbs>
      <Typography variant="overline" color="primary" className="font-bold">
        FREE TOOL GUIDES
      </Typography>
      <Typography variant="h1" className="text-[2.25rem] md:text-[3rem] font-extrabold mb-4">
        Guides &amp; Tutorials
      </Typography>
      <Typography variant="body1" color="text.secondary" className="max-w-[720px] mb-12 text-[1.125rem]">
        Deep walkthroughs for our productivity tools. Every guide includes worked examples, formula breakdowns, and edge cases.
      </Typography>

      <Grid container spacing={3.5}>
        {sections.map((s) => (
          <Grid size={{ xs: 12, md: 6 }} key={s.meta.pillar}>
            <div className="p-6 sm:p-7 rounded-xl border border-base-300 bg-base-100 h-full flex flex-col hover:border-base-content/25 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-150">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-base-200 text-base-content/75 font-mono uppercase tracking-wider">
                  {s.clusters.length} Tutorials · ~{s.words.toLocaleString()} words
                </span>
              </div>
              <Link href={`/blog/${s.meta.pillar}`} className="no-underline group mb-2 block">
                <h2 className="text-[1.25rem] sm:text-[1.35rem] font-bold text-base-content tracking-[-0.015em] leading-[1.35] group-hover:text-accent transition-colors">
                  {s.meta.title}
                </h2>
              </Link>
              <p className="text-[0.875rem] text-base-content/70 leading-[1.6] mb-5 flex-grow">
                {s.meta.description}
              </p>
              <div className="mb-6">
                <Link
                  href={`/blog/${s.meta.pillar}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-base-content text-base-100 text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all no-underline"
                >
                  <span>Read Complete Guide</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="border-t border-base-200 pt-4 mt-auto">
                <div className="text-[11px] font-mono uppercase tracking-wider text-base-content/50 font-semibold mb-2">
                  Key Chapters &amp; Tutorials
                </div>
                <ul className="m-0 p-0 list-none flex flex-col gap-1">
                  {s.clusters.map((c, i) => (
                    <li key={c.slug}>
                      <Link
                        href={`/blog/${c.pillar}/${c.slug}`}
                        className="group/item flex items-center gap-3 py-1.5 px-2.5 rounded-lg -mx-2.5 hover:bg-base-200/60 transition-colors no-underline text-inherit"
                      >
                        <span className="font-mono text-[11px] font-semibold text-base-content/40 group-hover/item:text-base-content/70 shrink-0 w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.84rem] text-base-content/85 group-hover/item:text-base-content line-clamp-1 font-medium flex-1">
                          {c.title}
                        </span>
                        <span
                          className="text-xs text-base-content/30 group-hover/item:text-base-content group-hover/item:translate-x-0.5 transition-all shrink-0"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
