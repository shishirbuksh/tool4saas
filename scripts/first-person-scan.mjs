#!/usr/bin/env node
// Scan blog content for remaining first-person claim patterns (report only).
import fs from "fs";
import path from "path";

const DIR = path.resolve("src/content/blog");
const hits = [];
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith(".ts")) continue;
  const c = fs.readFileSync(path.join(DIR, f), "utf8");
  for (const m of c.matchAll(/\bI (?:have|once|tested|verified|learned|review|reviewed|used to|found a|am|was)\b/g)) {
    hits.push(`${f}:${m.choiceIndex ?? ""} ${c.slice(m.index, m.index + 110).replace(/\s+/g, " ")}`);
  }
  for (const m of c.matchAll(/\b(?:my|mine)\s+(?:own\s+)?(?:proforma|notes|desk|bench|client)\b/g)) {
    hits.push(`${f} [possession] ${c.slice(m.index, m.index + 100).replace(/\s+/g, " ")}`);
  }
}
console.log(hits.length ? hits.join("\n") : "clean");
