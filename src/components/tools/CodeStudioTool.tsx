
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import HtmlBeautifierTool from "@/components/tools/HtmlBeautifierTool";
import CssBeautifierTool from "@/components/tools/CssBeautifierTool";
import JsBeautifierTool from "@/components/tools/JsBeautifierTool";

const MODE_LABELS = ["HTML", "CSS", "JavaScript"];

export default function CodeStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Code formatter languages"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <HtmlBeautifierTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <CssBeautifierTool />
      </Box>
      <Box style={{ display: mode === 2 ? "block" : "none" }}>
        <JsBeautifierTool />
      </Box>
    </>
  );
}
