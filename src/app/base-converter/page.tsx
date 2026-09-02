import ToolPageShell from "@/components/ToolPageShell";
import BaseConverterTool from "@/components/tools/BaseConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "base-converter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <BaseConverterTool />
    </ToolPageShell>
  );
}
