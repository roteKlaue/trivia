import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { ToggleButton } from "@mui/material";
import type { FC } from 'react';

type Props = {
    index: number;
    round: number;
    correct: boolean;
}

const QuestionSelectButton: FC<Props> = ({ index, round, correct }) => {
    const color = index > round
        ? undefined
        : correct === true
            ? "success"
            : index === round ? "primary" : "error";

    return (<ToggleButton
        key={index}
        value={index}
        disabled={index > round}
    >
        <SquareRoundedIcon color={color} />
    </ToggleButton>);
}

export default QuestionSelectButton;