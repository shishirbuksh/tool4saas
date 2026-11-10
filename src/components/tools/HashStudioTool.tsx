
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

import HashGeneratorTool from "@/components/tools/HashGeneratorTool";
import HmacGeneratorTool from "@/components/tools/HmacGeneratorTool";

const MODE_LABELS = ["Hash", "HMAC"];

export default function HashStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <div className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Hash generator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <HashGeneratorTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <HmacGeneratorTool />
      </div>
    </>
  );
}
