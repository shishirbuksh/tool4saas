import ToolPageShell from "@/components/ToolPageShell";
import ConcreteCalculatorTool from "@/components/tools/ConcreteCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "concrete-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><ConcreteCalculatorTool /></ToolPageShell>; }
