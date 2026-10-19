import ToolPageShell from "@/components/ToolPageShell";
import GrammarCheckerTool from "@/components/tools/GrammarCheckerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "grammar-checker";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><GrammarCheckerTool /></ToolPageShell>; }
