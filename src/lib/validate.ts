export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_DIMENSION = 8192;
export const MAX_PIXELS = 16 * 1024 * 1024; // 16MP
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

// Extension fallback for magic-byte style check when file.type is empty
const EXTENSION_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
};

export type ValidateImageOptions = {
  maxSize?: number;
  allowedTypes?: string[];
  maxDimension?: number;
  maxPixels?: number;
};

export function validateImageFile(
  file: File,
  opts: ValidateImageOptions = {}
): { valid: boolean; error?: string } {
  const maxSize = opts.maxSize ?? MAX_IMAGE_SIZE;
  const allowed = opts.allowedTypes ?? ALLOWED_IMAGE_TYPES;

  if (file.size === 0) {
    return { valid: false, error: "Empty file." };
  }
  if (file.size > maxSize) {
    return { valid: false, error: `File too large (max ${Math.round(maxSize / 1024 / 1024)} MB).` };
  }
  // Magic-byte / extension check for empty file.type (browsers may return "" for some files)
  if (!file.type) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const inferred = EXTENSION_TO_MIME[ext];
    // Magic-byte signatures reference: JPEG FF D8 FF, PNG 89 50 4E 47, GIF 47 49 46 38, WEBP RIFF....WEBP, SVG <svg
    // Since File reading is async, we use extension as sync heuristic and reject unknown types
    if (!inferred) {
      return { valid: false, error: "File is not an image (image/* required)." };
    }
    if (!allowed.includes(inferred)) {
      return { valid: false, error: `Unsupported image type: ${inferred}` };
    }
    return { valid: true };
  }
  if (!file.type.startsWith("image/")) {
    return { valid: false, error: "File is not an image (image/* required)." };
  }
  // Strict allowlist: reject any MIME not in allowlist (fail-closed, no && bypass)
  if (!allowed.includes(file.type)) {
    return { valid: false, error: `Unsupported image type: ${file.type}` };
  }
  return { valid: true };
}

export function validateImageDimensions(
  width: number,
  height: number,
  opts: { maxDimension?: number; maxPixels?: number } = {}
): { valid: boolean; error?: string } {
  const maxDimension = opts.maxDimension ?? MAX_DIMENSION;
  const maxPixels = opts.maxPixels ?? MAX_PIXELS;
  if (width > maxDimension || height > maxDimension) {
    return { valid: false, error: `Image too large — max ${maxDimension}px per side (got ${width}×${height}).` };
  }
  if (width * height > maxPixels) {
    return { valid: false, error: `Image too large — max ${maxPixels / (1024 * 1024)}MP (got ${Math.round((width * height) / (1024 * 1024))}MP).` };
  }
  return { valid: true };
}

export function validateImageFiles(
  files: File[],
  opts: ValidateImageOptions & { maxTotalSize?: number } = {}
): { valid: boolean; error?: string } {
  for (const f of files) {
    const r = validateImageFile(f, opts);
    if (!r.valid) return r;
  }
  if (opts.maxTotalSize) {
    const total = files.reduce((s, f) => s + f.size, 0);
    if (total > opts.maxTotalSize) {
      return { valid: false, error: `Total size too large (max ${Math.round(opts.maxTotalSize / 1024 / 1024)} MB).` };
    }
  }
  return { valid: true };
}
