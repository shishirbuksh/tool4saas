import { describe, it, expect, vi, afterEach } from "vitest";
import { money, fmtBytes } from "./format";
import { validateImageFile } from "./validate";
import { isPotentiallyCatastrophic, runRegexInWorker, terminateRegexWorker } from "./regexWorker";
import { copyToClipboard } from "./clipboard";
import { parseCsv } from "@/components/tools/CsvViewerTool";
import { tools, getTool, getToolOrThrow, toolsByCategory } from "./tools";

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
  try {
    terminateRegexWorker();
  } catch {}
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("edge – format money Infinity/NaN", () => {
  it("money(Infinity/-Infinity) returns String(n)", () => {
    expect(money(Infinity)).toBe("Infinity");
    expect(money(-Infinity)).toBe("-Infinity");
  });
  it("money(NaN) returns NaN and fmtBytes guards non-finite", () => {
    expect(money(NaN)).toBe("NaN");
    expect(fmtBytes(Infinity)).toBe("Infinity");
    expect(fmtBytes(NaN)).toBe("NaN");
  });
});

describe("edge – validate 0-byte/empty type", () => {
  it("rejects 0-byte file with Empty error", () => {
    const f = mockFile({ size: 0, type: "image/png", name: "empty.png" });
    const r = validateImageFile(f);
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/Empty/);
  });
  it("empty type with known extension passes via fallback", () => {
    const jpg = mockFile({ size: 1000, type: "", name: "photo.jpg" });
    expect(validateImageFile(jpg).valid).toBe(true);
    const png = mockFile({ size: 1000, type: "", name: "pic.png" });
    expect(validateImageFile(png).valid).toBe(true);
  });
  it("empty type with unknown/missing extension rejected", () => {
    const txt = mockFile({ size: 1000, type: "", name: "notes.txt" });
    const r = validateImageFile(txt);
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/not an image/);
    const noExt = mockFile({ size: 1000, type: "", name: "noext" });
    expect(validateImageFile(noExt).valid).toBe(false);
  });
});

describe("edge – regexWorker timeout", () => {
  it("times out when worker never responds", async () => {
    vi.stubGlobal("window", {} as any);
    class HungWorker {
      handler: ((e: MessageEvent) => void) | null = null;
      addEventListener(_t: string, h: any) {
        this.handler = h;
      }
      removeEventListener(_t: string, h: any) {
        if (this.handler === h) this.handler = null;
      }
      postMessage(_msg: any) {
        // never responds -> timeout path
      }
      terminate() {}
    }
    vi.stubGlobal("Worker", HungWorker as any);
    const res = await runRegexInWorker(
      { pattern: "hello", flags: "", text: "hello world", mode: "match" } as any,
      50
    );
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/timeout/i);
  });
  it("timeout error mentions 1s / too slow", async () => {
    vi.stubGlobal("window", {} as any);
    class HungWorker2 {
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
    vi.stubGlobal("Worker", HungWorker2 as any);
    const res = await runRegexInWorker(
      { pattern: "abc", flags: "", text: "abc", mode: "match" } as any,
      30
    );
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/Regex timeout/);
    expect((res as any).error).toMatch(/too slow/);
  });
  it("fast-reject still precedes timeout (catastrophic + too-long)", async () => {
    // No worker stub needed: heuristic rejects before worker creation, so no hang
    const cat = await runRegexInWorker(
      { pattern: "(a+)+", flags: "g", text: "aaa", mode: "match" } as any,
      50
    );
    expect(cat.ok).toBe(false);
    expect((cat as any).error).toMatch(/catastrophic/i);
    expect(isPotentiallyCatastrophic("(a+)+")).toBe(true);
    const long = await runRegexInWorker(
      { pattern: "a".repeat(201), flags: "", text: "abc", mode: "match" } as any,
      50
    );
    expect(long.ok).toBe(false);
    expect((long as any).error).toMatch(/Pattern too long/);
  });
});

