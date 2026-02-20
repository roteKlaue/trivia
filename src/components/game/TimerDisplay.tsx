import { useGameStateStore, durationMap } from "../../stores/GameStateStore";
import { Box, CircularProgress, Typography } from "@mui/material";

const TimerDisplay = () => {
    const { config, timerRemaining } = useGameStateStore();
    if (config.timer === "off") return null;

    return (<Box display="flex" alignItems="center" gap={2}>
        <Typography>
            Time left: {timerRemaining}s
        </Typography>

        <CircularProgress
            variant="determinate"
            value={100 - (timerRemaining / (durationMap[config.timer]) * 100)}
        />
    </Box>)
}

export default TimerDisplay;
