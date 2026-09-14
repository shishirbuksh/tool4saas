import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { copyToClipboard } from "./clipboard";

describe("clipboard – isSecureContext handling", () => {
  let originalNavigatorDescriptor: PropertyDescriptor | undefined;
  let originalWindowDescriptor: PropertyDescriptor | undefined;
  let originalDocumentDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    originalNavigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, "navigator");
    originalWindowDescriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
    originalDocumentDescriptor = Object.getOwnPropertyDescriptor(globalThis, "document");
  });

  afterEach(() => {
    // restore navigator
    if (originalNavigatorDescriptor) {
      Object.defineProperty(globalThis, "navigator", originalNavigatorDescriptor);
    } else {
      try { delete (globalThis as any).navigator; } catch {}
    }
    if (originalWindowDescriptor) {
      Object.defineProperty(globalThis, "window", originalWindowDescriptor);
    } else {
      try { delete (globalThis as any).window; } catch {}
    }
    if (originalDocumentDescriptor) {
      Object.defineProperty(globalThis, "document", originalDocumentDescriptor);
    } else {
      try { delete (globalThis as any).document; } catch {}
    }
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("returns false for empty text without touching clipboard", async () => {
    expect(await copyToClipboard("")).toBe(false);
    expect(await copyToClipboard(null as any)).toBe(false);
  });

  it("uses navigator.clipboard when isSecureContext !== false (secure)", async () => {
    const writeText = vi.fn(async () => {});
    vi.stubGlobal("window", { isSecureContext: true } as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    const res = await copyToClipboard("hello secure");
    expect(writeText).toHaveBeenCalledWith("hello secure");
    expect(res).toBe(true);
  });

  it("treats undefined isSecureContext as secure (jsdom/old browsers) and uses clipboard", async () => {
    const writeText = vi.fn(async () => {});
    vi.stubGlobal("window", {} as any); // no isSecureContext
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    const res = await copyToClipboard("hello undefined secure");
    expect(writeText).toHaveBeenCalled();
    expect(res).toBe(true);
  });

  it("falls back to execCommand when isSecureContext is false", async () => {
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
    const createElement = vi.fn(() => ta);
    const appendChild = vi.fn();
    const execCommand = vi.fn(() => true);
    vi.stubGlobal("document", {
      createElement,
      body: { appendChild, contains: vi.fn(() => false), removeChild: vi.fn() },
      execCommand,
    } as any);
    const res = await copyToClipboard("fallback text");
    expect(writeText).not.toHaveBeenCalled();
    expect(createElement).toHaveBeenCalledWith("textarea");
    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(res).toBe(true);
  });

  it("falls back when navigator.clipboard.writeText throws NotAllowedError", async () => {
    const writeText = vi.fn(async () => {
      const e: any = new Error("denied");
      e.name = "NotAllowedError";
      throw e;
    });
    vi.stubGlobal("window", { isSecureContext: true } as any);
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
    const res = await copyToClipboard("needs fallback");
    expect(writeText).toHaveBeenCalled();
    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(res).toBe(true);
  });

  it("returns false when both clipboard and fallback fail", async () => {
    const writeText = vi.fn(async () => { throw new Error("fail"); });
    vi.stubGlobal("window", { isSecureContext: true } as any);
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);
    vi.stubGlobal("document", {
      createElement: () => { throw new Error("no document"); },
      body: {} as any,
      execCommand: vi.fn(),
    } as any);
    const res = await copyToClipboard("will fail");
    expect(res).toBe(false);
  });

  it("checks clipboard code contains isSecureContext logic", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(path.resolve("src/lib/clipboard.ts"), "utf8");
    expect(content).toMatch(/isSecureContext/);
    expect(content).toMatch(/navigator\.clipboard/);
    expect(content).toMatch(/execCommand/);
  });
});
