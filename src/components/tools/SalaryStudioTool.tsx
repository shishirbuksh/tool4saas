
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import SalaryCalculatorTool from "@/components/tools/SalaryCalculatorTool";
import UsPaycheckTool from "@/components/tools/UsPaycheckTool";

const MODE_LABELS = ["Salary", "US Paycheck"];

export default function SalaryStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Salary and US paycheck calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <SalaryCalculatorTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <UsPaycheckTool />
      </Box>
    </>
  );
}
