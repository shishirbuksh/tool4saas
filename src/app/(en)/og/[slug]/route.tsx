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

// Curated share cards for static pages (mirrors staticPageMetadata titles).
const STATIC_PAGES: Record<string, { title: string; desc: string }> = {
  about: { title: "About Tool4SaaS", desc: "Free browser tools, tested in-house. Local-first, private by design." },
  privacy: { title: "Privacy Policy", desc: "What runs locally, what needs internet, and your cookie choices." },
  terms: { title: "Terms of Service", desc: "Fair use, calculator disclaimers and content limits." },
  contact: { title: "Contact Tool4SaaS", desc: "Request tools, report issues, ask questions." },
  author: { title: "Tool4SaaS Editorial Team", desc: "In-house reviewers testing every tool across browsers." },
  methodology: { title: "How We Test Tools", desc: "Golden values, boundary tests and browser matrix." },
  blog: { title: "Tool4SaaS Blog Guides", desc: "Tested walkthroughs for invoices, QR, resumes and more." },
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  // Per-category OG: /og/category-<id> renders the category label + site name.
  // Per-static OG: /og/static-<name> renders curated title/desc so the 7
  // static pages (about/privacy/terms/contact/author/methodology/blog) get
  // distinct share cards instead of sharing /og/home.
  // Unknown slugs (including unknown category ids) fall back to the generic
  // home image safely; NOINDEX tool slugs never match this prefix and stay
  // excluded via the single-source NOINDEX_SLUGS (sitemap/category grids).
  let title: string;
  let desc: string;
  let badge: string;
  if (slug.startsWith("static-")) {
    const page = STATIC_PAGES[slug.slice("static-".length)];
    title = sanitizeTitle(page ? page.title : siteConfig.name);
    desc = sanitizeDesc(page ? page.desc : siteConfig.description);
    badge = siteConfig.name;
  } else if (slug.startsWith("category-")) {
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
