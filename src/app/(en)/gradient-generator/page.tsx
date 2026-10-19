import ToolPageShell from "@/components/ToolPageShell";
import GradientGeneratorTool from "@/components/tools/GradientGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "gradient-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <GradientGeneratorTool />
    </ToolPageShell>
  );
}
