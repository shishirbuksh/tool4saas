import { createTheme } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles";
import { breakpoints, shape, transitions, lightShadows, darkShadows } from "@/theme/tokens";
import { lightPalette, darkPalette } from "@/theme/palette";
import { typography } from "@/theme/typography";
import { lightComponents, buildDarkComponents } from "@/theme/components";

export const theme = createTheme({
  breakpoints,
  palette: lightPalette,
  shape,
  shadows: lightShadows as Shadows,
  transitions,
  typography,
  spacing: 8,
  components: lightComponents,
});

export const darkTheme = createTheme({
  ...theme,
  palette: darkPalette,
  shadows: darkShadows as Shadows,
  components: buildDarkComponents(lightComponents),
});
