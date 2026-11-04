import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve("dist");

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
console.log(`Found ${htmlFiles.length} HTML files in dist/`);

const results = {
  totalPages: htmlFiles.length,
  missingTitle: [],
  missingDescription: [],
  duplicateTitles: new Map(),
  duplicateDescriptions: new Map(),
  missingH1: [],
  multipleH1: [],
  missingCanonical: [],
  invalidCanonical: [],
  missingRobots: [],
  accidentalNoindex: [],
  missingOgTitle: [],
  missingOgImage: [],
  missingTwitterCard: [],
  missingLang: [],
  imagesWithoutAlt: [],
  brokenInternalLinks: [],
  jsonLdParseErrors: [],
  jsonLdInBody: [],
  thinContentPages: [],
  titlesWithArtifacts: [],
  descriptionsWithArtifacts: [],
};

const allUrls = new Set();
// Map file path to URL
const fileToUrl = new Map();
const urlToFile = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(DIST_DIR, file).replace(/\\/g, "/");
  let urlPath = "";
  if (rel === "index.html") {
    urlPath = "/";
  } else if (rel.endsWith("/index.html")) {
    urlPath = "/" + rel.slice(0, -"/index.html".length);
  } else if (rel.endsWith(".html")) {
    urlPath = "/" + rel.slice(0, -".html".length);
  }
  fileToUrl.set(file, urlPath);
  urlToFile.set(urlPath, file);
  allUrls.add(urlPath);
}

// Redirects map from scripts/redirects.mjs
const redirectsModule = await import("./redirects.mjs");
const redirectMap = redirectsModule.REDIRECT_MAP;

for (const file of htmlFiles) {
  const urlPath = fileToUrl.get(file);
  const html = fs.readFileSync(file, "utf8");
  const head = html.split("</head>")[0] || "";
  const body = html.split("</head>")[1] || "";

  // 1. Language
  if (!html.includes('<html lang="en"')) {
    results.missingLang.push(urlPath);
  }

  // 2. Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  if (!title) {
    results.missingTitle.push(urlPath);
  } else {
    // Check for artifacts like "- Free Tool | Tool4SaaS" on non-tool or duplicate "Free - Free Tool"
    if (title.includes("Free - Free Tool") || (urlPath.startsWith("/about") && title.includes("Free Tool"))) {
      results.titlesWithArtifacts.push({ urlPath, title });
    }
    if (!results.duplicateTitles.has(title)) {
      results.duplicateTitles.set(title, []);
    }
    results.duplicateTitles.get(title).push(urlPath);
  }

  // 3. Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const desc = descMatch ? descMatch[1].trim() : "";
  if (!desc) {
    results.missingDescription.push(urlPath);
  } else {
    if (desc.includes("Free, private, and works offline. Free, private, and works offline.")) {
      results.descriptionsWithArtifacts.push({ urlPath, desc });
    }
    if (!results.duplicateDescriptions.has(desc)) {
      results.duplicateDescriptions.set(desc, []);
    }
    results.duplicateDescriptions.get(desc).push(urlPath);
  }

  // 4. Canonical
  const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : "";
  if (!canonical) {
    results.missingCanonical.push(urlPath);
  } else {
    const expected = urlPath === "/" ? "https://tool4saas.com" : `https://tool4saas.com${urlPath}`;
    if (canonical !== expected && !urlPath.includes("404")) {
      results.invalidCanonical.push({ urlPath, canonical, expected });
    }
  }

  // 5. Robots
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : "";
  if (!robots) {
    results.missingRobots.push(urlPath);
  } else {
    if (robots.includes("noindex")) {
      // Check if it's expected noindex
      const isExpected = urlPath === "/404" || urlPath === "/probe" || urlPath === "/pdf-compress" || urlPath === "/fancy-text-generator" || urlPath === "/blog/pdf-merge-guide/compress-pdf-1mb-email";
      if (!isExpected) {
        results.accidentalNoindex.push({ urlPath, robots });
      }
    }
  }

  // 6. H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0 && urlPath !== "/404") {
    results.missingH1.push(urlPath);
  } else if (h1Matches.length > 1) {
    results.multipleH1.push({ urlPath, count: h1Matches.length });
  }

  // 7. OpenGraph
  if (!html.includes('property="og:title"') && urlPath !== "/404") {
    results.missingOgTitle.push(urlPath);
  }
  if (!html.includes('property="og:image"') && urlPath !== "/404") {
    results.missingOgImage.push(urlPath);
  }

  // 8. Twitter Card
  if (!html.includes('name="twitter:card"') && urlPath !== "/404") {
    results.missingTwitterCard.push(urlPath);
  }

  // 9. Images alt text
  const imgTags = [...html.matchAll(/<img([^>]+)>/gi)];
  for (const img of imgTags) {
    const attrs = img[1];
    if (!attrs.includes("alt=") || /alt=["']\s*["']/.test(attrs)) {
      results.imagesWithoutAlt.push({ urlPath, img: img[0].slice(0, 100) });
    }
  }

  // 10. JSON-LD
  const jsonLdScripts = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const s of jsonLdScripts) {
    try {
      JSON.parse(s[1]);
    } catch (e) {
      results.jsonLdParseErrors.push({ urlPath, error: e.message });
    }
    if (body.includes(s[0])) {
      results.jsonLdInBody.push(urlPath);
    }
  }

  // 11. Internal links
  const aTags = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)];
  for (const a of aTags) {
    const href = a[1].split("#")[0].split("?")[0];
    if (href.startsWith("/") && !href.startsWith("//")) {
      // Internal link
      if (href === "" || href === "/") continue;
      // Exclude asset paths like /favicon, /icon, /og, /manifest
      if (href.startsWith("/icon") || href.startsWith("/favicon") || href.startsWith("/og/") || href.endsWith(".xml") || href.endsWith(".txt") || href.endsWith(".png") || href.endsWith(".webmanifest")) {
        continue;
      }
      const cleanHref = href.replace(/\/$/, "");
      if (!allUrls.has(cleanHref)) {
        // Check if redirect
        const redir = redirectMap[cleanHref] || redirectMap[cleanHref + "/"];
        results.brokenInternalLinks.push({ from: urlPath, to: href, redirectedTo: redir || null });
      }
    }
  }

  // 12. Thin content check (body text word count)
  const cleanBodyText = body.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = cleanBodyText ? cleanBodyText.split(" ").length : 0;
  if (wordCount < 100 && urlPath !== "/404" && urlPath !== "/probe") {
    results.thinContentPages.push({ urlPath, wordCount });
  }
}

