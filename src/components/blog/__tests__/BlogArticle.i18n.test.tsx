import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogArticle, { blogMetadataFor, BlogJsonLd } from "@/components/blog/BlogArticle";
import { getClusterPost } from "@/lib/blog-registry";
import { qrSizePrintEs } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

// next/link without router context: render a plain anchor.
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={typeof href === "string" ? href : "#"} {...rest}>
      {children}
    </a>
  ),
}));

const base = siteConfig.url.replace(/\/$/, "");
const EN_SLUG = "/blog/qr-code-generator-guide/qr-code-size-print-guide";
const ES_SLUG = "/es/blog/qr-code-generator-guide/qr-code-size-print-guide";

describe("BlogArticle – ES pilot locale", () => {
  it("blogMetadataFor ES emits /es canonical + bidirectional hreflang + es_ES OG", () => {
    const meta = blogMetadataFor(qrSizePrintEs, "es") as any;
    expect(meta.alternates.canonical).toBe(`${base}${ES_SLUG}`);
    expect(meta.alternates.languages.es).toBe(`${base}${ES_SLUG}`);
    expect(meta.alternates.languages.en).toBe(`${base}${EN_SLUG}`);
    expect(meta.alternates.languages["x-default"]).toBe(`${base}${EN_SLUG}`);
    expect(meta.openGraph.locale).toBe("es_ES");
    expect(meta.openGraph.url).toBe(`${base}${ES_SLUG}`);
  });

  it("blogMetadataFor EN piloted cluster points at the ES alternate (no 404s elsewhere)", () => {
    const enPost = getClusterPost("qr-code-generator-guide", "qr-code-size-print-guide")!;
    const meta = blogMetadataFor(enPost) as any;
    expect(meta.alternates.canonical).toBe(`${base}${EN_SLUG}`);
    expect(meta.alternates.languages.es).toBe(`${base}${ES_SLUG}`);
    const plain = getClusterPost("word-counter-guide", "how-to-count-words-online")!;
    const plainMeta = blogMetadataFor(plain) as any;
    expect(plainMeta.alternates.languages.es).toBeUndefined();
  });

  it("BlogJsonLd ES uses /es canonical + inLanguage es", () => {
    const { container } = render(<BlogJsonLd post={qrSizePrintEs} locale="es" />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const json = JSON.parse(script!.textContent || "{}");
    const posting = json["@graph"].find((n: any) => n["@type"] === "BlogPosting");
    expect(posting.url).toBe(`${base}${ES_SLUG}`);
    expect(posting.inLanguage).toBe("es");
  });

  it("renders the ES shell (Spanish CTAs, breadcrumbs, FAQ heading) with /es tool link", () => {
    render(<BlogArticle post={qrSizePrintEs} locale="es" />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText(/Pruébala ahora/)).toBeInTheDocument();
    expect(screen.getByText("Preguntas frecuentes")).toBeInTheDocument();
    expect(screen.getByText("En esta página")).toBeInTheDocument();
    expect(screen.getByText("Sigue leyendo en esta guía")).toBeInTheDocument();
    const ctas = screen.getAllByRole("link", { name: /Abrir Generador de Códigos QR/i });
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    expect(ctas[0].getAttribute("href")).toBe("/es/qr-code-generator");
  });

  it("renders the EN shell unchanged (regression guard)", () => {
    const enPost = getClusterPost("qr-code-generator-guide", "qr-code-size-print-guide")!;
    const { unmount } = render(<BlogArticle post={enPost} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText(/Try it now/)).toBeInTheDocument();
    unmount();
  });
});
