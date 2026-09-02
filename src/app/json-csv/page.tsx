import ToolPageShell from "@/components/ToolPageShell";
import JsonCsvTool from "@/components/tools/JsonCsvTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "json-csv";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <JsonCsvTool />
    </ToolPageShell>
  );
}
