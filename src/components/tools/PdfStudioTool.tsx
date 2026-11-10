
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

import PdfMergeTool from "@/components/tools/PdfMergeTool";
import PdfSplitTool from "@/components/tools/PdfSplitTool";
import PdfRotateTool from "@/components/tools/PdfRotateTool";
import PdfWatermarkTool from "@/components/tools/PdfWatermarkTool";

const MODE_LABELS = ["Merge", "Split", "Rotate", "Watermark"];

export default function PdfStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <div className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="PDF organizer modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <PdfMergeTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <PdfSplitTool />
      </div>
      <div style={{ display: mode === 2 ? "block" : "none" }}>
        <PdfRotateTool />
      </div>
      <div style={{ display: mode === 3 ? "block" : "none" }}>
        <PdfWatermarkTool />
      </div>
    </>
  );
}
