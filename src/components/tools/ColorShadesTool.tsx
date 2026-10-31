
import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, Typography, Stack, TextField, Slider } from "@/components/ds";

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
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="sm:items-center">
        <Stack direction="row" spacing={1.5} className="items-center">
          <Box
            component="input"
            type="color"
            value={normalizedHex}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHex(e.target.value)}
            aria-label="Base color picker"
            className="w-[48px] h-[44px] min-w-[44px] min-h-[44px] border border-base-300 rounded-[16px] p-1 cursor-pointer bg-transparent"
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
            className="w-[180px] [&_input]:[font-family:monospace] [&_input]:lowercase"
          />
        </Stack>
        <Box className="flex-1 min-w-[180px] max-w-[320px]">
          <Typography variant="subtitle2" className="font-bold mb-1">
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
            onChange={(_, v) => setSteps(Array.isArray(v) ? v[0] : v)}
            aria-label="Steps"
          />
        </Box>
      </Stack>

      <Box
        className="h-[72px] rounded-[16px] border border-base-300 flex items-center justify-center" style={{ backgroundColor: isValid ? normalizedHex : "#ffffff" }}
      >
        <Typography
          variant="body2"
          className="font-bold px-3 py-1 rounded-[8px] bg-[rgba(0,0,0,0.55)] text-[#fff]" style={{ fontFamily: "monospace" }}
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
            <Typography variant="subtitle2" className="font-bold mb-2">
              Shades — mix with black
            </Typography>
            <Box
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3"
            >
              {shades.map((c) => (
                <Box
                  key={`shade-${c}`}
                  component="button"
                  type="button"
                  onClick={() => copy(c)}
                  className="border border-base-300 rounded-[16px] overflow-hidden cursor-pointer p-0 text-left bg-base-100 w-full text-inherit hover:border-base-content/70 active:[transform:scale(0.98)]" style={{ font: "inherit" }}
                >
                  <Box className="h-[56px]" style={{ backgroundColor: c }} />
                  <Box className="p-2 text-center">
                    <Typography variant="caption" className="font-bold block" style={{ fontFamily: "monospace" }}>
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
            <Typography variant="subtitle2" className="font-bold mb-2">
              Tints — mix with white
            </Typography>
            <Box
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3"
            >
              {tints.map((c) => (
                <Box
                  key={`tint-${c}`}
                  component="button"
                  type="button"
                  onClick={() => copy(c)}
                  className="border border-base-300 rounded-[16px] overflow-hidden cursor-pointer p-0 text-left bg-base-100 w-full text-inherit hover:border-base-content/70 active:[transform:scale(0.98)]" style={{ font: "inherit" }}
                >
                  <Box className="h-[56px]" style={{ backgroundColor: c }} />
                  <Box className="p-2 text-center">
                    <Typography variant="caption" className="font-bold block" style={{ fontFamily: "monospace" }}>
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
