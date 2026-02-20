import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 800,
            lg: 1200,
            xl: 1536,
        },
    },
});

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 800,
            lg: 1200,
            xl: 1536,
        },
    },
});
