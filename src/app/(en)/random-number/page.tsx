import ToolPageShell from "@/components/ToolPageShell";
import RandomStudioTool from "@/components/tools/RandomStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "random-number";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RandomStudioTool />
    </ToolPageShell>
  );
}
