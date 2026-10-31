
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, Slider, ToggleButton, ToggleButtonGroup } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

type Shape = "circle" | "ellipse" | "triangle" | "hexagon" | "star";

type Point = [number, number];

const POLYGON_BASES: Record<Extract<Shape, "triangle" | "hexagon" | "star">, Point[]> = {
  triangle: [
    [50, 0],
    [0, 100],
    [100, 100],
  ],
  hexagon: [
    [25, 0],
    [75, 0],
    [100, 50],
    [75, 100],
    [25, 100],
    [0, 50],
  ],
  star: [
    [50, 0],
    [61, 35],
    [98, 35],
    [68, 57],
    [79, 91],
    [50, 70],
    [21, 91],
    [32, 57],
    [2, 35],
    [39, 35],
  ],
};

const fmt = (n: number) => `${Number(n.toFixed(1))}%`;

export default function CssClipPathTool() {
  const [shape, setShape] = useState<Shape>("circle");
  const [circleRadius, setCircleRadius] = useState(40);
  const [circleX, setCircleX] = useState(50);
  const [circleY, setCircleY] = useState(50);
  const [ellipseRx, setEllipseRx] = useState(40);
  const [ellipseRy, setEllipseRy] = useState(30);
  const [ellipseX, setEllipseX] = useState(50);
  const [ellipseY, setEllipseY] = useState(50);
  const [polySize, setPolySize] = useState(90);
  const copy = (v: string) => v && void import("@/lib/clipboard").then((m) => m.copyToClipboard(v));

  let clipPath = "";
  if (shape === "circle") {
    clipPath = `circle(${circleRadius}% at ${circleX}% ${circleY}%)`;
  } else if (shape === "ellipse") {
    clipPath = `ellipse(${ellipseRx}% ${ellipseRy}% at ${ellipseX}% ${ellipseY}%)`;
  } else {
    const scale = polySize / 100;
    const points = POLYGON_BASES[shape].map(([x, y]): Point => [50 + (x - 50) * scale, 50 + (y - 50) * scale]);
    clipPath = `polygon(${points.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join(", ")})`;
  }
  const css = `clip-path: ${clipPath};`;

  const sliderRow = (
    label: string,
    value: number,
    min: number,
    max: number,
    set: (v: number) => void,
    unit = "%",
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
      <ToggleButtonGroup
        size="small"
        value={shape}
        exclusive
        onChange={(_, v) => v && setShape(v as Shape)}
        aria-label="Clip-path shape"
        className="flex-wrap"
      >
        <ToggleButton value="circle">Circle</ToggleButton>
        <ToggleButton value="ellipse">Ellipse</ToggleButton>
        <ToggleButton value="triangle">Triangle</ToggleButton>
        <ToggleButton value="hexagon">Hexagon</ToggleButton>
        <ToggleButton value="star">Star</ToggleButton>
      </ToggleButtonGroup>
      {shape === "circle" && (
        <>
          {sliderRow("Radius", circleRadius, 0, 75, setCircleRadius)}
          {sliderRow("Center X", circleX, 0, 100, setCircleX)}
          {sliderRow("Center Y", circleY, 0, 100, setCircleY)}
        </>
      )}
      {shape === "ellipse" && (
        <>
          {sliderRow("Radius X", ellipseRx, 0, 75, setEllipseRx)}
          {sliderRow("Radius Y", ellipseRy, 0, 75, setEllipseRy)}
          {sliderRow("Center X", ellipseX, 0, 100, setEllipseX)}
          {sliderRow("Center Y", ellipseY, 0, 100, setEllipseY)}
        </>
      )}
      {(shape === "triangle" || shape === "hexagon" || shape === "star") &&
        sliderRow("Size", polySize, 10, 100, setPolySize)}
      <Box
        className="h-[160px] rounded-[16px] border border-base-300 flex items-center justify-center bg-base-100"
      >
        <Box
          className="w-[160px] h-[100px] bg-primary" style={{ clipPath: clipPath }}
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
          slotProps={{ input: { readOnly: true, "aria-label": "CSS clip-path", spellCheck: false } }}
          className="[&_input]:[font-family:monospace] [&_input]:text-[13px]"
        />
      </Box>
    </ToolPaper>
  );
}
