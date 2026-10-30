import BlogArticle from "@/components/blog/BlogArticle";
import { qrSizePrintEs } from "@/lib/i18n";

export default function EsBlogGuideView() {
  return <BlogArticle post={qrSizePrintEs} locale="es" />;
}
