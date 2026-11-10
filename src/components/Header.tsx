import { ChevronDownIcon as ArrowDropDownIcon, MoonIcon as Brightness4Icon, SunIcon as Brightness7Icon, WrenchIcon as BuildOutlinedIcon, XIcon as CloseIcon, MenuIcon } from "@/components/ui/icons";
import ToolSearch from "@/components/ToolSearch";
import { CATEGORIES } from "@/lib/tools/categories";
import { siteConfig } from "@/lib/site";

// Server-rendered shell header. Rendered to static HTML at build time; the
// open/close behaviour lives in src/lib/shell/header.ts and the theme toggle in
// src/lib/shell/theme.ts, so this component ships no client JavaScript.
const PRIMARY_LINKS = [
  { label: "Tools", href: "/#tools" },
  { label: "Guides", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Header({ pathname = "/" }: { pathname?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300/80 bg-base-100/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[64px] w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="flex shrink-0 items-center gap-2.5 text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-base-content"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-base-content text-base-100">
            <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
          </span>
          <span className="text-[1.125rem] font-semibold tracking-[-0.03em]">{siteConfig.name}</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {PRIMARY_LINKS.slice(0, 1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm no-underline transition-colors ${
                pathname === "/" ? "font-semibold text-base-content" : "font-medium text-base-content/65 hover:text-base-content"
              }`}
            >
              {link.label}
            </a>
          ))}

          <div className="relative">
            <button
              id="categories-button"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-controls="categories-menu"
              data-categories-toggle
              className={`flex min-h-[44px] items-center gap-1 rounded-lg px-3 text-sm transition-colors ${
                pathname.startsWith("/category")
                  ? "font-semibold text-base-content"
                  : "font-medium text-base-content/65 hover:text-base-content"
              }`}
            >
              Categories
              <ArrowDropDownIcon fontSize="small" aria-hidden="true" />
            </button>
            <div
              id="categories-menu"
              role="menu"
              aria-labelledby="categories-button"
              hidden
              className="absolute left-1/2 top-full z-[1300] mt-2 w-[460px] max-w-[calc(100vw-32px)] -translate-x-1/2 rounded-xl border border-base-300 bg-base-100 p-2 shadow-[0_12px_32px_rgba(17,17,17,0.12)]"
            >
              <div className="grid grid-cols-2 gap-1">
                {CATEGORIES.map((category) => {
                  const href = `/category/${category.id}`;
                  const isActive = pathname === href;
                  return (
                    <a
                      key={category.id}
                      role="menuitem"
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm no-underline transition-colors ${
                        isActive
                          ? "bg-base-200 font-semibold text-base-content"
                          : "font-medium text-base-content/75 hover:bg-base-200/70 hover:text-base-content"
                      }`}
                    >
                      {category.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {PRIMARY_LINKS.slice(1).map((link) => {
            const isActive = pathname === link.href || (link.href === "/blog" && pathname.startsWith("/blog"));
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm no-underline transition-colors ${
                  isActive ? "font-semibold text-base-content" : "font-medium text-base-content/65 hover:text-base-content"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop utilities */}
        <div className="hidden items-center gap-1 lg:flex">
          <div className="w-[208px] shrink-0">
            <ToolSearch id="header-search" className="w-full" />
          </div>
          <button
            type="button"
            data-theme-toggle
            aria-label="Switch to dark mode"
            title="Switch to dark mode"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-base-content transition-colors hover:bg-base-200"
          >
            <Brightness4Icon fontSize="small" aria-hidden="true" className="dark:hidden" />
            <Brightness7Icon fontSize="small" aria-hidden="true" className="hidden dark:block" />
          </button>
        </div>

        {/* Mobile utilities */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            data-theme-toggle
            aria-label="Switch to dark mode"
            title="Switch to dark mode"
            className="flex h-12 w-12 items-center justify-center rounded-lg text-base-content transition-colors hover:bg-base-200"
          >
            <Brightness4Icon fontSize="small" aria-hidden="true" className="dark:hidden" />
            <Brightness7Icon fontSize="small" aria-hidden="true" className="hidden dark:block" />
          </button>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="mobile-navigation-drawer"
            data-nav-open
            className="flex h-12 w-12 items-center justify-center rounded-lg text-base-content transition-colors hover:bg-base-200"
          >
            <MenuIcon aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* noscript fallback: the drawer needs JS to open, so expose the category
          hubs as plain anchors for no-JS clients. */}
      <noscript>
        <div className="flex flex-wrap gap-3 px-4 py-2">
          <a href="/">Home</a>
          {CATEGORIES.map((category) => (
            <a key={category.id} href={`/category/${category.id}`}>
              {category.label}
            </a>
          ))}
        </div>
      </noscript>

      {/* Mobile drawer. Rendered in HTML (hidden) so links are crawlable and
          work without JS via the noscript block above. */}
      <div id="mobile-navigation-drawer" className="fixed inset-0 z-[1200]" role="dialog" aria-modal="true" aria-labelledby="mobile-navigation-title" tabIndex={-1} hidden>
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs" data-nav-close aria-hidden="true" />
        <div
          className="fixed inset-y-0 right-0 z-10 w-full max-w-[400px] overflow-y-auto bg-base-100 p-6 text-base-content shadow-2xl outline-none"
          style={{
            paddingTop: "max(24px, env(safe-area-inset-top))",
            paddingBottom: "max(24px, env(safe-area-inset-bottom))",
          }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-base-content text-base-100">
                <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
              </span>
              <h2 id="mobile-navigation-title" className="m-0 text-[1.125rem] font-semibold tracking-[-0.03em]">
                Menu
              </h2>
            </div>
            <button
              type="button"
              data-nav-close
              aria-label="Close menu"
              className="flex h-12 w-12 items-center justify-center rounded-lg text-base-content transition-colors hover:bg-base-200"
            >
              <CloseIcon aria-hidden="true" />
            </button>
          </div>

          <ToolSearch id="drawer-search" className="mb-6 w-full" />

          <nav aria-label="Mobile">
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {[{ label: "Home", href: "/" }, ...PRIMARY_LINKS].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm no-underline transition-colors ${
                        isActive
                          ? "bg-base-200 font-semibold text-base-content"
                          : "font-medium text-base-content/75 hover:bg-base-200/70 hover:text-base-content"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav aria-label="Categories" className="mt-6">
            <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.08em] text-base-content/55">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((category) => {
                const href = `/category/${category.id}`;
                const isActive = pathname === href;
                return (
                  <a
                    key={category.id}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-[44px] items-center rounded-lg px-3 text-[0.875rem] no-underline transition-colors ${
                      isActive
                        ? "bg-base-200 font-semibold text-base-content"
                        : "font-medium text-base-content/75 hover:bg-base-200/70 hover:text-base-content"
                    }`}
                  >
                    {category.label}
                  </a>
                );
              })}
            </div>
          </nav>

          <nav aria-label="Legal" className="mt-6 border-t border-base-300 pt-4">
            <div className="flex flex-wrap gap-1">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "llms.txt", href: "/llms.txt" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-[0.8125rem] font-medium text-base-content/70 no-underline transition-colors hover:bg-base-200 hover:text-base-content"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
