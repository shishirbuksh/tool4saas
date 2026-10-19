import ToolPageShell from "@/components/ToolPageShell";
import JsonToYamlTool from "@/components/tools/JsonToYamlTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "json-to-yaml";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <JsonToYamlTool />
    </ToolPageShell>
  );
}
