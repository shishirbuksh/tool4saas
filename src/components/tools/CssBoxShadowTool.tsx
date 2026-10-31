
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, Slider, ToggleButton, ToggleButtonGroup } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

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
    <Box className="max-w-[320px]">
      <Typography variant="subtitle2" className="font-bold mb-1">
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
      <Stack direction="row" spacing={1.5} className="items-center">
        <Box
          component="input"
          type="color"
          value={toHex(color)}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Shadow color picker"
          className="w-[48px] h-[44px] min-w-[44px] min-h-[44px] border border-base-300 rounded-[16px] p-1 cursor-pointer bg-transparent"
        />
        <TextField
          value={color}
          onChange={(e) => setColor(e.target.value)}
          size="small"
          label="Shadow color"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          className="w-[140px]"
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
        className="h-[160px] rounded-[16px] border border-base-300 flex items-center justify-center bg-base-100"
      >
        <Box
          className="w-[120px] h-[80px] rounded-[16px] bg-base-100 border border-base-300" style={{ boxShadow: boxShadow }}
        />
      </Box>
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
          slotProps={{ input: { readOnly: true, "aria-label": "CSS box-shadow", spellCheck: false } }}
          className="[&_input]:[font-family:monospace] [&_input]:text-[13px]"
        />
      </Box>
    </ToolPaper>
  );
}
