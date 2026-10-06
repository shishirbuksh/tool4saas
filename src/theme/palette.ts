import type { PaletteOptions } from "@mui/material/styles";

// Light + dark palettes. Hexes must stay identical to the original theme.
export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: { main: "#111111", light: "#333333", dark: "#000000", contrastText: "#FFFFFF" },
  secondary: { main: "#666666", light: "#A3A3A3", dark: "#333333", contrastText: "#FFFFFF" },
  background: { default: "#FCFCF9", paper: "#FFFFFF" },
  text: { primary: "#111111", secondary: "#666666" },
  divider: "rgba(0,0,0,0.08)",
  grey: { 50: "#FCFCF9", 100: "#F5F5F5", 200: "#EAEAEA", 300: "#D4D4D4" } as unknown as { 50: string; 100: string; 200: string; 300: string },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: { main: "#FFFFFF", light: "#F5F5F5", dark: "#EAEAEA", contrastText: "#111111" },
  secondary: { main: "#A3A3A3", light: "#D4D4D4", dark: "#737373", contrastText: "#0A0A0A" },
  background: { default: "#0A0A0A", paper: "#111111" },
  text: { primary: "#EDEDED", secondary: "#A0A0A0" },
  divider: "rgba(255,255,255,0.1)",
  grey: { 50: "#111111", 100: "#222222", 200: "#333333", 300: "#444444" } as unknown as { 50: string; 100: string; 200: string; 300: string },
};
