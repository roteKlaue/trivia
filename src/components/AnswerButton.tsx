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
    const { questions, showAnswers } = useGameStateStore();

    const findIndex = (question: Question | null) => {
        const index = question ? questions.findIndex(q => q.question.id === question.id) : -1;
        return index;
    }

    const selected = questions[findIndex(question)].state.selected
    const answered = questions[findIndex(question)].state.answered
    const correct = questions[findIndex(question)].state.answered &&
        questions[findIndex(question)].state.cachedAnswers[index] ===
        questions[findIndex(question)].question.correctAnswer;
    const isSelected = selected === index;

    let color: "primary" | "success" | "error" = "primary";
    if (isSelected) {
        if (answered) {
            color = correct ? "success" : "error";
        } else {
            color = "primary";
        }
    }

    if (correct && showAnswers) {
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
            variant={(isSelected || correct && showAnswers) ? "contained" : "outlined"}
            color={color}
            onClick={() => onSelect(index)}
        >
            {text}
        </Button>
    );
};

export default AnswerButton;
