import { ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeStore } from "../stores/ThemeStore";

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useThemeStore((state) => state.getCurrentTheme());

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
