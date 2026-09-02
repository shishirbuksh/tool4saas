import ToolPageShell from "@/components/ToolPageShell";
import TextFindReplaceTool from "@/components/tools/TextFindReplaceTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "text-find-replace";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TextFindReplaceTool />
    </ToolPageShell>
  );
}
