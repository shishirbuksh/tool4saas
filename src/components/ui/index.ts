export { Box, type BoxProps } from "./Box";
export { Typography, type TypographyProps, type TypographyVariant } from "./Typography";
export { Stack, type StackProps } from "./Stack";
export { Button, type ButtonProps } from "./Button";
export { IconButton, type IconButtonProps } from "./IconButton";
export { TextField, type TextFieldProps } from "./TextField";
export { Alert, type AlertProps } from "./Alert";
export { Container, type ContainerProps } from "./Container";
export { Paper, Card, CardContent, CardActionArea, type PaperProps } from "./Paper";
export { Grid, type GridProps } from "./Grid";
export {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  type SelectProps,
  type MenuItemProps,
  type FormControlProps,
  type InputLabelProps,
  type FormControlLabelProps,
} from "./Select";
export { Tabs, Tab, type TabsProps, type TabProps } from "./Tabs";
export { Chip, Badge, type ChipProps } from "./Chip";
export { Slider, Switch, Checkbox, type SliderProps, type SwitchProps, type CheckboxProps } from "./Controls";
export {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  type TableCellProps,
} from "./Table";
export {
  Divider,
  Breadcrumbs,
  LinearProgress,
  Skeleton,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "./Misc";

// Theming shims for legacy calls
export const useTheme = () => ({
  palette: {
    mode: "light",
    primary: { main: "#111111" },
    text: { primary: "#111111", secondary: "#666666" },
    background: { default: "#FCFCF9", paper: "#FFFFFF" },
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => children;
export const CssBaseline = () => null;
export const createTheme = () => ({});
