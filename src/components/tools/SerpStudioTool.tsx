
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import SerpPreviewTool from "@/components/tools/SerpPreviewTool";
import OpenGraphPreviewTool from "@/components/tools/OpenGraphPreviewTool";

const MODE_LABELS = ["SERP", "Open Graph"];

export default function SerpStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="SERP and social preview modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <SerpPreviewTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <OpenGraphPreviewTool />
      </Box>
    </>
  );
}
