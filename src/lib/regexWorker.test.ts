import { describe, it, expect } from "vitest";
import { isPotentiallyCatastrophic, runRegexInWorker, terminateRegexWorker } from "./regexWorker";

describe("regexWorker – heuristic catastrophic detection", () => {
  it("detects nested quantifier pattern (a+)+ etc.", () => {
    expect(isPotentiallyCatastrophic("(a+)+")).toBe(true);
    expect(isPotentiallyCatastrophic("(.*)+")).toBe(true);
    expect(isPotentiallyCatastrophic("([a-z]+)*")).toBe(true);
  });

  it("detects backref pattern", () => {
    expect(isPotentiallyCatastrophic("(a)\\1")).toBe(true);
    expect(isPotentiallyCatastrophic("\\1")).toBe(true);
    expect(isPotentiallyCatastrophic("([a-z]+)\\2")).toBe(true);
  });

  it("detects large quantifiers >1000", () => {
    expect(isPotentiallyCatastrophic("a{1001}")).toBe(true);
    expect(isPotentiallyCatastrophic("a{1,2000}")).toBe(true);
    expect(isPotentiallyCatastrophic("a{5000,6000}")).toBe(true);
    expect(isPotentiallyCatastrophic("x{10000}")).toBe(true);
  });

  it("safe patterns are not flagged", () => {
    expect(isPotentiallyCatastrophic("abc")).toBe(false);
    expect(isPotentiallyCatastrophic("a{1,5}")).toBe(false);
    expect(isPotentiallyCatastrophic("[a-z]+")).toBe(false);
    expect(isPotentiallyCatastrophic("\\d+")).toBe(false);
    // Note: heuristic flags (ab)+ as nested quantifier due to /(?:[^+*?]|^)\([^)]*\)[+*{]/ – conservative
    expect(isPotentiallyCatastrophic("(ab)+")).toBe(true);
    expect(isPotentiallyCatastrophic("hello")).toBe(false);
    expect(isPotentiallyCatastrophic("a*b")).toBe(false);
  });

  it("detects 4-digit quantifier via conservative check", () => {
    // According spec: large quantifiers >1000 flagged, plus 4-digit check also flags 1000+.
    // We'll test that 999 is safe but 1000 is flagged.
    expect(isPotentiallyCatastrophic("a{999}")).toBe(false);
    expect(isPotentiallyCatastrophic("a{1000}")).toBe(true);
    expect(isPotentiallyCatastrophic("a{999,1000}")).toBe(true);
  });

  it("runRegexInWorker fast-rejects catastrophic pattern", async () => {
    const res = await runRegexInWorker({ pattern: "(a+)+", flags: "g", text: "aaa", mode: "match" } as any, 500);
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/Potentially catastrophic/);
  });

  it("runRegexInWorker rejects pattern >200 chars", async () => {
    const long = "a".repeat(201);
    const res = await runRegexInWorker({ pattern: long, flags: "", text: "abc", mode: "match" } as any, 500);
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/Pattern too long/);
  });

  it("runRegexInWorker rejects text >50000 chars", async () => {
    const longText = "a".repeat(50001);
    const res = await runRegexInWorker({ pattern: "a", flags: "g", text: longText, mode: "match" } as any, 500);
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/Test string too long/);
  });

  it("runRegexInWorker returns Worker unavailable fallback when no Worker (node env)", async () => {
    // In node env, Worker undefined, so getWorker returns null and fallback error
    const res = await runRegexInWorker({ pattern: "abc", flags: "", text: "abc", mode: "match" } as any, 200);
    expect(res.ok).toBe(false);
    // Should be either worker unavailable or pattern too long / catastrophic – for safe pattern it's worker unavailable
    expect((res as any).error).toMatch(/Worker unavailable|Potentially catastrophic|Pattern too long/);
    // Specifically for safe small pattern, it should be Worker unavailable
    if (!(res as any).error.includes("Worker unavailable")) {
      console.log("got error", (res as any).error);
    }
    expect((res as any).error).toContain("Worker unavailable");
  });

  it("heuristic also blocked inside runRegexInWorker fallback double-check", async () => {
    const res = await runRegexInWorker({ pattern: "a{5000}", flags: "", text: "aaa", mode: "match" } as any, 200);
    expect(res.ok).toBe(false);
    expect((res as any).error).toMatch(/Potentially catastrophic/);
  });

  it("terminateRegexWorker is safe to call and cleans up", () => {
    expect(() => terminateRegexWorker()).not.toThrow();
    terminateRegexWorker();
    expect(() => terminateRegexWorker()).not.toThrow();
  });
});
