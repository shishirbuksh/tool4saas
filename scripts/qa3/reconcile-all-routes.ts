import fs from 'fs';
import path from 'path';
import { tools, CATEGORIES, NOINDEX_SLUGS } from '../../src/lib/tools/index';
import { BLOG_PILLARS, getClustersForPillar } from '../../src/lib/blog-registry';
import { isNoindexCluster } from '../../src/lib/blog/noindex';
import { sitemap } from '../../src/pages/sitemap.xml';

interface RouteInventoryItem {
  url: string;
  routePath: string;
  classification:
    | 'Homepage'
    | 'Static Page'
    | 'Category Page'
    | 'Indexable Tool'
    | 'Noindex Tool'
    | 'Blog Index'
    | 'Blog Pillar'
    | 'Indexable Blog Guide'
    | 'Noindex Blog Guide'
    | 'Error/Utility Page'
    | 'Legacy Redirect Stub';
  isIndexable: boolean;
  isInSitemap: boolean;
  distHtmlExists: boolean;
  distHtmlPath?: string;
  redirectTarget?: string;
  notes?: string;
}

const BASE_URL = 'https://tool4saas.com';
const DIST_DIR = path.resolve('dist');

// Read all HTML files in dist
function getAllHtmlFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allDistHtmlFiles = getAllHtmlFiles(DIST_DIR);
console.log(`Found ${allDistHtmlFiles.length} HTML files in dist/`);

// Read legacy redirects
const redirectsContent = fs.readFileSync(path.resolve('deploy/nginx-redirects.conf'), 'utf8');
const redirectRegex = /location\s*=\s*([^\s{]+)\s*\{\s*return\s+301\s+([^;]+);\s*\}/g;
const legacyRedirects: { originalPath: string; targetUrl: string }[] = [];
let match;
while ((match = redirectRegex.exec(redirectsContent)) !== null) {
  legacyRedirects.push({
    originalPath: match[1],
    targetUrl: match[2],
  });
}
console.log(`Found ${legacyRedirects.length} legacy redirects in deploy/nginx-redirects.conf`);

// Read sitemap directly from dist/sitemap.xml
const sitemapXml = fs.readFileSync(path.resolve('dist/sitemap.xml'), 'utf8');
const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim().replace(/\/$/, ''));
const sitemapUrlSet = new Set(locMatches);
console.log(`Loaded ${sitemapUrlSet.size} unique URLs from dist/sitemap.xml`);

const inventory: RouteInventoryItem[] = [];

// 1. Homepage
inventory.push({
  url: BASE_URL,
  routePath: '/',
  classification: 'Homepage',
  isIndexable: true,
  isInSitemap: sitemapUrlSet.has(BASE_URL),
  distHtmlExists: fs.existsSync(path.join(DIST_DIR, 'index.html')),
  distHtmlPath: 'dist/index.html',
});

// 2. Static Pages
const staticPageSlugs = ['about', 'privacy', 'terms', 'contact', 'author', 'methodology', 'sitemap'];
for (const slug of staticPageSlugs) {
  const routePath = `/${slug}`;
  const url = `${BASE_URL}${routePath}`;
  const htmlPath = path.join(DIST_DIR, `${slug}.html`);
  const altPath = path.join(DIST_DIR, slug, 'index.html');
  const distHtmlExists = fs.existsSync(htmlPath) || fs.existsSync(altPath);
  inventory.push({
    url,
    routePath,
    classification: 'Static Page',
    isIndexable: true,
    isInSitemap: sitemapUrlSet.has(url),
    distHtmlExists,
    distHtmlPath: fs.existsSync(htmlPath) ? `dist/${slug}.html` : `dist/${slug}/index.html`,
  });
}

// 3. Category Pages (12)
for (const cat of CATEGORIES) {
  const routePath = `/category/${cat.id}`;
  const url = `${BASE_URL}${routePath}`;
  const htmlPath = path.join(DIST_DIR, 'category', `${cat.id}.html`);
  const altPath = path.join(DIST_DIR, 'category', cat.id, 'index.html');
  const distHtmlExists = fs.existsSync(htmlPath) || fs.existsSync(altPath);
  inventory.push({
    url,
    routePath,
    classification: 'Category Page',
    isIndexable: true,
    isInSitemap: sitemapUrlSet.has(url),
    distHtmlExists,
    distHtmlPath: fs.existsSync(htmlPath) ? `dist/category/${cat.id}.html` : `dist/category/${cat.id}/index.html`,
    notes: `Category: ${cat.label}`,
  });
}

