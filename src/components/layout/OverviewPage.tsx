import AutoStoriesIcon from '@mui/icons-material/AutoStoriesRounded';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { pageDefs } from "./HelpConst";
import Box from '@mui/material/Box';
import { type FC } from "react";

type Props = {
    setIndex: (i: number) => void;
};

const OverviewPage: FC<Props> = ({ setIndex }) => {
    return (
        <Box>
            <Stack spacing={2} mb={2}>
                <Typography variant="h4"
                    fontWeight={900}
                    color="primary.main"
                    sx={{ letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AutoStoriesIcon /> Overview
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Test your knowledge across different categories and difficulties. Earn points for correct answers, watch your lives and timer, and try to reach the highest score!
                </Typography>
            </Stack>

            <Divider />
            <Typography variant="h6" mb={2}>
                Choose a topic to learn more about:
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                    },
                    gap: 2,
                }}
            >
                {pageDefs
                    .filter(p => p.id !== 'overview')
                    .map((p, i) => (
                        <Paper
                            key={p.id}
                            onClick={() => setIndex(i + 1)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                cursor: 'pointer',
                                '&:hover': { boxShadow: 6 },
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                {p.icon}
                                <Typography>{p.label}</Typography>
                            </Box>
                        </Paper>
                    ))}
            </Box>
        </Box>
    );
};

export default OverviewPage;
