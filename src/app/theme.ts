import { createTheme } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles";

const displayFont =
  'var(--font-display), "Fraunces", Georgia, "Times New Roman", serif';
const bodyFont =
  'var(--font-inter), "Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const MuiButtonOverrides = {
  defaultProps: { disableElevation: true },
  styleOverrides: {
    root: {
      borderRadius: 12,
      textTransform: "none" as const,
      fontWeight: 500,
      minHeight: 44,
      letterSpacing: "-0.01em",
      transition: "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease, background-color 150ms ease, color 150ms ease",
      "&:active": { transform: "scale(0.98)", transitionDuration: "100ms" },
    },
    containedPrimary: {
      background: "#111111",
      backgroundImage: "var(--brand-gradient)",
      color: "#FFFFFF",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.1)",
      border: "1px solid #000000",
      "&:hover": {
        filter: "brightness(1.12)",
        transform: "translateY(-1px)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.12)",
      },
      "&:focus-visible": {
        filter: "brightness(1.12)",
        borderColor: "#111111",
        boxShadow: "0 0 0 3px rgba(17,17,17,0.25), 0 4px 12px rgba(0,0,0,0.12)",
        outline: "none",
      },
    },
    outlinedPrimary: {
      borderColor: "rgba(0,0,0,0.1)",
      background: "rgba(255,255,255,0.8)",
      color: "#111111",
      backdropFilter: "blur(8px)",
      "&:hover": {
        background: "rgba(255,255,255,0.9)",
        borderColor: "rgba(0,0,0,0.2)",
      },
      "&:focus-visible": {
        borderColor: "#111111",
        boxShadow: "0 0 0 3px rgba(17,17,17,0.25)",
        outline: "none",
      },
    },
  },
};

