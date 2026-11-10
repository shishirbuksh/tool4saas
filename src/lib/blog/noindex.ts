// NOINDEX for blog clusters that do not carry enough unique depth to earn an
// index slot yet.
// Mirrors src/lib/tools/noindex.ts (single-source pattern): keep these clusters
// out of sitemap, listing grids, related meshes, and indexable metadata until
// they are expanded past the depth floor.
// Key format: "<pillar>/<cluster-slug>" (slug, not file name).
//
// Provenance: scripts/audit-thin-content.mjs (npm run audit:thin), run
// 2026-11-09 against the live sitemap. Floor for a cluster is 400 unique words
// in rendered <main> text; everything listed here measured 326-398. Re-run the
// audit and remove keys as clusters are expanded past 700 words.
//
// Deliberately NOT listed: the 160 "improve" clusters at 400-700 words. They
// are unique, cost nothing, and hold the long-tail upside. Depth is a separate
// backlog item - do not noindex the whole blog to chase crawl budget.
export const NOINDEX_CLUSTER_KEYS = new Set<string>([
  // pdf-merge-guide
  "pdf-merge-guide/extract-text-without-ocr",
  "pdf-merge-guide/pdf-pages-high-quality-jpg",
  // json-formatter-guide
  "json-formatter-guide/base64-url-safe-vs-standard",
  "json-formatter-guide/json-parse-errors",
  "json-formatter-guide/jwt-expiry-without-trust",
  "json-formatter-guide/regex-flags-capture-groups",
  "json-formatter-guide/sha256-vs-md5-hashes",
  "json-formatter-guide/url-encoding-spaces-symbols",
  // image-compressor-guide
  "image-compressor-guide/compress-jpg-100kb-portal",
  "image-compressor-guide/crop-passport-photos",
  "image-compressor-guide/image-seo-size-alt",
  "image-compressor-guide/png-to-webp-transparency",
  "image-compressor-guide/png-vs-jpg-vs-webp",
  "image-compressor-guide/resize-image-exact-pixels",
  "image-compressor-guide/strip-exif-before-upload",
  // word-counter-guide
  "word-counter-guide/flesch-reading-ease-score-explained",
  "word-counter-guide/how-to-count-words-online",
  "word-counter-guide/ideal-blog-post-length-seo",
  "word-counter-guide/typing-speed-test-practice-tips",
  // seo-analyzer-guide
  "seo-analyzer-guide/ai-content-false-positives",
  "seo-analyzer-guide/fix-score-60-to-80",
  "seo-analyzer-guide/robots-vs-noindex",
  "seo-analyzer-guide/stale-og-image-fix",
  // sip-calculator-guide
  "sip-calculator-guide/equity-ltcg-vs-fd-tax",
  "sip-calculator-guide/old-vs-new-regime-2026",
  "sip-calculator-guide/real-return-inflation",
  // resume-builder-guide
  "resume-builder-guide/cover-letter-guide",
  "resume-builder-guide/resume-vs-cv",
  // qr-code-generator-guide
  "qr-code-generator-guide/qr-code-vs-barcode",
  // mortgage-calculator-guide
  "mortgage-calculator-guide/how-to-calculate-mortgage-payment",
  // password-generator-guide
  "password-generator-guide/wifi-router-password",
  // The compress-to-1MB cluster covers pdf-compress, a placeholder tool (no
  // working compression yet - see src/lib/tools/noindex.ts). Reviewed copy is
  // kept but not indexable to avoid recommending a tool that errors at
  // runtime. Hidden from sitemap, listing grids, related meshes, and noindexed.
  "pdf-merge-guide/compress-pdf-1mb-email",
]);

export function isNoindexCluster(pillar: string, cluster: string): boolean {
  return NOINDEX_CLUSTER_KEYS.has(`${pillar}/${cluster}`);
}
