import { describe, it, expect } from "vitest";
import {
  MAX_IMAGE_SIZE,
  MAX_DIMENSION,
  MAX_PIXELS,
  ALLOWED_IMAGE_TYPES,
  validateImageFile,
  validateImageDimensions,
  validateImageFiles,
} from "./validate";

// helper to create mock File (Node File available, but craft via constructor or plain object)
function mockFile(opts: { size: number; type?: string; name?: string }): File {
  // Use real File if possible to satisfy type
  const name = opts.name ?? "test.png";
  const type = opts.type ?? "image/png";
  // create content of given size via Uint8Array (but for large 10MB avoid allocating huge)
  // For validation, only size/type/name are read, so we can use a plain object cast
  // To avoid OOM for 10MB+, use a stub with size getter if needed, but we allocate small buffer and override size
  if (opts.size > 1024 * 1024) {
    // Create small blob but override size via defineProperty
    const blob = new Blob(["a"], { type });
    const f = new File([blob], name, { type });
    Object.defineProperty(f, "size", { value: opts.size, writable: false });
    // also ensure name override if needed
    if (opts.name) Object.defineProperty(f, "name", { value: opts.name });
    if (opts.type !== undefined) Object.defineProperty(f, "type", { value: opts.type });
    return f;
  }
  const content = new Uint8Array(opts.size);
  const file = new File([content], name, { type });
  // File constructor may infer type correctly; enforce overrides
  if (opts.type !== undefined) Object.defineProperty(file, "type", { value: opts.type });
  return file;
}

describe("validate – 10MB limit and image validation", () => {
  it("MAX_IMAGE_SIZE is exactly 10MB (10*1024*1024)", () => {
    expect(MAX_IMAGE_SIZE).toBe(10 * 1024 * 1024);
    expect(MAX_IMAGE_SIZE).toBe(10_485_760);
    expect(ALLOWED_IMAGE_TYPES).toContain("image/png");
    expect(MAX_DIMENSION).toBe(8192);
    expect(MAX_PIXELS).toBe(16 * 1024 * 1024);
  });

  it("rejects empty file (size 0)", () => {
    const f = mockFile({ size: 0, type: "image/png", name: "empty.png" });
    const r = validateImageFile(f);
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/Empty/);
  });

  it("rejects file >10MB", () => {
    const f = mockFile({ size: MAX_IMAGE_SIZE + 1, type: "image/png", name: "big.png" });
    const r = validateImageFile(f);
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/too large/i);
    expect(r.error).toMatch(/10 MB/);
  });

  it("accepts file exactly 10MB (boundary)", () => {
    const f = mockFile({ size: MAX_IMAGE_SIZE, type: "image/jpeg", name: "exact.jpg" });
    const r = validateImageFile(f);
    expect(r.valid).toBe(true);
  });

  it("accepts file <10MB with allowed type", () => {
    const f = mockFile({ size: 1024, type: "image/webp", name: "ok.webp" });
    expect(validateImageFile(f).valid).toBe(true);
    const svg = mockFile({ size: 500, type: "image/svg+xml", name: "icon.svg" });
    expect(validateImageFile(svg).valid).toBe(true);
  });

  it("rejects unsupported image type and non-image", () => {
    const pdf = mockFile({ size: 1000, type: "application/pdf", name: "doc.pdf" });
    expect(validateImageFile(pdf).valid).toBe(false);
    expect(validateImageFile(pdf).error).toMatch(/not an image|Unsupported/);
    const bmp = mockFile({ size: 1000, type: "image/bmp", name: "bmp.bmp" });
    expect(validateImageFile(bmp).valid).toBe(false);
    expect(validateImageFile(bmp).error).toMatch(/Unsupported/);
  });

  it("handles empty file.type via extension fallback (heuristic / magic-byte extension)", () => {
    // browser may return "" for type – extension inferred
    const jpgNoType = mockFile({ size: 1000, type: "", name: "photo.jpg" });
    expect(validateImageFile(jpgNoType).valid).toBe(true);
    const txtNoType = mockFile({ size: 1000, type: "", name: "notes.txt" });
    expect(validateImageFile(txtNoType).valid).toBe(false);
    expect(validateImageFile(txtNoType).error).toMatch(/not an image/);
    // allowedTypes filter with extension fallback
    const pngNoType = mockFile({ size: 1000, type: "", name: "pic.png" });
    expect(validateImageFile(pngNoType, { allowedTypes: ["image/jpeg"] }).valid).toBe(false);
    expect(validateImageFile(pngNoType, { allowedTypes: ["image/jpeg"] }).error).toMatch(/Unsupported/);
  });

  it("validateImageDimensions enforces maxDimension and maxPixels", () => {
    // 4096x4096 = 16MP exactly -> valid at pixel limit
    expect(validateImageDimensions(4096, 4096).valid).toBe(true);
    // 8192x8192 = 64MP >16MP even though at maxDimension, pixels exceed -> invalid
    expect(validateImageDimensions(8192, 8192).valid).toBe(false);
    expect(validateImageDimensions(8193, 100).valid).toBe(false);
    expect(validateImageDimensions(100, 8193).valid).toBe(false);
    // 5000x5000=25MP >16MP
    expect(validateImageDimensions(5000, 5000).valid).toBe(false);
    expect(validateImageDimensions(5000, 5000).error).toMatch(/MP/);
    // custom opts
    expect(validateImageDimensions(2000, 2000, { maxDimension: 1000 }).valid).toBe(false);
  });

  it("validateImageFiles checks each file and total size cap", () => {
    const a = mockFile({ size: 1024, type: "image/png", name: "a.png" });
    const b = mockFile({ size: 2048, type: "image/jpeg", name: "b.jpg" });
    expect(validateImageFiles([a, b]).valid).toBe(true);
    const big = mockFile({ size: MAX_IMAGE_SIZE + 1, type: "image/png", name: "big.png" });
    expect(validateImageFiles([a, big]).valid).toBe(false);
    // maxTotalSize
    const c = mockFile({ size: 6 * 1024 * 1024, type: "image/png", name: "c.png" });
    const d = mockFile({ size: 6 * 1024 * 1024, type: "image/png", name: "d.png" });
    expect(validateImageFiles([c, d], { maxTotalSize: 10 * 1024 * 1024 }).valid).toBe(false);
    expect(validateImageFiles([c, d], { maxTotalSize: 10 * 1024 * 1024 }).error).toMatch(/Total size/);
    expect(validateImageFiles([a, b], { maxTotalSize: 10 * 1024 * 1024 }).valid).toBe(true);
  });
});
