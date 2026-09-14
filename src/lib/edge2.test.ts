import { describe, it, expect, vi, afterEach } from "vitest";
import { money, fmtBytes, fmt0, fmt1, fmt2, fmtNumber, MS_PER_DAY, WPM_READING } from "./format";
import { MAX_IMAGE_SIZE, validateImageFile, validateImageDimensions, validateImageFiles } from "./validate";
import { isPotentiallyCatastrophic, runRegexInWorker, terminateRegexWorker } from "./regexWorker";
import { copyToClipboard } from "./clipboard";
import { parseCsv, MAX_CSV_SIZE } from "@/components/tools/CsvViewerTool";
import { tools, CATEGORIES, ICON_NAMES, getTool, getToolOrThrow, toolsByCategory } from "./tools";

// Local EMI replica (avoids importing from mortgage.test.ts)
function calcEmi(principal: number, annualRatePct: number, years: number) {
  if (!isFinite(years) || years <= 0 || !isFinite(principal) || principal <= 0) return NaN;
  const n = years * 12;
  if (n === 0 || !isFinite(n)) return NaN;
  const mr = annualRatePct / 100 / 12;
  if (!isFinite(mr)) return NaN;
  if (mr === 0) return principal / n;
  const emi = (principal * mr) / (1 - Math.pow(1 + mr, -n));
  if (!isFinite(emi)) return NaN;
  return emi;
}

function wordCounterStats(text: string) {
  const normalized = text.normalize("NFC");
  const trimmed = normalized.trim();
  const words = trimmed ? (trimmed.match(/\S+/g) || []).length : 0;
  const chars = [...normalized].length;
  const charsNoSpace = [...normalized].filter((c) => !/\s/.test(c)).length;
  return { normalized, chars, charsNoSpace, words };
}

function mockFile(opts: { size: number; type?: string; name?: string }): File {
  const name = opts.name ?? "test.png";
  const type = opts.type ?? "image/png";
  if (opts.size > 1024 * 1024) {
    const blob = new Blob(["a"], { type });
    const f = new File([blob], name, { type });
    Object.defineProperty(f, "size", { value: opts.size, writable: false });
    if (opts.name) Object.defineProperty(f, "name", { value: opts.name });
    if (opts.type !== undefined) Object.defineProperty(f, "type", { value: opts.type });
    return f;
  }
  const content = new Uint8Array(opts.size);
  const file = new File([content], name, { type });
  if (opts.type !== undefined) Object.defineProperty(file, "type", { value: opts.type });
  return file;
}

