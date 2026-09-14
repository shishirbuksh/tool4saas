"use client";

import React, { useState, useCallback } from 'react';
import { Stack, Box, Button, TextField, Typography } from '@mui/material';
import ToolPaper from "@/components/ToolPaper";

export default function RandomHexColorTool() {
  const [numColors, setNumColors] = useState<number>(5);
  const [colors, setColors] = useState<string[]>([]);

  const generateSecureHexColor = (): string => {
    // Generate a secure 32-bit random integer
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    
    // Mask to 24 bits to avoid modulo bias (2^32 is perfectly divisible by 2^24)
    // 0xFFFFFF is 16777215. Each bit in the 32-bit random value has maximum entropy.
    const colorInt = randomBuffer[0] & 0xFFFFFF;
    
    // Convert to hex and pad with zeros to ensure 6 characters
    return '#' + colorInt.toString(16).padStart(6, '0').toUpperCase();
  };

  const handleGenerate = useCallback(() => {
    const count = Math.max(1, Math.min(50, numColors)); // limit between 1 and 50
    const newColors = Array.from({ length: count }, generateSecureHexColor);
    setColors(newColors);
  }, [numColors]);

  return (
    <ToolPaper>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        Secure Random Hex Color Generator
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center", flexWrap: "wrap" }}>
        <TextField
          type="number"
          label="Number of Colors"
          variant="outlined"
          value={numColors}
          onChange={(e) => setNumColors(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
          slotProps={{ input: { inputMode: "numeric" } }}
        />
        <Button variant="contained" color="primary" onClick={handleGenerate} size="large">
          Generate Palette
        </Button>
      </Stack>

      {colors.length > 0 ? (
        <Box sx={{ p: 1, border: "1px solid", borderColor: "divider", borderRadius: 2, bgcolor: "background.paper" }}>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
            {colors.map((color, idx) => (
              <Box key={idx} sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: color,
                    borderRadius: 1,
                    border: "1px solid #ccc",
                    mb: 1,
                  }}
                />
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  {color}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Choose a number and generate a palette — colors appear with copy-ready hex.
        </Typography>
      )}
    </ToolPaper>
  );
}
