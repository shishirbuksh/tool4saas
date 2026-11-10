
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

import CoinFlipTool from "@/components/tools/CoinFlipTool";
import DiceRollerTool from "@/components/tools/DiceRollerTool";

const MODE_LABELS = ["Coin", "Dice"];

export default function CoinStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <div className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Coin flip and dice modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <CoinFlipTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <DiceRollerTool />
      </div>
    </>
  );
}
