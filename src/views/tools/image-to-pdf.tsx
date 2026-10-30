import ToolPageShell from "@/components/ToolPageShell";
import ImageToPdfTool from "@/components/tools/ImageToPdfTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/image-to-pdf/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <ImageToPdfTool />
    </ToolPageShell>
  );
}
