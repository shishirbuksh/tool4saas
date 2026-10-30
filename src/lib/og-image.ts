import sharp from "sharp";
import { siteConfig } from "@/lib/site";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function renderOgImagePng({
  title,
  desc,
  badge,
}: {
  title: string;
  desc: string;
  badge: string;
}): Promise<Buffer> {
  const safeTitle = escapeXml(title);
  const safeDesc = escapeXml(desc);
  const safeBadge = escapeXml(badge);
  const safeSite = escapeXml(siteConfig.name);

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2563eb" />
        <stop offset="100%" stop-color="#7c3aed" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)" />
    <text x="72" y="100" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#ffffff" letter-spacing="0.5">${safeSite}</text>
    <foreignObject x="72" y="150" width="1056" height="340">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color: #ffffff; font-family: Arial, Helvetica, sans-serif;">
        <div style="font-size: 58px; font-weight: 800; line-height: 1.15; max-height: 200px; overflow: hidden;">
          ${safeTitle}
        </div>
        <div style="font-size: 26px; line-height: 1.35; margin-top: 20px; opacity: 0.92; max-height: 110px; overflow: hidden;">
          ${safeDesc}
        </div>
      </div>
    </foreignObject>
    <rect x="72" y="520" rx="24" ry="24" width="${Math.min(900, Math.max(160, safeBadge.length * 14 + 50))}" height="50" fill="rgba(255,255,255,0.18)" />
    <text x="${72 + 25}" y="554" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="#ffffff">${safeBadge}</text>
  </svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}
