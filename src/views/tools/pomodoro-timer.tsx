import ToolPageShell from "@/components/ToolPageShell";
import PomodoroTimerTool from "@/components/tools/PomodoroTimerTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/pomodoro-timer/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <PomodoroTimerTool />
    </ToolPageShell>
  );
}
