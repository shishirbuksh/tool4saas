import type { Metadata } from "next";
import BlogArticle, { blogMetadataFor } from "@/components/blog/BlogArticle";
import { qrSizePrintEs } from "@/lib/i18n";

// ES blog pilot: /es/blog/qr-code-generator-guide/qr-code-size-print-guide
// (EN holds 215 imp / 0 clicks in GSC — top informational opportunity).
// English pillar/slug kept. Body/FAQ/TOC render native ES; sibling/pillar links
// fall back to EN URLs (exist) instead of 404s; primary CTA deep-links
// /es/qr-code-generator. Canonical /es/blog/..., hreflang ES<->EN.
// <html lang> is served server-side by the locale root layout.
const post = qrSizePrintEs;

export function generateMetadata(): Metadata {
  return blogMetadataFor(post, "es");
}

export default function EsQrSizePrintPage() {
  return <BlogArticle post={post} locale="es" />;
}
