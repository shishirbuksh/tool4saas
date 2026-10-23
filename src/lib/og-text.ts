// Shared text sanitizers for dynamic OG images (ImageResponse/satori cannot
// render some typed glyphs consistently; keep cards ASCII-safe).

export function ogSanitize(text: string): string {
  return text
    .replace(/[—–]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .trim();
}

export function ogSanitizeTitle(text: string): string {
  return Array.from(ogSanitize(text)).slice(0, 80).join("");
}

export function ogSanitizeDesc(text: string): string {
  return Array.from(ogSanitize(text)).slice(0, 180).join("");
}
