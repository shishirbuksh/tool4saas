import fs from "node:fs";
import path from "node:path";
import { REDIRECTS } from "../redirects.mjs";

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      getAllFiles(p, fileList);
    } else {
      fileList.push(p);
    }
  }
  return fileList;
}

const sitemapXml = fs.readFileSync("dist/sitemap.xml", "utf8");
const sitemapUrls = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));

const redirectMap = new Map(REDIRECTS);

const allDistFiles = getAllFiles("dist").map(f => f.replace(/\\/g, "/"));
const htmlFiles = allDistFiles.filter(f => f.endsWith(".html"));

const inventory = [];

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const isRedirectStub = content.includes('http-equiv="refresh"');
  
  // URL derivation from file path
  // dist/index.html -> /
  // dist/404.html -> /404
  // dist/category/pdf.html -> /category/pdf
  // dist/blog/invoice-generator-guide/index.html -> /blog/invoice-generator-guide
  // dist/blog/invoice-generator-guide/how-to-create-invoice-online.html -> /blog/invoice-generator-guide/how-to-create-invoice-online
  let urlPath = filePath.replace(/^dist/, "").replace(/\.html$/, "");
  if (urlPath === "/index") urlPath = "/";
  if (urlPath.endsWith("/index")) urlPath = urlPath.replace(/\/index$/, "");

  const fullUrl = `https://tool4saas.com${urlPath === "/" ? "" : urlPath}`;
  
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : null;

  const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  const robots = robotsMatch ? robotsMatch[1] : "index, follow";
  const isNoindex = robots.toLowerCase().includes("noindex");

  const inSitemap = sitemapUrls.has(fullUrl === "https://tool4saas.com" ? "https://tool4saas.com" : fullUrl);

  // Determine Page Type
  let pageType = "Unknown";
  let redirectDest = null;
  let reasonForExclusion = null;

  if (isRedirectStub) {
    pageType = "Redirect Stub";
    const refreshMatch = content.match(/content="0;url=([^"]+)"/i);
    redirectDest = refreshMatch ? refreshMatch[1] : redirectMap.get(urlPath) || null;
    reasonForExclusion = "Legacy URL consolidated via 301 redirect (Astro meta-refresh stub)";
  } else if (urlPath === "/") {
    pageType = "Homepage";
  } else if (urlPath === "/404") {
    pageType = "Error Page (404)";
    reasonForExclusion = "HTTP 404 Not Found error template";
  } else if (urlPath === "/probe") {
    pageType = "Diagnostic Endpoint";
    reasonForExclusion = "Internal diagnostic test endpoint (noindex, disallowed)";
  } else if (urlPath === "/blog") {
    pageType = "Blog Index";
  } else if (urlPath.startsWith("/category/")) {
    pageType = "Category Page";
  } else if (urlPath.startsWith("/blog/")) {
    const parts = urlPath.split("/").filter(Boolean);
    if (parts.length === 2) pageType = "Blog Pillar";
    else pageType = "Blog Cluster";
  } else if (["/about", "/author", "/contact", "/methodology", "/privacy", "/terms", "/sitemap"].includes(urlPath)) {
    pageType = "Static Policy / Info Page";
  } else {
    pageType = "Tool Page";
  }

  if (!inSitemap && !isRedirectStub && !reasonForExclusion) {
    if (isNoindex) {
      reasonForExclusion = `Marked noindex (${urlPath})`;
    } else {
      reasonForExclusion = "Not in sitemap";
    }
  }

  inventory.push({
    filePath,
    urlPath,
    fullUrl,
    pageType,
    isRedirectStub,
    canonical,
    robots,
    isNoindex,
    inSitemap,
    redirectDest,
    reasonForExclusion
  });
}

// Summary statistics
const totalHtml = inventory.length;
const realPages = inventory.filter(i => !i.isRedirectStub);
const redirectStubs = inventory.filter(i => i.isRedirectStub);
const sitemapIncluded = inventory.filter(i => i.inSitemap);
const realPagesNotInSitemap = realPages.filter(i => !i.inSitemap);

const tools = realPages.filter(i => i.pageType === "Tool Page");
const indexableTools = tools.filter(i => !i.isNoindex);
const noindexTools = tools.filter(i => i.isNoindex);

const blogPages = realPages.filter(i => i.pageType === "Blog Pillar" || i.pageType === "Blog Cluster");
const indexableBlog = blogPages.filter(i => !i.isNoindex);
const noindexBlog = blogPages.filter(i => i.isNoindex);

const categories = realPages.filter(i => i.pageType === "Category Page");
const staticPages = realPages.filter(i => i.pageType === "Static Policy / Info Page");
const homepage = realPages.filter(i => i.pageType === "Homepage");
const blogIndex = realPages.filter(i => i.pageType === "Blog Index");
const specialPages = realPages.filter(i => i.pageType === "Error Page (404)" || i.pageType === "Diagnostic Endpoint");

console.log("================ ROUTE INVENTORY RECONCILIATION ================");
console.log(`Total HTML files in dist/            : ${totalHtml}`);
console.log(` - Real HTML Pages                   : ${realPages.length}`);
console.log(` - Legacy Redirect Stubs             : ${redirectStubs.length}`);
console.log(`\nReal HTML Page Breakdown:`);
console.log(` - Homepage                          : ${homepage.length}`);
console.log(` - Category Pages                    : ${categories.length}`);
console.log(` - Tools (Total Registered)          : ${tools.length}`);
console.log(`     * Indexable Tools               : ${indexableTools.length}`);
console.log(`     * Noindexed Tools               : ${noindexTools.length} (${noindexTools.map(t => t.urlPath).join(", ")})`);
console.log(` - Blog Index                        : ${blogIndex.length}`);
console.log(` - Blog Articles (Total Guides)      : ${blogPages.length}`);
console.log(`     * Indexable Blog Guides         : ${indexableBlog.length}`);
console.log(`     * Noindexed Blog Guides         : ${noindexBlog.length} (${noindexBlog.map(b => b.urlPath).join(", ")})`);
console.log(` - Static Policy / Info Pages        : ${staticPages.length}`);
console.log(` - Special Non-Indexable Pages       : ${specialPages.length} (${specialPages.map(s => s.urlPath).join(", ")})`);
console.log(`\nSitemap Reconciliation:`);
console.log(` - Sitemap URLs in sitemap.xml       : ${sitemapUrls.size}`);
console.log(` - Real Pages in Sitemap             : ${sitemapIncluded.length}`);
console.log(` - Real Pages EXCLUDED from Sitemap  : ${realPagesNotInSitemap.length}`);
console.log(`\nExact Excluded Real Pages (${realPagesNotInSitemap.length}):`);
for (const p of realPagesNotInSitemap) {
  console.log(`   ${p.urlPath} | Type: ${p.pageType} | Robots: ${p.robots} | Reason: ${p.reasonForExclusion}`);
}
console.log("=================================================================\n");

fs.writeFileSync("scripts/qa3/route-inventory.json", JSON.stringify(inventory, null, 2));
console.log("Saved full route inventory to scripts/qa3/route-inventory.json");
