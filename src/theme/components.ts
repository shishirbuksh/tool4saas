import type { Components } from "@mui/material/styles";
import { bodyFont } from "./tokens";

// Shared button overrides (used by light components directly and spread
// into the dark button overrides — same as the original single-file theme).
export const MuiButtonOverrides = {
  defaultProps: { disableElevation: true },
  styleOverrides: {
    root: {
      borderRadius: 12,
      textTransform: "none" as const,
      fontWeight: 500,
      minHeight: 44,
      letterSpacing: "-0.01em",
      transition: "transform 150ms ease",
      "&:active": { transform: "scale(0.98)", transitionDuration: "100ms" },
    },
    containedPrimary: {
      background: "#111111",
      backgroundImage: "var(--brand-gradient)",
      color: "#FFFFFF",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.1)",
      border: "1px solid #000000",
      "&:hover": {
        transform: "translateY(-1px)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.12)",
      },
      "&:focus-visible": {
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

export const lightComponents: Components = {
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
        fontFeatureSettings: '"liga" 1, "calt" 1, "cv11" 1',
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
          transition: "transform 200ms cubic-bezier(0.16,1,0.3,1)",
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: "rgba(0,0,0,0.12)",
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
};

// Dark overrides spread over the light components (same order as the
// original: ...light, MuiButton, MuiCssBaseline, MuiCard, inputs, ...).
export function buildDarkComponents(light: Components): Components {
  const lightBaseline = light.MuiCssBaseline?.styleOverrides as any;
  return {
    ...light,
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
        ...lightBaseline,
        body: {
          ...lightBaseline?.body,
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
  } as unknown as Components;
}
