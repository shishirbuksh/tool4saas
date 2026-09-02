import ToolPageShell from "@/components/ToolPageShell";
import TextReverserTool from "@/components/tools/TextReverserTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "text-reverser";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TextReverserTool />
    </ToolPageShell>
  );
}
