
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import ImageFormatConverterTool from "@/components/tools/ImageFormatConverterTool";
import SvgToPngConverterTool from "@/components/tools/SvgToPngConverterTool";

const MODE_LABELS = ["Image Formats", "SVG to PNG"];

export default function ImageFormatStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
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
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <ImageFormatConverterTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <SvgToPngConverterTool />
      </Box>
    </>
  );
}
