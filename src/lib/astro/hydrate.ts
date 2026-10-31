import { createElement } from "react";
import { hydrateRoot } from "react-dom/client";
import AppShell from "@/components/AppShell";
import type { Locale } from "@/lib/i18n-core";
import { VIEW_REGISTRY } from "./view-registry";

// Hydrate the server-rendered React tree in #app. The view module is loaded
// from a generated registry so Astro/Vite can code-split one chunk per page.
// Pure DaisyUI + Tailwind CSS requires zero Emotion cache hydration overhead.
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
  const locale = (container.dataset.locale as Locale) || "en";
  const pathname = container.dataset.pathname || window.location.pathname;

  hydrateRoot(
    container,
    createElement(AppShell, { locale, pathname }, createElement(Component, props)),
  );
}
