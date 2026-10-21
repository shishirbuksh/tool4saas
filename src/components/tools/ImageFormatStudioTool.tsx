"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ImageFormatConverterTool from "@/components/tools/ImageFormatConverterTool";
import SvgToPngConverterTool from "@/components/tools/SvgToPngConverterTool";

const MODE_LABELS = ["Image Formats", "SVG to PNG"];

export default function ImageFormatStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Image format and SVG to PNG converter modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <ImageFormatConverterTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <SvgToPngConverterTool />
      </Box>
    </>
  );
}
