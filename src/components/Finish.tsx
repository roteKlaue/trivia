import { Box, Button, Paper, Typography, Stack, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGameStateStore } from "../stores/GameStateStore";

const Finish = () => {
    const navigate = useNavigate();
    const { rounds, score } = useGameStateStore();

    if (!rounds) return null; // guard against divide-by-zero

    const percent = Math.round((score / rounds) * 100);

    const message =
        percent === 100 ? "Perfect run!" :
            percent >= 75 ? "Great job!" :
                percent >= 50 ? "Nice!" :
                    "Give it another shot!";

    const handleRestart = () => {
        navigate("/trivia");
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="70vh"
        >
            <Paper elevation={6} sx={{ p: 5, width: 420 }}>
                <Stack spacing={3} alignItems="center">
                    <Typography variant="h4">
                        Quiz Finished
                    </Typography>

                    <Typography variant="h6">
                        {message}
                    </Typography>

                    <Typography variant="h5">
                        {score} / {rounds}
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{ width: "100%", height: 10, borderRadius: 5 }}
                    />

                    <Typography color="text.secondary">
                        {percent}% Correct
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleRestart}
                    >
                        Play Again
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Finish;
