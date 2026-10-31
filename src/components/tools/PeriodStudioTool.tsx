
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import PeriodCalculatorTool from "@/components/tools/PeriodCalculatorTool";
import OvulationCalculatorTool from "@/components/tools/OvulationCalculatorTool";

const MODE_LABELS = ["Period", "Ovulation"];

export default function PeriodStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Period and ovulation calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <PeriodCalculatorTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <OvulationCalculatorTool />
      </Box>
    </>
  );
}
