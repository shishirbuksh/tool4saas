/**
 * Tool search combobox (vanilla). Replaces the React `ToolSearch` island.
 *
 * The 40 KB search index is loaded lazily on first focus/keystroke, so pages
 * that are never searched cost nothing. Markup is server-rendered by
 * `ToolSearch.tsx` (header + hero variants).
 */
type SearchTool = { slug: string; title: string; haystack: string };

const MAX_RESULTS = 8;

let indexPromise: Promise<SearchTool[]> | null = null;
function loadIndex(): Promise<SearchTool[]> {
  indexPromise ??= import("@/lib/tools/search-index.generated").then(
    (mod) => mod.SEARCH_TOOLS as unknown as SearchTool[],
  );
  return indexPromise;
}

function initOne(root: HTMLElement): void {
  const input = root.querySelector<HTMLInputElement>("input[role='combobox']");
  const list = root.querySelector<HTMLUListElement>("ul[role='listbox']");
  if (!input || !list) return;

  let index: SearchTool[] = [];
  let active = 0;
  let results: SearchTool[] = [];
  let loaded = false;

  const ensureIndex = () => {
    if (loaded) return;
    loaded = true;
    void loadIndex().then((tools) => {
      index = tools;
      if (input.value.trim()) render();
    });
  };

  const setExpanded = (open: boolean) => {
    input.setAttribute("aria-expanded", open ? "true" : "false");
  };

  const close = () => {
    list.hidden = true;
    list.replaceChildren();
    setExpanded(false);
    input.removeAttribute("aria-activedescendant");
  };

  const paint = () => {
    list.replaceChildren();
    if (results.length === 0) {
      const empty = document.createElement("li");
      empty.className = "px-3 py-3 text-center text-sm text-base-content/60";
      empty.setAttribute("role", "presentation");
      empty.textContent = "No tools found";
      list.appendChild(empty);
    } else {
      results.forEach((tool, i) => {
        const li = document.createElement("li");
        li.setAttribute("role", "option");
        li.id = `${list.id}-${i}`;
        li.setAttribute("aria-selected", i === active ? "true" : "false");
        const button = document.createElement("button");
        button.type = "button";
        button.className = `flex min-h-[44px] w-full items-center rounded-lg px-3 text-left text-sm ${
          i === active ? "bg-base-200 font-semibold" : "font-normal"
        }`;
        button.textContent = tool.title;
        button.addEventListener("mousedown", (event) => event.preventDefault());
        button.addEventListener("mouseenter", () => {
          if (active === i) return;
          active = i;
          paint();
        });
        button.addEventListener("click", () => go(tool));
        li.appendChild(button);
        list.appendChild(li);
      });
    }
    list.hidden = false;
    setExpanded(true);
    if (results[active]) input.setAttribute("aria-activedescendant", `${list.id}-${active}`);
    else input.removeAttribute("aria-activedescendant");
  };

  const render = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      close();
      return;
    }
    results = index.filter((tool) => tool.haystack.includes(q)).slice(0, MAX_RESULTS);
    active = 0;
    paint();
  };

  const go = (tool: SearchTool) => {
    window.location.href = `/${tool.slug}`;
  };

  input.addEventListener("focus", ensureIndex);
  input.addEventListener("input", () => {
    ensureIndex();
    if (loaded && index.length) render();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      ensureIndex();
      if (list.hidden && input.value.trim()) render();
      active = Math.min(active + 1, Math.max(results.length - 1, 0));
      paint();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      active = Math.max(active - 1, 0);
      paint();
    } else if (event.key === "Enter" && !list.hidden && results[active]) {
      event.preventDefault();
      go(results[active]);
    } else if (event.key === "Escape") {
      close();
    }
  });

  document.addEventListener("mousedown", (event) => {
    if (list.hidden) return;
    if (!root.contains(event.target as Node)) close();
  });
}

export function initToolSearch(): void {
  document.querySelectorAll<HTMLElement>("[data-tool-search]").forEach(initOne);
}
