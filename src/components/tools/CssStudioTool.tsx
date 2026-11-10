
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

import GradientGeneratorTool from "@/components/tools/GradientGeneratorTool";
import CssBoxShadowTool from "@/components/tools/CssBoxShadowTool";
import CssBorderRadiusTool from "@/components/tools/CssBorderRadiusTool";
import CssClipPathTool from "@/components/tools/CssClipPathTool";

const MODE_LABELS = ["Gradient", "Shadow", "Radius", "Clip path"];

export default function CssStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <div className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="CSS effects studio modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <GradientGeneratorTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <CssBoxShadowTool />
      </div>
      <div style={{ display: mode === 2 ? "block" : "none" }}>
        <CssBorderRadiusTool />
      </div>
      <div style={{ display: mode === 3 ? "block" : "none" }}>
        <CssClipPathTool />
      </div>
    </>
  );
}
