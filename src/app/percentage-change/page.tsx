import ToolPageShell from "@/components/ToolPageShell";
import PercentageChangeTool from "@/components/tools/PercentageChangeTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "percentage-change";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PercentageChangeTool />
    </ToolPageShell>
  );
}