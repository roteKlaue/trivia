import type { SxProps, Theme } from '@mui/material/styles';
import { useThemeStore } from '../stores/ThemeStore';
import { useEffect, useRef, type FC } from 'react';
import Box from '@mui/material/Box';

export const FireCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.translate(0, 16);
        ctx.scale(1, -1);

        const fps = 14;
        const interval = 1000 / fps;

        let prev = Date.now();

        const y = [2, 1, 0, 0, 0, 0, 1, 2];
        const max = [7, 9, 11, 13, 13, 11, 9, 7];
        const min = [4, 7, 8, 10, 10, 8, 7, 4];

        let animationId = 0;

        const flame = (): void => {
            const now = Date.now();
            const dif = now - prev;

            if (dif > interval) {
                prev = now;

                ctx.clearRect(0, 0, 16, 16);

                ctx.strokeStyle = '#d14234';
                let i = 0;

                for (let x = 4; x < 12; x++) {
                    const a =
                        Math.random() * (max[i] - min[i] + 1) + min[i];

                    ctx.beginPath();
                    ctx.moveTo(x + 0.5, y[i++]);
                    ctx.lineTo(x + 0.5, a);
                    ctx.stroke();
                }

                ctx.strokeStyle = '#f2a55f';
                let j = 1;

                for (let x = 5; x < 11; x++) {
                    const a =
                        Math.random() *
                        (max[j] - 5 - (min[j] - 5) + 1) +
                        (min[j] - 5);

                    ctx.beginPath();
                    ctx.moveTo(x + 0.5, y[j++] + 1);
                    ctx.lineTo(x + 0.5, a);
                    ctx.stroke();
                }

                ctx.strokeStyle = '#e8dec5';
                let k = 3;

                for (let x = 7; x < 9; x++) {
                    const a =
                        Math.random() *
                        (max[k] - 9 - (min[k] - 9) + 1) +
                        (min[k] - 9);

                    ctx.beginPath();
                    ctx.moveTo(x + 0.5, y[k++]);
                    ctx.lineTo(x + 0.5, a);
                    ctx.stroke();
                }
            }

            animationId = window.requestAnimationFrame(flame);
        };

        flame();

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={16}
            height={16}
            style={{ imageRendering: 'pixelated', transform: 'rotate(180deg)' }}
        />
    );
};

type Position = {
    x: number;
    y: number;
};

type FireComponentProps = {
    position: Position;
    scale?: number;
    sx?: SxProps;
};

export const FireComponent: FC<FireComponentProps> = ({
    position,
    scale = 2,
    sx
}) => {
    const { activeTheme } = useThemeStore();
    if (!position || activeTheme !== 'fire') return null;

    const sx1: SxProps<Theme> = {
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 16,
        height: 16,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
    };

    return (<Box sx={sx ?? sx1}>
        <FireCanvas />
    </Box>);
};

type FireBackgroundProps = {
    width?: number;
    height?: number;
    scale?: number;
    sx?: SxProps<Theme>;
};

export const FireBackground: FC<FireBackgroundProps> = ({
    width = 24,
    height = 24,
    scale = 1.5,
    sx,
}) => {
    const { activeTheme } = useThemeStore();
    if (activeTheme !== 'fire') return null;
    return (
        <Box
            sx={{
                position: 'absolute',
                width,
                height,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
                pointerEvents: 'none',
                zIndex: 0,
                ...sx,
            }}
        >
            <FireCanvas />
        </Box>
    );
};
