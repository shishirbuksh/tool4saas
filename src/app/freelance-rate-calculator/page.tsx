import ToolPageShell from "@/components/ToolPageShell";
import FreelanceRateCalculatorTool from "@/components/tools/FreelanceRateCalculatorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "freelance-rate-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><FreelanceRateCalculatorTool /></ToolPageShell>; }
