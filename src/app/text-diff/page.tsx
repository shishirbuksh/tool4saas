import ToolPageShell from "@/components/ToolPageShell";
import TextDiffTool from "@/components/tools/TextDiffTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "text-diff";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TextDiffTool />
    </ToolPageShell>
  );
}
