
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

import WordCounterTool from "@/components/tools/WordCounterTool";
import KeywordDensityTool from "@/components/tools/KeywordDensityTool";
import ReadabilityCheckerTool from "@/components/tools/ReadabilityCheckerTool";

const MODE_LABELS = ["Word Count", "Keyword Density", "Readability"];

export default function WordCounterStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <div className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Word counter and text analysis modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <WordCounterTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <KeywordDensityTool />
      </div>
      <div style={{ display: mode === 2 ? "block" : "none" }}>
        <ReadabilityCheckerTool />
      </div>
    </>
  );
}
