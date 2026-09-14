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

const toHex = (hex: string) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return h.length === 6 ? `#${h}` : "#000000";
};

export default function CssBoxShadowTool() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(8);
  const [blur, setBlur] = useState(24);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [inset, setInset] = useState(false);
  const copy = (v: string) => v && void import("@/lib/clipboard").then((m) => m.copyToClipboard(v));

  const boxShadow = `${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${toHex(color)}`;
  const css = `box-shadow: ${boxShadow};`;

  const sliderRow = (
    label: string,
    value: number,
    min: number,
    max: number,
    set: (v: number) => void,
    unit = "px",
  ) => (
    <Box sx={{ maxWidth: 320 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
        {label}: {value}
        {unit}
      </Typography>
      <Slider
        value={value}
        min={min}
        max={max}
        step={1}
        onChange={(_, v) => set(Array.isArray(v) ? v[0] : v)}
        aria-label={label}
      />
    </Box>
  );

  return (
    <ToolPaper>
      {sliderRow("Offset X", offsetX, -50, 50, setOffsetX)}
      {sliderRow("Offset Y", offsetY, -50, 50, setOffsetY)}
      {sliderRow("Blur", blur, 0, 100, setBlur)}
      {sliderRow("Spread", spread, -20, 20, setSpread)}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Box
          component="input"
          type="color"
          value={toHex(color)}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Shadow color picker"
          sx={{ width: 48, height: 44, minWidth: 44, minHeight: 44, border: "1px solid", borderColor: "divider", borderRadius: 2, p: 0.5, cursor: "pointer", bgcolor: "transparent" }}
        />
        <TextField
          value={color}
          onChange={(e) => setColor(e.target.value)}
          size="small"
          label="Shadow color"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          sx={{ width: 140 }}
        />
        <ToggleButtonGroup
          size="small"
          value={inset ? "inset" : "outset"}
          exclusive
          onChange={(_, v) => v && setInset(v === "inset")}
          aria-label="Shadow position"
        >
          <ToggleButton value="outset">Outset</ToggleButton>
          <ToggleButton value="inset">Inset</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Box
        sx={{
          height: 160,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 80,
            borderRadius: 2,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow,
          }}
        />
      </Box>
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
          slotProps={{ input: { readOnly: true, "aria-label": "CSS box-shadow", spellCheck: false } }}
          sx={{ "& input": { fontFamily: "monospace", fontSize: 13 } }}
        />
      </Box>
    </ToolPaper>
  );
}
