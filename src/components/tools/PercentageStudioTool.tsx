
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import PercentageCalculatorTool from "@/components/tools/PercentageCalculatorTool";
import PercentageChangeTool from "@/components/tools/PercentageChangeTool";
import PercentageDifferenceTool from "@/components/tools/PercentageDifferenceTool";

const MODE_LABELS = ["Percent", "Change", "Difference"];

export default function PercentageStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Percentage calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <PercentageCalculatorTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <PercentageChangeTool />
      </Box>
      <Box style={{ display: mode === 2 ? "block" : "none" }}>
        <PercentageDifferenceTool />
      </Box>
    </>
  );
}
