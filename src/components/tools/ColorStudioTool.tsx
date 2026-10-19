"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ColorConverterTool from "@/components/tools/ColorConverterTool";
import CmykConverterTool from "@/components/tools/CmykConverterTool";
import ColorPaletteTool from "@/components/tools/ColorPaletteTool";
import ColorShadesTool from "@/components/tools/ColorShadesTool";
import RandomHexColorTool from "@/components/tools/RandomHexColorTool";

const MODE_LABELS = ["Convert", "CMYK", "Palette", "Shades", "Random"];

export default function ColorStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Color studio modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <ColorConverterTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <CmykConverterTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <ColorPaletteTool />
      </Box>
      <Box sx={{ display: mode === 3 ? "block" : "none" }}>
        <ColorShadesTool />
      </Box>
      <Box sx={{ display: mode === 4 ? "block" : "none" }}>
        <RandomHexColorTool />
      </Box>
    </>
  );
}
