import ToolPageShell from "@/components/ToolPageShell";
import EmailExtractorTool from "@/components/tools/EmailExtractorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "email-extractor";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <EmailExtractorTool />
    </ToolPageShell>
  );
}
