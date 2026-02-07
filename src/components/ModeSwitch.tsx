import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeStore } from "../stores/ThemeStore";
import { IconButton } from "@mui/material";

const ModeSwitch = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();

    return <IconButton onClick={toggleTheme}
        style={{
            transition: "transform 0.3s ease, opacity 0.3s ease, background 0.3s ease",
            transform: isDarkMode ? "rotate(0deg)" : "rotate(360deg)",
            opacity: isDarkMode ? 1 : 0.8,
        }}>
        {isDarkMode ? (
            <LightModeIcon className="theme-toggle-icon" />
        ) : (
            <DarkModeIcon className="theme-toggle-icon" />
        )}
    </IconButton>
}

export default ModeSwitch;