export const theme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1320 },
  },
  palette: {
    mode: "light",
    primary: { main: "#111111", light: "#333333", dark: "#000000", contrastText: "#FFFFFF" },
    secondary: { main: "#666666", light: "#A3A3A3", dark: "#333333", contrastText: "#FFFFFF" },
    background: { default: "#FCFCF9", paper: "#FFFFFF" },
    text: { primary: "#111111", secondary: "#666666" },
    divider: "rgba(0,0,0,0.08)",
    grey: { 50: "#FCFCF9", 100: "#F5F5F5", 200: "#EAEAEA", 300: "#D4D4D4" } as unknown as { 50: string; 100: string; 200: string; 300: string },
  },
  shape: { borderRadius: 12 },
  shadows: [
    "none",
    "0 1px 2px rgba(0,0,0,0.04)",
    "0 2px 4px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
    "0 4px 8px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.03)",
    "0 6px 16px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)",
    "0 8px 24px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.03)",
    "0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
    "0 16px 40px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.04)",
    "0 24px 48px rgba(0,0,0,0.07), 0 12px 24px rgba(0,0,0,0.04)",
    "0 28px 56px rgba(0,0,0,0.07), 0 14px 28px rgba(0,0,0,0.05)",
    "0 32px 64px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.05)",
    "0 36px 72px rgba(0,0,0,0.08), 0 18px 36px rgba(0,0,0,0.055)",
    "0 40px 80px rgba(0,0,0,0.09), 0 20px 40px rgba(0,0,0,0.06)",
    "0 44px 88px rgba(0,0,0,0.09), 0 22px 44px rgba(0,0,0,0.06)",
    "0 48px 96px rgba(0,0,0,0.10), 0 24px 48px rgba(0,0,0,0.065)",
    "0 52px 104px rgba(0,0,0,0.10), 0 26px 52px rgba(0,0,0,0.07)",
    "0 56px 112px rgba(0,0,0,0.11), 0 28px 56px rgba(0,0,0,0.07)",
    "0 60px 120px rgba(0,0,0,0.11), 0 30px 60px rgba(0,0,0,0.075)",
    "0 64px 128px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.08)",
    "0 68px 136px rgba(0,0,0,0.12), 0 34px 68px rgba(0,0,0,0.08)",
    "0 72px 144px rgba(0,0,0,0.13), 0 36px 72px rgba(0,0,0,0.085)",
    "0 76px 152px rgba(0,0,0,0.13), 0 38px 76px rgba(0,0,0,0.09)",
    "0 80px 160px rgba(0,0,0,0.14), 0 40px 80px rgba(0,0,0,0.09)",
    "0 84px 168px rgba(0,0,0,0.14), 0 42px 84px rgba(0,0,0,0.095)",
    "0 88px 176px rgba(0,0,0,0.15), 0 44px 88px rgba(0,0,0,0.10)",
  ] as Shadows,
  transitions: {
    duration: { shortest: 150, shorter: 200, short: 250, standard: 300 },
    easing: { easeInOut: "cubic-bezier(0.65,0,0.35,1)", easeOut: "cubic-bezier(0.16,1,0.3,1)", easeIn: "cubic-bezier(0.4,0,1,1)", sharp: "cubic-bezier(0.4,0,0.6,1)" },
  },
  typography: {
    fontFamily: bodyFont,
    h1: {
      fontFamily: displayFont,
      fontWeight: 700,
      fontSize: "clamp(2.5rem, 1.6rem + 2.2vw, 4.25rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.04em",
      textWrap: "balance" as unknown as string,
    },
    h2: {
      fontFamily: displayFont,
      fontWeight: 700,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: 1.1,
      letterSpacing: "-0.025em",
      textWrap: "balance" as unknown as string,
    },
    h3: {
      fontFamily: displayFont,
      fontWeight: 700,
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      textWrap: "balance" as unknown as string,
    },
    h4: {
      fontFamily: displayFont,
      fontWeight: 700,
      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.015em",
      textWrap: "balance" as unknown as string,
    },
    h5: {
      fontFamily: displayFont,
      fontWeight: 700,
      fontSize: "1.25rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontFamily: displayFont,
      fontWeight: 700,
      fontSize: "1rem",
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    body1: {
      fontFamily: bodyFont,
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "-0.015em",
      fontWeight: 400,
    },
    body2: {
      fontFamily: bodyFont,
      fontSize: "0.875rem",
      lineHeight: 1.6,
      letterSpacing: "-0.005em",
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: bodyFont,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "-0.01em",
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: bodyFont,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "-0.005em",
      fontWeight: 500,
    },
    button: {
      fontFamily: bodyFont,
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      lineHeight: 1.2,
    },
    caption: {
      fontFamily: bodyFont,
      fontSize: "0.75rem",
      lineHeight: 1.5,
      letterSpacing: "0",
    },
    overline: {
      fontFamily: bodyFont,
      fontSize: "0.75rem",
      lineHeight: 1.5,
      letterSpacing: "0.05em",
      fontWeight: 600,
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
          overflowX: "clip",
        },
        body: {
          minHeight: "100vh",
          overflowX: "clip",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          fontFamily: bodyFont,
          letterSpacing: "-0.015em",
          lineHeight: 1.6,
          fontFeatureSettings: '"liga" 1, "calt" 1, "cv11" 1, "tnum" 1',
          fontVariantNumeric: "tabular-nums",
          fontOpticalSizing: "auto",
          backgroundColor: "#FCFCF9", color: "#111111",
        },
        "::selection": {
          background: "rgba(17, 17, 17, 0.15)",
        },
        ":root": {
          "--brand-gradient": "linear-gradient(135deg, #111111 0%, #333333 100%)",
          "--brand-gradient-soft": "linear-gradient(135deg, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0.02) 100%)",
          "--accent": "#FF385C",
          "--accent-hover": "#E31C5F",
          "--accent-contrast": "#FFFFFF",
          "--accent-soft": "rgba(255,56,92,0.08)",
          "--shadow-sm": "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)",
          "--shadow-md": "0 0 0 1px rgba(0,0,0,0.06), 0 4px 12px rgba(34,29,29,0.06), 0 1px 2px rgba(34,29,29,0.04)",
          "--shadow-lg": "0 0 0 1px rgba(0,0,0,0.06), 0 12px 32px rgba(34,29,29,0.08), 0 4px 12px rgba(34,29,29,0.05)",
          "--motion-duration-fast": "150ms",
          "--motion-duration-base": "200ms",
          "--motion-ease-spring": "cubic-bezier(0.16,1,0.3,1)",
          "--motion-hover-lift": "-2px",
        } as unknown as Record<string, string>,
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)",
          background: "#FFFFFF",
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "rgba(0,0,0,0.02)",
          transition: "background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
          "&.Mui-focused": {
            backgroundColor: "#FFFFFF",
            boxShadow: "0 0 0 2px var(--focus-ring, rgba(17,17,17,0.2))",
          },
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,0.1)",
            transition: "border-color 150ms ease",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,0.2)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.3)",
          },
        },
        input: {
          padding: "10px 14px",
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "#666666",
          transform: "none",
          position: "relative",
          marginBottom: 6,
          "&.Mui-focused": {
            color: "#111111",
          },
        },
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        slotProps: { inputLabel: { shrink: true } },
      },
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            marginTop: 0,
          },
        },
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 44,
          height: 24,
          padding: 0,
          display: "flex",
          "&:active": {
            "& .MuiSwitch-thumb": {
              width: 16,
            },
            "& .MuiSwitch-switchBase.Mui-checked": {
              transform: "translateX(11px)",
            },
          },
        },
        switchBase: {
          padding: 2,
          "&.Mui-checked": {
            transform: "translateX(20px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              opacity: 1,
              backgroundColor: "#111111",
            },
          },
        },
        thumb: {
          boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
          width: 20,
          height: 20,
          borderRadius: 10,
          transition: "width 150ms ease",
        },
        track: {
          borderRadius: 12,
          opacity: 1,
          backgroundColor: "rgba(0,0,0,0.1)",
          boxSizing: "border-box",
        },
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "10px 14px",
        },
      }
    },
    MuiAppBar: { defaultProps: { elevation: 0 } },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid",
          borderColor: "rgba(0,0,0,0.08)",
          background: "#FFFFFF",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)",
          transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1)",
          "&:hover": {
            transform: "translateY(-2px) scale(1.01)",
            borderColor: "rgba(0,0,0,0.12)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 12px 32px rgba(34,29,29,0.08), 0 4px 12px rgba(34,29,29,0.05)",
          },
          "&:active": { transform: "scale(0.99)", transitionDuration: "100ms" },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: { maxWidth: 1320 },
      },
    },
    MuiChip: { 
      styleOverrides: { 
        root: { 
          borderRadius: 999,
          fontWeight: 500,
        } 
      } 
    },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
    primary: { main: "#FFFFFF", light: "#F5F5F5", dark: "#EAEAEA", contrastText: "#111111" },
    secondary: { main: "#A3A3A3", light: "#D4D4D4", dark: "#737373", contrastText: "#0A0A0A" },
    background: { default: "#0A0A0A", paper: "#111111" },
    text: { primary: "#EDEDED", secondary: "#A0A0A0" },
    divider: "rgba(255,255,255,0.1)",
    grey: { 50: "#111111", 100: "#222222", 200: "#333333", 300: "#444444" } as unknown as { 50: string; 100: string; 200: string; 300: string },
  },
  shadows: [
    "none",
    "0 1px 2px rgba(0,0,0,0.4)",
    "0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
    "0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",
    "0 6px 16px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
    "0 8px 24px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)",
    "0 12px 32px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)",
    "0 16px 40px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4)",
    "0 24px 48px rgba(0,0,0,0.7), 0 12px 24px rgba(0,0,0,0.4)",
    "0 28px 56px rgba(0,0,0,0.70), 0 14px 28px rgba(0,0,0,0.45)",
    "0 32px 64px rgba(0,0,0,0.71), 0 16px 32px rgba(0,0,0,0.46)",
    "0 36px 72px rgba(0,0,0,0.72), 0 18px 36px rgba(0,0,0,0.47)",
    "0 40px 80px rgba(0,0,0,0.73), 0 20px 40px rgba(0,0,0,0.48)",
    "0 44px 88px rgba(0,0,0,0.74), 0 22px 44px rgba(0,0,0,0.49)",
    "0 48px 96px rgba(0,0,0,0.75), 0 24px 48px rgba(0,0,0,0.50)",
    "0 52px 104px rgba(0,0,0,0.76), 0 26px 52px rgba(0,0,0,0.51)",
    "0 56px 112px rgba(0,0,0,0.77), 0 28px 56px rgba(0,0,0,0.52)",
    "0 60px 120px rgba(0,0,0,0.78), 0 30px 60px rgba(0,0,0,0.53)",
    "0 64px 128px rgba(0,0,0,0.79), 0 32px 64px rgba(0,0,0,0.54)",
    "0 68px 136px rgba(0,0,0,0.80), 0 34px 68px rgba(0,0,0,0.55)",
    "0 72px 144px rgba(0,0,0,0.81), 0 36px 72px rgba(0,0,0,0.56)",
    "0 76px 152px rgba(0,0,0,0.82), 0 38px 76px rgba(0,0,0,0.57)",
    "0 80px 160px rgba(0,0,0,0.83), 0 40px 80px rgba(0,0,0,0.58)",
    "0 84px 168px rgba(0,0,0,0.84), 0 42px 84px rgba(0,0,0,0.59)",
    "0 88px 176px rgba(0,0,0,0.85), 0 44px 88px rgba(0,0,0,0.60)",
  ] as Shadows,
  components: {
    ...theme.components,
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        ...MuiButtonOverrides.styleOverrides,
        containedPrimary: {
          background: "#FFFFFF",
          backgroundImage: "var(--brand-gradient)",
          color: "#111111",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 1px 2px rgba(0,0,0,0.4)",
          border: "1px solid #FFFFFF",
          "&:hover": {
            filter: "brightness(1.15)",
            transform: "translateY(-1px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 6px 16px rgba(0,0,0,0.4)",
          },
          "&:focus-visible": {
            filter: "brightness(1.15)",
            borderColor: "#FFFFFF",
            boxShadow: "0 0 0 3px rgba(255,255,255,0.35)",
            outline: "none",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(255,255,255,0.15)",
          background: "rgba(17,17,17,0.8)",
          color: "#FFFFFF",
          backdropFilter: "blur(8px)",
          "&:hover": {
            background: "rgba(34,34,34,0.9)",
            borderColor: "rgba(255,255,255,0.25)",
          },
        },
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        ...(theme.components?.MuiCssBaseline?.styleOverrides as any),
        body: {
          ...(theme.components?.MuiCssBaseline?.styleOverrides as any)?.body,
          backgroundColor: "#0A0A0A", color: "#EDEDED",
        },
        "::selection": {
          background: "rgba(255, 255, 255, 0.15)",
        },
        ":root": {
          "--brand-gradient": "linear-gradient(135deg, #FFFFFF 0%, #A0A0A0 100%)",
          "--brand-gradient-soft": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
          "--shadow-sm": "0 1px 2px rgba(0,0,0,0.4)",
          "--shadow-md": "0 4px 12px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)",
          "--shadow-lg": "0 12px 32px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)",
        } as unknown as Record<string, string>,
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid",
          borderColor: "rgba(255,255,255,0.1)",
          background: "#111111",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.3)",
          transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1)",
          "&:hover": {
            transform: "translateY(-2px) scale(1.01)",
            borderColor: "rgba(255,255,255,0.15)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
          },
          "&:active": { transform: "scale(0.99)", transitionDuration: "100ms" },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.03)",
          "&.Mui-focused": {
            backgroundColor: "#111111",
            boxShadow: "0 0 0 2px var(--focus-ring, rgba(255,255,255,0.2))",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.05)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.1)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.15)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.25)",
          },
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#A0A0A0",
          "&.Mui-focused": {
            color: "#FFFFFF",
          },
        },
      }
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "#111111",
            "& + .MuiSwitch-track": {
              backgroundColor: "#FFFFFF",
            },
          },
        },
        track: {
          backgroundColor: "rgba(255,255,255,0.1)",
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.3)",
          background: "#111111",
        }
      }
    },
  } as unknown as typeof theme.components,
});
