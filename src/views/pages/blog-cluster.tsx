import BlogArticle from "@/components/blog/BlogArticle";
import type { BlogPost } from "@/lib/blog";

export default function BlogClusterView({ post, related }: { post: BlogPost; related?: BlogPost[] }) {
  if (!post) return null;
  return <BlogArticle post={post} related={related} />;
}
