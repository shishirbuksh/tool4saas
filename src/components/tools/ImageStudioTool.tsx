"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ImageCompressorTool from "@/components/tools/ImageCompressorTool";
import ImageResizerTool from "@/components/tools/ImageResizerTool";
import ImageCropperTool from "@/components/tools/ImageCropperTool";
import ImageBorderTool from "@/components/tools/ImageBorderTool";

const MODE_LABELS = ["Compress", "Resize", "Crop", "Border"];

export default function ImageStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Image editor modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <ImageCompressorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <ImageResizerTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <ImageCropperTool />
      </Box>
      <Box sx={{ display: mode === 3 ? "block" : "none" }}>
        <ImageBorderTool />
      </Box>
    </>
  );
}
