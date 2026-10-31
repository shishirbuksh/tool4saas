import { useEffect, useRef, useState } from "react";
import { usePathname } from "@/lib/astro/navigation";
import { Box, Button, ListItemButton, ListItemText, Stack, Typography } from "@/components/ds";
import { Translate as TranslateIcon } from "@/components/ds/icons";
import { LOCALES, LOCALE_NAME, switcherTarget, type Locale } from "@/lib/i18n-core";

// Short code shown on the trigger button (locale-agnostic, "EN"/"ES"/"FR").
const CODE: Record<Locale, string> = { en: "EN", es: "ES", fr: "FR" };

// Navbar language switcher: trigger button with the active code + a menu of
// the site's available locales. The visible per-page switchers (ToolPageShell,
// BlogArticle, hubs) link exact translations; this global control routes by
// switcherTarget(): direct translation when one exists, else the locale hub,
// so switching never 404s even on pages with no translation.
export default function LanguageSwitcher({
  variant = "menu",
  onNavigate,
}: {
  variant?: "menu" | "drawer";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const normalize = pathname.replace(/\/$/, "") || "/";
  const active = (normalize.match(/^\/(es|fr)(?:\/|$)/)?.[1] ?? "en") as Locale;

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (variant === "drawer") {
    return (
      <Box component="nav" aria-label="Language">
        <Typography variant="overline" color="text.secondary" className="mb-2 block px-4 font-bold">
          Language
        </Typography>
        <Stack spacing={0.5}>
          {LOCALES.map((locale) => (
            <ListItemButton
              key={locale}
              component="a"
              href={switcherTarget(normalize, locale)}
              onClick={onNavigate}
              selected={locale === active}
              aria-current={locale === active ? "true" : undefined}
              className="min-h-[44px]"
            >
              <ListItemText
                primary={
                  <Typography className={locale === active ? "font-semibold" : "font-medium"}>
                    {LOCALE_NAME[locale]}
                    {locale === active ? " ✓" : ""}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Stack direction="row" spacing={0.5} className="relative items-center">
      <div ref={rootRef} className="relative">
        <Button
          variant="text"
          color="inherit"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="locale-menu"
          aria-label={`${CODE[active]}, language: ${LOCALE_NAME[active]}`}
          onClick={() => setOpen((value) => !value)}
          startIcon={<TranslateIcon aria-hidden="true" />}
          className="min-h-[44px] px-3 text-[0.8125rem] font-bold tracking-[0.06em]"
        >
          {CODE[active]}
        </Button>
        {open && (
          <ul
            id="locale-menu"
            role="menu"
            aria-label="Language"
            className="menu absolute right-0 top-full z-[1300] mt-1 w-52 rounded-xl border border-base-300 bg-base-100 p-1.5 shadow-[0_12px_32px_rgba(17,17,17,0.12)]"
          >
            {LOCALES.map((locale) => (
              <li key={locale} role="none">
                <a
                  role="menuitem"
                  href={switcherTarget(normalize, locale)}
                  onClick={() => setOpen(false)}
                  aria-current={locale === active ? "page" : undefined}
                  className={`min-h-[44px] rounded-lg px-3 text-sm ${
                    locale === active ? "bg-base-200 font-semibold" : "font-medium"
                  }`}
                >
                  {LOCALE_NAME[locale]}
                  {locale === active ? " ✓" : ""}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Stack>
  );
}
