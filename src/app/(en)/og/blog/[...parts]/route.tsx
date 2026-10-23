import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import { getPillarMeta, getPillarPost, getClusterPost } from "@/lib/blog-registry";
import { ogSanitizeTitle, ogSanitizeDesc } from "@/lib/og-text";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

// Per-post share cards: /og/blog/<pillar> for pillar guides and
// /og/blog/<pillar>/<cluster> for tutorials. Titles/descriptions come from
// the same registry the pages render, so a card can never disagree with the
// article. Unknown paths fall back to a generic card instead of erroring, so
// an old shared URL still renders an image.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ parts: string[] }> }
) {
  const { parts } = await params;
  const [pillar, cluster] = parts;
  const post =
    parts.length === 1
      ? getPillarPost(pillar)
      : parts.length === 2
        ? getClusterPost(pillar, cluster)
        : undefined;

  const title = ogSanitizeTitle(post ? post.title : siteConfig.name);
  const desc = ogSanitizeDesc(post ? post.description : siteConfig.description);
  const badge = post
    ? ogSanitizeTitle(`Guide · ${getPillarMeta(post.pillar)?.shortLabel ?? post.pillar}`)
    : "Free Online Tools";

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
