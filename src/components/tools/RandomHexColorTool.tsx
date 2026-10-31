
import React, { useState, useCallback } from 'react';import { Stack, Box, Button, TextField, Typography } from "@/components/ds";

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
      <Typography variant="h6" gutterBottom className="font-bold">
        Secure Random Hex Color Generator
      </Typography>

      <Stack direction="row" spacing={2} className="mb-4 items-center flex-wrap">
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
        <Box className="p-2 border border-base-300 rounded-[16px] bg-base-100">
          <Stack direction="row" spacing={2} className="flex-wrap gap-4">
            {colors.map((color, idx) => (
              <Box key={idx} className="text-center">
                <Box
                  className="w-[100px] h-[100px] rounded-[8px] border border-[#ccc] mb-2" style={{ backgroundColor: color }}
                />
                <Typography variant="body2" style={{ fontFamily: "monospace" }}>
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
