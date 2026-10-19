import ToolPageShell from "@/components/ToolPageShell";
import JsonStudioTool from "@/components/tools/JsonStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "json-formatter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <JsonStudioTool />
    </ToolPageShell>
  );
}
