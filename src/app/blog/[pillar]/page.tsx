import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { siteConfig } from "@/lib/site";
import { getTool } from "@/lib/tools";
import { getPillarMeta, getPillarPost, getClustersForPillar, BLOG_PILLARS } from "@/lib/blog-registry";
import BlogArticle, { blogMetadataFor } from "@/components/blog/BlogArticle";

export function generateStaticParams() {
  return BLOG_PILLARS.map((p) => ({ pillar: p.pillar }));
}

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }): Promise<Metadata> {
  const { pillar } = await params;
  const post = getPillarPost(pillar);
  if (!post) return {};
  return blogMetadataFor(post);
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar } = await params;
  const meta = getPillarMeta(pillar);
  const post = getPillarPost(pillar);
  if (!meta || !post) notFound();
  const clusters = getClustersForPillar(pillar);
  const tool = getTool(meta.toolSlug);
  const base = siteConfig.url.replace(/\/$/, "");

  return (
    <Box>
      <BlogArticle post={post} />
      <Container maxWidth="lg" sx={{ pb: 10, px: { xs: 2, md: 4 } }}>
        <Box component="section" sx={{ mt: 2, p: 4, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
          <Typography variant="h2" sx={{ fontSize: "1.4rem", fontWeight: 800, mb: 1 }}>
            All {clusters.length} tutorials in this silo
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Each tutorial solves one job — pick yours. Every page links back here and to the{" "}
            {tool && <Link href={`/${tool.slug}`}>free {tool.title.toLowerCase()}</Link>}.
          </Typography>
          <Grid container spacing={2}>
            {clusters.map((c, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={c.slug}>
                <Link href={`/blog/${pillar}/${c.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Box sx={{ p: 2.5, borderRadius: "12px", border: "1px solid", borderColor: "divider", height: "100%" }}>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
                      PART {String(i + 1).padStart(2, "0")}
                    </Typography>
                    <Typography variant="h3" sx={{ fontSize: "1.02rem", fontWeight: 700, lineHeight: 1.4 }}>
                      {c.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {c.readingMinutes} min read
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Canonical: {base}/blog/{pillar} · Pillar targets “{meta.keywords[0]}”; clusters target one long-tail each — no cannibalization.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
