import { createTheme } from "@mui/material/styles";

const displayFont =
  'var(--font-display), "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const bodyFont =
  'var(--font-inter), "Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const MuiButtonOverrides = {
  defaultProps: { disableElevation: true },
  styleOverrides: {
    root: {
      borderRadius: 8,
      textTransform: "none" as const,
      fontWeight: 500,
      minHeight: 40,
      letterSpacing: "-0.01em",
      transition: "all 150ms cubic-bezier(0.16,1,0.3,1)",
      "&:active": { transform: "scale(0.97)", transitionDuration: "100ms" },
    },
    containedPrimary: {
      background: "#111111",
      color: "#FFFFFF",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      border: "1px solid #000000",
      "&:hover": {
        background: "#222222",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
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
    secondary: { main: "#5E6AD2", light: "#7B89F4", dark: "#4652B3", contrastText: "#FFFFFF" },
    background: { default: "#FAFAFA", paper: "#FFFFFF" },
    text: { primary: "#111111", secondary: "#666666" },
    divider: "rgba(0,0,0,0.08)",
    grey: { 50: "#FAFAFA", 100: "#F5F5F5", 200: "#EAEAEA", 300: "#D4D4D4" } as unknown as { 50: string; 100: string; 200: string; 300: string },
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
    // ... fill the rest with generic shadows to satisfy MUI's 25 shadow requirement
    ...Array(17).fill("0 24px 48px rgba(0,0,0,0.07), 0 12px 24px rgba(0,0,0,0.04)")
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
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.04em",
      textWrap: "balance" as unknown as string,
    },
    h2: {
      fontFamily: displayFont,
      fontWeight: 600,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: 1.1,
      letterSpacing: "-0.03em",
      textWrap: "balance" as unknown as string,
    },
    h3: {
      fontFamily: displayFont,
      fontWeight: 600,
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      textWrap: "balance" as unknown as string,
    },
    h4: {
      fontFamily: displayFont,
      fontWeight: 600,
      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.015em",
      textWrap: "balance" as unknown as string,
    },
    h5: {
      fontFamily: displayFont,
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontFamily: displayFont,
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    body1: {
      fontFamily: bodyFont,
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "-0.01em",
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
        },
        body: {
          minHeight: "100vh",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          fontFamily: bodyFont,
          letterSpacing: "-0.01em",
          lineHeight: 1.6,
          fontFeatureSettings: '"liga" 1, "calt" 1, "cv11" 1',
          fontOpticalSizing: "auto",
          backgroundColor: "#FAFAFA", color: "#111111",
        },
        "::selection": {
          background: "rgba(17, 17, 17, 0.15)",
        },
        ":root": {
          "--brand-gradient": "linear-gradient(135deg, #111111 0%, #333333 100%)",
          "--brand-gradient-soft": "linear-gradient(135deg, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0.02) 100%)",
          "--shadow-sm": "0 1px 2px rgba(0,0,0,0.04)",
          "--shadow-md": "0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
          "--shadow-lg": "0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
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
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          background: "#FFFFFF",
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "rgba(0,0,0,0.02)",
          transition: "all 150ms cubic-bezier(0.16,1,0.3,1)",
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
          transition: "width 200ms cubic-bezier(0.16,1,0.3,1)",
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
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          transition: "all 200ms cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: "rgba(0,0,0,0.12)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
          },
          "&:active": { transform: "scale(0.99)", transitionDuration: "100ms" },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: { maxWidth: 1200 },
      },
    },
    MuiChip: { 
      styleOverrides: { 
        root: { 
          borderRadius: 6,
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
    secondary: { main: "#7B89F4", light: "#9CA6F7", dark: "#5E6AD2", contrastText: "#FFFFFF" },
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
    ...Array(17).fill("0 24px 48px rgba(0,0,0,0.7), 0 12px 24px rgba(0,0,0,0.4)")
  ] as unknown as any,
  components: {
    ...theme.components,
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        ...MuiButtonOverrides.styleOverrides,
        containedPrimary: {
          background: "#FFFFFF",
          color: "#111111",
          boxShadow: "0 1px 2px rgba(255,255,255,0.1)",
          border: "1px solid #FFFFFF",
          "&:hover": {
            background: "#EAEAEA",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(255,255,255,0.15)",
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
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          transition: "all 200ms cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: "rgba(255,255,255,0.15)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
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
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          background: "#111111",
        }
      }
    },
  } as unknown as typeof theme.components,
});
