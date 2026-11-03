import Link from "@/lib/astro/navigation";import { Container, Box, Typography, Grid, Breadcrumbs } from "@/components/ds";

import { siteConfig } from "@/lib/site";
import { BLOG_PILLARS } from "@/lib/blog-pillars";

type BlogSection = {
  meta: (typeof BLOG_PILLARS)[number];
  words: number;
  clusters: { slug: string; pillar: string; title: string }[];
};

export default function BlogIndexView({ sections = [] }: { sections?: BlogSection[] }) {
  const base = siteConfig.url.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${base}/blog`,
        name: "Tool4SaaS Blog",
        url: `${base}/blog`,
        description: "Pillar guides and tutorials for every free Tool4SaaS tool.",
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: BLOG_PILLARS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: `${base}/blog/${p.pillar}`,
            name: p.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
        ],
      },
    ],
  };
  return (
    <Container maxWidth="xl" className="py-16 md:py-24 px-4 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Breadcrumbs className="mb-6" aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="text.primary">Blog</Typography>
      </Breadcrumbs>
      <Typography variant="overline" className="font-bold tracking-[0.15em] text-primary">
        TOOL4SAAS BLOG
      </Typography>
      <Typography variant="h1" className="text-[2.2rem] md:text-[3rem] font-extrabold mb-4">
        Guides that actually show the clicks
      </Typography>
      <Typography color="text.secondary" className="max-w-[720px] mb-4 text-[1.1rem] leading-[1.7]">
        Every tool gets one <strong>pillar guide</strong> + <strong>8–10 hands-on tutorials</strong> in a silo.
        No fluff — we open the tool in Chrome, time it, and tell you where it breaks. Start with our first silo below.
      </Typography>
      <Box className="flex flex-wrap gap-2 mb-12">
        {BLOG_PILLARS.map((p) => (
          <a
            key={p.pillar}
            href={`#${p.pillar}`}
            className="inline-flex min-h-[38px] items-center px-3.5 py-1.5 rounded-full border border-base-300 text-sm font-semibold hover:border-base-content text-base-content no-underline transition-colors"
          >
            {p.shortLabel}
          </a>
        ))}
      </Box>
      <Grid container spacing={3}>
        {sections.map((s) => {
          const p = s.meta;
          const clusters = s.clusters;
          const words = s.words;
          return (
            <Grid size={{ xs: 12, md: 6 }} key={p.pillar}>
              <Box id={p.pillar} className="p-8 rounded-xl border border-base-300 bg-base-100 hover:border-base-content/30 transition-colors h-full scroll-mt-[96px]">
                <Typography variant="overline" color="primary" className="font-bold">
                  PILLAR · {clusters.length} TUTORIALS · {words.toLocaleString()}+ WORDS
                </Typography>
                <Link href={`/blog/${p.pillar}`} style={{ textDecoration: "none" }}>
                  <Typography variant="h2" className="text-[1.5rem] font-extrabold my-2 leading-[1.3]">
                    {p.title}
                  </Typography>
                </Link>
                <Typography color="text.secondary" className="mb-4 leading-[1.7]">
                  {p.description}
                </Typography>
                <Box component="ul" className="m-0 pl-6 mb-6 text-base-content/70">
                  {clusters.map((c) => (
                    <li key={c.slug} style={{ marginBottom: 4 }}>
                      <Link href={`/blog/${c.pillar}/${c.slug}`} style={{ fontWeight: 500 }}>{c.title}</Link>
                    </li>
                  ))}
                </Box>
                <Box className="flex gap-4 flex-wrap">
                  <Link href={`/blog/${p.pillar}`} style={{ fontWeight: 700 }}>Read the pillar guide →</Link>
                  <Link href={`/${p.toolSlug}`} style={{ fontWeight: 600, color: "inherit" }}>Open the free tool →</Link>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box className="mt-12 p-6 rounded-xl border border-base-300 bg-base-200/50">
        <Typography variant="body2" color="text.secondary" className="leading-[1.7]">
          <strong>How silos work here:</strong> the pillar ranks for the broad topic (e.g. free invoice generator guide),
          each tutorial ranks for one long-tail query (e.g. GST invoice format India), and all of them funnel to the free
          tool page. New silos (QR codes, resume, JSON formatter…) follow the same template — one pillar, 8–10 clusters, deep internal linking.
        </Typography>
        <Typography variant="body2" color="text.secondary" className="leading-[1.7] mt-4">
          <strong>Subscribe:</strong>{" "}
          <a href="/rss.xml" style={{ fontWeight: 600 }}>RSS feed</a> — the newest 50 guides, no email required.
        </Typography>
      </Box>
    </Container>
  );
}
