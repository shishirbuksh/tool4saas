import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { getClusterPost, getPillarPost } from "@/lib/blog-registry";
import { getTool } from "@/lib/tools";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");
const STATIC_ROUTES = new Set([
  "/",
  "/blog",
  "/guides",
  "/about",
  "/author",
  "/methodology",
  "/contact",
  "/privacy",
  "/terms",
]);

function resolves(href: string): boolean {
  const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
  if (STATIC_ROUTES.has(clean)) return true;
  if (clean.startsWith("/es/") || clean.startsWith("/fr/")) return true;
  if (clean.startsWith("/category/")) return true;
  if (clean.startsWith("/blog/")) {
    const [pillar, cluster, ...rest] = clean.split("/").filter(Boolean).slice(1);
    if (rest.length) return false;
    if (!pillar) return true;
    if (!cluster) return Boolean(getPillarPost(pillar));
    return Boolean(getClusterPost(pillar, cluster));
  }
  const slug = clean.slice(1);
  return Boolean(slug && getTool(slug));
}

describe("blog internal links", () => {
  it("every internal href resolves to a registered page or tool", () => {
    const failures: string[] = [];
    for (const file of fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".ts"))) {
      const text = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      for (const match of text.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
        const href = match[1];
        if (!href || href.startsWith("//")) continue;
        if (/\.(png|jpg|jpeg|svg|webp|ico|txt|xml|json|webmanifest)$/.test(href)) continue;
        if (!resolves(href)) failures.push(`${file}: ${href}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
