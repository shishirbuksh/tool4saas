import fs from 'fs';
import path from 'path';
import { REDIRECTS } from './redirects.mjs';

const distDir = path.resolve('dist');
const redirectRoutes = new Set(REDIRECTS.map(r => r[0]));

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files in dist/`);

const validRoutes = new Set();
const fileToRoute = new Map();
const noindexRoutes = new Set();

for (const f of htmlFiles) {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  let route = '/' + rel;
  if (route.endsWith('/index.html')) {
    route = route.slice(0, -11) || '/';
  } else if (route.endsWith('.html')) {
    route = route.slice(0, -5);
  }
  if (route === '/index') route = '/';
  
  validRoutes.add(route);
  fileToRoute.set(f, route);

  const headSnippet = fs.readFileSync(f, 'utf8').slice(0, 4000);
  if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(headSnippet)) {
    noindexRoutes.add(route);
  }
}

// Canonical live routes = validRoutes minus redirectRoutes minus error/probe routes
const liveRoutes = new Set();
const indexableLiveRoutes = new Set();
for (const r of validRoutes) {
  if (!redirectRoutes.has(r) && r !== '/404' && r !== '/probe') {
    liveRoutes.add(r);
    if (!noindexRoutes.has(r)) {
      indexableLiveRoutes.add(r);
    }
  }
}

console.log(`Total live canonical pages: ${liveRoutes.size} (${indexableLiveRoutes.size} indexable, ${noindexRoutes.size} intentional noindex)`);

const inbound = new Map();
const outbound = new Map();
const brokenLinks = [];

for (const r of validRoutes) {
  inbound.set(r, new Set());
  outbound.set(r, new Set());
}

const linkRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

for (const f of htmlFiles) {
  const sourceRoute = fileToRoute.get(f);
  // Don't count outgoing links from meta-refresh fallback pages
  if (redirectRoutes.has(sourceRoute)) continue;

  const content = fs.readFileSync(f, 'utf8');

  for (const match of content.matchAll(linkRegex)) {
    const rawHref = match[1].trim();
    const anchorText = match[2].replace(/<[^>]+>/g, '').trim();

    if (
      rawHref.startsWith('http://') ||
      rawHref.startsWith('https://') ||
      rawHref.startsWith('mailto:') ||
      rawHref.startsWith('tel:') ||
      rawHref.startsWith('javascript:') ||
      rawHref.startsWith('#')
    ) {
      continue;
    }

    let target = rawHref.split('#')[0].split('?')[0];
    if (!target.startsWith('/')) target = '/' + target;
    if (target.length > 1 && target.endsWith('/')) target = target.slice(0, -1);
    if (target === '') target = '/';

    if (/\.(png|jpg|jpeg|gif|svg|ico|webp|xml|txt|json|css|js|map)$/i.test(target)) {
      continue;
    }

    outbound.get(sourceRoute)?.add(target);

    if (validRoutes.has(target)) {
      inbound.get(target)?.add(sourceRoute);
    } else {
      brokenLinks.push({ source: sourceRoute, target, rawHref, anchorText });
    }
  }
}

console.log(`\n=== BROKEN INTERNAL LINKS (${brokenLinks.length}) ===`);
if (brokenLinks.length > 0) {
  const grouped = new Map();
  for (const b of brokenLinks) {
    if (!grouped.has(b.target)) grouped.set(b.target, []);
    grouped.get(b.target).push(b);
  }
  for (const [t, list] of grouped.entries()) {
    console.log(`Target 404: "${t}" (referenced by ${list.length} pages, e.g. ${list[0].source} with anchor "${list[0].anchorText}")`);
  }
} else {
  console.log('Zero broken internal links found!');
}

console.log(`\n=== ORPHAN INDEXABLE LIVE PAGES (Inbound = 0 among live routes) ===`);
const orphans = [];
for (const r of indexableLiveRoutes) {
  const inLinks = inbound.get(r);
  if (!inLinks || inLinks.size === 0) {
    orphans.push(r);
  }
}
if (orphans.length > 0) {
  orphans.forEach(o => console.log(`Orphan: ${o}`));
} else {
  console.log('Zero orphan indexable live pages found!');
}

console.log(`\n=== LOW-INBOUND INDEXABLE LIVE PAGES (Inbound < 4) ===`);
const lowInbound = [];
for (const r of indexableLiveRoutes) {
  const inLinks = inbound.get(r);
  if (inLinks && inLinks.size < 4) {
    lowInbound.push({ route: r, count: inLinks.size, sources: Array.from(inLinks) });
  }
}
lowInbound.sort((a, b) => a.count - b.count);
console.log(`Total low-inbound pages (< 4): ${lowInbound.length}`);
lowInbound.forEach(l => {
  console.log(`${l.route}: ${l.count} inbound links (from: ${l.sources.slice(0, 3).join(', ')}${l.sources.length > 3 ? '...' : ''})`);
});

console.log(`\n=== LIVE CANONICAL INBOUND LINK DISTRIBUTION ===`);
const liveCounts = Array.from(indexableLiveRoutes).map(r => inbound.get(r)?.size || 0);
const avg = (liveCounts.reduce((a, b) => a + b, 0) / liveCounts.length).toFixed(1);
const max = Math.max(...liveCounts);
const min = Math.min(...liveCounts);
console.log(`Min: ${min}, Max: ${max}, Average: ${avg} inbound links per indexable live page`);
