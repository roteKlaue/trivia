import { useGameStateStore } from '../../stores/GameStateStore';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { capitalize } from '@mui/material/utils';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stat from './Stat';

const Finish = () => {
    const { config, score, currentHP } = useGameStateStore();
    const navigate = useNavigate();

    const total = config.rounds;
    const percent = Math.round((score / Math.max(total, 1)) * 100);

    useDocumentTitle(`Trivia - ${percent}% (${score}/${total})`);

    const wrong = total - score;
    const accuracy = percent;

    const message = (() => {
        if (percent === 100) return 'Flawless victory 🏆';
        if (percent >= 90) return 'Outstanding!';
        if (percent >= 75) return 'Great job!';
        if (percent >= 50) return 'Solid run!';
        return 'Give it another shot!';
    })();

    const configLabel = [
        config.mode,
        config.difficulty,
        config.timer !== 'off' && `${config.timer} timer`,
        config.lives !== 'none' && `${currentHP} lives left`,
    ].filter(Boolean).map(e => capitalize(e as string)).join(' • ');

    return (<Box display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='70vh'>
        <Paper elevation={6} sx={{ p: 5, width: 440 }}>
            <Stack spacing={3} alignItems='center'>
                <Typography variant='h4'>Results</Typography>
                <Typography variant='subtitle2' color='text.secondary'>{configLabel}</Typography>
                <Typography variant='h3' fontWeight={700}>{percent}%</Typography>

                <LinearProgress value={percent}
                    variant='determinate'
                    color={percent >= 75 ? 'success' : percent >= 50 ? 'warning' : 'error'}
                    sx={{ width: '100%', height: 12, borderRadius: 6 }}
                />

                <Stack direction='row' spacing={4}>
                    <Stat label='Correct' value={score} />
                    <Stat label='Wrong' value={wrong} />
                    <Stat label='Accuracy' value={`${accuracy}%`} />
                    {currentHP !== -1 && <Stat label='Lives' value={currentHP} />}
                </Stack>

                <Typography variant='h6'>{message}</Typography>
                <Stack spacing={2} width='100%'>
                    <Button variant='contained' size='large' onClick={() => navigate('/trivia')}>
                        Play Again
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    </Box>);
};

export default Finish;
