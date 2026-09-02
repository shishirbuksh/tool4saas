import ToolPageShell from "@/components/ToolPageShell";
import JsonFormatterTool from "@/components/tools/JsonFormatterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "json-formatter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <JsonFormatterTool />
    </ToolPageShell>
  );
}
