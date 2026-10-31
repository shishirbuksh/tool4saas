// Theme tokens now unified via Tailwind CSS v4 and DaisyUI 5
export const theme = {
  palette: {
    mode: "light",
    primary: { main: "#111111" },
    text: { primary: "#111111", secondary: "#666666" },
    background: { default: "#FCFCF9", paper: "#FFFFFF" },
  },
};

export const darkTheme = {
  palette: {
    mode: "dark",
    primary: { main: "#FFFFFF" },
    text: { primary: "#EDEDED", secondary: "#A3A3A3" },
    background: { default: "#0A0A0A", paper: "#141414" },
  },
};

export default theme;
