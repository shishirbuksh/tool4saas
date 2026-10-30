import ToolPageShell from "@/components/ToolPageShell";
import CronParserTool from "@/components/tools/CronParserTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/cron-parser/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <CronParserTool />
    </ToolPageShell>
  );
}
