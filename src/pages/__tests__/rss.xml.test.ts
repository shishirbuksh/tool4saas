import { describe, it, expect } from "vitest";
import { GET } from "@/pages/rss.xml";
import { siteConfig } from "@/lib/site";

const base = siteConfig.url.replace(/\/$/, "");

describe("rss.xml route", () => {
  it("returns RSS 2.0 with a working self link and sane item count", async () => {
    const res = await GET();
    expect(res.headers.get("Content-Type")).toContain("application/rss+xml");
    const xml = await res.text();
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(`<atom:link href="${base}/rss.xml" rel="self"`);
    const items = xml.match(/<item>/g) ?? [];
    expect(items.length).toBeGreaterThan(0);
    expect(items.length).toBeLessThanOrEqual(50);
    expect(xml).not.toContain("lastModified");
  });

  it("excludes noindexed clusters", async () => {
    const xml = await (await GET()).text();
    expect(xml).not.toContain("compress-pdf-1mb-email");
  });

  it("orders items by pubDate descending", async () => {
    const xml = await (await GET()).text();
    const dates = [...xml.matchAll(/<pubDate>(.*?)<\/pubDate>/g)].map((m) => Date.parse(m[1]));
    expect(dates.length).toBeGreaterThan(1);
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });
});
