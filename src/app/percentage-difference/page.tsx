import ToolPageShell from "@/components/ToolPageShell";
import PercentageDifferenceTool from "@/components/tools/PercentageDifferenceTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "percentage-difference";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PercentageDifferenceTool />
    </ToolPageShell>
  );
}