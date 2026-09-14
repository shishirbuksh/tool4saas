"use client";

import React, { useState, useEffect } from 'react';
import { Stack, Typography, Alert, Card, CardContent } from '@mui/material';
import ToolPaper from "@/components/ToolPaper";

// Calculate Greatest Common Divisor
const getGCD = (a: number, b: number): number => {
    return b === 0 ? a : getGCD(b, a % b);
};

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

    return (
        <ToolPaper>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Screen Resolution Dashboard
            </Typography>
            <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>
                <Card sx={{ minWidth: 200, flex: 1 }}>
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                            Screen Resolution
                        </Typography>
                        <Typography variant="h5">
                            {metrics.screenWidth} x {metrics.screenHeight}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 200, flex: 1 }}>
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                            Viewport (Inner Size)
                        </Typography>
                        <Typography variant="h5">
                            {metrics.innerWidth} x {metrics.innerHeight}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 200, flex: 1 }}>
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                            Aspect Ratio
                        </Typography>
                        <Typography variant="h5">
                            {metrics.aspectRatio}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 200, flex: 1 }}>
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                            Device Pixel Ratio
                        </Typography>
                        <Typography variant="h5">
                            {metrics.pixelRatio}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 200, flex: 1 }}>
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                            Color Depth
                        </Typography>
                        <Typography variant="h5">
                            {metrics.colorDepth}-bit
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
        </ToolPaper>
    );
}
