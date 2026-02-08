import { Button } from "@mui/material";

type AnswerButtonProps = {
    text: string;
    index: number;
    selected: number;
    answered: boolean;
    correct: boolean;
    onSelect: (index: number) => void;
}

const AnswerButton = ({ text, index, selected, answered, correct, onSelect }: AnswerButtonProps) => {
    const isSelected = selected === index;

    let color: "primary" | "success" | "error" = "primary";
    if (isSelected) {
        if (answered) {
            color = correct ? "success" : "error";
        } else {
            color = "primary";
        }
    }

    return (
        <Button
            sx={{
                height: "100%",
                fontSize: "clamp(0.9rem, 2.5vw, 1.8rem)",
                px: 2,
                textWrap: "balance"
            }}
            variant={isSelected ? "contained" : "outlined"}
            color={color}
            onClick={() => onSelect(index)}
        >
            {text}
        </Button>
    );
};

export default AnswerButton;
