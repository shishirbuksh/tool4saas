
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

import TimezoneConverterTool from "@/components/tools/TimezoneConverterTool";
import WorldClockTool from "@/components/tools/WorldClockTool";

const MODE_LABELS = ["Convert", "World Clock"];

export default function TimeStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <div className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Timezone and world clock modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <TimezoneConverterTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <WorldClockTool />
      </div>
    </>
  );
}
