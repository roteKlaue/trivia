import { Button } from "@mui/material";
import { useGameStateStore } from "../stores/GameStateStore";
import type { FC } from "react";
import type { Question } from "../types/Question";

type AnswerButtonProps = {
    text: string;
    index: number;
    question: Question;
    onSelect: (index: number) => void;
}

const AnswerButton: FC<AnswerButtonProps> = ({ text, index, onSelect, question }) => {
    const { questions, config, findQuestionIndex } = useGameStateStore();

    const questionIndex = findQuestionIndex(question);
    if (questionIndex < 0) return null;

    const qState = questions[questionIndex];
    const selected = qState.state.selected === index;
    const answered = qState.state.answered;
    const correct =
        answered &&
        qState.state.cachedAnswers[index] === qState.question.correctAnswer;

    let color: "primary" | "success" | "error" = "primary";

    if (selected && answered) {
        color = correct ? "success" : "error";
    }

    if (correct && config.answers === "shown") {
        color = "success";
    }

    return (
        <Button
            sx={{
                height: "100%",
                fontSize: "clamp(0.9rem, 2.5vw, 1.8rem)",
                px: 2,
                textWrap: "balance"
            }}
            variant={(selected || (correct && config.answers === "shown")) ? "contained" : "outlined"}
            color={color}
            onClick={() => onSelect(index)}
        >
            {text}
        </Button>
    );
};

export default AnswerButton;
