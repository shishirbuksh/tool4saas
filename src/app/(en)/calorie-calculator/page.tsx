import ToolPageShell from "@/components/ToolPageShell";
import CalorieCalculatorTool from "@/components/tools/CalorieCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "calorie-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><CalorieCalculatorTool /></ToolPageShell>; }
