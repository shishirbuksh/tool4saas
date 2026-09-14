"use client";

import { useMemo, useState } from "react";
import React from "react";
import Link from "next/link";

const LinkWrapper = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
  // @ts-expect-error - MUI passes href dynamically
  <Link ref={ref} {...props} />
));
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import { toolsByCategoryCached } from "@/lib/tools";
import { siteConfig } from "@/lib/site";
import { useThemeMode } from "@/components/ThemeProviderClient";
import ToolSearch from "@/components/ToolSearch";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [catAnchor, setCatAnchor] = useState<null | { el: HTMLElement; id: string }>(null);
  const pathname = usePathname();
  const grouped = useMemo(() => toolsByCategoryCached(), []);
  const { mode, toggle } = useThemeMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        background: "transparent",
        backgroundColor: "color-mix(in srgb, var(--mui-palette-background-default) 68%, transparent)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
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
            href="/"
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
          <Box component="nav" sx={{ display: { xs: "none", md: "flex" } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Button
                component={LinkWrapper}
                href="/"
                disableElevation
                color={pathname === "/" ? "primary" : "inherit"}
                aria-current={pathname === "/" ? "page" : undefined}
                sx={{ 
                  fontWeight: pathname === "/" ? 600 : 500,
                  px: 2,
                  minHeight: 44,
                }}
              >
                Home
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
                px: 2,
                minHeight: 44,
              }}
            >
              Categories
            </Button>
            <Menu
              id="categories-menu"
              aria-labelledby="categories-button"
              anchorEl={catAnchor?.el ?? null}
              open={catAnchor?.id === "categories"}
              onClose={() => setCatAnchor(null)}
              elevation={4}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '12px',
                    backgroundColor: "color-mix(in srgb, var(--mui-palette-background-paper) 68%, transparent)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)",
                    'html[data-theme="dark"] &': {
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4)",
                    },
                  }
                }
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
                  sx={{ py: 1.5, px: 2.5, minHeight: 44 }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {g.category.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

            <Box sx={{ pl: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ToolSearch sx={{ width: 280 }} />
              <IconButton 
                onClick={toggle} 
                aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"} 
                sx={{ 
                  width: 44,
                  height: 44,
                  color: mode === "light" ? "text.secondary" : "warning.main",
                  bgcolor: mode === "light" ? "transparent" : "rgba(255,183,77,0.1)",
                  "&:hover": { bgcolor: "action.hover" }
                }}
              >
                {mode === "light" ? <Brightness4Icon fontSize="small" aria-hidden="true" /> : <Brightness7Icon fontSize="small" aria-hidden="true" />}
              </IconButton>
            </Box>
          </Stack>
        </Box>

          {/* Mobile Nav Toggle */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
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

      {/* Mobile Drawer */}
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={() => setOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 360 }, maxWidth: '100vw', boxSizing: 'border-box', p: 3, pt: 'max(24px, env(safe-area-inset-top))', pb: 'calc(24px + env(safe-area-inset-bottom))', pl: 'calc(24px + env(safe-area-inset-left))', pr: 'calc(24px + env(safe-area-inset-right))', overscrollBehavior: 'contain' } }}
      >
        <Box id="mobile-navigation-drawer" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ display: 'flex', p: 1, borderRadius: '12px', bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: '0 1px 2px rgba(34,29,29,0.08)' }}>
              <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
            </Box>
            <Typography component="span" sx={{ fontWeight: 800, fontFamily: "var(--font-display), serif" }}>
              Menu
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} aria-label="Close navigation menu" sx={{ width: 48, height: 48 }}>
            <CloseIcon aria-hidden="true" />
          </IconButton>
        </Box>
        <ToolSearch sx={{ width: "100%", mb: 4 }} />
        <Box component="nav">
          <List sx={{ px: 0 }}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                component={LinkWrapper} 
                href="/" 
                onClick={() => setOpen(false)} 
                selected={pathname === "/"}
                aria-current={pathname === "/" ? "page" : undefined}
                sx={{ minHeight: 44 }}
              >
                <ListItemText primary={<Typography sx={{ fontWeight: pathname === "/" ? 600 : 500 }}>Home</Typography>} />
              </ListItemButton>
            </ListItem>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mt: 3, mb: 1, px: 2, fontWeight: 700 }}>
              Categories
            </Typography>
            {grouped.map((g) => (
              <ListItem disablePadding key={g.category.id} sx={{ mb: 0.5 }}>
                <ListItemButton 
                  component={LinkWrapper} 
                  href={`/category/${g.category.id}`} 
                  onClick={() => setOpen(false)}
                  selected={pathname === `/category/${g.category.id}`}
                  aria-current={pathname === `/category/${g.category.id}` ? "page" : undefined}
                  sx={{ minHeight: 44 }}
                >
                  <ListItemText primary={<Typography sx={{ fontWeight: pathname === `/category/${g.category.id}` ? 600 : 500 }}>{g.category.label}</Typography>} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
