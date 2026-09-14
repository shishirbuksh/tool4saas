#!/usr/bin/env node
// Validate tools.ts at build: category ∈ CATEGORIES and icon ∈ IconName, O(1) getTool, unique slugs
import fs from "fs";
import path from "path";

const toolsPath = path.resolve("src/lib/tools.ts");
let content = fs.readFileSync(toolsPath, "utf8");
// Handle split barrel: if tools.ts is a re-export barrel, aggregate from split files
if (!content.includes("ICON_NAMES") || content.includes('export * from "./tools/index"')) {
  const parts = [];
  const tryRead = (p) => {
    try { if (fs.existsSync(p)) parts.push(fs.readFileSync(p, "utf8")); } catch {}
  };
  tryRead(path.resolve("src/lib/tools/icons.ts"));
  tryRead(path.resolve("src/lib/tools/types.ts"));
  tryRead(path.resolve("src/lib/tools/categories.ts"));
  tryRead(path.resolve("src/lib/tools/index.ts"));
  const dataDir = path.resolve("src/lib/tools/data");
  if (fs.existsSync(dataDir)) {
    for (const f of fs.readdirSync(dataDir)) {
      if (f.endsWith(".ts")) tryRead(path.join(dataDir, f));
    }
  }
  // Also include barrel itself for completeness
  content = parts.join("\n") + "\n" + content;
}

// Extract CATEGORIES ids
const catIds = [...content.matchAll(/id:\s*"([^"]+)"\s*,?\s*\n\s*label:/g)].map(m => m[1]);
// Better: extract ICON_NAMES block
const iconBlock = content.match(/export const ICON_NAMES = \[([\s\S]*?)\] as const/);
const icons = iconBlock ? [...iconBlock[1].matchAll(/"([^"]+)"/g)].map(m=>m[1]) : [];
const iconSet = new Set(icons);
const catSet = new Set(catIds);

const toolBlocks = content.split(/{\s*slug:\s*"/).slice(1);
let errors = [];
const slugs = new Set();
toolBlocks.forEach((block) => {
  const slug = (block.match(/^([^"]+)"/) || [])[1];
  if (!slug) {
    // Skip non-tool blocks (type definitions) that may contain 'slug:' without quote
    return;
  }
  if (slugs.has(slug)) errors.push(`Duplicate slug: ${slug}`);
  else slugs.add(slug);
  const icon = (block.match(/icon:\s*"([^"]+)"/) || [])[1];
  if (!icon) errors.push(`${slug}: missing icon`);
  else if (!iconSet.has(icon)) errors.push(`${slug}: icon "${icon}" not in ICON_NAMES`);
  const cat = (block.match(/category:\s*"([^"]+)"/) || [])[1];
  if (!cat) errors.push(`${slug}: missing category`);
  else if (!catSet.has(cat)) errors.push(`${slug}: category "${cat}" not in CATEGORIES`);
  const desc = (block.match(/description:\s*"([^"]+)"/) || [])[1];
  if (desc) {
    // SEO: 150-160 char ideal, warn if outside 100-180
    if (desc.length < 100 || desc.length > 180) {
      errors.push(`${slug}: description length ${desc.length} outside 100-180 (ideal 150-160)`);
    }
  }
});

// Check O(1) usage: ensure no tools.find remaining in src (except allowed) - cross-platform
try {
  const srcRoot = path.resolve("src");
  const findUsages = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
        // Allow tools.find in test files for verification (e.g., coverage.test.ts compares getTool vs find)
        if (entry.name.includes(".test.") || entry.name.includes(".spec.")) continue;
        const c = fs.readFileSync(full, "utf8");
        if (c.includes("tools.find")) {
          const lines = c.split("\n");
          lines.forEach((line, i) => {
            if (line.includes("tools.find")) findUsages.push(`${path.relative(process.cwd(), full)}:${i + 1}: ${line.trim()}`);
          });
        }
      }
    }
  };
  walk(srcRoot);
  // Allowlist: none - all should use getTool (test files excluded above)
  if (findUsages.length) {
    errors.push(`tools.find still used (should use getTool Map O(1)):\n${findUsages.join("\n")}`);
  }
} catch {}

if (errors.length) {
  console.error(`\nvalidate-tools: ${errors.length} issue(s) found:\n- ${errors.join("\n- ")}\n`);
  // Warn but not fail build if only description length warnings? Fail on category/icon/duplicate/find
  const hard = errors.filter(e => !e.includes("description length"));
  if (hard.length) {
    process.exit(1);
  } else {
    console.warn("validate-tools: only description warnings – allowing build");
  }
} else {
  console.log(`validate-tools: OK – ${slugs.size} tools, ${catIds.length} categories, ${icons.length} icons`);
}

// Also ensure toolsByCategoryCached is imported in key consumers
const consumers = ["src/app/page.tsx", "src/components/Header.tsx", "src/app/category/[id]/page.tsx", "src/components/SiteJsonLd.tsx"];
consumers.forEach(p => {
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, "utf8");
    if (!c.includes("toolsByCategoryCached") && !c.includes("toolsByCategory")) {
      console.warn(`validate-tools: ${p} does not import toolsByCategoryCached`);
    }
  }
});
