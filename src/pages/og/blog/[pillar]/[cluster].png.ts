import type { APIRoute } from "astro";
import { siteConfig } from "@/lib/site";
import { getPillarMeta, getClusterPost, getAllBlogStaticParams } from "@/lib/blog-registry";
import { ogSanitizeTitle, ogSanitizeDesc } from "@/lib/og-text";
import { renderOgImagePng } from "@/lib/og-image";

export function getStaticPaths() {
  return getAllBlogStaticParams()
    .filter((p) => Boolean(p.cluster))
    .map((p) => ({ params: { pillar: p.pillar, cluster: p.cluster! } }));
}

export const GET: APIRoute = async ({ params }) => {
  const pillar = params.pillar!;
  const cluster = params.cluster!;
  const post = getClusterPost(pillar, cluster);

  const title = ogSanitizeTitle(post ? post.title : siteConfig.name);
  const desc = ogSanitizeDesc(post ? post.description : siteConfig.description);
  const badge = post
    ? ogSanitizeTitle(`Guide · ${getPillarMeta(post.pillar)?.shortLabel ?? post.pillar}`)
    : "Free Online Tools";

  const png = await renderOgImagePng({ title, desc, badge });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
};