// 4. Tools (Registered: Indexable vs Noindex)
for (const tool of tools) {
  const isNoindex = NOINDEX_SLUGS.has(tool.slug);
  const routePath = `/${tool.slug}`;
  const url = `${BASE_URL}${routePath}`;
  const htmlPath = path.join(DIST_DIR, `${tool.slug}.html`);
  const altPath = path.join(DIST_DIR, tool.slug, 'index.html');
  const distHtmlExists = fs.existsSync(htmlPath) || fs.existsSync(altPath);
  inventory.push({
    url,
    routePath,
    classification: isNoindex ? 'Noindex Tool' : 'Indexable Tool',
    isIndexable: !isNoindex,
    isInSitemap: sitemapUrlSet.has(url),
    distHtmlExists,
    distHtmlPath: fs.existsSync(htmlPath) ? `dist/${tool.slug}.html` : `dist/${tool.slug}/index.html`,
    notes: `Category: ${tool.category}, Name: ${tool.title}`,
  });
}

// 5. Blog Index
{
  const routePath = '/blog';
  const url = `${BASE_URL}${routePath}`;
  const htmlPath = path.join(DIST_DIR, 'blog.html');
  const altPath = path.join(DIST_DIR, 'blog', 'index.html');
  const distHtmlExists = fs.existsSync(htmlPath) || fs.existsSync(altPath);
  inventory.push({
    url,
    routePath,
    classification: 'Blog Index',
    isIndexable: true,
    isInSitemap: sitemapUrlSet.has(url),
    distHtmlExists,
    distHtmlPath: fs.existsSync(htmlPath) ? 'dist/blog.html' : 'dist/blog/index.html',
  });
}

// 6. Blog Pillars
for (const p of BLOG_PILLARS) {
  const routePath = `/blog/${p.pillar}`;
  const url = `${BASE_URL}${routePath}`;
  const htmlPath = path.join(DIST_DIR, 'blog', `${p.pillar}.html`);
  const altPath = path.join(DIST_DIR, 'blog', p.pillar, 'index.html');
  const distHtmlExists = fs.existsSync(htmlPath) || fs.existsSync(altPath);
  inventory.push({
    url,
    routePath,
    classification: 'Blog Pillar',
    isIndexable: true,
    isInSitemap: sitemapUrlSet.has(url),
    distHtmlExists,
    distHtmlPath: fs.existsSync(htmlPath) ? `dist/blog/${p.pillar}.html` : `dist/blog/${p.pillar}/index.html`,
    notes: `Pillar: ${p.title}`,
  });
}

// 7. Blog Guides / Clusters
for (const p of BLOG_PILLARS) {
  const clusters = getClustersForPillar(p.pillar);
  for (const c of clusters) {
    const isNoindex = isNoindexCluster(c.pillar, c.slug);
    const routePath = `/blog/${c.pillar}/${c.slug}`;
    const url = `${BASE_URL}${routePath}`;
    const htmlPath = path.join(DIST_DIR, 'blog', c.pillar, `${c.slug}.html`);
    const altPath = path.join(DIST_DIR, 'blog', c.pillar, c.slug, 'index.html');
    const distHtmlExists = fs.existsSync(htmlPath) || fs.existsSync(altPath);
    const finalHtmlPath = fs.existsSync(htmlPath)
      ? `dist/blog/${c.pillar}/${c.slug}.html`
      : `dist/blog/${c.pillar}/${c.slug}/index.html`;

    inventory.push({
      url,
      routePath,
      classification: isNoindex ? 'Noindex Blog Guide' : 'Indexable Blog Guide',
      isIndexable: !isNoindex,
      isInSitemap: sitemapUrlSet.has(url),
      distHtmlExists,
      distHtmlPath: distHtmlExists ? finalHtmlPath : undefined,
      notes: `Cluster: ${c.title}`,
    });
  }
}

