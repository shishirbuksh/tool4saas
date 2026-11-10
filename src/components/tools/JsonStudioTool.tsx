
import { useState } from "react";import { Tab, Tabs } from "@/components/ds";

import JsonFormatterTool from "@/components/tools/JsonFormatterTool";
import JsonTreeViewerTool from "@/components/tools/JsonTreeViewerTool";
import JsonToYamlTool from "@/components/tools/JsonToYamlTool";
import YamlToJsonTool from "@/components/tools/YamlToJsonTool";

const MODE_LABELS = ["Format & minify", "Tree view", "JSON → YAML", "YAML → JSON"];

export default function JsonStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <div className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="JSON studio modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <JsonFormatterTool />
      </div>
      <div style={{ display: mode === 1 ? "block" : "none" }}>
        <JsonTreeViewerTool />
      </div>
      <div style={{ display: mode === 2 ? "block" : "none" }}>
        <JsonToYamlTool />
      </div>
      <div style={{ display: mode === 3 ? "block" : "none" }}>
        <YamlToJsonTool />
      </div>
    </>
  );
}
