import ToolPageShell from "@/components/ToolPageShell";
import WaterIntakeCalculatorTool from "@/components/tools/WaterIntakeCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "water-intake-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><WaterIntakeCalculatorTool /></ToolPageShell>; }
