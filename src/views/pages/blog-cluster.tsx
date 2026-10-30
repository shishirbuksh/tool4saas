import { getClusterPost } from "@/lib/blog-registry";
import BlogArticle from "@/components/blog/BlogArticle";

export default function BlogClusterView({ pillar, cluster }: { pillar: string; cluster: string }) {
  const post = getClusterPost(pillar, cluster);
  if (!post) return null;
  return <BlogArticle post={post} />;
}
