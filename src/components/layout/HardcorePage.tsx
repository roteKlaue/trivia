import BrowseGalleryRoundedIcon from '@mui/icons-material/BrowseGalleryRounded';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffRounded';
import WarningAmberIcon from '@mui/icons-material/WarningAmberRounded';
import WhatshotIcon from '@mui/icons-material/WhatshotRounded';
import { useThemeStore } from '../../stores/ThemeStore';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Typography from '@mui/material/Typography';
import { FireComponent } from '../FireComponent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const features = [
    { label: 'Hard difficulty', icon: <WarningAmberIcon /> },
    { label: 'Ultra timer (3s)', icon: <BrowseGalleryRoundedIcon /> },
    { label: 'Sudden death (one life)', icon: <WhatshotIcon /> },
    { label: '50 questions', icon: <ClearAllIcon /> },
    { label: 'Answers hidden', icon: <VisibilityOffIcon /> },
];

const HardcorePage = () => {
    const { activeTheme } = useThemeStore();

    return (<Paper elevation={8}
        sx={{
            p: 4,
            borderRadius: 4,
            background: theme =>
                `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
            border: theme => `1px solid ${theme.palette.error.dark}`,
            boxShadow: theme => `0 0 30px ${theme.palette.error.main}33`,
        }}>
        <Stack spacing={3}>
            <Box>
                <Stack direction='row' alignItems={'center'} justifyContent={'flex-start'}>
                    {activeTheme === 'fire' ? <FireComponent position={{ x: 0, y: 0 }} sx={{ transform: 'scale(2)', width: 32 }} /> : <Typography variant='h4'
                        fontWeight={900}
                        color='error.main'
                        sx={{ letterSpacing: 1 }}>
                        🔥
                    </Typography>}
                    <Typography variant='h4'
                        fontWeight={900}
                        color='error.main'
                        sx={{ letterSpacing: 1 }}>
                        Hardcore Mode
                    </Typography>
                </Stack>

                <Typography variant='body2' color='text.secondary'>
                    No mercy. No second chances. Survive all 50 questions or fail.
                </Typography>
            </Box>

            <Stack direction='row' flexWrap='wrap' gap={1.2}>
                {features.map(f => (
                    <Chip key={f.label}
                        icon={f.icon}
                        label={f.label}
                        color='error'
                        variant='outlined'
                        sx={{
                            fontWeight: 600,
                            borderWidth: 2,
                        }} />
                ))}
            </Stack>
        </Stack>
    </Paper>);
}

export default HardcorePage;
