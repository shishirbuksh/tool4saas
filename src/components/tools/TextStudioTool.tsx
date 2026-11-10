
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

import TextCleanerTool from "@/components/tools/TextCleanerTool";
import CaseConverterTool from "@/components/tools/CaseConverterTool";
import TextReverserTool from "@/components/tools/TextReverserTool";
import ListTools from "@/components/tools/ListTools";
import TextFindReplaceTool from "@/components/tools/TextFindReplaceTool";

const MODE_LABELS = ["Clean Text", "Case", "Reverse", "List Tools", "Find & Replace"];

export default function TextStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <div className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Text tool modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <TextCleanerTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <CaseConverterTool />
      </div>
      <div style={{ display: mode === 2 ? "block" : "none" }}>
        <TextReverserTool />
      </div>
      <div style={{ display: mode === 3 ? "block" : "none" }}>
        <ListTools />
      </div>
      <div style={{ display: mode === 4 ? "block" : "none" }}>
        <TextFindReplaceTool />
      </div>
    </>
  );
}
