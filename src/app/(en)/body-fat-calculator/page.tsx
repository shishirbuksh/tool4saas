import ToolPageShell from "@/components/ToolPageShell";
import BodyFatCalculatorTool from "@/components/tools/BodyFatCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "body-fat-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><BodyFatCalculatorTool /></ToolPageShell>; }
