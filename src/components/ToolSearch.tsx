import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "@/lib/astro/navigation";
import { Search as SearchIcon } from "@/components/ds/icons";
import { SEARCH_TOOLS, type SearchTool } from "@/lib/tools/search-index.generated";

type ToolSearchProps = {
  variant?: "header" | "hero";
  placeholder?: string;
  className?: string;
};

export default function ToolSearch({ variant = "header", placeholder, className = "" }: ToolSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const isHero = variant === "hero";

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_TOOLS.filter((tool) => tool.haystack.includes(q)).slice(0, 8);
  }, [deferredQuery]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [deferredQuery]);

  function navigate(tool: SearchTool) {
    router.push(`/${tool.slug}`);
    setQuery("");
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && open && results[active]) {
      event.preventDefault();
      navigate(results[active]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const showList = open && query.trim().length > 0;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search tools
      </label>
      <SearchIcon
        aria-hidden="true"
        size={isHero ? 20 : 17}
        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-base-content/40"
      />
      <input
        id={`${listId}-input`}
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && results[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder ?? "Search tools…"}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className={`input input-bordered w-full rounded-xl border-base-300 bg-base-100 pl-11 text-base-content placeholder:text-base-content/40 focus:border-base-content focus:outline-none ${
          isHero ? "h-14 text-[1rem] shadow-[0_1px_2px_rgba(17,17,17,0.04)]" : "h-10 text-[0.875rem]"
        }`}
      />

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Tool search results"
          className="menu absolute left-0 right-0 top-full z-[1400] mt-2 max-h-80 overflow-y-auto rounded-xl border border-base-300 bg-base-100 p-1.5 shadow-[0_12px_32px_rgba(17,17,17,0.12)]"
        >
          {results.length === 0 ? (
            <li className="px-3 py-3 text-center text-sm text-base-content/60" role="presentation">
              No tools found
            </li>
          ) : (
            results.map((tool, index) => (
              <li key={tool.slug} role="option" id={`${listId}-${index}`} aria-selected={index === active}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => navigate(tool)}
                  className={`flex min-h-[44px] w-full items-center rounded-lg px-3 text-left text-sm ${
                    index === active ? "bg-base-200 font-semibold" : "font-normal"
                  }`}
                >
                  {tool.title}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
