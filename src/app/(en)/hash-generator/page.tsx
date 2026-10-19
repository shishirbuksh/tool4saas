import ToolPageShell from "@/components/ToolPageShell";
import HashGeneratorTool from "@/components/tools/HashGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "hash-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <HashGeneratorTool />
    </ToolPageShell>
  );
}
