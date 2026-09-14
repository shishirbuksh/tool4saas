import ToolPageShell from "@/components/ToolPageShell";
import SpeechToTextTool from "@/components/tools/SpeechToTextTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "speech-to-text";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><SpeechToTextTool /></ToolPageShell>; }
