import { ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeStore } from "../stores/ThemeStore";
import defaultTheme from "../styling/DarkTheme.ts";
import lightTheme from "../styling/LightTheme.ts";

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);

    return (
        <ThemeProvider theme={isDarkMode ? defaultTheme : lightTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
