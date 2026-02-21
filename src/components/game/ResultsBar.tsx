import { useGameStateStore } from '../../stores/GameStateStore';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import QuestionSelectButton from './QuestionSelectButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Question } from '../../types/Question';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import type { FC } from 'react';

type Props = {
    question: Question;
    setQuestion: (question: Question) => void;
};

const ResultsBar: FC<Props> = ({ setQuestion, question }) => {
    const { questions, round, config } = useGameStateStore();

    const findIndex = (question: Question | null) => {
        const index = question ? questions.findIndex(q => q.question.id === question.id) : -1;
        return index;
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (index: number) => {
        if (index === void 0 || index === null) return;
        setQuestion(questions[index].question);
    };

    if (isMobile || config.rounds > 30) {
        return (<Box px={1}>
            <Select fullWidth={isMobile}
                value={findIndex(question)}
                onChange={e => handleChange(Number(e.target.value))}
                sx={{ marginLeft: isMobile ? 0 : 10 }}>
                {questions.map((q, index) => {
                    const isCurrent = !(index > round);

                    const symbol =
                        (!isCurrent) ? '•'
                            : !q.state.answered
                                ? '▶'
                                : q.state.correct === true
                                    ? '✓'
                                    : '✗';

                    return (<MenuItem key={index} value={index} disabled={index > round}>
                        {symbol} Q{`${index + 1}`.padStart(2, '0')}
                    </MenuItem>);
                })}
            </Select>
        </Box>);
    }

    return (<ToggleButtonGroup exclusive
        fullWidth
        onChange={(_, value) => setQuestion(questions[value].question)}
        sx={{
            '& .MuiToggleButtonGroup-grouped': {
                textTransform: 'uppercase',
                fontWeight: 1200,
                px: 2,
            },
        }}>
        {questions.map((_, index) => (<QuestionSelectButton
            key={index}
            index={index}
            correct={questions[index].state.correct}
            round={round} />))}
    </ToggleButtonGroup>);
};

export default ResultsBar;
