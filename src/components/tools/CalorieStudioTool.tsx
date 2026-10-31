
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import CalorieCalculatorTool from "@/components/tools/CalorieCalculatorTool";
import MacroCalculatorTool from "@/components/tools/MacroCalculatorTool";

const MODE_LABELS = ["Calories", "Macros"];

export default function CalorieStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Calorie and macro calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <CalorieCalculatorTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <MacroCalculatorTool />
      </Box>
    </>
  );
}
