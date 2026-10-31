import { renderToString } from "react-dom/server";
import type { ReactElement } from "react";

export type RenderedPage = {
  html: string;
  css: string;
  ids: string[];
};

// Render a React page tree to static HTML. Pure DaisyUI + Tailwind CSS v4
// requires zero runtime CSS extraction overhead.
export function renderReactPage(element: ReactElement): RenderedPage {
  const html = renderToString(element);
  return { html, css: "", ids: [] };
}
