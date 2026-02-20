import { FormControl, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import type { Difficulty } from "../types/Difficulty";
import type { FC } from "react";

const difficulties: (Difficulty | 'mix')[] = ['easy', 'medium', 'hard', 'mix'];

type Props = {
    difficulty: Difficulty | 'mix';
    hardcoreMode: boolean;
    setDifficulty: (difficulty: Difficulty | 'mix') => void;
}

const DifficultySelector: FC<Props> = ({ hardcoreMode, difficulty, setDifficulty }) => (<FormControl>
    <Typography marginBottom={1}>Difficulty</Typography>

    <ToggleButtonGroup
        exclusive
        fullWidth
        disabled={hardcoreMode}
        value={hardcoreMode ? 'hard' : difficulty}
        onChange={(_, value) => {
            if (!value) return;
            setDifficulty(value as Difficulty | 'mix');
        }}
        sx={{
            '& .MuiToggleButtonGroup-grouped': {
                textTransform: 'uppercase',
                fontWeight: 600,
                px: 2,
            },
        }}
    >
        {difficulties.map((diff) => (
            <ToggleButton key={diff} value={diff}>
                {diff}
            </ToggleButton>
        ))}
    </ToggleButtonGroup>
</FormControl>);

export default DifficultySelector;
