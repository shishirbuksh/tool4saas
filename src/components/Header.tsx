import { useEffect, useRef, useState } from "react";
import { usePathname } from "@/lib/astro/navigation";
import Drawer from "@/components/ds/Drawer";
import ToolSearch from "@/components/ToolSearch";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  ArrowDropDown as ArrowDropDownIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  BuildOutlined as BuildOutlinedIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
} from "@/components/ds/icons";
import { CATEGORIES } from "@/lib/tools/categories";
import { siteConfig } from "@/lib/site";
import { useThemeMode } from "@/components/ThemeProviderClient";

const PRIMARY_LINKS = [
  { label: "Tools", href: "/#tools" },
  { label: "Guides", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Rendered directly (not lazy): the header search + menus are above the fold
// and Astro SSRs them, so there is no hydration-time layout shift.
export default function Header() {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const homeHref = pathname?.startsWith("/es") ? "/es" : pathname?.startsWith("/fr") ? "/fr" : "/";
  const { mode, toggle } = useThemeMode();

  useEffect(() => {
    setCategoriesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!categoriesOpen) return;
    function handlePointerDown(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setCategoriesOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [categoriesOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-base-300/80 bg-base-100/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[64px] w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href={homeHref}
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

          <div ref={categoriesRef} className="relative">
            <button
              id="categories-button"
              type="button"
              aria-haspopup="menu"
              aria-expanded={categoriesOpen}
              aria-controls="categories-menu"
              onClick={() => setCategoriesOpen((value) => !value)}
              className={`flex min-h-[44px] items-center gap-1 rounded-lg px-3 text-sm transition-colors ${
                pathname.startsWith("/category")
                  ? "font-semibold text-base-content"
                  : "font-medium text-base-content/65 hover:text-base-content"
              }`}
            >
              Categories
              <ArrowDropDownIcon fontSize="small" aria-hidden="true" />
            </button>
            {categoriesOpen && (
              <div
                id="categories-menu"
                role="menu"
                aria-labelledby="categories-button"
                className="absolute left-1/2 top-full z-[1300] mt-2 grid w-[460px] max-w-[calc(100vw-32px)] -translate-x-1/2 grid-cols-2 gap-1 rounded-xl border border-base-300 bg-base-100 p-2 shadow-[0_12px_32px_rgba(17,17,17,0.12)]"
              >
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
            )}
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
          <LanguageSwitcher />
          <div className="w-[208px] shrink-0">
            <ToolSearch className="w-full" />
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-base-content transition-colors hover:bg-base-200"
          >
            {mode === "light" ? (
              <Brightness4Icon fontSize="small" aria-hidden="true" />
            ) : (
              <Brightness7Icon fontSize="small" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile utilities */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggle}
            aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="flex h-12 w-12 items-center justify-center rounded-lg text-base-content transition-colors hover:bg-base-200"
          >
            {mode === "light" ? (
              <Brightness4Icon fontSize="small" aria-hidden="true" />
            ) : (
              <Brightness7Icon fontSize="small" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-lg text-base-content transition-colors hover:bg-base-200"
          >
            <MenuIcon aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* noscript fallback: the drawer is client-only, so SSR HTML has zero
          category links without this. Plain anchors for all 12 hubs + home. */}
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

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="mobile-navigation-title"
        id="mobile-navigation-drawer"
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
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-12 w-12 items-center justify-center rounded-lg text-base-content transition-colors hover:bg-base-200"
          >
            <CloseIcon aria-hidden="true" />
          </button>
        </div>

        <ToolSearch className="mb-6 w-full" />

        <nav aria-label="Mobile">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {[{ label: "Home", href: "/" }, ...PRIMARY_LINKS].map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
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

        <LanguageSwitcher variant="drawer" onNavigate={() => setOpen(false)} />

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
                  onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-[0.8125rem] font-medium text-base-content/70 no-underline transition-colors hover:bg-base-200 hover:text-base-content"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </Drawer>
    </header>
  );
}
