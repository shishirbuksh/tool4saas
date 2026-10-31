
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import BmiCalculatorTool from "@/components/tools/BmiCalculatorTool";
import IdealWeightCalculatorTool from "@/components/tools/IdealWeightCalculatorTool";
import BodyFatCalculatorTool from "@/components/tools/BodyFatCalculatorTool";

const MODE_LABELS = ["BMI", "Ideal Weight", "Body Fat"];

export default function BmiStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Body metrics calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <BmiCalculatorTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <IdealWeightCalculatorTool />
      </Box>
      <Box style={{ display: mode === 2 ? "block" : "none" }}>
        <BodyFatCalculatorTool />
      </Box>
    </>
  );
}
