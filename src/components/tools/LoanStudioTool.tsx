
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import EmiCalculatorTool from "@/components/tools/EmiCalculatorTool";
import AutoLoanCalculatorTool from "@/components/tools/AutoLoanCalculatorTool";
import SimpleInterestCalculatorTool from "@/components/tools/SimpleInterestCalculatorTool";

const MODE_LABELS = ["Loan / EMI", "Auto loan", "Simple interest"];

export default function LoanStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Loan calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <EmiCalculatorTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <AutoLoanCalculatorTool />
      </Box>
      <Box style={{ display: mode === 2 ? "block" : "none" }}>
        <SimpleInterestCalculatorTool />
      </Box>
    </>
  );
}