// Filter duplicate titles with > 1 occurrences
const realDuplicateTitles = [];
for (const [title, pages] of results.duplicateTitles.entries()) {
  if (pages.length > 1) {
    realDuplicateTitles.push({ title, count: pages.length, pages });
  }
}

// Filter duplicate descriptions with > 1 occurrences
const realDuplicateDescriptions = [];
for (const [desc, pages] of results.duplicateDescriptions.entries()) {
  if (pages.length > 1) {
    realDuplicateDescriptions.push({ desc: desc.slice(0, 80) + "...", count: pages.length, pages });
  }
}

// Deduplicate jsonLdInBody
const uniqueJsonLdInBody = [...new Set(results.jsonLdInBody)];

console.log("\n================ FULL AUDIT RESULTS ================");
console.log(`Total HTML files scanned: ${results.totalPages}`);
console.log(`Missing Lang: ${results.missingLang.length}`);
console.log(`Missing Title: ${results.missingTitle.length}`);
console.log(`Missing Description: ${results.missingDescription.length}`);
console.log(`Duplicate Titles: ${realDuplicateTitles.length}`);
console.log(`Duplicate Descriptions: ${realDuplicateDescriptions.length}`);
console.log(`Missing H1: ${results.missingH1.length}`, results.missingH1);
console.log(`Multiple H1: ${results.multipleH1.length}`, results.multipleH1);
console.log(`Missing Canonical: ${results.missingCanonical.length}`);
console.log(`Invalid Canonical: ${results.invalidCanonical.length}`, results.invalidCanonical.slice(0, 5));
console.log(`Accidental Noindex: ${results.accidentalNoindex.length}`, results.accidentalNoindex);
console.log(`Missing OG Title: ${results.missingOgTitle.length}`);
console.log(`Missing OG Image: ${results.missingOgImage.length}`);
console.log(`Missing Twitter Card: ${results.missingTwitterCard.length}`);
console.log(`JSON-LD Parse Errors: ${results.jsonLdParseErrors.length}`);
console.log(`Pages with JSON-LD in Body: ${uniqueJsonLdInBody.length}`);
console.log(`Broken Internal Links: ${results.brokenInternalLinks.length}`);
if (results.brokenInternalLinks.length > 0) {
  console.log("Sample broken internal links:", results.brokenInternalLinks.slice(0, 10));
}
console.log(`Images without Alt text: ${results.imagesWithoutAlt.length}`);
console.log(`Thin content pages (<100 words): ${results.thinContentPages.length}`, results.thinContentPages);
console.log(`Titles with artifacts: ${results.titlesWithArtifacts.length}`, results.titlesWithArtifacts);
console.log("====================================================");
