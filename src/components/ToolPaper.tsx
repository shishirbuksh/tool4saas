import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material";
import type { ReactNode } from "react";

export default function ToolPaper({ children, spacing = 2, sx }: { children: ReactNode; spacing?: number; sx?: SxProps }) {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: { xs: 2, sm: 3, md: 5 }, 
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)",
        border: "1px solid",
        borderColor: "divider",
        ...((sx as object) ?? {}) 
      }}
    >
      <Stack spacing={spacing}>{children}</Stack>
    </Paper>
  );
}
