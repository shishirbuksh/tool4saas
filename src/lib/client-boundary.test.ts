import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(tsx?|jsx?)$/.test(entry.name) ? [full] : [];
  });
}

const forbidden = [/^@\/lib\/tools$/, /^@\/lib\/tools\/index$/, /^@\/lib\/tools\/catalog-lite$/];
const importRe = /import\s+(type\s+)?(?:[^"']+?)\s+from\s+["']([^"']+)["']/g;

describe("client bundle boundaries", () => {
  it("does not ship the full catalogue or lite catalogue to client components", () => {
    const violations: string[] = [];

    for (const file of walk(path.resolve("src"))) {
      const source = fs.readFileSync(file, "utf8");
      if (!/^\s*["']use client["']/m.test(source)) continue;

      for (const match of source.matchAll(importRe)) {
        const typeOnly = Boolean(match[1]);
        const specifier = match[2];
        if (typeOnly) continue;
        if (forbidden.some((pattern) => pattern.test(specifier))) {
          violations.push(`${path.relative(process.cwd(), file)} imports ${specifier}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
