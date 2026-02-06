import { useGameStateStore } from "../stores/GameStateStore";
import QuestionSelectButton from "./QuestionSelectButton";
import { ToggleButtonGroup } from "@mui/material";
import type { Question } from "../types/Question";
import type { FC } from "react";

type Props = {
    setQuestion: (question: Question) => void;
}

const ResultsBar: FC<Props> = ({ setQuestion }) => {
    const { questions, round } = useGameStateStore();

    return (<ToggleButtonGroup
        exclusive
        fullWidth
        onChange={(_, value) => setQuestion(questions[value].question)}
        sx={{
            "& .MuiToggleButtonGroup-grouped": {
                textTransform: "uppercase",
                fontWeight: 1200,
                px: 2,
            },
        }}
    >
        {questions.map((_, index) => (<QuestionSelectButton
            key={index}
            index={index}
            correct={questions[index].state.correct}
            round={round} />))}
    </ToggleButtonGroup>);
}

export default ResultsBar;