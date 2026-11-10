import Link from "@/lib/astro/navigation";
import { Container, Typography, Grid } from "@/components/ds";
import { siteConfig } from "@/lib/site";
import { liteGetTool } from "@/lib/tools/catalog-lite";
import { getPillarMeta } from "@/lib/blog-pillars";
import BlogArticle from "@/components/blog/BlogArticle";
import type { BlogPost } from "@/lib/blog";

export default function BlogPillarView({
  pillar,
  post,
  clusters = [],
  related,
}: {
  pillar: string;
  post: BlogPost;
  clusters: BlogPost[];
  related?: BlogPost[];
}) {
  const meta = getPillarMeta(pillar);
  if (!meta || !post) return null;
  const tool = liteGetTool(meta.toolSlug);
  const base = siteConfig.url.replace(/\/$/, "");

  return (
    <div>
      <BlogArticle post={post} related={related} />
      <Container maxWidth="xl" className="pb-20 px-4 sm:px-6 lg:px-8">
        <section className="mt-4 p-6 sm:p-8 rounded-xl border border-base-300 bg-base-100">
          <div className="max-w-[720px] mb-6">
            <Typography variant="h2" className="text-[1.35rem] sm:text-[1.5rem] font-bold tracking-[-0.015em] text-base-content mb-2">
              All {clusters.length} tutorials in this guide
            </Typography>
            <Typography color="text.secondary" className="text-[0.9375rem] leading-[1.6]">
              Each tutorial solves a specific task with worked examples. Pick what you need below, or jump straight to the{" "}
              {tool && (
                <Link href={`/${tool.slug}`} className="font-medium text-base-content underline underline-offset-2 hover:text-accent">
                  free {tool.title.toLowerCase()}
                </Link>
              )}.
            </Typography>
          </div>
          <Grid container spacing={2.5}>
            {clusters.map((c, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={c.slug}>
                <Link
                  href={`/blog/${pillar}/${c.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
                >
                  <div className="group flex flex-col p-5 rounded-xl border border-base-300 bg-base-100 hover:border-base-content/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-150 h-full">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-base-content/50 uppercase">
                        Part {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-medium text-base-content/40">
                        {c.readingMinutes} min read
                      </span>
                    </div>
                    <h3 className="text-[1rem] font-bold leading-[1.4] text-base-content group-hover:text-base-content line-clamp-2 mb-4">
                      {c.title}
                    </h3>
                    <div className="mt-auto pt-3 flex items-center justify-between text-xs text-base-content/50 border-t border-base-200/70">
                      <span className="font-medium text-base-content/60 group-hover:text-base-content transition-colors">
                        Read tutorial
                      </span>
                      <span className="text-sm font-semibold opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-base-content" aria-hidden="true">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </div>
  );
}
