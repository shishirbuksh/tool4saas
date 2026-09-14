import { describe, it, expect, vi, afterEach } from "vitest";
import { money, fmtBytes } from "./format";
import {
  MAX_IMAGE_SIZE,
  validateImageFile,
  validateImageDimensions,
  validateImageFiles,
} from "./validate";
import {
  isPotentiallyCatastrophic,
  runRegexInWorker,
  terminateRegexWorker,
} from "./regexWorker";
import { copyToClipboard } from "./clipboard";
import { parseCsv, MAX_CSV_SIZE } from "@/components/tools/CsvViewerTool";
import { tools, getTool, getToolOrThrow } from "./tools";

// Local EMI replica (avoids importing from mortgage.test.ts which re-registers tests)
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
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("expand – format money en-US", () => {
  it("formats 1234.56 as $1,234.56 en-US", () => {
    expect(money(1234.56)).toBe("$1,234.56");
  });
  it("formats zero and million with grouping", () => {
    expect(money(0)).toBe("$0.00");
    expect(money(1000000)).toBe("$1,000,000.00");
  });
  it("formats negative amounts with $ sign", () => {
    expect(money(-500)).toContain("$");
    expect(money(-500)).toContain("500");
  });
  it("formats mortgage golden 536.82", () => {
    expect(money(536.82)).toBe("$536.82");
  });
  it("fmtBytes 10MB boundary exact", () => {
    expect(fmtBytes(10 * 1024 * 1024)).toBe("10.00 MB");
    expect(fmtBytes(1023)).toBe("1023 B");
    expect(fmtBytes(1024)).toBe("1.0 KB");
  });
});

describe("expand – validate 10MB boundary", () => {
  it("MAX_IMAGE_SIZE is 10MB", () => {
    expect(MAX_IMAGE_SIZE).toBe(10 * 1024 * 1024);
  });
  it("accepts exactly 10MB, rejects 10MB+1", () => {
    expect(validateImageFile(mockFile({ size: MAX_IMAGE_SIZE })).valid).toBe(true);
    const r = validateImageFile(mockFile({ size: MAX_IMAGE_SIZE + 1 }));
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/too large/i);
  });
  it("accepts 10MB-1", () => {
    expect(validateImageFile(mockFile({ size: MAX_IMAGE_SIZE - 1 })).valid).toBe(true);
  });
  it("dimensions guard at 8192 and 16MP", () => {
    expect(validateImageDimensions(4096, 4096).valid).toBe(true);
    expect(validateImageDimensions(8193, 100).valid).toBe(false);
    expect(validateImageDimensions(5000, 5000).valid).toBe(false);
  });
  it("validateImageFiles empty array is valid", () => {
    expect(validateImageFiles([]).valid).toBe(true);
  });
});

describe("expand – regexWorker catastrophic", () => {
  it("flags (a+)+ as catastrophic", () => {
    expect(isPotentiallyCatastrophic("(a+)+")).toBe(true);
  });
  it("flags backref as catastrophic", () => {
    expect(isPotentiallyCatastrophic("(a)\\1")).toBe(true);
  });
  it("safe pattern abc is not flagged", () => {
    expect(isPotentiallyCatastrophic("abc")).toBe(false);
  });
  it("fast-rejects catastrophic in worker path", async () => {
    const res = await runRegexInWorker(
      { pattern: "(a+)+", flags: "g", text: "aaa", mode: "match" } as any,
      500
    );
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/catastrophic/i);
  });
  it("rejects pattern >200 chars", async () => {
    const res = await runRegexInWorker(
      { pattern: "a".repeat(201), flags: "", text: "abc", mode: "match" } as any,
      500
    );
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/too long/i);
  });
  it("terminate is safe", () => {
    expect(() => terminateRegexWorker()).not.toThrow();
  });
});

describe("expand – clipboard isSecureContext false", () => {
  it("returns false for empty text", async () => {
    expect(await copyToClipboard("")).toBe(false);
  });
  it("uses clipboard when secure", async () => {
    const writeText = vi.fn(async () => {});
    vi.stubGlobal("window", { isSecureContext: true } as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    expect(await copyToClipboard("hi")).toBe(true);
    expect(writeText).toHaveBeenCalledWith("hi");
  });
  it("falls back to execCommand when isSecureContext false", async () => {
    const writeText = vi.fn(async () => {});
    vi.stubGlobal("window", { isSecureContext: false } as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    const ta: any = {
      value: "",
      style: {} as any,
      setAttribute: vi.fn(),
      focus: vi.fn(),
      select: vi.fn(),
      setSelectionRange: vi.fn(),
      parentNode: { removeChild: vi.fn() },
    };
    vi.stubGlobal("document", {
      createElement: vi.fn(() => ta),
      body: { appendChild: vi.fn(), contains: vi.fn(() => false), removeChild: vi.fn() },
      execCommand: vi.fn(() => true),
    } as any);
    const res = await copyToClipboard("fallback");
    expect(writeText).not.toHaveBeenCalled();
    expect(res).toBe(true);
  });
});

describe("expand – WordCounter NFC", () => {
  it("NFC e+combining counts as 1", () => {
    expect(wordCounterStats("é").chars).toBe(1);
    expect(wordCounterStats("é").normalized).toBe("é");
  });
  it("cafe decomposed equals composed", () => {
    expect(wordCounterStats("café").chars).toBe(4);
    expect(wordCounterStats("café").chars).toBe(4);
  });
  it("emoji counts as single char via spread", () => {
    expect(wordCounterStats("😀").chars).toBe(1);
  });
});

describe("expand – CsvViewer quoted comma", () => {
  it("parses quoted comma field", () => {
    const { rows } = parseCsv('name,quote\nAda,"Hello, world"');
    expect(rows[0].quote).toBe("Hello, world");
  });
  it("parses escaped quotes", () => {
    const { rows } = parseCsv('name,quote\nBob,"She said ""hi"""');
    expect(rows[0].quote).toBe('She said "hi"');
  });
  it("MAX_CSV_SIZE is 500KB", () => {
    expect(MAX_CSV_SIZE).toBe(500 * 1024);
  });
});

describe("expand – mortgage golden 536.82", () => {
  it("100k 5% 30y = 536.82", () => {
    expect(calcEmi(100000, 5, 30)).toBeCloseTo(536.82, 2);
  });
  it("200k 6% 30y = 1199.10", () => {
    expect(calcEmi(200000, 6, 30)).toBeCloseTo(1199.1, 1);
  });
  it("zero interest = principal/n", () => {
    expect(calcEmi(120000, 0, 10)).toBeCloseTo(1000, 2);
  });
});

describe("expand – tools unique slugs + getTool O(1)", () => {
  it("slugs are unique", () => {
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("has 150-200 tools", () => {
    expect(tools.length).toBeGreaterThanOrEqual(150);
    expect(tools.length).toBeLessThanOrEqual(200);
  });
  it("getTool returns tool and undefined for missing", () => {
    expect(getTool(tools[0].slug)?.slug).toBe(tools[0].slug);
    expect(getTool("no-such-slug-xyz")).toBeUndefined();
  });
  it("getToolOrThrow throws for missing", () => {
    expect(() => getToolOrThrow("no-such-slug-xyz")).toThrow(/not found/i);
  });
});
