import ToolPageShell from "@/components/ToolPageShell";
import TimestampConverterTool from "@/components/tools/TimestampConverterTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/timestamp-converter/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <TimestampConverterTool />
    </ToolPageShell>
  );
}
