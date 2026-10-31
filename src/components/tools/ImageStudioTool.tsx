
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import ImageCompressorTool from "@/components/tools/ImageCompressorTool";
import ImageResizerTool from "@/components/tools/ImageResizerTool";
import ImageCropperTool from "@/components/tools/ImageCropperTool";
import ImageBorderTool from "@/components/tools/ImageBorderTool";

const MODE_LABELS = ["Compress", "Resize", "Crop", "Border"];

export default function ImageStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
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
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <ImageCompressorTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <ImageResizerTool />
      </Box>
      <Box style={{ display: mode === 2 ? "block" : "none" }}>
        <ImageCropperTool />
      </Box>
      <Box style={{ display: mode === 3 ? "block" : "none" }}>
        <ImageBorderTool />
      </Box>
    </>
  );
}
