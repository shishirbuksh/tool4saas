import ToolPageShell from "@/components/ToolPageShell";
import WordCounterStudioTool from "@/components/tools/WordCounterStudioTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "word-counter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <WordCounterStudioTool />
    </ToolPageShell>
  );
}
