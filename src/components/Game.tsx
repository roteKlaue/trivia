import successSfx from "../assets/soundeffects/universfield-new-notification-07-210334.mp3";
import errorSfx from "../assets/soundeffects/universfield-error-08-206492.mp3";
import { useSoundPlaybackStore } from "../stores/SoundPlaybackStore";
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
    const { playSfx } = useSoundPlaybackStore();
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

        const success = guess(questions[round].state.cachedAnswers[(questions[round].state.selected)]);
        playSfx(success ? successSfx : errorSfx);
    };

    useEffect(() => {
        window.addEventListener("keypress", e => {
            if (e.key === "Enter") handleSubmit();
            const parsed = +e.key;
            if (isNaN(parsed)) return;
            if (questions[findIndex(question)].state.answered) return;
            if (parsed > 0 && parsed < 5) markAnwser(findIndex(question), parsed - 1);
        });
    }, []);

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
                    width: "100%",
                    minHeight: 420,
                    maxWidth: 1100,
                    borderRadius: 3,
                    p: { xs: 2, sm: 3, md: 4 },
                    aspectRatio: { md: "16 / 9" },
                }}>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "1.6rem",
                                sm: "1.8rem",
                                md: "2rem"
                            }
                        }}
                        textAlign="center"
                    >
                        {question?.question}</Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr"
                            },
                            gap: 2,
                            alignItems: "stretch"
                        }}
                    >
                        {questions[findIndex(question)].state.cachedAnswers.map((ans, index) => (
                            <AnswerButton
                                key={index}
                                text={ans}
                                index={index}
                                selected={questions[findIndex(question)].state.selected}
                                answered={questions[findIndex(question)].state.answered}
                                correct={
                                    questions[findIndex(question)].state.answered &&
                                    questions[findIndex(question)].state.cachedAnswers[index] ===
                                    questions[findIndex(question)].question.correctAnswer
                                }
                                onSelect={handleSelectAnswer}
                            />
                        ))}
                    </Box>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 3,
                        marginBottom: 3
                    }}>
                        <Button
                            fullWidth
                            sx={{ maxWidth: 300 }}
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={questions[findIndex(question)].state.selected === -1}
                        >{submitLabel}</Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
        <ResultsBar setQuestion={setQuestion} question={question!} />
    </Box>);
};

export default Game;
