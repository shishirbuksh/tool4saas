import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { blogMetadataFor, BlogJsonLd } from "@/components/blog/BlogArticle";
import { getPillarPost, getClusterPost } from "@/lib/blog-registry";
import { siteConfig } from "@/lib/site";

const base = siteConfig.url.replace(/\/$/, "");

describe("per-post OG images", () => {
  it("pillar guide uses /og/blog/<pillar>", () => {
    const post = getPillarPost("pdf-merge-guide")!;
    const meta = blogMetadataFor(post) as any;
    expect(meta.openGraph.images[0].url).toBe(`${base}/og/blog/pdf-merge-guide`);
    expect(meta.openGraph.images[0].width).toBe(1200);
    expect(meta.openGraph.images[0].height).toBe(630);
    expect(meta.twitter.images[0]).toBe(`${base}/og/blog/pdf-merge-guide`);
  });

  it("cluster tutorial uses /og/blog/<pillar>/<slug>", () => {
    const post = getClusterPost("pdf-merge-guide", "extract-pages-range")!;
    const meta = blogMetadataFor(post) as any;
    expect(meta.openGraph.images[0].url).toBe(`${base}/og/blog/pdf-merge-guide/extract-pages-range`);
  });

  it("BlogJsonLd image matches the per-post OG", () => {
    const post = getClusterPost("pdf-merge-guide", "extract-pages-range")!;
    const { container } = render(<BlogJsonLd post={post} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const json = JSON.parse(script!.textContent || "{}");
    const posting = json["@graph"].find((n: any) => n["@type"] === "BlogPosting");
    expect(posting.image).toBe(`${base}/og/blog/pdf-merge-guide/extract-pages-range`);
  });
});
