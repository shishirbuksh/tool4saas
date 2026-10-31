import { Paper, Stack } from "@/components/ds";

import type { ReactNode } from "react";

export default function ToolPaper({
  children,
  spacing = 2,
  className = "",
}: {
  children: ReactNode;
  spacing?: number;
  className?: string;
}) {
  return (
    <Paper elevation={0} className={`p-4 sm:p-6 ${className}`}>
      <Stack spacing={spacing}>{children}</Stack>
    </Paper>
  );
}
