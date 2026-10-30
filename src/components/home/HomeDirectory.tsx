import Link from "@/lib/astro/navigation";
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools/counts";
import styles from "./HomeDirectory.module.css";

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
    <section id="tools" aria-labelledby="tools-heading" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Complete directory</p>
          <h2 id="tools-heading" className={styles.title}>
            All {VISIBLE_TOOL_COUNT} free tools
          </h2>
          <p className={styles.intro}>
            Every tool is free and opens in your browser. Jump to a category or scan the
            full list below.
          </p>
        </div>

        <nav className={styles.jumpNav} aria-label="Jump to tool category">
          {groups.map((group) => (
            <a
              key={group.category.id}
              href={`#tools-${group.category.id}`}
              className={styles.jumpLink}
            >
              {group.category.label}
              <span className={styles.jumpCount}>{group.tools.length}</span>
            </a>
          ))}
        </nav>

        <div className={styles.groups}>
          {groups.map((group) => {
            const headingId = `tools-${group.category.id}-heading`;
            return (
              <section
                key={group.category.id}
                id={`tools-${group.category.id}`}
                className={styles.group}
                aria-labelledby={headingId}
              >
                <div className={styles.groupHeader}>
                  <h3 id={headingId} className={styles.groupTitle}>
                    {group.category.label}
                  </h3>
                  <span className={styles.groupCount}>{group.tools.length} tools</span>
                  <Link href={`/category/${group.category.id}`} className={styles.groupLink}>
                    Category page →
                  </Link>
                </div>
                <ul className={styles.toolList}>
                  {group.tools.map((tool) => (
                    <li key={tool.slug}>
                      <Link href={`/${tool.slug}`} className={styles.toolLink}>
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