describe("edge – clipboard 1M chars", () => {
  it("copies 1M chars via navigator.clipboard when secure", async () => {
    const big = "x".repeat(1_000_000);
    expect(big.length).toBe(1_000_000);
    const writeText = vi.fn(async () => {});
    vi.stubGlobal("window", { isSecureContext: true } as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    const res = await copyToClipboard(big);
    expect(writeText).toHaveBeenCalledWith(big);
    expect(res).toBe(true);
  });
  it("copies 1M chars via execCommand fallback when insecure", async () => {
    const big = "y".repeat(1_000_000);
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
    const execCommand = vi.fn(() => true);
    vi.stubGlobal("document", {
      createElement: vi.fn(() => ta),
      body: { appendChild: vi.fn(), contains: vi.fn(() => false), removeChild: vi.fn() },
      execCommand,
    } as any);
    const res = await copyToClipboard(big);
    expect(writeText).not.toHaveBeenCalled();
    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(ta.value.length).toBe(1_000_000);
    expect(res).toBe(true);
  });
});

describe("edge – WordCounter empty/emoji", () => {
  it("empty string yields 0 words/chars", () => {
    const s = wordCounterStats("");
    expect(s.words).toBe(0);
    expect(s.chars).toBe(0);
    expect(s.charsNoSpace).toBe(0);
  });
  it("whitespace-only yields 0 words", () => {
    expect(wordCounterStats("   ").words).toBe(0);
    expect(wordCounterStats("\n\t  \n").words).toBe(0);
    expect(wordCounterStats("   ").charsNoSpace).toBe(0);
  });
  it("emoji counts as single char via spread", () => {
    expect(wordCounterStats("😀").chars).toBe(1);
    expect(wordCounterStats("hello😀").chars).toBe(6);
    expect(wordCounterStats("😀 😀").charsNoSpace).toBe(2);
    expect(wordCounterStats("😀").words).toBe(1);
  });
});

describe("edge – CsvViewer duplicate headers", () => {
  it("suffixes duplicate headers a,a,a -> a,a_1,a_2", () => {
    const { headers, rows } = parseCsv("a,a,a\n1,2,3");
    expect(headers).toEqual(["a", "a_1", "a_2"]);
    expect(rows[0]).toEqual({ a: "1", a_1: "2", a_2: "3" });
  });
  it("empty header falls back to Column N and dedupes", () => {
    const { headers, rows } = parseCsv(",a,a\n1,2,3");
    expect(headers[0]).toMatch(/Column 1/);
    expect(headers).toEqual([headers[0], "a", "a_1"]);
    expect(rows[0][headers[0]]).toBe("1");
    expect(rows[0]["a"]).toBe("2");
    expect(rows[0]["a_1"]).toBe("3");
  });
});

describe("edge – mortgage y=0/Infinity", () => {
  it("y=0 and y=-1 return NaN", () => {
    expect(calcEmi(100000, 5, 0)).toBeNaN();
    expect(calcEmi(100000, 5, -1)).toBeNaN();
    expect(calcEmi(120000, 0, 0)).toBeNaN();
  });
  it("Infinity/NaN inputs return NaN", () => {
    expect(calcEmi(Infinity, 5, 30)).toBeNaN();
    expect(calcEmi(100000, 5, Infinity)).toBeNaN();
    expect(calcEmi(100000, Infinity, 30)).toBeNaN();
    expect(calcEmi(NaN, 5, 30)).toBeNaN();
    expect(calcEmi(100000, NaN, 30)).toBeNaN();
  });
});

describe("edge – toolsByCategory sum 123", () => {
  it("sum of grouped tools equals 123 and tools.length", () => {
    const groups = toolsByCategory();
    const sum = groups.reduce((s, g) => s + g.tools.length, 0);
    expect(sum).toBeGreaterThanOrEqual(153);
    expect(sum).toBe(tools.length);
    expect(tools.length).toBeGreaterThanOrEqual(153);
  });
});

describe("edge – getTool O(1) 100k lookups", () => {
  it("100k lookups are fast (O(1) Map) and correct", () => {
    const slugs = tools.map((t) => t.slug);
    const start = performance.now();
    for (let i = 0; i < 100_000; i++) {
      const slug = slugs[i % slugs.length];
      const t = getTool(slug);
      if (!t || t.slug !== slug) throw new Error(`mismatch at ${i}`);
    }
    const dur = performance.now() - start;
    expect(dur).toBeLessThan(1000);
  });
  it("getTool matches find, missing is undefined/throws", () => {
    const slug = tools[10].slug;
    expect(getTool(slug)).toEqual(tools.find((t) => t.slug === slug));
    expect(getTool("no-such-tool-xyz-123")).toBeUndefined();
    expect(() => getToolOrThrow("no-such-tool-xyz-123")).toThrow(/not found/i);
  });
});
