
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import RandomNumberTool from "@/components/tools/RandomNumberTool";
import RandomStringTool from "@/components/tools/RandomStringTool";
import UuidGeneratorTool from "@/components/tools/UuidGeneratorTool";

const MODE_LABELS = ["Numbers", "Strings", "UUIDs"];

export default function RandomStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Random generator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <RandomNumberTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <RandomStringTool />
      </Box>
      <Box style={{ display: mode === 2 ? "block" : "none" }}>
        <UuidGeneratorTool />
      </Box>
    </>
  );
}
