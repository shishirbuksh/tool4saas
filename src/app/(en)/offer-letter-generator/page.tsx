import ToolPageShell from "@/components/ToolPageShell";
import OfferLetterGeneratorTool from "@/components/tools/OfferLetterGeneratorTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "offer-letter-generator";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <OfferLetterGeneratorTool />
    </ToolPageShell>
  );
}
