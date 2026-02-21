import BrowseGalleryRoundedIcon from '@mui/icons-material/BrowseGalleryRounded';
import WhatshotIcon from "@mui/icons-material/WhatshotRounded";
import FlashOnIcon from "@mui/icons-material/FlashOnRounded";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const timerModes = [
    { label: "Normal — 30s", icon: <BrowseGalleryRoundedIcon />, color: "primary" },
    { label: "Short — 10s", icon: <FlashOnIcon />, color: "warning" },
    { label: "Ultra — 3s", icon: <WhatshotIcon />, color: "error" },
] as const;

const TimedPage = () => (<Paper elevation={6}
    sx={{
        p: 4,
        borderRadius: 4,
        background: theme =>
            `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        border: theme => `1px solid ${theme.palette.divider}`,
        boxShadow: theme => `0 0 20px ${theme.palette.primary.main}33`,
    }}>
    <Stack spacing={3}>
        <Box>
            <Typography variant="h4"
                fontWeight={900}
                color="primary.main"
                sx={{ letterSpacing: 1 }}>
                <BrowseGalleryRoundedIcon /> Timer Rules
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Each question must be answered before the countdown ends. Be fast or fail!
            </Typography>
        </Box>

        <Stack direction="row" flexWrap="wrap" gap={1.5}>
            {timerModes.map(mode => (
                <Chip key={mode.label}
                    icon={mode.icon}
                    label={mode.label}
                    color={mode.color}
                    variant="outlined"
                    sx={{ fontWeight: 600, borderWidth: 2 }}
                />
            ))}
        </Stack>

        <Typography variant="body2" color="text.secondary">
            If time runs out, the question is automatically marked as failed.
        </Typography>
    </Stack>
</Paper>);

export default TimedPage;
