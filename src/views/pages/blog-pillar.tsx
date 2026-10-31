import Link from "@/lib/astro/navigation";import { Container, Box, Typography, Grid } from "@/components/ds";

import { siteConfig } from "@/lib/site";
import { getTool } from "@/lib/tools";
import { getPillarMeta, getPillarPost, getClustersForPillar } from "@/lib/blog-registry";
import { isNoindexCluster } from "@/lib/blog/noindex";
import BlogArticle from "@/components/blog/BlogArticle";

export default function BlogPillarView({ pillar }: { pillar: string }) {
  const meta = getPillarMeta(pillar);
  const post = getPillarPost(pillar);
  if (!meta || !post) return null;
  const clusters = getClustersForPillar(pillar).filter((c) => !isNoindexCluster(c.pillar, c.slug));
  const tool = getTool(meta.toolSlug);
  const base = siteConfig.url.replace(/\/$/, "");

  return (
    <Box>
      <BlogArticle post={post} />
      <Container maxWidth="xl" className="pb-20 px-4 sm:px-6 lg:px-8">
        <Box component="section" className="mt-4 p-8 rounded-xl border border-base-300 bg-base-100">
          <Typography variant="h2" className="text-[1.4rem] font-extrabold mb-2">
            All {clusters.length} tutorials in this silo
          </Typography>
          <Typography color="text.secondary" className="mb-6">
            Each tutorial solves one job — pick yours. Every page links back here and to the{" "}
            {tool && <Link href={`/${tool.slug}`}>free {tool.title.toLowerCase()}</Link>}.
          </Typography>
          <Grid container spacing={2}>
            {clusters.map((c, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={c.slug}>
                <Link href={`/blog/${pillar}/${c.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className="p-5 rounded-xl border border-base-300 hover:border-base-content/40 transition-colors h-full">
                    <Typography variant="overline" color="primary" className="font-bold">
                      PART {String(i + 1).padStart(2, "0")}
                    </Typography>
                    <Typography variant="h3" className="text-[1.02rem] font-bold leading-[1.4]">
                      {c.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mt-1">
                      {c.readingMinutes} min read
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" color="text.secondary" className="mt-6">
            Canonical: {base}/blog/{pillar} · Pillar targets “{meta.keywords[0]}”; clusters target one long-tail each — no cannibalization.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
