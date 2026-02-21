import { Stack, Typography, Paper, Chip, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const lifeModes = [
    { label: "Start with multiple HP", icon: <FavoriteIcon />, color: "success" },
    { label: "Each wrong answer reduces HP", icon: <HeartBrokenIcon />, color: "warning" },
    { label: "Sudden Death — 1 life only", icon: <WhatshotIcon />, color: "error" },
] as const;

const LivesPage = () => (<Paper elevation={6}
    sx={{
        p: 4,
        borderRadius: 4,
        background: theme =>
            `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        border: theme => `1px solid ${theme.palette.divider}`,
        boxShadow: theme => `0 0 20px ${theme.palette.success.main}33`,
    }}>
    <Stack spacing={3}>
        <Box>
            <Typography variant="h4"
                fontWeight={900}
                color="success.main"
                sx={{ letterSpacing: 1 }}>
                ❤️ Lives System
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Your health determines how many mistakes you can make. Play carefully!
            </Typography>
        </Box>

        <Stack direction="row" flexWrap="wrap" gap={1.5}>
            {lifeModes.map(mode => (
                <Chip key={mode.label}
                    icon={mode.icon}
                    label={mode.label}
                    color={mode.color}
                    variant="outlined"
                    sx={{ fontWeight: 600, borderWidth: 2 }}
                />
            ))}
        </Stack>
    </Stack>
</Paper>);

export default LivesPage;
