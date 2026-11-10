/**
 * Theme toggle (vanilla). The initial theme is applied by the inline
 * bootstrap script in BaseLayout before first paint; this module only handles
 * the button, keeps `aria-label` in sync, and notifies hydrated React tool
 * views via `t4s:theme-changed` so their previews follow the theme.
 */
const DARK = "expo-dark";
const LIGHT = "expo-light";

export type ThemeMode = "light" | "dark";

export function applyTheme(mode: ThemeMode): void {
  document.documentElement.setAttribute("data-theme", mode === "dark" ? DARK : LIGHT);
  document.documentElement.style.colorScheme = mode;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", mode === "dark" ? "#0b0b0c" : "#ffffff");
}

export function currentThemeMode(): ThemeMode {
  return document.documentElement.getAttribute("data-theme") === DARK ? "dark" : "light";
}

function syncLabels(): void {
  const label = currentThemeMode() === "light" ? "Switch to dark mode" : "Switch to light mode";
  document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  });
}

export function initThemeToggle(): void {
  document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next: ThemeMode = currentThemeMode() === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("color-mode", next);
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new CustomEvent("t4s:theme-changed", { detail: next }));
    });
  });
  syncLabels();
  window.addEventListener("t4s:theme-changed", syncLabels);
}
