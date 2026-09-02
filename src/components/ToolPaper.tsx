import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material";
import type { ReactNode } from "react";

export default function ToolPaper({ children, spacing = 2, sx }: { children: ReactNode; spacing?: number; sx?: SxProps }) {
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, ...((sx as object) ?? {}) }}>
      <Stack spacing={spacing}>{children}</Stack>
    </Paper>
  );
}
