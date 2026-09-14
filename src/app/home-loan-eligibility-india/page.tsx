import ToolPageShell from "@/components/ToolPageShell";
import HomeLoanEligibilityTool from "@/components/tools/HomeLoanEligibilityTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "home-loan-eligibility-india";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><HomeLoanEligibilityTool /></ToolPageShell>; }
