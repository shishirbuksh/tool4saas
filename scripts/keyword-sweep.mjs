#!/usr/bin/env node
// One-off: strip machine-spam entries from keywords arrays.
// - Drops question-style keywords ("how to ..." entries) — keyword-stuffing tell.
// - Drops fabricated numeric "vs" keywords (e.g. "238 wpm skimming vs 130 speaking").
import fs from "fs";
import path from "path";

const DIR = path.resolve("src/lib/tools/data");
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".ts"));

function cleanKeywords(text) {
  // Consume the closing "], " explicitly and rebuild exactly one "]," — the
  // earlier version matched only `[...]` and re-appended a bracket, stacking
  // "]" layers on each rerun.
  return text.replace(/keywords:\s*\[([\s\S]*?)\]\s*,?/g, (m, inner) => {
    const entries = [];
    const re = /("([^"\\]|\\.)*")/g;
    let match;
    while ((match = re.exec(inner)) !== null) {
      const raw = match[1];
      const value = raw.slice(1, -1);
      const isQuestion = value.endsWith("?");
      const isDigitVs = /\d/.test(value) && / vs /.test(value);
      const isJunkTail = /next step|generator next|deep search|instant download/.test(value);
      if (isQuestion || isDigitVs || isJunkTail) continue;
      entries.push(raw);
    }
    return `keywords: [${entries.join(", ")}],`;
  });
}

let total = 0;
for (const f of files) {
  const p = path.join(DIR, f);
  const c = fs.readFileSync(p, "utf8");
  const c2 = cleanKeywords(c);
  if (c2 !== c) fs.writeFileSync(p, c2);
  total += 1;
}
// measurement pass counts ALL arrays per file
let left = 0;
let stillBad = 0;
let arrays = 0;
for (const f of files) {
  const c = fs.readFileSync(path.join(DIR, f), "utf8");
  const arraysText = [...c.matchAll(/keywords:\s*\[([\s\S]*?)\]/g)];
  for (const m of arraysText) {
    arrays++;
    const entries = [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    left += entries.length;
    stillBad += entries.filter((e) => e.endsWith("?") || / vs /.test(e)).length;
  }
}
console.log(`keyword sweep: files=${total} arrays=${arrays} entriesLeft=${left} stillBad=${stillBad}`);
