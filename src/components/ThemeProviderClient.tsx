"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme, darkTheme } from "@/app/theme";

type Mode = "light" | "dark";

type ThemeModeContextValue = {
  mode: Mode;
  toggle: () => void;
  setMode: (mode: Mode) => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: "light",
  toggle: () => {},
  setMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function ThemeProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  // FOUC-safe: initialize from <html data-theme> set by the inline script in
  // layout.tsx (which already resolved localStorage → matchMedia). This keeps
  // the first client render in sync with the pre-hydration DOM instead of
  // flashing "light" then switching in an effect.
  const [mode, setMode] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from the pre-hydration DOM to sync up with the inline script in layout.tsx.
    // We defer this to useEffect so the very first client render matches the SSR "light"
    // state, avoiding React hydration mismatch errors on MUI class hashes.
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") {
      setMode(t);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("color-mode", mode);
    document.documentElement.style.colorScheme = mode;
    document.documentElement.setAttribute("data-theme", mode);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", mode === "dark" ? "#0A0A0A" : "#FCFCF9");
  }, [mode, mounted]);

  const value = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
      setMode,
    }),
    [mode]
  );

  const active = mode === "dark" ? darkTheme : theme;

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={active}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
