import Link from "@/lib/astro/navigation";
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools/counts";

const groups = liteToolsByCategory()
  .map((group) => ({
    category: group.category,
    tools: group.tools.filter((tool) => !NOINDEX_SLUGS.has(tool.slug)),
  }))
  .filter((group) => group.tools.length > 0);

const renderedToolCount = groups.reduce((total, group) => total + group.tools.length, 0);

if (renderedToolCount !== VISIBLE_TOOL_COUNT) {
  throw new Error(
    `[HomeDirectory] rendered ${renderedToolCount} tools, expected ${VISIBLE_TOOL_COUNT}`
  );
}

export default function HomeDirectory() {
  return (
    <section id="tools" aria-labelledby="tools-heading" className="py-16 md:py-20 border-b border-base-300 scroll-mt-[100px] bg-base-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-base-content/60 mb-2">Complete directory</p>
          <h2 id="tools-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-base-content">
            All {VISIBLE_TOOL_COUNT} free tools
          </h2>
          <p className="mt-2 text-base text-base-content/70 leading-relaxed text-pretty">
            Every tool is free and opens in your browser. Jump to a category or scan the
            full list below.
          </p>
        </div>

        <nav className="flex flex-wrap gap-2 mb-10" aria-label="Jump to tool category">
          {groups.map((group) => (
            <a
              key={group.category.id}
              href={`#tools-${group.category.id}`}
              className="inline-flex items-center min-h-[44px] gap-2 px-3.5 py-1.5 rounded-full border border-base-300 bg-base-200/60 hover:bg-base-200 hover:border-base-content/30 text-base-content text-xs sm:text-sm font-semibold transition-colors"
            >
              {group.category.label}
              <span className="text-base-content/50 font-normal">{group.tools.length}</span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-10">
          {groups.map((group) => {
            const headingId = `tools-${group.category.id}-heading`;
            return (
              <section
                key={group.category.id}
                id={`tools-${group.category.id}`}
                className="scroll-mt-[100px]"
                aria-labelledby={headingId}
              >
                <div className="flex items-baseline flex-wrap gap-2 sm:gap-4 pb-3 mb-4 border-b border-base-300">
                  <h3 id={headingId} className="text-lg sm:text-xl font-bold text-base-content tracking-tight">
                    {group.category.label}
                  </h3>
                  <span className="text-xs sm:text-sm text-base-content/60 font-normal">{group.tools.length} tools</span>
                  <Link href={`/category/${group.category.id}`} className="inline-flex items-center min-h-[44px] ml-auto text-xs sm:text-sm font-semibold text-primary hover:underline underline-offset-4">
                    Category page →
                  </Link>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1 list-none p-0 m-0">
                  {group.tools.map((tool) => (
                    <li key={tool.slug}>
                      <Link href={`/${tool.slug}`} className="flex items-center min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium text-base-content/85 hover:text-base-content hover:bg-base-200 transition-colors">
                        {tool.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
