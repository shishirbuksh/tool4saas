#!/usr/bin/env node
// Validate blog content: fingerprint vocabulary + cross-post template n-grams.
// Mirrors the gates in validate-tools.mjs so machine-spun phrasing cannot
// creep back into either the tool catalog or the blog silo.
import fs from "fs";
import path from "path";

const DIR = path.resolve("src/content/blog");
const REGISTRY = path.resolve("src/lib/blog-registry.ts");

const posts = [];
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith(".ts")) continue;
  posts.push({ file: f, name: f, text: fs.readFileSync(path.join(DIR, f), "utf8") });
}
posts.push({ file: "lib/blog-registry.ts", name: "src/lib/blog-registry.ts", text: fs.readFileSync(REGISTRY, "utf8") });

const errors = [];
const warnings = [];

// Fingerprint gates (file level): choreographed canned phrasing must stay gone.
for (const p of posts) {
  const t = p.text;
  if (/\bsans\b/.test(t)) errors.push(`${p.name}: "sans" machine-spin vocabulary`);
  if (/\bwholly\b/.test(t)) errors.push(`${p.name}: "wholly" machine-spin vocabulary`);
  if (/\bevaporate?s? (?:on|upon) close\b/.test(t)) errors.push(`${p.name}: "evaporate(s) on close" canned privacy phrasing`);
  if (/entirely entirely/.test(t)) errors.push(`${p.name}: "entirely entirely" replacement artifact`);
  if (/ inside your browser tab/.test(t)) errors.push(`${p.name}: canned "inside your browser tab" privacy template`);
  if (/(?<=[a-z,]) plus (?=[a-z])/.test(t)) errors.push(`${p.name}: "plus" used as conjunction (machine-spin tell)`);
  // Question-stuffed keyword arrays
  for (const arr of t.matchAll(/keywords:\s*\[([\s\S]*?)\]/g)) {
    for (const k of arr[1].matchAll(/"([^"]+)"/g)) {
      if (k[1].includes("?")) errors.push(`${p.name}: question keyword "${k[1]}"`);
    }
  }
}

// Wrong-bracket stacks from any future bad sweep (repair-kw-brackets pattern)
for (const p of posts) {
  if (/"]\](?:\s*]){1,},/.test(p.text) || /\n(?:\s*]){2,},/.test(p.text)) {
    errors.push(`${p.name}: stacked "]" array-closer artifacts`);
  }
}

// Cross-post 8-word n-grams across >=4 posts in FAQ answers / descriptions
const gramIndex = new Map();
const shortOf = (s) => s.replace(/^["']|["']$/, "");
for (const p of posts) {
  const answers = [...p.text.matchAll(/answer:\s*["'`]([\s\S]{0,700}?)[",\n]/g)].map((m) => shortOf(m[1]));
  const descs = [...p.text.matchAll(/description:\s*["'`]([\s\S]{0,300}?)[",\n]/g)].map((m) => shortOf(m[1]));
  for (const a of [...answers, ...descs]) {
    const toks = a.toLowerCase().split(/[^a-z0-9']+/).filter((t) => t.length > 2);
    for (let i = 0; i + 8 <= toks.length; i++) {
      const gram = toks.slice(i, i + 8).join(" ");
      if (!gramIndex.has(gram)) gramIndex.set(gram, new Set());
      gramIndex.get(gram).add(p.name);
    }
  }
}
for (const [gram, names] of gramIndex.entries()) {
  if (names.size >= 4) {
    warnings.push(`canned template n-gram in ${names.size} posts: "${gram}" (${[...names].slice(0, 4).join(", ")}${names.size > 4 ? ", …" : ""})`);
  }
}

if (errors.length) {
  console.error(`\nvalidate-blog: ${errors.length} issue(s):\n- ${errors.slice(0, 30).join("\n- ")}\n`);
  process.exit(1);
}
console.log(`validate-blog: OK – ${posts.length} posts`);
if (warnings.length) {
  console.warn(`\nvalidate-blog: ${warnings.length} warning(s):\n- ${warnings.slice(0, 30).join("\n- ")}\n`);
}
