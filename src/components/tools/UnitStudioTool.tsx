
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import UnitConverterTool from "@/components/tools/UnitConverterTool";
import FileSizeConverterTool from "@/components/tools/FileSizeConverterTool";

const MODE_LABELS = ["Units", "File Size"];

export default function UnitStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Unit converter modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <UnitConverterTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <FileSizeConverterTool />
      </Box>
    </>
  );
}
