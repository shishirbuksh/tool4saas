import ToolPageShell from "@/components/ToolPageShell";
import PlagiarismCheckerTool from "@/components/tools/PlagiarismCheckerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "plagiarism-checker";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><PlagiarismCheckerTool /></ToolPageShell>; }
