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
            sx={{ height: "95%", width: "45%", fontSize: 30 }}
            variant={isSelected ? "contained" : "outlined"}
            color={color}
            onClick={() => onSelect(index)}
        >
            {text}
        </Button>
    );
};

export default AnswerButton;
