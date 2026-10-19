// NOINDEX for blog clusters that cover tools that do not work yet.
// Mirrors src/lib/tools/noindex.ts (single-source pattern): keep these
// clusters out of sitemap, listing grids, and indexable metadata until the
// underlying tool ships real functionality.
// Key format: "<pillar>/<cluster-slug>" (slug, not file name).
export const NOINDEX_CLUSTER_KEYS = new Set<string>([
  // The compress-to-1MB cluster covers pdf-compress, a placeholder tool (no
  // working compression yet — see src/lib/tools/noindex.ts). Reviewed copy is
  // kept but not indexable to avoid recommending a tool that errors at
  // runtime. Hidden from sitemap, listing grids, related meshes, and noindexed.
  "pdf-merge-guide/compress-pdf-1mb-email",
]);

export function isNoindexCluster(pillar: string, cluster: string): boolean {
  return NOINDEX_CLUSTER_KEYS.has(`${pillar}/${cluster}`);
}
