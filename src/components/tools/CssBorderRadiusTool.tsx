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

export default function CssBorderRadiusTool() {
  const [topLeft, setTopLeft] = useState(16);
  const [topRight, setTopRight] = useState(16);
  const [bottomRight, setBottomRight] = useState(16);
  const [bottomLeft, setBottomLeft] = useState(16);
  const [elliptical, setElliptical] = useState(false);
  const [vTopLeft, setVTopLeft] = useState(16);
  const [vTopRight, setVTopRight] = useState(16);
  const [vBottomRight, setVBottomRight] = useState(16);
  const [vBottomLeft, setVBottomLeft] = useState(16);
  const copy = (v: string) => v && void import("@/lib/clipboard").then((m) => m.copyToClipboard(v));

  const horizontal = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
  const vertical = `${vTopLeft}px ${vTopRight}px ${vBottomRight}px ${vBottomLeft}px`;
  const borderRadius = elliptical ? `${horizontal} / ${vertical}` : horizontal;
  const css = `border-radius: ${borderRadius};`;

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
      <ToggleButtonGroup
        size="small"
        value={elliptical ? "elliptical" : "standard"}
        exclusive
        onChange={(_, v) => v && setElliptical(v === "elliptical")}
        aria-label="Border radius mode"
      >
        <ToggleButton value="standard">Standard</ToggleButton>
        <ToggleButton value="elliptical">Elliptical</ToggleButton>
      </ToggleButtonGroup>
      {sliderRow("Top left", topLeft, 0, 100, setTopLeft)}
      {sliderRow("Top right", topRight, 0, 100, setTopRight)}
      {sliderRow("Bottom right", bottomRight, 0, 100, setBottomRight)}
      {sliderRow("Bottom left", bottomLeft, 0, 100, setBottomLeft)}
      {elliptical && (
        <Box sx={{ display: "grid", gap: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Vertical radii
          </Typography>
          {sliderRow("Top left (vertical)", vTopLeft, 0, 100, setVTopLeft)}
          {sliderRow("Top right (vertical)", vTopRight, 0, 100, setVTopRight)}
          {sliderRow("Bottom right (vertical)", vBottomRight, 0, 100, setVBottomRight)}
          {sliderRow("Bottom left (vertical)", vBottomLeft, 0, 100, setVBottomLeft)}
        </Box>
      )}
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
            width: 160,
            height: 100,
            bgcolor: "primary.main",
            borderRadius,
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
          slotProps={{ input: { readOnly: true, "aria-label": "CSS border-radius", spellCheck: false } }}
          sx={{ "& input": { fontFamily: "monospace", fontSize: 13 } }}
        />
      </Box>
    </ToolPaper>
  );
}
