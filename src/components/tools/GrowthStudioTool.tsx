
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

import CompoundInterestTool from "@/components/tools/CompoundInterestTool";
import CagrCalculatorTool from "@/components/tools/CagrCalculatorTool";

const MODE_LABELS = ["Compound interest", "CAGR"];

export default function GrowthStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <div className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Growth calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <CompoundInterestTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <CagrCalculatorTool />
      </div>
    </>
  );
}
