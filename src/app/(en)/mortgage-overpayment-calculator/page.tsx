import ToolPageShell from "@/components/ToolPageShell";
import MortgageOverpaymentTool from "@/components/tools/MortgageOverpaymentTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "mortgage-overpayment-calculator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><MortgageOverpaymentTool /></ToolPageShell>; }
