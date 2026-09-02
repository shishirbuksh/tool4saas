"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import { copyToClipboard } from "@/lib/clipboard";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

export default function ColorShadesTool() {
  const [hex, setHex] = useState("#6366f1");
  const [steps, setSteps] = useState(10);

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const normalizedHex = useMemo(() => (rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : "#000000"), [rgb]);

  const { shades, tints } = useMemo(() => {
    if (!rgb) return { shades: [] as string[], tints: [] as string[] };
    const s: string[] = [];
    const t: string[] = [];
    for (let i = 1; i <= steps; i++) {
      const factor = i / (steps + 1);
      // shades: lerp towards black (0,0,0)
      s.push(rgbToHex(lerp(rgb.r, 0, factor), lerp(rgb.g, 0, factor), lerp(rgb.b, 0, factor)));
      // tints: lerp towards white (255,255,255)
      t.push(rgbToHex(lerp(rgb.r, 255, factor), lerp(rgb.g, 255, factor), lerp(rgb.b, 255, factor)));
    }
    return { shades: s, tints: t };
  }, [rgb, steps]);

  const copy = (v: string) => {
    void copyToClipboard(v);
  };

  const isValid = !!rgb;

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { sm: "center" } }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            component="input"
            type="color"
            value={normalizedHex}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHex(e.target.value)}
            sx={{
              width: 48,
              height: 40,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 0.5,
              cursor: "pointer",
              bgcolor: "transparent",
            }}
          />
          <TextField
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            size="small"
            label="Hex color"
            placeholder="#6366f1"
            error={!isValid}
            helperText={!isValid ? "Enter a valid hex (e.g. #6366f1)" : ""}
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            sx={{ width: 180, "& input": { fontFamily: "monospace", textTransform: "lowercase" } }}
          />
        </Stack>
        <Box sx={{ flex: 1, minWidth: 180, maxWidth: 320 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Steps: {steps}
          </Typography>
          <Slider
            value={steps}
            min={5}
            max={20}
            step={1}
            marks={[
              { value: 5, label: "5" },
              { value: 20, label: "20" },
            ]}
            valueLabelDisplay="auto"
            onChange={(_, v) => setSteps(v as number)}
            aria-label="Steps"
          />
        </Box>
      </Stack>

      <Box
        sx={{
          height: 72,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: isValid ? normalizedHex : "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: "rgba(0,0,0,0.55)",
            color: "#fff",
          }}
        >
          {isValid ? normalizedHex : "Invalid color"}
        </Typography>
      </Box>

      {!isValid ? (
        <Typography variant="body2" color="text.secondary">
          Enter a valid hex color to generate shades and tints.
        </Typography>
      ) : (
        <>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Shades — mix with black
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(4, 1fr)",
                  md: "repeat(5, 1fr)",
                },
                gap: 1.5,
              }}
            >
              {shades.map((c) => (
                <Box
                  key={`shade-${c}`}
                  component="button"
                  type="button"
                  onClick={() => copy(c)}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    p: 0,
                    textAlign: "left",
                    bgcolor: "background.paper",
                    width: "100%",
                    font: "inherit",
                    color: "inherit",
                    "&:hover": { borderColor: "text.secondary" },
                    "&:active": { transform: "scale(0.98)" },
                  }}
                >
                  <Box sx={{ height: 56, bgcolor: c }} />
                  <Box sx={{ p: 1, textAlign: "center" }}>
                    <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: 700, display: "block" }}>
                      {c}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      click to copy
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Tints — mix with white
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(4, 1fr)",
                  md: "repeat(5, 1fr)",
                },
                gap: 1.5,
              }}
            >
              {tints.map((c) => (
                <Box
                  key={`tint-${c}`}
                  component="button"
                  type="button"
                  onClick={() => copy(c)}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    p: 0,
                    textAlign: "left",
                    bgcolor: "background.paper",
                    width: "100%",
                    font: "inherit",
                    color: "inherit",
                    "&:hover": { borderColor: "text.secondary" },
                    "&:active": { transform: "scale(0.98)" },
                  }}
                >
                  <Box sx={{ height: 56, bgcolor: c }} />
                  <Box sx={{ p: 1, textAlign: "center" }}>
                    <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: 700, display: "block" }}>
                      {c}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      click to copy
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
    </ToolPaper>
  );
}
