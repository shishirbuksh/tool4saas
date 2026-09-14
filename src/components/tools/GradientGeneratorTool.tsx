"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <Box
        component="input"
        type="color"
        value={toRgb(c)}
        onChange={(e) => set(e.target.value)}
        aria-label={label}
        sx={{ width: 48, height: 44, minWidth: 44, minHeight: 44, border: "1px solid", borderColor: "divider", borderRadius: 2, p: 0.5, cursor: "pointer", bgcolor: "transparent" }}
      />
      <TextField
        value={c}
        onChange={(e) => set(e.target.value)}
        size="small"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ width: 140 }}
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
          <Box sx={{ maxWidth: 320 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              Angle: {angle}°
            </Typography>
            <Slider value={angle} min={0} max={360} step={1} onChange={(_, v) => setAngle(Array.isArray(v) ? v[0] : v)} />
          </Box>
        )}
        <Box
          sx={{
            height: 160,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            background: css,
          }}
        />
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
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
            sx={{ "& input": { fontFamily: "monospace", fontSize: 13 } }}
          />
        </Box>
      </ToolPaper>
  );
}
