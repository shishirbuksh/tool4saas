import { SearchIcon } from "@/components/ui/icons";

/**
 * Tool search — presentational only.
 *
 * Rendered to static HTML by the server; behaviour (lazy index load, combobox
 * keyboard nav, outside-click close) lives in src/lib/shell/search.ts. That
 * keeps the search index out of the critical path and lets the header search
 * work on pages that ship no React at all.
 */
type ToolSearchProps = {
  id: string;
  variant?: "header" | "hero";
  placeholder?: string;
  className?: string;
};

export default function ToolSearch({
  id,
  variant = "header",
  placeholder,
  className = "",
}: ToolSearchProps) {
  const isHero = variant === "hero";
  const inputId = `${id}-input`;
  const listId = `${id}-list`;

  return (
    <div className={`relative ${className}`} data-tool-search>
      <label htmlFor={inputId} className="sr-only">
        Search tools
      </label>
      <SearchIcon
        aria-hidden="true"
        size={isHero ? 20 : 17}
        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-base-content/40"
      />
      <input
        id={inputId}
        type="search"
        role="combobox"
        aria-expanded="false"
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder ?? "Search tools…"}
        className={`input input-bordered w-full rounded-xl border-base-300 bg-base-100 pl-11 text-base-content placeholder:text-base-content/40 focus:border-base-content focus:outline-none ${
          isHero ? "h-14 text-[1rem] shadow-[0_1px_2px_rgba(17,17,17,0.04)]" : "h-10 text-[0.875rem]"
        }`}
      />
      <ul
        id={listId}
        role="listbox"
        aria-label="Tool search results"
        hidden
        className="absolute left-0 right-0 top-full z-[1400] mt-2 max-h-80 overflow-y-auto rounded-xl border border-base-300 bg-base-100 p-1.5 shadow-[0_12px_32px_rgba(17,17,17,0.12)]"
      />
    </div>
  );
}
