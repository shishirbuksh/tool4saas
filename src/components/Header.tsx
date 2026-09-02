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
      sx={{
        background: "transparent",
        backgroundColor: "color-mix(in srgb, var(--mui-palette-background-default) 80%, transparent)",
        backdropFilter: "blur(24px) saturate(200%)",
        WebkitBackdropFilter: "blur(24px) saturate(200%)",
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: "background-color 0.2s ease-in-out",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 80 }, justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={Link}
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
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}>
              <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
            </Box>
            <Typography
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
                component={Link}
                href="/"
                disableElevation
                color={pathname === "/" ? "primary" : "inherit"}
                aria-current={pathname === "/" ? "page" : undefined}
                sx={{ 
                  fontWeight: pathname === "/" ? 600 : 500,
                  px: 2,
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
              endIcon={<ArrowDropDownIcon />}
              disableElevation
              color={pathname.startsWith("/category") ? "primary" : "inherit"}
              sx={{ 
                fontWeight: pathname.startsWith("/category") ? 600 : 500,
                px: 2,
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
                  sx: { mt: 1, minWidth: 200, border: '1px solid', borderColor: 'divider' }
                }
              }}
            >
              {grouped.map((g) => (
                <MenuItem
                  key={g.category.id}
                  component={Link}
                  href={`/category/${g.category.id}`}
                  onClick={() => setCatAnchor(null)}
                  selected={pathname === `/category/${g.category.id}`}
                  aria-current={pathname === `/category/${g.category.id}` ? "page" : undefined}
                  sx={{ py: 1.5, px: 2.5 }}
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
                  color: mode === "light" ? "text.secondary" : "warning.main",
                  bgcolor: mode === "light" ? "transparent" : "rgba(255,183,77,0.1)",
                  "&:hover": { bgcolor: "action.hover" }
                }}
              >
                {mode === "light" ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
              </IconButton>
            </Box>
          </Stack>
        </Box>

          {/* Mobile Nav Toggle */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <IconButton 
              onClick={toggle} 
              aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {mode === "light" ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
            </IconButton>
            <IconButton 
              color="inherit" 
              aria-label="Open navigation menu" 
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={() => setOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 360 }, p: 3 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ p: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
              <BuildOutlinedIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "var(--font-display), serif" }}>
              Menu
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <ToolSearch sx={{ width: "100%", mb: 4 }} />
        <Box component="nav">
          <List sx={{ px: 0 }}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                component={Link} 
                href="/" 
                onClick={() => setOpen(false)} 
                selected={pathname === "/"}
                aria-current={pathname === "/" ? "page" : undefined}
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
                  component={Link} 
                  href={`/category/${g.category.id}`} 
                  onClick={() => setOpen(false)}
                  selected={pathname === `/category/${g.category.id}`}
                  aria-current={pathname === `/category/${g.category.id}` ? "page" : undefined}
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