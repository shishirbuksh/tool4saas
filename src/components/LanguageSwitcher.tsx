"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import MuiNextLink from "@/components/MuiNextLink";
import Button from "@mui/material/Button";
import TranslateIcon from "@mui/icons-material/Translate";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LOCALES, LOCALE_NAME, switcherTarget, type Locale } from "@/lib/i18n";

const MenuDynamic = dynamic(() => import("@mui/material/Menu"), {
  ssr: false,
  loading: () => null,
}) as any;

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
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const normalize = pathname.replace(/\/$/, "") || "/";
  const active = (normalize.match(/^\/(es|fr)(?:\/|$)/)?.[1] ?? "en") as Locale;

  if (variant === "drawer") {
    return (
      <Box component="nav" aria-label="Language">
        <Typography variant="overline" color="text.secondary" sx={{ display: "block", mt: 3, mb: 1, px: 2, fontWeight: 700 }}>
          Language
        </Typography>
        <Stack spacing={0.5}>
          {LOCALES.map((l) => (
            <ListItemButton
              key={l}
              component={MuiNextLink}
              href={switcherTarget(normalize, l)}
              onClick={onNavigate}
              selected={l === active}
              aria-current={l === active ? "true" : undefined}
              sx={{ minHeight: 44 }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: l === active ? 600 : 500 }}>
                    {LOCALE_NAME[l]}
                    {l === active ? " ✓" : ""}
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
    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
      <Button
        aria-haspopup="menu"
        aria-expanded={Boolean(anchor)}
        aria-controls="locale-menu"
        aria-label="Language"
        onClick={(e) => setAnchor(e.currentTarget)}
        startIcon={<TranslateIcon aria-hidden="true" />}
        disableElevation
        color="inherit"
        sx={{ px: 1.5, minHeight: 40, fontWeight: 700, fontSize: "0.8125rem", letterSpacing: "0.06em" }}
      >
        {CODE[active]}
      </Button>
      <MenuDynamic
        id="locale-menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        disableScrollLock
        elevation={4}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 200,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "background.paper",
            },
          },
        }}
      >
        {LOCALES.map((l) => (
          <ListItemButton
            key={l}
            component={MuiNextLink}
            href={switcherTarget(normalize, l)}
            onClick={() => setAnchor(null)}
            selected={l === active}
            aria-current={l === active ? "true" : undefined}
            sx={{ py: 1.5, px: 2.5, minHeight: 44 }}
          >
            <Typography variant="body2" sx={{ fontWeight: l === active ? 700 : 500 }}>
              {LOCALE_NAME[l]}
              {l === active ? " ✓" : ""}
            </Typography>
          </ListItemButton>
        ))}
      </MenuDynamic>
    </Stack>
  );
}
