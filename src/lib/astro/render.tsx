import { renderToString } from "react-dom/server";
import { CacheProvider } from "@emotion/react";
import type { ReactElement } from "react";
import { createPageCache } from "./emotion";

export type RenderedPage = {
  html: string;
  css: string;
  ids: string[];
};

// Render a React page tree to static HTML and collect the exact MUI/Emotion CSS
// it used. The returned `css`/`ids` are emitted as a single
// <style data-emotion="css id1 id2 ..."> tag in <head>, which Emotion's browser
// cache then adopts during hydration.
export function renderReactPage(element: ReactElement): RenderedPage {
  const cache = createPageCache();
  const html = renderToString(<CacheProvider value={cache}>{element}</CacheProvider>);
  const ids = Object.keys(cache.inserted);
  const css = ids
    .map((id) => {
      const value = cache.inserted[id];
      return typeof value === "string" ? value : "";
    })
    .join("");
  return { html, css, ids };
}
