import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogArticle, { BlogJsonLd } from "@/components/blog/BlogArticle";
import { getClusterPost } from "@/lib/blog-registry";

const mortgage = getClusterPost("mortgage-calculator-guide", "how-to-calculate-mortgage-payment")!;
const bmi = getClusterPost("bmi-calculator-guide", "how-bmi-is-calculated")!;
const pdf = getClusterPost("pdf-merge-guide", "extract-pages-range")!;

function postingJson(post: Parameters<typeof BlogJsonLd>[0]["post"], locale?: string) {
  const { container } = render(<BlogJsonLd post={post} locale={locale as any} />);
  const script = container.querySelector('script[type="application/ld+json"]');
  const json = JSON.parse(script!.textContent || "{}");
  return json["@graph"].find((n: any) => n["@type"] === "BlogPosting");
}

describe("YMYL authoritative sources", () => {
  it("renders a sources block with external official links on mortgage and BMI guides", () => {
    for (const post of [mortgage, bmi]) {
      const { unmount } = render(<BlogArticle post={post} />);
      expect(screen.getByRole("heading", { name: "Sources and further reading" })).toBeInTheDocument();
      const external = screen
        .getAllByRole("link")
        .filter((a) => a.getAttribute("href")?.startsWith("https://"));
      expect(external.length).toBeGreaterThanOrEqual(4);
      for (const link of external) {
        expect(link.getAttribute("target")).toBe("_blank");
        expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      }
      unmount();
    }
  }, 20000);

  it("points mortgage readers at CFPB and HUD guidance", () => {
    render(<BlogArticle post={mortgage} />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("https://www.consumerfinance.gov/ask-cfpb/what-are-closing-costs-en-1801/");
    expect(hrefs).toContain("https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/");
    expect(hrefs).toContain("https://www.hud.gov/topics/buying_a_home");
  });

  it("adds citation URLs to BlogPosting for YMYL posts only", () => {
    const mortgagePosting = postingJson(mortgage);
    expect(mortgagePosting.citation).toContain("https://www.consumerfinance.gov/owning-a-home/");
    expect(mortgagePosting.citation).toContain("https://www.hud.gov/topics/buying_a_home");

    const bmiPosting = postingJson(bmi);
    expect(bmiPosting.citation).toContain("https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight");

    const pdfPosting = postingJson(pdf);
    expect(pdfPosting.citation).toBeUndefined();
  });

  it("leaves non-YMYL posts without a sources block", () => {
    render(<BlogArticle post={pdf} />);
    expect(screen.queryByText("Sources and further reading")).not.toBeInTheDocument();
  });
});
