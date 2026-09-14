import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

export default function ToolPaper({ children, spacing = 2, sx }: { children: ReactNode; spacing?: number; sx?: SxProps<Theme> }) {
  return (
    <Paper
      elevation={0}
      sx={[
        {
          p: { xs: 2, sm: 3, md: 5 },
          borderRadius: "12px",
          bgcolor: "background.paper",
          boxShadow: "var(--shadow-md, 0 0 0 1px rgba(0,0,0,0.06), 0 4px 12px rgba(34,29,29,0.06), 0 1px 2px rgba(34,29,29,0.04))",
          border: "1px solid",
          borderColor: "divider",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Stack spacing={spacing}>{children}</Stack>
    </Paper>
  );
}
