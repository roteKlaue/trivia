import {
    FormControl,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Select,
    MenuItem,
    useMediaQuery,
} from '@mui/material';
import type { Difficulty } from '../types/Difficulty';
import type { FC } from 'react';

const difficulties: (Difficulty | 'mix')[] = ['easy', 'medium', 'hard', 'mix'];

type Props = {
    difficulty: Difficulty | 'mix';
    hardcoreMode: boolean;
    setDifficulty: (difficulty: Difficulty | 'mix') => void;
};

const DifficultySelector: FC<Props> = ({
    hardcoreMode,
    difficulty,
    setDifficulty,
}) => {
    const isCompact = useMediaQuery('(max-width:390px)');
    const value = hardcoreMode ? 'hard' : difficulty;

    const handleChange = (val: Difficulty | 'mix' | null) => {
        if (!val) return;
        setDifficulty(val);
    };

    return (<FormControl fullWidth>
        <Typography marginBottom={1}>Difficulty</Typography>

        {isCompact ? (<Select
            disabled={hardcoreMode}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            sx={{ textTransform: 'uppercase' }}>
            {difficulties.map((d) => (
                <MenuItem key={d} value={d} sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                    {d}
                </MenuItem>
            ))}
        </Select>) : (<ToggleButtonGroup
            exclusive
            fullWidth
            disabled={hardcoreMode}
            value={value}
            onChange={(_, v) => handleChange(v)}
            sx={{
                '& .MuiToggleButtonGroup-grouped': {
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    px: 2,
                },
            }}>
            {difficulties.map((d) => (
                <ToggleButton key={d} value={d}>
                    {d}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>)}
    </FormControl>);
};

export default DifficultySelector;
