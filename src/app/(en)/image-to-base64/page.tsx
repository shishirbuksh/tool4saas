import ToolPageShell from "@/components/ToolPageShell";
import ImageToBase64Tool from "@/components/tools/ImageToBase64Tool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/metadata";

const slug = "image-to-base64";
const tool = getTool(slug)!;

export const metadata = toolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageToBase64Tool />
    </ToolPageShell>
  );
}
