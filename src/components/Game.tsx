import { Box, Button, Paper, Typography } from "@mui/material";
import { useGameStateStore } from "../stores/GameStateStore";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import type { Question } from '../types/Question';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnswerButton from "./AnswerButton";
import ResultsBar from "./ResultsBar";

const Game = () => {
    const { currentQuestion, questions, nextQuestion, round, rounds, markAnwser, guess } = useGameStateStore();
    const [question, setQuestion] = useState<Question | null>(currentQuestion);
    const navigate = useNavigate();
    useDocumentTitle(`Trivia - ${questions.length} Questions`);

    const findIndex = (question: Question | null) => {
        const index = question ? questions.findIndex(q => q.question.id === question.id) : -1;
        return index;
    }

    const handleSelectAnswer = (index: number) => {
        if (questions[findIndex(question)].state.answered) return;
        markAnwser(findIndex(question), index);
    };

    useEffect(() => {
        if (!currentQuestion) {
            navigate("/trivia/finish");
            return;
        }
        setQuestion(currentQuestion);
    }, [currentQuestion]);

    const handleSubmit = () => {
        if (findIndex(question) !== round) {
            setQuestion(currentQuestion);
            return;
        }

        if (questions[round].state.selected === -1) return;

        if (questions[round].state.answered) {
            nextQuestion();
            return;
        }

        guess(questions[round].state.cachedAnswers[(questions[round].state.selected)]);
    };

    const currentIndex = findIndex(question);
    const currentResult = currentIndex !== -1 ? questions[currentIndex].state : null;

    const submitLabel = currentResult?.answered ? "Next" : "Submit";

    return (<Box sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
    }}>
        <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center"
        }}>
            <Typography>Round: {round + 1} of {rounds}</Typography>
            <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Box sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Paper sx={{ borderRadius: "10px" }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "1500px",
                    height: "600px"
                }}>
                    <Typography variant="h4" textAlign={"center"} sx={{
                        width: "100%",
                        marginTop: 3,
                        marginBottom: 3
                    }}>{question?.question}</Typography>
                    <Box sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}>
                        {Array.from({ length: 2 }).map((_, row) => (
                            <Box key={row} sx={{ display: "flex", gap: 2, width: "100%", justifyContent: "center", flexGrow: 1 }}>
                                {questions[findIndex(question)].state.cachedAnswers.slice(row * 2, row * 2 + 2).map((ans, i) => {
                                    const index = row * 2 + i;
                                    return (
                                        <AnswerButton
                                            key={index}
                                            text={ans}
                                            index={index}
                                            selected={questions[findIndex(question)].state.selected}
                                            answered={questions[findIndex(question)].state.answered}
                                            correct={
                                                questions[findIndex(question)].state.answered &&
                                                questions[findIndex(question)].state.cachedAnswers[index] === questions[findIndex(question)].question.correctAnswer
                                            }
                                            onSelect={handleSelectAnswer}
                                        />
                                    );
                                })}
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 3,
                        marginBottom: 3
                    }}>
                        <Button variant="contained"
                            onClick={handleSubmit}
                            disabled={questions[findIndex(question)].state.selected === -1}
                        >{submitLabel}</Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
        <ResultsBar setQuestion={setQuestion} />
    </Box>);
};

export default Game;
