"use client";

import { useState } from "react";
import React from "react";
import MuiNextLink from "@/components/MuiNextLink";

const LinkWrapper = MuiNextLink;
import { usePathname } from "@/lib/astro/navigation";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import ToolSearch from "@/components/ToolSearch";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
// CATEGORIES only (tiny, no catalogue data) — keeps the global header chunk
// lean on every page. Full tool objects must never enter client bundles here.
import { CATEGORIES } from "@/lib/tools/categories";
import { siteConfig } from "@/lib/site";
import { useThemeMode } from "@/components/ThemeProviderClient";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Rendered directly (not lazy): the header search + menus are above the fold
// and Astro SSRs them, so there is no hydration-time layout shift.
const DrawerDynamic = Drawer as any;
const MenuDynamic = Menu as any;
const ToolSearchDynamic = ToolSearch as any;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [catAnchor, setCatAnchor] = useState<null | { el: HTMLElement; id: string }>(null);
  const pathname = usePathname();
  const homeHref = pathname?.startsWith("/es") ? "/es" : pathname?.startsWith("/fr") ? "/fr" : "/";
  // Same { category } shape as toolsByCategoryCached() groups so the menu,
  // noscript fallback and drawer below work unchanged — minus tool payloads.
  const grouped = CATEGORIES.map((category) => ({ category }));
  const { mode, toggle } = useThemeMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        backgroundColor: "background.default",
        borderRadius: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)",
        // Dark glass match — mirrors .glass[data-theme="dark"] inset + soft shadows
        'html[data-theme="dark"] &': {
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4)",
        },
        transition: "background-color 200ms cubic-bezier(0.16,1,0.3,1)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 80 }, justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={LinkWrapper}
            href={homeHref}
            aria-label={`${siteConfig.name} home`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              color: "inherit",
              "&:focus-visible": { outlineOffset: 4 },
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              p: 1, 
              borderRadius: '12px',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: '0 1px 2px rgba(34,29,29,0.08)',
            }}>
              <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
            </Box>
            <Typography
              component="span"
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                fontFamily: "var(--font-display), Fraunces, Georgia, serif",
                letterSpacing: "-0.03em",
                fontSize: "1.25rem",
              }}
            >
              {siteConfig.name}
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box component="nav" aria-label="Primary" sx={{ display: { xs: "none", lg: "flex" } }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <Button
                component={LinkWrapper}
                href="/#tools"
                disableElevation
                color={pathname === "/" ? "primary" : "inherit"}
                sx={{
                  fontWeight: pathname === "/" ? 600 : 500,
                  px: 1.5,
                  minHeight: 44,
                }}
              >
                Tools
              </Button>

              <Button
                id="categories-button"
                aria-haspopup="menu"
                aria-expanded={catAnchor?.id === "categories"}
                aria-controls="categories-menu"
                onClick={(e) => setCatAnchor({ el: e.currentTarget, id: "categories" })}
                endIcon={<ArrowDropDownIcon aria-hidden="true" />}
                disableElevation
                color={pathname.startsWith("/category") ? "primary" : "inherit"}
                sx={{
                  fontWeight: pathname.startsWith("/category") ? 600 : 500,
                  px: 1.5,
                  minHeight: 44,
                }}
              >
                Categories
              </Button>
              <MenuDynamic
                id="categories-menu"
                aria-labelledby="categories-button"
                anchorEl={catAnchor?.el ?? null}
                open={catAnchor?.id === "categories"}
                onClose={() => setCatAnchor(null)}
                disableScrollLock
                elevation={4}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      width: 460,
                      maxWidth: "calc(100vw - 32px)",
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '12px',
                      backgroundColor: "background.paper",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 12px 32px rgba(0,0,0,0.08)",
                      'html[data-theme="dark"] &': {
                        boxShadow: "0 1px 2px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.5)",
                      },
                    }
                  },
                  list: {
                    sx: {
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 0.5,
                      p: 1,
                    },
                  },
                }}
              >
                {grouped.map((g) => (
                  <MenuItem
                    key={g.category.id}
                    component={LinkWrapper}
                    href={`/category/${g.category.id}`}
                    onClick={() => setCatAnchor(null)}
                    selected={pathname === `/category/${g.category.id}`}
                    aria-current={pathname === `/category/${g.category.id}` ? "page" : undefined}
                    sx={{ minHeight: 44, px: 2, borderRadius: "8px" }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {g.category.label}
                    </Typography>
                  </MenuItem>
                ))}
              </MenuDynamic>

              <Button
                component={LinkWrapper}
                href="/blog"
                disableElevation
                color={pathname.startsWith("/blog") ? "primary" : "inherit"}
                aria-current={pathname.startsWith("/blog") ? "page" : undefined}
                sx={{
                  fontWeight: pathname.startsWith("/blog") ? 600 : 500,
                  px: 1.5,
                  minHeight: 44,
                }}
              >
                Guides
              </Button>
              <Button
                component={LinkWrapper}
                href="/about"
                disableElevation
                color={pathname === "/about" ? "primary" : "inherit"}
                aria-current={pathname === "/about" ? "page" : undefined}
                sx={{
                  fontWeight: pathname === "/about" ? 600 : 500,
                  px: 1.5,
                  minHeight: 44,
                }}
              >
                About
              </Button>
              <Button
                component={LinkWrapper}
                href="/contact"
                disableElevation
                color={pathname === "/contact" ? "primary" : "inherit"}
                aria-current={pathname === "/contact" ? "page" : undefined}
                sx={{
                  fontWeight: pathname === "/contact" ? 600 : 500,
                  px: 1.5,
                  minHeight: 44,
                }}
              >
                Contact
              </Button>

              <Box sx={{ pl: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LanguageSwitcher />
                <Box sx={{ width: 208, height: 44, flexShrink: 0 }}>
                  <ToolSearchDynamic sx={{ width: "100%" }} />
                </Box>
                <IconButton
                  onClick={toggle}
                  aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
                  sx={{
                    width: 44,
                    height: 44,
                    color: "text.primary",
                    bgcolor: mode === "light" ? "transparent" : "rgba(255,255,255,0.06)",
                    "&:hover": {
                      bgcolor: mode === "light" ? "action.hover" : "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  {mode === "light" ? <Brightness4Icon fontSize="small" aria-hidden="true" /> : <Brightness7Icon fontSize="small" aria-hidden="true" />}
                </IconButton>
              </Box>
            </Stack>
          </Box>

          {/* Mobile Nav Toggle */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center" }}>
            <IconButton 
              onClick={toggle} 
              aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
              sx={{ width: 48, height: 48 }}
            >
              {mode === "light" ? <Brightness4Icon fontSize="small" aria-hidden="true" /> : <Brightness7Icon fontSize="small" aria-hidden="true" />}
            </IconButton>
            <IconButton 
              color="inherit" 
              aria-label="Open navigation menu" 
              aria-expanded={open}
              aria-controls="mobile-navigation-drawer"
              onClick={() => setOpen(true)}
              sx={{ width: 48, height: 48 }}
            >
              <MenuIcon aria-hidden="true" />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* noscript fallback: Drawer/Menu/ToolSearch are ssr:false so SSR HTML has
          zero category links without this. Plain anchors for all 12 hubs + home.
          <noscript> content never hydrates — zero hydration risk. */}
      <noscript>
        <div style={{ padding: "8px 16px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- noscript SSR fallback, no router */}
          <a href="/">Home</a>
          {grouped.map((g) => (
            <a key={g.category.id} href={`/category/${g.category.id}`}>
              {g.category.label}
            </a>
          ))}
        </div>
      </noscript>

      {/* Mobile Drawer — MUI Drawer traps focus by default (Modal focus-trap + Escape to close); no custom trap needed. */}
      <DrawerDynamic
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { "aria-labelledby": "mobile-navigation-title" } }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 360 }, maxWidth: '100vw', boxSizing: 'border-box', p: 3, pt: 'max(24px, env(safe-area-inset-top))', pb: 'calc(24px + env(safe-area-inset-bottom))', pl: 'calc(24px + env(safe-area-inset-left))', pr: 'calc(24px + env(safe-area-inset-right))', overscrollBehavior: 'contain' } }}
      >
        <Box id="mobile-navigation-drawer" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ display: 'flex', p: 1, borderRadius: '12px', bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: '0 1px 2px rgba(34,29,29,0.08)' }}>
              <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
            </Box>
            <Typography component="h2" id="mobile-navigation-title" sx={{ fontWeight: 800, fontFamily: "var(--font-display), serif", fontSize: "1.125rem", m: 0 }}>
              Menu
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} aria-label="Close menu" sx={{ width: 48, height: 48 }}>
            <CloseIcon aria-hidden="true" />
          </IconButton>
        </Box>
        <ToolSearchDynamic sx={{ width: "100%", mb: 4 }} />
        <LanguageSwitcher variant="drawer" onNavigate={() => setOpen(false)} />
        <Box component="nav" aria-label="Mobile">
          <List sx={{ px: 0 }}>
            {[
              { label: "Home", href: "/" },
              { label: "All tools", href: "/#tools" },
              { label: "Guides", href: "/blog" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((l) => {
              const isActive = pathname === l.href;
              return (
                <ListItem disablePadding key={l.href} sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component={LinkWrapper}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    selected={isActive}
                    aria-current={isActive ? "page" : undefined}
                    sx={{ minHeight: 44, borderRadius: "8px" }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: isActive ? 600 : 500 }}>
                          {l.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: "block", mt: 3, mb: 1, px: 1, fontWeight: 700 }}
          >
            Categories
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              m: 0,
              p: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0.5,
            }}
          >
            {grouped.map((g) => {
              const href = `/category/${g.category.id}`;
              const isActive = pathname === href;
              return (
                <ListItem disablePadding key={g.category.id}>
                  <ListItemButton
                    component={LinkWrapper}
                    href={href}
                    onClick={() => setOpen(false)}
                    selected={isActive}
                    aria-current={isActive ? "page" : undefined}
                    sx={{ minHeight: 44, borderRadius: "8px", px: 1.5 }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: isActive ? 600 : 500, fontSize: "0.875rem" }}>
                          {g.category.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
        </Box>
        <Box
          component="nav"
          aria-label="Legal"
          sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 0.5 }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "llms.txt", href: "/llms.txt" },
            ].map((l) => (
              <Button
                key={l.href}
                component={LinkWrapper}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
                color={pathname === l.href ? "primary" : "inherit"}
                size="small"
                sx={{ minHeight: 44, px: 1.5, fontSize: "0.8125rem", fontWeight: 500 }}
              >
                {l.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </DrawerDynamic>
    </AppBar>
  );
}
