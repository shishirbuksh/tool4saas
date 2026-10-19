import ToolPageShell from "@/components/ToolPageShell";
import LoremIpsumTool from "@/components/tools/LoremIpsumTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "lorem-ipsum";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <LoremIpsumTool />
    </ToolPageShell>
  );
}
