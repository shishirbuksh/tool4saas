"use client";

import React, { useState, useEffect } from 'react';
import { Stack, Typography, Alert, Card, CardContent, Button, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ToolPaper from "@/components/ToolPaper";

// Calculate Greatest Common Divisor
const getGCD = (a: number, b: number): number => {
    return b === 0 ? a : getGCD(b, a % b);
};

const BREAKPOINTS = [
    { name: "Mobile", width: "≤ 640px", use: "Single column, 390×844 @3x phones" },
    { name: "Tablet", width: "641–1024px", use: "Two columns, 768×1024 portrait" },
    { name: "Laptop", width: "1025–1440px", use: "Full nav, 1440×900 @2x retina" },
    { name: "Desktop", width: "> 1440px", use: "Wide grids, 1920×1080 @1x" },
];

export default function ScreenResolutionTool() {
    const [metrics, setMetrics] = useState<{
        screenWidth: number;
        screenHeight: number;
        innerWidth: number;
        innerHeight: number;
        pixelRatio: number;
        colorDepth: number;
        aspectRatio: string;
    } | null>(null);
    const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;
                const innerWidth = window.innerWidth;
                const innerHeight = window.innerHeight;
                const pixelRatio = window.devicePixelRatio;
                const colorDepth = window.screen.colorDepth;

                const gcd = getGCD(screenWidth, screenHeight);
                const aspectRatio = `${screenWidth / gcd}:${screenHeight / gcd}`;

                setMetrics({
                    screenWidth,
                    screenHeight,
                    innerWidth,
                    innerHeight,
                    pixelRatio,
                    colorDepth,
                    aspectRatio
                });
            };

            // Initial calculation
            handleResize();

            // Update on resize
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    if (!metrics) {
        return (
          <ToolPaper>
            <Alert severity="info">Calculating screen metrics...</Alert>
          </ToolPaper>
        );
    }

    const cards: { label: string; value: string }[] = [
        { label: "Screen Resolution", value: `${metrics.screenWidth} x ${metrics.screenHeight}` },
        { label: "Viewport (Inner Size)", value: `${metrics.innerWidth} x ${metrics.innerHeight}` },
        { label: "Aspect Ratio", value: metrics.aspectRatio },
        { label: "Device Pixel Ratio", value: String(metrics.pixelRatio) },
        { label: "Color Depth", value: `${metrics.colorDepth}-bit` },
    ];

    return (
        <ToolPaper>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Screen Resolution Dashboard
            </Typography>
            <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>
                {cards.map((c) => (
                <Card key={c.label} sx={{ minWidth: 200, flex: 1 }}>
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                            {c.label}
                        </Typography>
                        <Typography variant="h5">
                            {c.value}
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<ContentCopyIcon />}
                          onClick={() => copy(`${c.label}: ${c.value}`)}
                          sx={{ mt: 1 }}
                        >
                          Copy
                        </Button>
                    </CardContent>
                </Card>
                ))}
            </Stack>
            <Box sx={{ mt: 2 }}>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() =>
                    copy(
                      `Screen ${metrics.screenWidth}x${metrics.screenHeight}, viewport ${metrics.innerWidth}x${metrics.innerHeight}, DPR ${metrics.pixelRatio}, ${metrics.colorDepth}-bit, aspect ${metrics.aspectRatio}`
                    )
                  }
                >
                  Copy all metrics
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }} gutterBottom>
                    DPR & breakpoint guide
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    DPR (device pixel ratio) is physical pixels per CSS pixel: a DPR of 2 means a
                    375pt-wide iPhone renders 750 physical pixels, so export images at 2x. Viewport
                    shrinks with zoom, sidebars and devtools while hardware pixels stay fixed.
                </Typography>
                <Table size="small" aria-label="DPR and breakpoint explainer">
                    <TableHead>
                        <TableRow>
                            <TableCell>Breakpoint</TableCell>
                            <TableCell>Viewport width</TableCell>
                            <TableCell>Design tip</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {BREAKPOINTS.map((b) => (
                            <TableRow key={b.name}>
                                <TableCell>{b.name}</TableCell>
                                <TableCell>{b.width}</TableCell>
                                <TableCell>{b.use}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </ToolPaper>
    );
}
