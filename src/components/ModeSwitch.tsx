import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeStore } from '../stores/ThemeStore';
import { IconButton, Tooltip } from '@mui/material';

const ModeSwitch = () => {
    const { mode, toggleMode } = useThemeStore();

    return (<Tooltip title='Toggle Theme' arrow>
        <IconButton onClick={toggleMode}
            sx={{
                transition: 'transform 0.3s ease, opacity 0.3s ease, background 0.3s ease',
                transform: mode === "dark" ? 'rotate(0deg)' : 'rotate(360deg)',
            }}>
            {mode === "dark" ? (
                <LightModeIcon />
            ) : (
                <DarkModeIcon />
            )}
        </IconButton>
    </Tooltip>);
}

export default ModeSwitch;
