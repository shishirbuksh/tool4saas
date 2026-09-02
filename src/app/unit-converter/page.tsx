import ToolPageShell from "@/components/ToolPageShell";
import UnitConverterTool from "@/components/tools/UnitConverterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "unit-converter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <UnitConverterTool />
    </ToolPageShell>
  );
}
