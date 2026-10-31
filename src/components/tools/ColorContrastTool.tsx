
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, Chip } from "@/components/ds";


const toRgb = (hex: string) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

const luminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

const ratio = (c1: string, c2: string) => {
  const a = toRgb(c1);
  const b = toRgb(c2);
  if (!a || !b) return null;
  const l1 = luminance(a.r, a.g, a.b);
  const l2 = luminance(b.r, b.g, b.b);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
};

export default function ColorContrastTool() {
  const [fg, setFg] = useState("#0f172a");
  const [bg, setBg] = useState("#e2e8f0");

  const r = ratio(fg, bg);
  const pass = (min: number) => (r !== null ? r >= min : false);

  const preview = (c: string, set: (v: string) => void, label: string) => (
      <Stack direction="row" spacing={1.5} className="items-center">
      <Box
        component="input"
        type="color"
        value={toRgb(c) ? c : "#000000"}
        onChange={(e) => set(e.target.value)}
        aria-label={label}
        className="w-[48px] h-[44px] min-w-[44px] min-h-[44px] border border-base-300 rounded-[16px] p-1 cursor-pointer bg-transparent"
      />
      <TextField
        value={c}
        onChange={(e) => set(e.target.value)}
        size="small"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        className="w-[140px]"
      />
    </Stack>
  );

  return (
    <ToolPaper>
        {preview(fg, setFg, "Foreground color picker")}
        {preview(bg, setBg, "Background color picker")}
        <Box
          className="p-8 rounded-[16px] border border-base-300" style={{ background: toRgb(bg) ? bg : "#fff", color: toRgb(fg) ? fg : "#000" }}
        >
          <Typography variant="h5" className="font-extrabold">
            Preview text
          </Typography>
          <Typography variant="body1">The quick brown fox jumps over the lazy dog.</Typography>
        </Box>
        <Box
          className="p-4 rounded-[16px] border border-base-300 text-center"
        >
          <Typography variant="overline" color="text.secondary">
            Contrast ratio
          </Typography>
          <Typography variant="h4" className="font-extrabold">
            {r !== null ? `${r.toFixed(2)}:1` : "—"}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} className="flex-wrap">
          <Chip label={`AA normal (4.5:1) ${pass(4.5) ? "✓" : "✗"}`} color={pass(4.5) ? "success" : "error"} variant="outlined" />
          <Chip label={`AA large (3:1) ${pass(3) ? "✓" : "✗"}`} color={pass(3) ? "success" : "error"} variant="outlined" />
          <Chip label={`AAA normal (7:1) ${pass(7) ? "✓" : "✗"}`} color={pass(7) ? "success" : "error"} variant="outlined" />
        </Stack>
      </ToolPaper>
  );
}
