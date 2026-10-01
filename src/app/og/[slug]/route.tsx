import { ImageResponse } from "next/og";
import { getTool, getCategory } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

function sanitize(text: string): string {
  return text
    .replace(/[—–]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .trim();
}

function sanitizeTitle(text: string): string {
  return Array.from(sanitize(text)).slice(0, 80).join("");
}

function sanitizeDesc(text: string): string {
  return Array.from(sanitize(text)).slice(0, 180).join("");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  // Per-category OG: /og/category-<id> renders the category label + site name.
  // Unknown slugs (including unknown category ids) fall back to the generic
  // home image safely; NOINDEX tool slugs never match this prefix and stay
  // excluded via the single-source NOINDEX_SLUGS (sitemap/category grids).
  let title: string;
  let desc: string;
  let badge: string;
  if (slug.startsWith("category-")) {
    const category = getCategory(slug.slice("category-".length));
    title = sanitizeTitle(category ? category.label : siteConfig.name);
    desc = sanitizeDesc(category ? category.description : siteConfig.description);
    badge = sanitizeTitle(category ? siteConfig.name : "Free Online Tools");
  } else {
    const tool = getTool(slug);
    title = sanitizeTitle(tool ? tool.title : siteConfig.name);
    desc = sanitizeDesc(tool ? tool.description : siteConfig.description);
    badge = tool
      ? sanitizeTitle(getCategory(tool.category)?.label ?? "Free Tools")
      : "Free Online Tools";
  }

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 0.5 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, marginTop: 24, opacity: 0.92, lineHeight: 1.35 }}>
            {desc}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            backgroundColor: "rgba(255,255,255,0.18)",
            padding: "12px 26px",
            borderRadius: 999,
            alignSelf: "flex-start",
          }}
        >
          {badge}
        </div>
      </div>
    ),
    { ...size }
  );
  image.headers.set(
    "Cache-Control",
    "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
  );
  return image;
}
