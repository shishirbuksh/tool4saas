
import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  const [mode, setMode] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "expo-dark" || t === "dark") {
      setMode("dark");
    } else if (t === "expo-light" || t === "light") {
      setMode("light");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("color-mode", mode);
    document.documentElement.style.colorScheme = mode;
    document.documentElement.setAttribute("data-theme", mode === "dark" ? "expo-dark" : "expo-light");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", mode === "dark" ? "#0b0b0c" : "#ffffff");
  }, [mode, mounted]);

  const value = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
      setMode,
    }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}
