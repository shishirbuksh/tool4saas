#!/usr/bin/env node
// One-off repair: the keyword sweep scripts mis-reconstructed array closers,
// stacking "]" before the trailing comma (e.g. `..."a"]]]]]]],`).
// Normalize any run of "]" between the last keyword entry and the array closer.
import fs from "fs";
import path from "path";

const FILES = [
  ...fs.readdirSync("src/content/blog").map((f) => path.join("src/content/blog", f)),
  "src/lib/blog-registry.ts",
  ...fs.readdirSync("src/lib/tools/data").map((f) => path.join("src/lib/tools/data", f)),
];

let repaired = 0;
for (const p of FILES) {
  if (!p.endsWith(".ts")) continue;
  let c = fs.readFileSync(p, "utf8");
  // collapse ` X"]]]]]]],` stacks after the final quoted entry of keywords arrays
  const fixed = c.replace(/("(?:[^"\\]|\\.)*")\](?:\s*\]){2,},/g, "$1],");
  // also collapse stacks NOT preceded by quote (e.g. leftover `\n  ]]]]],`)
  const fixed2 = fixed.replace(/\n(?:\s*\]){2,},/g, "\n  ],");
  if (fixed2 !== c) {
    fs.writeFileSync(p, fixed2);
    repaired++;
  }
}
console.log(`repaired ${repaired} files`);
