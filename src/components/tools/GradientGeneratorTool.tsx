
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, Slider, ToggleButton, ToggleButtonGroup } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

const toRgb = (hex: string) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return h.length === 6 ? `#${h}` : "#000000";
};

export default function GradientGeneratorTool() {
  const [c1, setC1] = useState("#6366f1");
  const [c2, setC2] = useState("#ec4899");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const css =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${toRgb(c1)}, ${toRgb(c2)})`
      : `radial-gradient(circle, ${toRgb(c1)}, ${toRgb(c2)})`;

  const picker = (c: string, set: (v: string) => void, label: string) => (
    <Stack direction="row" spacing={1.5} className="items-center">
      <Box
        component="input"
        type="color"
        value={toRgb(c)}
        onChange={(e) => set(e.target.value)}
        aria-label={label}
        className="w-[48px] h-[44px] min-w-[44px] min-h-[44px] border border-base-300 rounded-[16px] p-1 cursor-pointer bg-transparent"
      />
      <TextField
        value={c}
        onChange={(e) => set(e.target.value)}
        size="small"
        label={`${label} hex value`}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        className="w-[140px]"
      />
    </Stack>
  );

  return (
    <ToolPaper>
        {picker(c1, setC1, "First gradient color")}
        {picker(c2, setC2, "Second gradient color")}
        <ToggleButtonGroup size="small" value={type} exclusive onChange={(_, v) => v && setType(v)}>
          <ToggleButton value="linear">Linear</ToggleButton>
          <ToggleButton value="radial">Radial</ToggleButton>
        </ToggleButtonGroup>
        {type === "linear" && (
          <Box className="max-w-[320px]">
            <Typography variant="subtitle2" className="font-bold mb-1">
              Angle: {angle}°
            </Typography>
            <Slider value={angle} min={0} max={360} step={1} onChange={(_, v) => setAngle(Array.isArray(v) ? v[0] : v)} aria-label="Gradient angle in degrees" />
          </Box>
        )}
        <Box
          className="h-[160px] rounded-[16px] border border-base-300" style={{ background: css }}
        />
        <Box>
          <Stack direction="row" className="items-center justify-between mb-1">
            <Typography variant="subtitle2" className="font-bold">
              CSS
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(css)}>
              Copy
            </Button>
          </Stack>
          <TextField
            value={css}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "CSS gradient", spellCheck: false } }}
            className="[&_input]:[font-family:monospace] [&_input]:text-[13px]"
          />
        </Box>
      </ToolPaper>
  );
}
