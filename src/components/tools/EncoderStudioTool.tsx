
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import NumberToWordsTool from "@/components/tools/NumberToWordsTool";
import RomanNumeralTool from "@/components/tools/RomanNumeralTool";
import AsciiConverterTool from "@/components/tools/AsciiConverterTool";
import BaseConverterTool from "@/components/tools/BaseConverterTool";

const MODE_LABELS = ["Number to Words", "Roman Numerals", "ASCII / Hex / Binary", "Base Converter"];

export default function EncoderStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Number and code encoder modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <NumberToWordsTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <RomanNumeralTool />
      </Box>
      <Box style={{ display: mode === 2 ? "block" : "none" }}>
        <AsciiConverterTool />
      </Box>
      <Box style={{ display: mode === 3 ? "block" : "none" }}>
        <BaseConverterTool />
      </Box>
    </>
  );
}
