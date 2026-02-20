import { useGameStateStore, type GameConfig } from '../stores/GameStateStore';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Difficulty } from '../types/Difficulty';
import DifficultySelector from './DifficultySelector';
import CategorySelector from './CategorySelector';
import { type Category } from '../types/Category';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';
import AmountSlider from './AmountSlider';
import { useSnackbar } from 'notistack';
import ModeToggles from './ModeToggles';
import { useState } from 'react';

const MainMenu = () => {
    const startGame = useGameStateStore(s => s.startGame);
    const config = useGameStateStore(s => s.config);
    const [difficulty, setDifficulty] = useState<Difficulty | 'mix'>(config.difficulty);
    const [category, setCategory] = useState<Category>(config.category);
    const [toggles, setToggles] = useState<string[]>(() => [
        config.answers === 'shown' && 'showAnswers',
        config.timer !== 'off' && 'timed',
        config.timer === 'short' && 'short',
        config.timer === 'ultra' && 'shorter',
        config.lives === 'lives' && 'hp',
        config.lives === 'suddenDeath' && 'death',
        config.mode === 'hardcore' && 'hard',
        config.mode === 'speedrun' && 'speeder'
    ].filter(Boolean) as string[]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [amount, setAmount] = useState<number>(config.rounds === 50 ? 30 : config.rounds);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useDocumentTitle('Trivia');

    const handleSubmit = async () => {
        if (loading) return;
        closeSnackbar();

        setLoading(true);

        const config: GameConfig = {
            difficulty,
            rounds: amount,
            timer: toggles.includes('shorter')
                ? 'ultra'
                : toggles.includes('short')
                    ? 'short'
                    : toggles.includes('timed')
                        ? 'normal'
                        : 'off',

            lives: toggles.includes('death')
                ? 'suddenDeath'
                : toggles.includes('hp')
                    ? 'lives'
                    : 'none',

            answers: toggles.includes('showAnswers') ? 'shown' : 'hidden',
            category,
            mode: toggles.includes('hard') ? 'hardcore'
                : toggles.includes('speeder') ? 'speedrun' : 'default'
        };

        try {
            await startGame(config);
            navigate('/trivia/game');
        } catch {
            enqueueSnackbar('Error retrieving questions!', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const hardcoreMode = toggles.includes('hard');

    return (<>
        <Box display='flex' justifyContent='center'>
            <Paper elevation={4} sx={{ p: 3 }}>
                <Box display='flex' flexDirection='column' gap={3} width={400}>
                    <Typography textAlign='center' variant='h4'>Trivia</Typography>

                    <CategorySelector setCategory={setCategory} category={category} hardcoreMode={hardcoreMode} />
                    <DifficultySelector difficulty={difficulty} hardcoreMode={hardcoreMode} setDifficulty={setDifficulty} />
                    <AmountSlider hardcore={hardcoreMode} amount={amount} setAmount={setAmount} />
                    <ModeToggles toggles={toggles} setToggles={setToggles} />

                    <Button variant='contained' onClick={handleSubmit}>
                        Start Quiz
                    </Button>
                </Box>
            </Paper>
        </Box>

        <LoadingOverlay
            open={loading}
            text='Preparing questions...'
        />
    </>);
};

export default MainMenu;
