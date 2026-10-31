
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack } from "@/components/ds";


const hexToHsl = (hex: string) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return null;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }
  const s = d === 0 ? 0 : l < 0.5 ? d / (max + min) : d / (2 - max - min);
  return { h: hue, s: s * 100, l: l * 100 };
};

const hslToHex = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const to = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
};

const toRgb = (hex: string) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return h.length === 6 ? `#${h}` : "#000000";
};

export default function ColorPaletteTool() {
  const [base, setBase] = useState("#6366f1");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const hsl = hexToHsl(toRgb(base));
  const swatches: { label: string; hex: string }[] = [];
  if (hsl) {
    const { h, s, l } = hsl;
    swatches.push({ label: "Base", hex: hslToHex(h, s, l) });
    swatches.push({ label: "Complementary", hex: hslToHex((h + 180) % 360, s, l) });
    swatches.push({ label: "Analogous −30", hex: hslToHex((h + 330) % 360, s, l) });
    swatches.push({ label: "Analogous +30", hex: hslToHex((h + 30) % 360, s, l) });
    swatches.push({ label: "Triadic −120", hex: hslToHex((h + 240) % 360, s, l) });
    swatches.push({ label: "Triadic +120", hex: hslToHex((h + 120) % 360, s, l) });
    [-20, -10, 10, 20].forEach((d) => swatches.push({ label: `Shade ${d > 0 ? "+" : ""}${d}`, hex: hslToHex(h, s, Math.min(90, Math.max(10, l + d))) }));
  }

  return (
    <ToolPaper>
        <Stack direction="row" spacing={1.5} className="items-center">
          <Box
            component="input"
            type="color"
            value={toRgb(base)}
            onChange={(e) => setBase(e.target.value)}
            aria-label="Base color picker"
            className="w-[48px] h-[44px] min-w-[44px] min-h-[44px] border border-base-300 rounded-[16px] p-1 cursor-pointer bg-transparent"
          />
          <TextField
            value={base}
            onChange={(e) => setBase(e.target.value)}
            size="small"
            label="Base color"
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            className="w-[180px]"
          />
        </Stack>
        <Box
          className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] gap-3"
        >
          {swatches.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => copy(s.hex)}
              style={{
                border: "1px solid var(--mui-palette-divider)",
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
                background: "transparent",
                width: "100%",
                font: "inherit",
                color: "inherit",
              }}
            >
              <Box className="h-[64px]" style={{ background: s.hex }} />
              <Box className="p-2">
                <Typography variant="caption" color="text.secondary" className="block">
                  {s.label}
                </Typography>
                <Typography variant="body2" className="font-bold" style={{ fontFamily: "monospace" }}>
                  {s.hex}
                </Typography>
              </Box>
            </button>
          ))}
        </Box>
      </ToolPaper>
  );
}
