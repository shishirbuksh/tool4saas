"use client";

import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ToolSearchIsland = dynamic(() => import("@/components/ToolSearch"), {
  ssr: false,
  loading: () => (
    <Box sx={{ py: 1.5, px: 2, border: "1px solid", borderColor: "divider", borderRadius: "8px" }}>
      <Typography color="text.secondary" variant="body2">
        Search tools...
      </Typography>
    </Box>
  ),
}) as any;

export default ToolSearchIsland;
