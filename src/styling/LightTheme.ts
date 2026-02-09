import { createTheme } from "@mui/material";

export default createTheme({
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
