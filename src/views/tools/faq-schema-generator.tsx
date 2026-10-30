import ToolPageShell from "@/components/ToolPageShell";
import FaqSchemaGeneratorTool from "@/components/tools/FaqSchemaGeneratorTool";
import type { ToolView } from "@/lib/tool-view";

// Generated from the former Next.js route src/app/(en)/faq-schema-generator/page.tsx.
export default function View({ view }: { view: ToolView }) {
  return (
    <ToolPageShell view={view}>
      <FaqSchemaGeneratorTool />
    </ToolPageShell>
  );
}
