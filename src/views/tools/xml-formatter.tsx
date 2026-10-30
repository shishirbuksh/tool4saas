import ToolPageShell from "@/components/ToolPageShell";
import XmlFormatterTool from "@/components/tools/XmlFormatterTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/xml-formatter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <XmlFormatterTool />
    </ToolPageShell>
  );
}
