export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export type ValidateImageOptions = {
  maxSize?: number;
  allowedTypes?: string[];
};

export function validateImageFile(
  file: File,
  opts: ValidateImageOptions = {}
): { valid: boolean; error?: string } {
  const maxSize = opts.maxSize ?? MAX_IMAGE_SIZE;
  const allowed = opts.allowedTypes ?? ALLOWED_IMAGE_TYPES;

  if (!file.type.startsWith("image/")) {
    return { valid: false, error: "File is not an image (image/* required)." };
  }
  // If strict allowlist provided, check exact MIME
  if (allowed.length && file.type && !allowed.includes(file.type) && !file.type.startsWith("image/")) {
    return { valid: false, error: `Unsupported image type: ${file.type}` };
  }
  if (file.size > maxSize) {
    return { valid: false, error: `File too large (max ${Math.round(maxSize / 1024 / 1024)} MB).` };
  }
  if (file.size === 0) {
    return { valid: false, error: "Empty file." };
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
