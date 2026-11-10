import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Mode = "light" | "dark";

type ThemeModeContextValue = {
  mode: Mode;
};

const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: "light",
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

/**
 * Read-only theme bridge for hydrated tool views.
 *
 * The theme itself is owned by the static shell (src/lib/shell/theme.ts): it is
 * applied before first paint by the inline bootstrap in BaseLayout and toggled
 * by the header button. This provider only mirrors the current mode into React
 * so previews (SERP preview, meta tag preview) can match the page, and listens
 * for `t4s:theme-changed` instead of writing localStorage itself.
 */
export default function ThemeProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const read = () => {
      const t = document.documentElement.getAttribute("data-theme");
      setMode(t === "expo-dark" || t === "dark" ? "dark" : "light");
    };
    read();
    window.addEventListener("t4s:theme-changed", read);
    return () => window.removeEventListener("t4s:theme-changed", read);
  }, []);

  const value = useMemo(() => ({ mode }), [mode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}
