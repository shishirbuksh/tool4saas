import { describe, it, expect } from "vitest";
import { findReplaceNonRegex } from "@/components/tools/TextFindReplaceTool";

describe("TextFindReplaceTool – findReplaceNonRegex O(n) parts+join", () => {
  it("handles find=\"\" edge returns original (no infinite loop)", () => {
    expect(findReplaceNonRegex("hello world", "", "X", true)).toBe("hello world");
    expect(findReplaceNonRegex("hello", "", "X", false)).toBe("hello");
    expect(findReplaceNonRegex("", "", "X", true)).toBe("");
    expect(findReplaceNonRegex("abc", "", "", false)).toBe("abc");
  });

  it("replaces case-sensitive and case-insensitive", () => {
    expect(findReplaceNonRegex("Hello Hello", "Hello", "Hi", true)).toBe("Hi Hi");
    expect(findReplaceNonRegex("Hello hello HELLO", "hello", "Hi", false)).toBe("Hi Hi Hi");
    expect(findReplaceNonRegex("Hello hello HELLO", "hello", "Hi", true)).toBe("Hello Hi HELLO");
  });

  it("handles overlapping and multiple occurrences with O(n) parts+join", () => {
    expect(findReplaceNonRegex("aaa", "a", "b", true)).toBe("bbb");
    expect(findReplaceNonRegex("aaaa", "aa", "b", true)).toBe("bb");
    expect(findReplaceNonRegex("abcabcabc", "abc", "X", true)).toBe("XXX");
    expect(findReplaceNonRegex("ababa", "aba", "X", true)).toBe("Xba"); // non-overlapping left-to-right
  });

  it("handles 1M chars performance – O(n) via parts array + join", () => {
    const large = "a".repeat(1_000_000);
    const start = performance.now();
    const result = findReplaceNonRegex(large, "a", "b", true);
    const dur = performance.now() - start;
    expect(result.length).toBe(1_000_000);
    expect(result[0]).toBe("b");
    expect(result[result.length - 1]).toBe("b");
    // Ensure not O(n²): should complete well under 1s for 1M single-char replacements
    expect(dur).toBeLessThan(1000);
    // Also verify correctness for chunked replacement
    expect(result).toBe("b".repeat(1_000_000));
  });

  it("handles 1M chars with mixed content and find length >1", () => {
    const chunk = "abc";
    const repeat = 333_334; // ~1M chars (333334*3 = 1_000_002)
    const large = chunk.repeat(repeat).slice(0, 1_000_000);
    const start = performance.now();
    const result = findReplaceNonRegex(large, "abc", "X", true);
    const dur = performance.now() - start;
    expect(dur).toBeLessThan(1000);
    // large is "abcabc..." truncated to 1M; every 3 chars is abc -> replaced with X
    // For 1M chars, there are floor(1M/3) = 333333 full abc -> X, plus remainder "a"
    expect(result.includes("X")).toBe(true);
    expect(result.length).toBeLessThan(1_000_000);
  });

  it("handles offline and isSecureContext irrelevant – pure function", () => {
    // Tool works offline (no network), and isSecureContext only affects clipboard fallback
    // Pure replacement should be deterministic regardless of context
    expect(findReplaceNonRegex("offline test", "offline", "online", true)).toBe("online test");
  });

  it("uses parts array + join pattern (verify not O(n²) concat)", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(path.resolve("src/components/tools/TextFindReplaceTool.tsx"), "utf8");
    // Should contain parts array and join for O(n)
    expect(content).toMatch(/parts.*push/);
    expect(content).toMatch(/\.join\(/);
    // Should NOT contain old O(n²) pattern `out += text.slice`
    expect(content).not.toMatch(/out\s*\+=\s*text\.slice/);
    // Should handle find="" edge explicitly
    expect(content).toMatch(/find.*length.*0|!find/);
  });
});
