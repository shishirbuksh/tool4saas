import ToolPageShell from "@/components/ToolPageShell";
import RandomNumberTool from "@/components/tools/RandomNumberTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "random-number";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RandomNumberTool />
    </ToolPageShell>
  );
}