afterEach(() => {
  try {
    terminateRegexWorker();
  } catch {}
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("edge2 – format money Infinity/NaN/locale", () => {
  it("money(Infinity) returns String(n)", () => {
    expect(money(Infinity)).toBe("Infinity");
  });
  it("money(-Infinity) returns String(n)", () => {
    expect(money(-Infinity)).toBe("-Infinity");
  });
  it("money(NaN) returns NaN string", () => {
    expect(money(NaN)).toBe("NaN");
  });
  it("money en-US USD locale grouping", () => {
    expect(money(1234.56)).toBe("$1,234.56");
    expect(money(1000000)).toBe("$1,000,000.00");
    expect(money(0)).toBe("$0.00");
  });
  it("money negative and golden 536.82", () => {
    expect(money(-500)).toContain("$");
    expect(money(-500)).toContain("500");
    expect(money(536.82)).toBe("$536.82");
    expect(money(1199.1)).toBe("$1,199.10");
  });
  it("fmtBytes/fmt helpers and constants locale", () => {
    expect(fmtBytes(Infinity)).toBe("Infinity");
    expect(fmtBytes(NaN)).toBe("NaN");
    expect(fmtBytes(0)).toBe("0 B");
    expect(fmtBytes(10 * 1024 * 1024)).toBe("10.00 MB");
    expect(fmt0(1234.6)).toMatch(/1,235/);
    expect(fmt1(1.26)).toMatch(/1\.3/);
    expect(fmt2(1234.5)).toMatch(/1,234\.50/);
    expect(fmtNumber(1234.5)).toBeDefined();
    expect(MS_PER_DAY).toBe(86_400_000);
    expect(WPM_READING).toBe(200);
  });
});

describe("edge2 – validate 0-byte/empty type/10MB", () => {
  it("MAX_IMAGE_SIZE is exactly 10MB", () => {
    expect(MAX_IMAGE_SIZE).toBe(10 * 1024 * 1024);
    expect(MAX_IMAGE_SIZE).toBe(10_485_760);
  });
  it("rejects 0-byte file with Empty error", () => {
    const r = validateImageFile(mockFile({ size: 0, type: "image/png", name: "empty.png" }));
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/Empty/);
  });
  it("empty type with known extension passes via fallback", () => {
    expect(validateImageFile(mockFile({ size: 1000, type: "", name: "photo.jpg" })).valid).toBe(true);
    expect(validateImageFile(mockFile({ size: 1000, type: "", name: "pic.png" })).valid).toBe(true);
  });
  it("empty type with unknown extension rejected", () => {
    const r = validateImageFile(mockFile({ size: 1000, type: "", name: "notes.txt" }));
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/not an image/);
  });
  it("10MB boundary: exact passes, +1 rejects with MB message", () => {
    expect(validateImageFile(mockFile({ size: MAX_IMAGE_SIZE, type: "image/jpeg" })).valid).toBe(true);
    const r = validateImageFile(mockFile({ size: MAX_IMAGE_SIZE + 1, type: "image/png" }));
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/too large/i);
    expect(r.error).toMatch(/10 MB/);
    expect(validateImageFile(mockFile({ size: MAX_IMAGE_SIZE - 1 })).valid).toBe(true);
  });
  it("dimensions and files guards", () => {
    expect(validateImageDimensions(4096, 4096).valid).toBe(true);
    expect(validateImageDimensions(8193, 100).valid).toBe(false);
    expect(validateImageDimensions(5000, 5000).valid).toBe(false);
    expect(validateImageFiles([]).valid).toBe(true);
    const bmp = mockFile({ size: 1000, type: "image/bmp", name: "a.bmp" });
    expect(validateImageFile(bmp).valid).toBe(false);
  });
});

describe("edge2 – regexWorker catastrophic/timeout", () => {
  it("flags nested quantifier (a+)+", () => {
    expect(isPotentiallyCatastrophic("(a+)+")).toBe(true);
    expect(isPotentiallyCatastrophic("(.*)+")).toBe(true);
    expect(isPotentiallyCatastrophic("([a-z]+)*")).toBe(true);
  });
  it("flags backref pattern", () => {
    expect(isPotentiallyCatastrophic("(a)\\1")).toBe(true);
    expect(isPotentiallyCatastrophic("\\1")).toBe(true);
  });
  it("flags large quantifier >1000, safe 999", () => {
    expect(isPotentiallyCatastrophic("a{1001}")).toBe(true);
    expect(isPotentiallyCatastrophic("a{1,2000}")).toBe(true);
    expect(isPotentiallyCatastrophic("a{999}")).toBe(false);
    expect(isPotentiallyCatastrophic("a{1000}")).toBe(true);
  });
  it("safe patterns not flagged", () => {
    expect(isPotentiallyCatastrophic("abc")).toBe(false);
    expect(isPotentiallyCatastrophic("a{1,5}")).toBe(false);
    expect(isPotentiallyCatastrophic("[a-z]+")).toBe(false);
    expect(isPotentiallyCatastrophic("hello")).toBe(false);
  });
  it("fast-rejects catastrophic before worker", async () => {
    const res = await runRegexInWorker({ pattern: "(a+)+", flags: "g", text: "aaa", mode: "match" } as any, 500);
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/catastrophic/i);
  });
  it("rejects pattern >200 and text >50000", async () => {
    const long = await runRegexInWorker({ pattern: "a".repeat(201), flags: "", text: "abc", mode: "match" } as any, 500);
    expect(long.ok).toBe(false);
    expect((long as any).error).toMatch(/Pattern too long/);
    const big = await runRegexInWorker({ pattern: "a", flags: "g", text: "a".repeat(50001), mode: "match" } as any, 500);
    expect(big.ok).toBe(false);
    expect((big as any).error).toMatch(/Test string too long/);
  });
  it("times out when worker never responds", async () => {
    vi.stubGlobal("window", {} as any);
    class HungWorker {
      handler: any = null;
      addEventListener(_t: string, h: any) {
        this.handler = h;
      }
      removeEventListener(_t: string, h: any) {
        if (this.handler === h) this.handler = null;
      }
      postMessage(_msg: any) {}
      terminate() {}
    }
    vi.stubGlobal("Worker", HungWorker as any);
    const res = await runRegexInWorker({ pattern: "hello", flags: "", text: "hello world", mode: "match" } as any, 40);
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/timeout/i);
    expect((res as any).error).toMatch(/too slow|Regex timeout/);
  });
});

