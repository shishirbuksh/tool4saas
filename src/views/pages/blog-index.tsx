import Link from "@/lib/astro/navigation";
import { Container, Box, Typography, Grid, Breadcrumbs } from "@/components/ds";

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

      <Grid container spacing={4}>
        {sections.map((s) => (
          <Grid size={{ xs: 12, md: 6 }} key={s.meta.pillar}>
            <Box className="p-6 rounded-xl border border-base-300 bg-base-100 h-full flex flex-col">
              <Link href={`/blog/${s.meta.pillar}`} style={{ textDecoration: "none" }}>
                <Typography variant="h2" className="text-[1.35rem] font-bold text-base-content mb-2 hover:text-accent">
                  {s.meta.title}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary" className="mb-4 flex-grow">
                {s.meta.description}
              </Typography>
              <Typography variant="caption" color="text.secondary" className="block mb-3 font-medium">
                Pillar guide (~{s.words.toLocaleString()} words) · {s.clusters.length} tutorials
              </Typography>
              <Box component="ul" className="m-0 p-0 list-none flex flex-col gap-1.5 border-t border-base-300 pt-3">
                {s.clusters.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/blog/${c.pillar}/${c.slug}`}
                      className="text-[0.875rem] text-accent hover:underline line-clamp-1"
                    >
                      → {c.title}
                    </Link>
                  </li>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
