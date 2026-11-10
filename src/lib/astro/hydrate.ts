import { createElement } from "react";
import { hydrateRoot } from "react-dom/client";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import { PathnameProvider } from "@/lib/astro/navigation";
import { VIEW_REGISTRY } from "./view-registry";

/**
 * Hydrate the interactive view inside `#app`.
 *
 * The page shell (header/footer/consent) is static HTML handled by
 * src/lib/shell; only the view subtree is React. The view module is loaded from
 * a generated registry so Astro/Vite can code-split one chunk per page, and
 * this whole module is dynamically imported by the shell so react-dom is never
 * fetched on pages that do not hydrate.
 */
export async function hydrateApp(): Promise<void> {
  const container = document.getElementById("app");
  if (!container) return;
  const key = container.dataset.view;
  if (!key) return;
  const loader = VIEW_REGISTRY[key];
  if (!loader) {
    console.error(`[astro] no view registered for "${key}"`);
    return;
  }

  const propsEl = document.getElementById("app-props");
  let props: Record<string, unknown> = {};
  if (propsEl?.textContent) {
    try {
      props = JSON.parse(propsEl.textContent) as Record<string, unknown>;
    } catch (error) {
      console.error("[astro] failed to parse page props", error);
    }
  }

  const mod = (await loader()) as { default?: unknown };
  const Component = (mod.default ?? mod) as Parameters<typeof createElement>[0];
  const pathname = container.dataset.pathname || window.location.pathname;

  hydrateRoot(
    container,
    createElement(PathnameProvider, {
      value: pathname,
      children: createElement(
        ThemeProviderClient,
        null,
        createElement(Component, props),
      ),
    }),
  );
}
