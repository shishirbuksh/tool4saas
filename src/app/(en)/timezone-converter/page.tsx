import ToolPageShell from "@/components/ToolPageShell";
import TimeStudioTool from "@/components/tools/TimeStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "timezone-converter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TimeStudioTool />
    </ToolPageShell>
  );
}
