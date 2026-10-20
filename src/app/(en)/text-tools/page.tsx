import ToolPageShell from "@/components/ToolPageShell";
import TextStudioTool from "@/components/tools/TextStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "text-tools";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TextStudioTool />
    </ToolPageShell>
  );
}
