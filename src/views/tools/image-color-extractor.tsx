import ToolPageShell from "@/components/ToolPageShell";
import ImageColorExtractorTool from "@/components/tools/ImageColorExtractorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/image-color-extractor/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ImageColorExtractorTool />
    </ToolPageShell>
  );
}
