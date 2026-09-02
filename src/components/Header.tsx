"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
      color="inherit"
      sx={{
        background: "transparent",
        backgroundImage: "none",
        backgroundColor: "color-mix(in srgb, var(--mui-palette-background-paper) 68%, transparent)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset",
        borderBottom: "1px solid",
        borderColor: "divider",
        py: 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo — display serif for premium brand */}
          <Box
            component={Link}
            href="/"
            aria-label={`${siteConfig.name} home`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
              minHeight: 44,
              minWidth: 44,
              borderRadius: 2,
              "&:focus-visible": { outlineOffset: 4 },
            }}
          >
            <BuildOutlinedIcon color="primary" aria-hidden="true" />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                fontFamily: "var(--font-display), Fraunces, Georgia, serif",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {siteConfig.name}
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            <Button
              component={Link}
              href="/"
              color={pathname === "/" ? "primary" : "inherit"}
              sx={{ fontWeight: pathname === "/" ? 700 : 500 }}
            >
              Home
            </Button>
            
            <Button
              id="categories-button"
              aria-haspopup="menu"
              aria-expanded={catAnchor?.id === "categories"}
              aria-controls="categories-menu"
              onClick={(e) => setCatAnchor({ el: e.currentTarget, id: "categories" })}
              endIcon={<ArrowDropDownIcon />}
              color={pathname.startsWith("/category") ? "primary" : "inherit"}
              sx={{ fontWeight: pathname.startsWith("/category") ? 700 : 500 }}
            >
              Categories
            </Button>
            <Menu
              id="categories-menu"
              aria-labelledby="categories-button"
              anchorEl={catAnchor?.el ?? null}
              open={catAnchor?.id === "categories"}
              onClose={() => setCatAnchor(null)}
            >
              {grouped.map((g) => (
                <MenuItem
                  key={g.category.id}
                  component={Link}
                  href={`/category/${g.category.id}`}
                  onClick={() => setCatAnchor(null)}
                  selected={pathname === `/category/${g.category.id}`}
                >
                  {g.category.label}
                </MenuItem>
              ))}
            </Menu>

            <ToolSearch sx={{ width: 260, mx: 1 }} />

            <IconButton onClick={toggle} aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"} title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"} sx={{ color: mode === "light" ? "#5c6bc0" : "#ffb74d", width: 44, height: 44 }}>
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>

          {/* Mobile Nav Toggle */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
            <IconButton onClick={toggle} aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"} sx={{ color: mode === "light" ? "#5c6bc0" : "#ffb74d", width: 44, height: 44 }}>
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <IconButton color="inherit" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-drawer" onClick={() => setOpen(true)} sx={{ width: 44, height: 44 }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} id="mobile-drawer">
        <Box component="nav" aria-label="Mobile navigation" sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Menu</Typography>
            <IconButton onClick={() => setOpen(false)} aria-label="Close navigation menu" sx={{ width: 44, height: 44 }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <ToolSearch sx={{ width: "100%", mb: 3 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/" onClick={() => setOpen(false)} selected={pathname === "/"}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ pt: 2, pb: 1 }}>
              <Typography variant="overline" color="text.secondary">Categories</Typography>
            </ListItem>
            {grouped.map((g) => (
              <ListItem disablePadding key={g.category.id}>
                <ListItemButton 
                  component={Link} 
                  href={`/category/${g.category.id}`} 
                  onClick={() => setOpen(false)}
                  selected={pathname === `/category/${g.category.id}`}
                >
                  <ListItemText primary={g.category.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}