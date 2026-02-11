import successSfx from "../assets/soundeffects/universfield-new-notification-07-210334.mp3";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import errorSfx from "../assets/soundeffects/universfield-error-08-206492.mp3";
import { useSoundPlaybackStore } from "../stores/SoundPlaybackStore";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import { useGameStateStore } from "../stores/GameStateStore";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import type { Question } from '../types/Question';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnswerButton from "./AnswerButton";
import ResultsBar from "./ResultsBar";

const Game = () => {
    const { currentQuestion, questions, nextQuestion, round, rounds, markAnswer, guess, useTimer, timerRemaining, shortTimer, lives } = useGameStateStore();
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
        markAnswer(findIndex(question), index);
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

        if (questions[round].state.answered) {
            nextQuestion();
            return;
        }

        if (questions[round].state.selected === -1) return;

        const success = guess(questions[round].state.cachedAnswers[(questions[round].state.selected)]);
        playSfx(success ? successSfx : errorSfx);
    };

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const selected = questions[round].state.selected;

            if (e.key === "Enter") {
                handleSubmit();
                return;
            }

            const num = Number(e.key);
            if (num >= 1 && num <= 4) {
                handleSelectAnswer(num - 1);
                return;
            }

            if (selected === -1) return;

            const deltas: Record<string, number> = {
                ArrowLeft: 3,
                ArrowRight: 1,
                ArrowUp: 2,
                ArrowDown: 2,
            };

            const delta = deltas[e.key];
            if (delta === void 0) return;

            handleSelectAnswer((selected + delta) % 4);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [round, questions, handleSubmit, handleSelectAnswer]);

    const currentIndex = findIndex(question);
    const currentResult = currentIndex !== -1 ? questions[currentIndex].state : null;

    const submitLabel = currentResult?.answered ? "Next" : "Submit";

    return (<Box sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
    }}>
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                rowGap: 1,
                columnGap: 2
            }}
        >
            <Typography>
                Round: {round + 1} of {rounds}
            </Typography>

            {useTimer && (
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography>
                        Time left: {timerRemaining}s
                    </Typography>

                    <CircularProgress
                        variant="determinate"
                        value={100 - (timerRemaining / (shortTimer ? 10 : 30) * 100)}
                    />
                </Box>
            )}

            {lives !== -1 && (<Box display={"flex"} alignItems={"center"}>
                <Typography sx={{ marginRIght: "1em" }}>Lives Left: </Typography>
                {Array.from({ length: lives }).map((_, i) => <FavoriteIcon key={i} />)}
            </Box>)}
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
                                question={question!}
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
                            disabled={(questions[findIndex(question)].state.selected === -1) && !questions[findIndex(question)].state.answered}
                        >{submitLabel}</Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
        <ResultsBar setQuestion={setQuestion} question={question!} />
    </Box>);
};

export default Game;
