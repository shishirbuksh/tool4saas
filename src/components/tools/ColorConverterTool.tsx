
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, Button } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

function hexToRgb(hex: string) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverterTool() {
  const [hex, setHex] = useState("#2563eb");

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb) : null), [rgb]);

  const copy = (text: string) => void import("@/lib/clipboard").then(m=>m.copyToClipboard(text));

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-center">
          <Box
            component="input"
            type="color"
            value={rgb ? rgbToHex(rgb) : "#000000"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHex(e.target.value)}
            aria-label="Pick a color"
            className="w-[72px] h-[56px] min-h-[44px] min-w-[44px] border-0 rounded-[16px] bg-transparent cursor-pointer p-0"
          />
          <TextField
            label="HEX"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            fullWidth
            placeholder="#2563EB…"
            slotProps={{ input: { inputMode: "text", spellCheck: false, autoComplete: "off" } }}
            error={!rgb}
            helperText={rgb ? "" : "Enter a valid #RRGGBB hex color"}
            className="[&_input]:[font-family:monospace] [&_input]:uppercase"
          />
        </Stack>

        <Box className="p-4 border border-base-300 rounded-[16px] min-h-[120px]" style={{ backgroundColor: rgb ? `rgb(${rgb.r},${rgb.g},${rgb.b})` : "#fff" }} />

        {rgb && hsl && (
          <Stack spacing={1}>
            <Row label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} onCopy={() => copy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} />
            <Row label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} onCopy={() => copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} />
            <Row label="HEX" value={rgbToHex(rgb).toUpperCase()} onCopy={() => copy(rgbToHex(rgb).toUpperCase())} />
          </Stack>
        )}
      </ToolPaper>
  );
}

function Row({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <Box className="flex items-center justify-between gap-2">
      <Typography  variant="subtitle2"  className="font-bold w-[56px]">{label}</Typography>
      <TextField value={value} slotProps={{ input: { readOnly: true, "aria-label": label, spellCheck: false, autoComplete: "off" } }} fullWidth className="[&_input]:[font-family:monospace]" />
      <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={onCopy}>Copy</Button>
    </Box>
  );
}
