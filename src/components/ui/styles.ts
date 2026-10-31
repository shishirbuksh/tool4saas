export const useTheme = () => ({
  palette: {
    mode: "light",
    primary: { main: "#111111" },
    text: { primary: "#111111", secondary: "#666666" },
    background: { default: "#FCFCF9", paper: "#FFFFFF" },
  },
});
export const ThemeProvider = ({ children }: { children: any }) => children;
export const createTheme = () => ({});
export const CssBaseline = () => null;
export default { useTheme, ThemeProvider, createTheme, CssBaseline };
