import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogStaticParams, getClusterPost } from "@/lib/blog-registry";
import { isNoindexCluster } from "@/lib/blog/noindex";
import BlogArticle, { blogMetadataFor } from "@/components/blog/BlogArticle";

export function generateStaticParams() {
  return getAllBlogStaticParams()
    .filter((p) => p.cluster)
    .map((p) => ({ pillar: p.pillar, cluster: p.cluster as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string; cluster: string }>;
}): Promise<Metadata> {
  const { pillar, cluster } = await params;
  const post = getClusterPost(pillar, cluster);
  if (!post) return {};
  const meta = blogMetadataFor(post);
  if (isNoindexCluster(pillar, cluster)) {
    const robots = { index: false, follow: true };
    return { ...meta, robots };
  }
  return meta;
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ pillar: string; cluster: string }>;
}) {
  const { pillar, cluster } = await params;
  const post = getClusterPost(pillar, cluster);
  if (!post) notFound();
  return <BlogArticle post={post} />;
}
