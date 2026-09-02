import ToolPageShell from "@/components/ToolPageShell";
import CodeMinifierTool from "@/components/tools/CodeMinifierTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "code-minifier";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CodeMinifierTool />
    </ToolPageShell>
  );
}