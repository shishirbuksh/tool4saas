import ToolPageShell from "@/components/ToolPageShell";
import StopwatchTool from "@/components/tools/StopwatchTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "stopwatch";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <StopwatchTool />
    </ToolPageShell>
  );
}