// 8. Utility & Error Pages (probe, 404)
const utilityPages = [
  { slug: '404', path: '/404', html: 'dist/404.html', notes: 'HTTP 404 error template' },
  { slug: 'probe', path: '/probe', html: 'dist/probe.html', notes: 'System health probe' },
];
for (const util of utilityPages) {
  const url = `${BASE_URL}${util.path}`;
  const htmlPath = path.join(DIST_DIR, `${util.slug}.html`);
  const altPath = path.join(DIST_DIR, util.slug, 'index.html');
  const distHtmlExists = fs.existsSync(htmlPath) || fs.existsSync(altPath);
  inventory.push({
    url,
    routePath: util.path,
    classification: 'Error/Utility Page',
    isIndexable: false,
    isInSitemap: sitemapUrlSet.has(url),
    distHtmlExists,
    distHtmlPath: fs.existsSync(htmlPath) ? `dist/${util.slug}.html` : `dist/${util.slug}/index.html`,
    notes: util.notes,
  });
}

// 9. Legacy Redirect Stubs
for (const red of legacyRedirects) {
  const url = `${BASE_URL}${red.originalPath}`;
  inventory.push({
    url,
    routePath: red.originalPath,
    classification: 'Legacy Redirect Stub',
    isIndexable: false,
    isInSitemap: sitemapUrlSet.has(url),
    distHtmlExists: false,
    redirectTarget: red.targetUrl,
    notes: `Permanent HTTP 301 redirect to ${red.targetUrl}`,
  });
}

// Group counts by classification
const countsByClass: Record<string, number> = {};
let totalInSitemap = 0;
let totalIndexable = 0;
let totalGeneratedHtml = 0;

for (const item of inventory) {
  countsByClass[item.classification] = (countsByClass[item.classification] || 0) + 1;
  if (item.isInSitemap) totalInSitemap++;
  if (item.isIndexable) totalIndexable++;
  if (item.distHtmlExists) totalGeneratedHtml++;
}

console.log('--- ROUTE INVENTORY SUMMARY ---');
console.table(countsByClass);
console.log('Total in Sitemap:', totalInSitemap);
console.log('Total Indexable:', totalIndexable);
console.log('Total Routes with Dist HTML:', totalGeneratedHtml);
console.log('Total Inventory Items:', inventory.length);

// Save JSON inventory
fs.writeFileSync('scripts/qa3/ROUTE_INVENTORY.json', JSON.stringify(inventory, null, 2));

// Save CSV inventory
const csvHeader = 'URL,RoutePath,Classification,IsIndexable,IsInSitemap,DistHtmlExists,DistHtmlPath,RedirectTarget,Notes\n';
const csvRows = inventory.map((item) => {
  return [
    `"${item.url}"`,
    `"${item.routePath}"`,
    `"${item.classification}"`,
    item.isIndexable ? 'YES' : 'NO',
    item.isInSitemap ? 'YES' : 'NO',
    item.distHtmlExists ? 'YES' : 'NO',
    `"${item.distHtmlPath || ''}"`,
    `"${item.redirectTarget || ''}"`,
    `"${(item.notes || '').replace(/"/g, '""')}"`,
  ].join(',');
});
fs.writeFileSync('scripts/qa3/ROUTE_INVENTORY.csv', csvHeader + csvRows.join('\n'));

// Now investigate the 340 vs 342 discrepancy:
console.log('\n--- INVESTIGATING 340 vs 342 DISCREPANCY ---');
console.log(`Actual tools array length: ${tools.length}`);
console.log(`NOINDEX_SLUGS count: ${NOINDEX_SLUGS.size} (${Array.from(NOINDEX_SLUGS).join(', ')})`);
console.log(`Indexable tools: ${tools.length - NOINDEX_SLUGS.size}`);

// Category items breakdown:
let sumCategoryCounts = 0;
for (const cat of CATEGORIES) {
  const catTools = tools.filter((t) => t.category === cat.id);
  const indexableCatTools = catTools.filter((t) => !NOINDEX_SLUGS.has(t.slug));
  console.log(`  ${cat.id} (${cat.label}): ${catTools.length} registered, ${indexableCatTools.length} indexable`);
  sumCategoryCounts += indexableCatTools.length;
}
console.log(`Sum of indexable tools listed across CATEGORIES: ${sumCategoryCounts}`);
