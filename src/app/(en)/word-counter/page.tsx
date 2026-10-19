import ToolPageShell from "@/components/ToolPageShell";
import WordCounterTool from "@/components/tools/WordCounterTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "word-counter";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <WordCounterTool />
    </ToolPageShell>
  );
}
