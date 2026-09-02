import ToolPageShell from "@/components/ToolPageShell";
import UuidGeneratorTool from "@/components/tools/UuidGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "uuid-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <UuidGeneratorTool />
    </ToolPageShell>
  );
}
