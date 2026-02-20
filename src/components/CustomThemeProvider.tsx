import { ThemeProvider } from '@mui/material/styles';
import { useThemeStore } from '../stores/ThemeStore';
import CssBaseline from '@mui/material/CssBaseline';

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useThemeStore((state) => state.getCurrentTheme());

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
