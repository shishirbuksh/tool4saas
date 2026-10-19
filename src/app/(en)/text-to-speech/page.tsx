import ToolPageShell from "@/components/ToolPageShell";
import TextToSpeechTool from "@/components/tools/TextToSpeechTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "text-to-speech";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TextToSpeechTool />
    </ToolPageShell>
  );
}
