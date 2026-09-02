import { createTheme } from "@mui/material/styles";

const displayFont =
  'var(--font-display), Fraunces, Georgia, "Times New Roman", serif';
const bodyFont =
  'var(--font-inter), Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const MuiButtonOverrides = {
  defaultProps: { disableElevation: true },
  styleOverrides: {
    root: {
      borderRadius: 12,
      textTransform: "none" as const,
      fontWeight: 600,
      minHeight: 44,
      transition: "transform 150ms cubic-bezier(0.16,1,0.3,1), box-shadow 150ms cubic-bezier(0.16,1,0.3,1), filter 150ms",
      "&:active": { transform: "scale(0.98)", transitionDuration: "100ms" },
    },
    containedPrimary: {
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #d946ef 100%)",
      boxShadow: "0 1px 2px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.08)",
      "&:hover": {
        filter: "brightness(1.05)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(15,23,42,0.08), 0 16px 32px rgba(15,23,42,0.12)",
      },
    },
    outlinedPrimary: {
      borderColor: "rgba(99,102,241,0.24)",
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(8px)",
    },
  },
};

export const theme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1320 },
  },
  palette: {
    mode: "light",
    primary: { main: "#6366f1", light: "#818cf8", dark: "#4338ca", contrastText: "#ffffff" },
    secondary: { main: "#8b5cf6", light: "#a78bfa", dark: "#7c3aed", contrastText: "#ffffff" },
    background: { default: "#FCFCF9", paper: "#FFFFFF" },
    text: { primary: "#111113", secondary: "#6B7280" },
    divider: "rgba(17,17,19,0.08)",
    grey: { 50: "#FCFCF9", 100: "#F5F5F7", 200: "#E5E7EB", 300: "#D1D5DB" } as unknown as { 50: string; 100: string; 200: string; 300: string },
  },
  shape: { borderRadius: 12 },
  shadows: [
    "none",
    "0 1px 2px rgba(15,23,42,0.06)",
    "0 2px 4px rgba(15,23,42,0.06), 0 4px 8px rgba(15,23,42,0.04)",
    "0 3px 6px rgba(15,23,42,0.06)",
    "0 4px 12px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.08)",
    "0 6px 14px rgba(15,23,42,0.07), 0 10px 28px rgba(15,23,42,0.08)",
    "0 6px 20px rgba(15,23,42,0.08), 0 12px 32px rgba(15,23,42,0.10)",
    "0 8px 22px rgba(15,23,42,0.08), 0 16px 36px rgba(15,23,42,0.10)",
    "0 8px 24px rgba(15,23,42,0.08), 0 20px 40px rgba(15,23,42,0.12)",
    "0 10px 28px rgba(15,23,42,0.08), 0 22px 48px rgba(15,23,42,0.12)",
    "0 12px 32px rgba(15,23,42,0.08), 0 24px 60px rgba(15,23,42,0.12)",
    "0 14px 36px rgba(15,23,42,0.09), 0 28px 72px rgba(15,23,42,0.13)",
    "0 16px 40px rgba(15,23,42,0.10), 0 32px 80px rgba(15,23,42,0.14)",
    "0 18px 44px rgba(15,23,42,0.10), 0 36px 88px rgba(15,23,42,0.14)",
    "0 20px 48px rgba(15,23,42,0.11), 0 40px 96px rgba(15,23,42,0.14)",
    "0 22px 52px rgba(15,23,42,0.11), 0 44px 104px rgba(15,23,42,0.15)",
    "0 24px 56px rgba(15,23,42,0.12), 0 48px 112px rgba(15,23,42,0.15)",
    "0 26px 60px rgba(15,23,42,0.12), 0 52px 120px rgba(15,23,42,0.15)",
    "0 28px 64px rgba(15,23,42,0.12), 0 56px 128px rgba(15,23,42,0.16)",
    "0 30px 68px rgba(15,23,42,0.13), 0 60px 136px rgba(15,23,42,0.16)",
    "0 32px 72px rgba(15,23,42,0.13), 0 64px 144px rgba(15,23,42,0.16)",
    "0 34px 76px rgba(15,23,42,0.13), 0 68px 152px rgba(15,23,42,0.17)",
    "0 36px 80px rgba(15,23,42,0.14), 0 72px 160px rgba(15,23,42,0.17)",
    "0 38px 84px rgba(15,23,42,0.14), 0 76px 168px rgba(15,23,42,0.17)",
    "0 40px 88px rgba(15,23,42,0.14), 0 80px 176px rgba(15,23,42,0.18)",
    "0 42px 92px rgba(15,23,42,0.15), 0 84px 184px rgba(15,23,42,0.18)",
  ] as unknown as any,
  transitions: {
    duration: { shortest: 150, shorter: 200, short: 250, standard: 300 },
    easing: { easeInOut: "cubic-bezier(0.65,0,0.35,1)", easeOut: "cubic-bezier(0.16,1,0.3,1)", easeIn: "cubic-bezier(0.4,0,1,1)", sharp: "cubic-bezier(0.4,0,0.6,1)" },
  },
  typography: {
    fontFamily: bodyFont,
    h1: {
      fontFamily: displayFont,
      fontWeight: 700,
      fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
      lineHeight: 1.0,
      letterSpacing: "-0.04em",
      textWrap: "balance" as unknown as string,
    },
    h2: {
      fontFamily: displayFont,
      fontWeight: 600,
      fontSize: "clamp(1.75rem, 3vw + 0.75rem, 2.75rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.025em",
      textWrap: "balance" as unknown as string,
    },
    h3: {
      fontFamily: displayFont,
      fontWeight: 600,
      fontSize: "clamp(1.25rem, 2vw + 0.6rem, 1.75rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.015em",
      textWrap: "balance" as unknown as string,
    },
    h4: {
      fontFamily: displayFont,
      fontWeight: 600,
      fontSize: "clamp(1.125rem, 1.2vw + 0.7rem, 1.375rem)",
      lineHeight: 1.25,
      letterSpacing: "-0.015em",
      textWrap: "balance" as unknown as string,
    },
    h5: {
      fontFamily: bodyFont,
      fontWeight: 600,
      fontSize: "clamp(1.05rem, 0.95rem + 0.3vw, 1.15rem)",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontFamily: bodyFont,
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    body1: {
      fontFamily: bodyFont,
      fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)",
      lineHeight: 1.6,
      letterSpacing: "-0.015em",
      fontWeight: 400,
    },
    body2: {
      fontFamily: bodyFont,
      fontSize: "clamp(0.875rem, 0.84rem + 0.17vw, 0.9375rem)",
      lineHeight: 1.6,
      letterSpacing: "-0.01em",
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: bodyFont,
      fontSize: "1.0625rem",
      lineHeight: 1.4,
      letterSpacing: "-0.015em",
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: bodyFont,
      fontSize: "0.9375rem",
      lineHeight: 1.5,
      letterSpacing: "-0.01em",
      fontWeight: 600,
    },
    button: {
      fontFamily: bodyFont,
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.2,
    },
    caption: {
      fontFamily: bodyFont,
      fontSize: "0.8125rem",
      lineHeight: 1.5,
      letterSpacing: "0.01em",
    },
    overline: {
      fontFamily: bodyFont,
      fontSize: "0.75rem",
      lineHeight: 1.5,
      letterSpacing: "0.14em",
      fontWeight: 700,
      textTransform: "uppercase" as const,
    },
  },
  spacing: 8,
  components: {
    MuiButton: MuiButtonOverrides as unknown as object,
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitTapHighlightColor: "transparent",
          fontSize: "100%",
          WebkitTextSizeAdjust: "100%",
          textSizeAdjust: "100%",
          scrollBehavior: "smooth",
        },
        body: {
          minHeight: "100vh",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          fontFamily: bodyFont,
          letterSpacing: "-0.015em",
          lineHeight: 1.6,
          fontFeatureSettings: '"liga" 1, "calt" 1, "ss01" 1, "cv11" 1',
          fontOpticalSizing: "auto",
          fontVariantLigatures: "common-ligatures",
          wordSpacing: "0.02em",
          backgroundColor: "#FCFCF9",
        },
        "::selection": {
          background: "rgba(139, 92, 246, 0.28)",
        },
        "h1, h2, h3, h4": {
          fontVariationSettings: "'opsz' 32",
          fontOpticalSizing: "auto",
        },
        ":root": {
          "--brand-gradient": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #d946ef 100%)",
          "--brand-gradient-soft": "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 100%)",
          "--shadow-sm": "0 1px 2px rgba(15,23,42,0.06)",
          "--shadow-md": "0 8px 24px rgba(15,23,42,0.06)",
          "--shadow-lg": "0 8px 24px rgba(15,23,42,0.08), 0 20px 40px rgba(15,23,42,0.12)",
          "--motion-duration-fast": "150ms",
          "--motion-duration-base": "200ms",
          "--motion-ease-spring": "cubic-bezier(0.16,1,0.3,1)",
          "--motion-hover-lift": "-2px",
        } as unknown as Record<string, string>,
      },
    },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiAppBar: { defaultProps: { elevation: 0 } },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid",
          borderColor: "rgba(17,17,19,0.06)",
          boxShadow: "0 1px 2px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.04)",
          transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms",
          willChange: "transform",
          "&:hover": {
            transform: "translateY(-2px) scale(1.01)",
            borderColor: "rgba(99,102,241,0.16)",
            boxShadow: "0 4px 12px rgba(15,23,42,0.08), 0 20px 40px rgba(15,23,42,0.12)",
          },
          "&:active": { transform: "scale(0.98)", transitionDuration: "100ms" },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: { maxWidth: 1320 },
      },
    },
    MuiChip: { styleOverrides: { root: { borderRadius: 999 } } },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
    primary: { main: "#818cf8", light: "#a5b4fc", dark: "#6366f1", contrastText: "#ffffff" },
    secondary: { main: "#a78bfa", light: "#c4b5fd", dark: "#8b5cf6", contrastText: "#ffffff" },
    background: { default: "#070b16", paper: "#0e1426" },
    text: { primary: "#e8ebf5", secondary: "#9aa6c2" },
    divider: "rgba(255,255,255,0.08)",
  },
  components: {
    ...theme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid",
          borderColor: "rgba(255,255,255,0.08)",
          backgroundColor: "#131d35",
          boxShadow: "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.30)",
          "&:hover": {
            borderColor: "rgba(129,140,248,0.24)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.30), 0 20px 40px rgba(0,0,0,0.40)",
          },
        },
      },
    },
  } as unknown as typeof theme.components,
});
