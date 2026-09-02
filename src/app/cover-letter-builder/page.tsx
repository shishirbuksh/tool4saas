import ToolPageShell from "@/components/ToolPageShell";
import CoverLetterBuilderTool from "@/components/tools/CoverLetterBuilderTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "cover-letter-builder";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CoverLetterBuilderTool /></ToolPageShell>; }
