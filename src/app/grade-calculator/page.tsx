import ToolPageShell from "@/components/ToolPageShell";
import GradeCalculatorTool from "@/components/tools/GradeCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "grade-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><GradeCalculatorTool /></ToolPageShell>; }
