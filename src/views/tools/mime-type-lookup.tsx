import ToolPageShell from "@/components/ToolPageShell";
import MimeTypeTool from "@/components/tools/MimeTypeTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/mime-type-lookup/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <MimeTypeTool />
    </ToolPageShell>
  );
}
