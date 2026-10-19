import ToolPageShell from "@/components/ToolPageShell";
import OtpGeneratorTool from "@/components/tools/OtpGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";
const slug = "otp-generator";
const tool = getTool(slug)!;
export const metadata = toolMetadata(slug);
export default function Page() { return <ToolPageShell tool={tool}><OtpGeneratorTool /></ToolPageShell>; }
