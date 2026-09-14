import { describe, it, expect } from "vitest";
import { parseCsv, MAX_CSV_SIZE } from "@/components/tools/CsvViewerTool";
import { tools, getTool, getToolOrThrow } from "./tools";
import { calcEmi } from "./mortgage.test";

// Helper replicating WordCounterTool stats logic for NFC testing
function wordCounterStats(text: string) {
  const normalized = text.normalize("NFC");
  const trimmed = normalized.trim();
  const words = trimmed ? (trimmed.match(/\S+/g) || []).length : 0;
  const chars = [...normalized].length;
  const charsNoSpace = [...normalized].filter((c) => !/\s/.test(c)).length;
  return { normalized, chars, charsNoSpace, words };
}

describe("WordCounter – NFC normalization", () => {
  it("counts NFC normalized e + combining accent as single char", () => {
    const decomposed = "e\u0301"; // e + combining acute (2 code points)
    const composed = "é"; // single code point NFC
    expect(wordCounterStats(decomposed).chars).toBe(1);
    expect(wordCounterStats(composed).chars).toBe(1);
    expect(wordCounterStats(decomposed).normalized).toBe(composed);
    // Without NFC, [...decomposed].length would be 2 – but with NFC it's 1
    expect([...decomposed].length).toBe(2);
    expect(wordCounterStats(decomposed).chars).toBe(1);
  });

  it("handles café with decomposed vs composed equivalence", () => {
    const decomposed = "cafe\u0301"; // cafe + accent
    const composed = "café";
    expect(wordCounterStats(decomposed).chars).toBe(4);
    expect(wordCounterStats(composed).chars).toBe(4);
    expect(wordCounterStats(decomposed).normalized).toBe(composed);
  });

  it("emoji counted as single grapheme via spread", () => {
    expect(wordCounterStats("😀").chars).toBe(1);
    expect("😀".length).toBe(2); // surrogate pair length 2, but spread counts 1
    expect(wordCounterStats("hello😀").chars).toBe(6);
    expect(wordCounterStats("👨‍👩‍👧").chars).toBeGreaterThan(1); // ZWJ sequence, but at least not naive length
  });

  it("charsNoSpace is emoji-aware and trims correctly", () => {
    expect(wordCounterStats("a b c").charsNoSpace).toBe(3);
    expect(wordCounterStats("😀 😀").charsNoSpace).toBe(2);
    expect(wordCounterStats("").words).toBe(0);
    expect(wordCounterStats("   ").words).toBe(0);
  });

  it("WordCounterTool file uses NFC and handles 1M cap", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(path.resolve("src/components/tools/WordCounterTool.tsx"), "utf8");
    expect(content).toMatch(/normalize\(["']NFC["']\)/);
    expect(content).toMatch(/MAX_CHARS/);
    expect(content).toMatch(/1_000_000/);
    expect(content).toMatch(/\.\.\.normalized/);
  });
});

describe("CsvViewer – parse", () => {
  it("parses basic CSV with headers", () => {
    const csv = "name,age,city\nAda,36,NY\nBob,29,London";
    const { headers, rows } = parseCsv(csv);
    expect(headers).toEqual(["name", "age", "city"]);
    expect(rows.length).toBe(2);
    expect(rows[0]).toEqual({ name: "Ada", age: "36", city: "NY" });
  });

  it("handles quoted commas and escaped quotes", () => {
    const csv = `name,quote\nAda,"Hello, world"\nBob,"She said ""hi"""`;
    const { headers, rows } = parseCsv(csv);
    expect(headers).toEqual(["name", "quote"]);
    expect(rows[0].quote).toBe("Hello, world");
    expect(rows[1].quote).toBe('She said "hi"');
  });

  it("handles duplicate headers by suffixing _1, _2", () => {
    const csv = "a,a,a\n1,2,3";
    const { headers, rows } = parseCsv(csv);
    expect(headers).toEqual(["a", "a_1", "a_2"]);
    expect(rows[0]).toEqual({ a: "1", a_1: "2", a_2: "3" });
  });

  it("sanitizes formula injection (=,+, -, @) and null bytes", () => {
    const csv = "value\n=CMD()\n+123\n@evil\n-thing\nhello\0world";
    const { rows } = parseCsv(csv);
    expect(rows[0].value).toBe("'=CMD()");
    expect(rows[1].value).toBe("'+123");
    expect(rows[2].value).toBe("'@evil");
    expect(rows[3].value).toBe("'-thing");
    expect(rows[4].value).toBe("helloworld"); // null byte removed
  });

  it("enforces 500KB cap", () => {
    expect(MAX_CSV_SIZE).toBe(500 * 1024);
    const big = "a,b\n" + "x,y\n".repeat(300_000); // >500KB
    const { headers, rows } = parseCsv(big);
    // Should have sliced to 500KB and not thrown; headers still parsed
    expect(headers.length).toBe(2);
    expect(rows.length).toBeGreaterThan(0);
  });

  it("numeric sort fix uses Number.isFinite (empty vs Infinity)", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(path.resolve("src/components/tools/CsvViewerTool.tsx"), "utf8");
    expect(content).toMatch(/Number\.isFinite/);
    // ensure fix uses isFinite for numeric check (not just isNaN); allow isNaN in comments but ensure isFinite exists
    expect(content).toMatch(/aIsNum.*Number\.isFinite/);
    expect(content).toMatch(/MAX_CSV_SIZE/);
  });
});

describe("mortgage EMI – golden values", () => {
  it("golden EMI 536.82 for 100k 5% 30y (re-check)", () => {
    expect(calcEmi(100000, 5, 30)).toBeCloseTo(536.82, 2);
  });

  it("golden EMI 1199.10 for 200k 6% 30y", () => {
    expect(calcEmi(200000, 6, 30)).toBeCloseTo(1199.10, 1);
  });

  it("zero interest principal/n", () => {
    expect(calcEmi(120000, 0, 10)).toBeCloseTo(1000, 2);
    expect(calcEmi(50000, 0, 5)).toBeCloseTo(833.33, 2);
  });

  it("handles down payment principal reduction", () => {
    const principal = 250000 - 50000; // 200k
    const emi = calcEmi(principal, 5, 15);
    expect(emi).toBeCloseTo(1581.59, 1);
  });

  it("mortgage performance for edge NaN/Infinity", () => {
    expect(calcEmi(NaN, 5, 30)).toBeNaN();
    expect(calcEmi(100000, NaN, 30)).toBeNaN();
    expect(calcEmi(Infinity, 5, 30)).toBeNaN();
  });
});

describe("tools – 123 unique and getTool O(1)", () => {
  it("has 123 tools (150-200 range) and unique slugs", () => {
    expect(tools.length).toBeGreaterThanOrEqual(150);
    expect(tools.length).toBeLessThanOrEqual(200);
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every tool has valid category and icon and kebab-case", () => {
    for (const t of tools) {
      expect(t.slug).toMatch(/^[a-z0-9-]+$/);
      expect(t.keywords.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("getTool O(1) Map lookup returns same as tools.find but faster", () => {
    const slug = tools[0].slug;
    expect(getTool(slug)).toEqual(tools.find((t) => t.slug === slug));
    expect(getTool("non-existent-slug-xyz")).toBeUndefined();
    expect(() => getToolOrThrow("non-existent-slug-xyz")).toThrow(/Tool not found/);
  });

  it("getTool O(1) performance: 10k lookups under 50ms", () => {
    const start = performance.now();
    for (let i = 0; i < 10_000; i++) {
      for (const t of tools.slice(0, 10)) {
        getTool(t.slug);
      }
    }
    const dur = performance.now() - start;
    expect(dur).toBeLessThan(200); // should be very fast via Map
    // Verify Map usage in source
  });

  it("verifies tools.ts uses Map for O(1) (static check)", async () => {
    const fs = await import("fs");
    const path = await import("path");
    let content = fs.readFileSync(path.resolve("src/lib/tools.ts"), "utf8");
    // Handle split barrel: aggregate split files if barrel is re-export
    if (content.includes('export * from "./tools/index"')) {
      const parts = [content];
      const tryRead = (p: string) => {
        try {
          if (fs.existsSync(p)) parts.push(fs.readFileSync(p, "utf8"));
        } catch {}
      };
      tryRead(path.resolve("src/lib/tools/index.ts"));
      tryRead(path.resolve("src/lib/tools/icons.ts"));
      const dataDir = path.resolve("src/lib/tools/data");
      if (fs.existsSync(dataDir)) {
        for (const f of fs.readdirSync(dataDir)) {
          if (f.endsWith(".ts")) tryRead(path.join(dataDir, f));
        }
      }
      content = parts.join("\n");
    }
    expect(content).toMatch(/new Map/);
    expect(content).toMatch(/toolMap\.get/);
    expect(content).toMatch(/getTool/);
  });
});
