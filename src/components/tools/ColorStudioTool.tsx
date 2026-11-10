
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

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
      <div className="border-b border-base-300 mb-6">
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
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <ColorConverterTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <CmykConverterTool />
      </div>
      <div style={{ display: mode === 2 ? "block" : "none" }}>
        <ColorPaletteTool />
      </div>
      <div style={{ display: mode === 3 ? "block" : "none" }}>
        <ColorShadesTool />
      </div>
      <div style={{ display: mode === 4 ? "block" : "none" }}>
        <RandomHexColorTool />
      </div>
    </>
  );
}
