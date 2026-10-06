// NOINDEX single source (tiny module — safe to import from client bundles).
// index.ts re-exports this; sitemap/category/grids/related/shell consume it.
// Slugs listed here stay in the catalogue (tools.length unchanged) but are
// excluded from the sitemap, llms.txt, homepage ItemList JSON-LD, homepage
// grid, category grids, and related/see-also links.
// - Keep "pdf-compress" noindexed until PdfCompressTool ships real pdf-lib
//   compression (currently a placeholder that only validates file type/size).
//   Its route sets robots index:false; do NOT link it from indexable surfaces.
// - To noindex a future thin/duplicate tool: add its slug to this Set only —
//   every consumer above picks it up automatically. Never duplicate the Set.
export const NOINDEX_SLUGS = new Set(["pdf-compress"]);
