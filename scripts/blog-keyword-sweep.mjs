#!/usr/bin/env node
// One-off: strip question-spam + fabricated numeric-vs keywords from
// blog-registry.ts and content/blog/*.ts keyword arrays.
import fs from "fs";
import path from "path";

function cleanKeywordsInFile(p) {
  const cards = fs.readFileSync(p, "utf8");
  let dropped = 0;
  // Consume the closing "], " explicitly and rebuild exactly one "]," — the
  // earlier version matched only `[...]` and re-appended a bracket, stacking
  // "]" layers on each rerun (fixed; repair-kw-brackets.mjs heals old damage).
  const out = cards.replace(/keywords:\s*\[([\s\S]*?)\]\s*,?/g, (m, inner) => {
    const re = /("(?:[^"\\]|\\.)*")/g;
    const kept = [];
    let match;
    while ((match = re.exec(inner)) !== null) {
      const value = match[1].slice(1, -1);
      const bad =
        value.endsWith("?") ||
        (/\d/.test(value) && value.includes(" vs ")) ||
        /(next step|deep search|instant download)/.test(value);
      if (bad) {
        dropped++;
        continue;
      }
      kept.push(match[1]);
    }
    if (kept.length < 3) {
      console.log(`WARN ${p}: array would fall below 3 entries, kept original`);
      return m;
    }
    return `keywords: [${kept.join(", ")}],`;
  });
  if (out !== cards) fs.writeFileSync(p, out);
  return dropped;
}

let total = 0;
for (const f of ["src/lib/blog-registry.ts", ...fs.readdirSync("src/content/blog").filter((f) => f.endsWith(".ts")).map((f) => path.join("src/content/blog", f))]) {
  total += cleanKeywordsInFile(f);
}
console.log(`files with drops, total dropped: ${total}`);