describe("edge2 – clipboard isSecureContext/1M", () => {
  it("returns false for empty text", async () => {
    expect(await copyToClipboard("")).toBe(false);
    expect(await copyToClipboard(null as any)).toBe(false);
  });
  it("uses navigator.clipboard when secure", async () => {
    const writeText = vi.fn(async () => {});
    vi.stubGlobal("window", { isSecureContext: true } as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    expect(await copyToClipboard("hello secure")).toBe(true);
    expect(writeText).toHaveBeenCalledWith("hello secure");
  });
  it("treats undefined isSecureContext as secure", async () => {
    const writeText = vi.fn(async () => {});
    vi.stubGlobal("window", {} as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    expect(await copyToClipboard("hi undefined")).toBe(true);
    expect(writeText).toHaveBeenCalled();
  });
  it("falls back to execCommand when isSecureContext false", async () => {
    const writeText = vi.fn(async () => {});
    vi.stubGlobal("window", { isSecureContext: false } as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    const ta: any = { value: "", style: {} as any, setAttribute: vi.fn(), focus: vi.fn(), select: vi.fn(), setSelectionRange: vi.fn(), parentNode: { removeChild: vi.fn() } };
    const execCommand = vi.fn(() => true);
    vi.stubGlobal("document", { createElement: vi.fn(() => ta), body: { appendChild: vi.fn(), contains: vi.fn(() => false), removeChild: vi.fn() }, execCommand } as any);
    const res = await copyToClipboard("fallback");
    expect(writeText).not.toHaveBeenCalled();
    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(res).toBe(true);
  });
  it("copies 1M chars via navigator.clipboard when secure", async () => {
    const big = "x".repeat(1_000_000);
    const writeText = vi.fn(async () => {});
    vi.stubGlobal("window", { isSecureContext: true } as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    expect(await copyToClipboard(big)).toBe(true);
    expect(writeText).toHaveBeenCalledWith(big);
  });
  it("returns false when both paths fail", async () => {
    const writeText = vi.fn(async () => {
      throw new Error("fail");
    });
    vi.stubGlobal("window", { isSecureContext: true } as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    vi.stubGlobal("document", { createElement: () => { throw new Error("no doc"); }, body: {} as any, execCommand: vi.fn() } as any);
    expect(await copyToClipboard("will fail")).toBe(false);
  });
});

describe("edge2 – WordCounter NFC/emoji", () => {
  it("empty and whitespace yield 0", () => {
    expect(wordCounterStats("").words).toBe(0);
    expect(wordCounterStats("").chars).toBe(0);
    expect(wordCounterStats("   ").words).toBe(0);
    expect(wordCounterStats("\n\t  \n").words).toBe(0);
  });
  it("NFC e+combining counts as 1", () => {
    const decomposed = "é";
    expect(wordCounterStats(decomposed).chars).toBe(1);
    expect(wordCounterStats(decomposed).normalized).toBe("é");
  });
  it("cafe decomposed equals composed (4 chars)", () => {
    expect(wordCounterStats("café").chars).toBe(4);
    expect(wordCounterStats("café").chars).toBe(4);
  });
  it("emoji counts as single char via spread", () => {
    expect(wordCounterStats("😀").chars).toBe(1);
    expect(wordCounterStats("hello😀").chars).toBe(6);
    expect(wordCounterStats("😀").words).toBe(1);
  });
  it("charsNoSpace emoji-aware", () => {
    expect(wordCounterStats("a b c").charsNoSpace).toBe(3);
    expect(wordCounterStats("😀 😀").charsNoSpace).toBe(2);
  });
});

describe("edge2 – CsvViewer quoted/duplicate", () => {
  it("parses quoted comma field", () => {
    const { rows } = parseCsv('name,quote\nAda,"Hello, world"');
    expect(rows[0].quote).toBe("Hello, world");
  });
  it("parses escaped quotes", () => {
    const { rows } = parseCsv('name,quote\nBob,"She said ""hi"""');
    expect(rows[0].quote).toBe('She said "hi"');
  });
  it("suffixes duplicate headers a,a,a", () => {
    const { headers, rows } = parseCsv("a,a,a\n1,2,3");
    expect(headers).toEqual(["a", "a_1", "a_2"]);
    expect(rows[0]).toEqual({ a: "1", a_1: "2", a_2: "3" });
  });
  it("empty header falls back to Column N", () => {
    const { headers } = parseCsv(",a,a\n1,2,3");
    expect(headers[0]).toMatch(/Column 1/);
    expect(headers).toEqual([headers[0], "a", "a_1"]);
  });
  it("MAX_CSV_SIZE 500KB and formula sanitize", () => {
    expect(MAX_CSV_SIZE).toBe(500 * 1024);
    const { rows } = parseCsv("value\n=CMD()\nhello\0world");
    expect(rows[0].value).toBe("'=CMD()");
    expect(rows[1].value).toBe("helloworld");
  });
});

describe("edge2 – mortgage golden 536.82/y=0", () => {
  it("golden 536.82 for 100k 5% 30y", () => {
    expect(calcEmi(100000, 5, 30)).toBeCloseTo(536.82, 2);
  });
  it("golden 1199.10 for 200k 6% 30y", () => {
    expect(calcEmi(200000, 6, 30)).toBeCloseTo(1199.1, 1);
  });
  it("zero interest principal/n", () => {
    expect(calcEmi(120000, 0, 10)).toBeCloseTo(1000, 2);
  });
  it("y=0 and y=-1 return NaN", () => {
    expect(calcEmi(100000, 5, 0)).toBeNaN();
    expect(calcEmi(100000, 5, -1)).toBeNaN();
    expect(calcEmi(120000, 0, 0)).toBeNaN();
  });
  it("Infinity/NaN return NaN", () => {
    expect(calcEmi(Infinity, 5, 30)).toBeNaN();
    expect(calcEmi(100000, 5, Infinity)).toBeNaN();
    expect(calcEmi(100000, Infinity, 30)).toBeNaN();
    expect(calcEmi(NaN, 5, 30)).toBeNaN();
    expect(calcEmi(100000, NaN, 30)).toBeNaN();
  });
});

describe("edge2 – tools unique/O(1)", () => {
  it("slugs are unique", () => {
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("has 150-200 tools", () => {
    expect(tools.length).toBeGreaterThanOrEqual(150);
    expect(tools.length).toBeLessThanOrEqual(200);
  });
  it("categories and icons valid", () => {
    const cats = new Set(CATEGORIES.map((c) => c.id));
    const icons = new Set(ICON_NAMES);
    for (const t of tools) {
      expect(cats.has(t.category), `${t.slug}`).toBe(true);
      expect(icons.has(t.icon), `${t.slug}`).toBe(true);
      expect(t.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
  it("getTool O(1) and getToolOrThrow", () => {
    expect(getTool(tools[0].slug)?.slug).toBe(tools[0].slug);
    expect(getTool("no-such-slug-xyz")).toBeUndefined();
    expect(() => getToolOrThrow("no-such-slug-xyz")).toThrow(/not found/i);
    expect(getTool(tools[10].slug)).toEqual(tools.find((t) => t.slug === tools[10].slug));
  });
  it("toolsByCategory sum equals length and 100k O(1) lookups fast", () => {
    const sum = toolsByCategory().reduce((s, g) => s + g.tools.length, 0);
    expect(sum).toBe(tools.length);
    const slugs = tools.map((t) => t.slug);
    const start = performance.now();
    for (let i = 0; i < 100_000; i++) {
      const t = getTool(slugs[i % slugs.length]);
      if (!t) throw new Error("missing");
    }
    expect(performance.now() - start).toBeLessThan(1000);
  });
});
