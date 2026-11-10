/**
 * Header behaviour (vanilla): mobile navigation drawer + categories dropdown.
 *
 * The markup is server-rendered (hidden by default) by `Header.tsx`, so the
 * links are crawlable and present without JavaScript. This module only adds
 * the open/close behaviour, the focus trap, and the outside-click/Escape
 * dismissal that the former React component provided.
 */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function initDrawer(): void {
  const drawer = document.getElementById("mobile-navigation-drawer");
  if (!drawer) return;
  const openButton = document.querySelector<HTMLElement>("[data-nav-open]");
  let restoreFocus: HTMLElement | null = null;

  const focusables = () =>
    Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) => element.offsetParent !== null,
    );

  const open = () => {
    restoreFocus = document.activeElement as HTMLElement | null;
    drawer.hidden = false;
    document.body.style.overflow = "hidden";
    openButton?.setAttribute("aria-expanded", "true");
    const first = focusables()[0];
    (first ?? drawer).focus();
  };

  const close = () => {
    if (drawer.hidden) return;
    drawer.hidden = true;
    document.body.style.overflow = "";
    openButton?.setAttribute("aria-expanded", "false");
    restoreFocus?.focus();
  };

  openButton?.addEventListener("click", open);
  drawer.querySelectorAll<HTMLElement>("[data-nav-close]").forEach((element) => {
    element.addEventListener("click", close);
  });
  // Any in-drawer link navigates away; close so the state is not left open on
  // back-navigation from bfcache.
  drawer.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
    link.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (drawer.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const items = focusables();
    if (!items.length) {
      event.preventDefault();
      drawer.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function initCategoriesMenu(): void {
  const button = document.querySelector<HTMLElement>("[data-categories-toggle]");
  const menu = document.getElementById("categories-menu");
  if (!button || !menu) return;

  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    button.setAttribute("aria-expanded", open ? "true" : "false");
  };

  button.addEventListener("click", () => setOpen(menu.hidden));

  document.addEventListener("mousedown", (event) => {
    if (menu.hidden) return;
    const target = event.target as Node;
    if (!menu.contains(target) && !button.contains(target)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      setOpen(false);
      button.focus();
    }
  });
}

export function initHeader(): void {
  initDrawer();
  initCategoriesMenu();
}
