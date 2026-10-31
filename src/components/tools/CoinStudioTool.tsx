
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import CoinFlipTool from "@/components/tools/CoinFlipTool";
import DiceRollerTool from "@/components/tools/DiceRollerTool";

const MODE_LABELS = ["Coin", "Dice"];

export default function CoinStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
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
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <CoinFlipTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <DiceRollerTool />
      </Box>
    </>
  );
}
