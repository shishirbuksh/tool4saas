import ToolPageShell from "@/components/ToolPageShell";
import AtsResumeCheckerTool from "@/components/tools/AtsResumeCheckerTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "ats-resume-checker";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><AtsResumeCheckerTool /></ToolPageShell>; }
