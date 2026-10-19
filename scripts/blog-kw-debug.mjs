#!/usr/bin/env node
// Debug: list files whose keyword arrays still contain "?" entries
import fs from "fs";
import path from "path";

const DIR = "src/content/blog";
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith(".ts")) continue;
  const c = fs.readFileSync(path.join(DIR, f), "utf8");
  const arrays = [...c.matchAll(/keywords:\s*\[([\s\S]*?)\]/g)];
  const bad = [];
  for (const [, inner] of arrays) {
    for (const m of inner.matchAll(/"([^"]+)"/g)) {
      if (m[1].includes("?")) bad.push(m[1]);
    }
  }
  if (bad.length) console.log(`${f}: ${bad.length} -> ${bad.slice(0, 3).join(" | ")}`);
}
