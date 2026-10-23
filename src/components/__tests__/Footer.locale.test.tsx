import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={typeof href === "string" ? href : "#"} {...rest}>
      {children}
    </a>
  ),
}));

describe("Footer locale hubs", () => {
  it("links the English, Spanish and French hubs with hrefLang", () => {
    render(<Footer />);
    const es = screen.getByRole("link", { name: "Español" });
    const fr = screen.getByRole("link", { name: "Français" });
    const en = screen.getByRole("link", { name: "English" });
    expect(es).toHaveAttribute("href", "/es");
    expect(es).toHaveAttribute("hrefLang", "es");
    expect(fr).toHaveAttribute("href", "/fr");
    expect(fr).toHaveAttribute("hrefLang", "fr");
    expect(en).toHaveAttribute("href", "/");
    expect(en).toHaveAttribute("hrefLang", "en");
  });
});
