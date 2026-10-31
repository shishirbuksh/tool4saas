
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import DateCalculatorTool from "@/components/tools/DateCalculatorTool";
import CountdownTimerTool from "@/components/tools/CountdownTimerTool";
import WorkDaysCalculatorTool from "@/components/tools/WorkDaysCalculatorTool";
import TimeDurationCalculatorTool from "@/components/tools/TimeDurationCalculatorTool";

const MODE_LABELS = ["Date Difference", "Countdown", "Work Days", "Duration"];

export default function DateStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Date, countdown and duration modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <DateCalculatorTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <CountdownTimerTool />
      </Box>
      <Box style={{ display: mode === 2 ? "block" : "none" }}>
        <WorkDaysCalculatorTool />
      </Box>
      <Box style={{ display: mode === 3 ? "block" : "none" }}>
        <TimeDurationCalculatorTool />
      </Box>
    </>
  );
}
