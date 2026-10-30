import ToolPageShell from "@/components/ToolPageShell";
import HtmlEntitiesTool from "@/components/tools/HtmlEntitiesTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/html-entities/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <HtmlEntitiesTool />
    </ToolPageShell>
  );
}
