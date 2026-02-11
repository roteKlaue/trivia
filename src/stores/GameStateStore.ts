import type { Question } from "../types/Question";
import { shuffle } from "../functions/shuffle";
import { create } from "zustand";

type QuestionState = {
    answered: boolean;
    correct: boolean;
    cachedAnswers: string[];
    selected: number;
};

type QuestionUnion = {
    question: Question;
    state: QuestionState;
};

export type GameState = {
    round: number;
    score: number;
    rounds: number;
    useTimer: boolean;
    shortTimer: boolean;
    showAnswers: boolean;
    lives: number;
    instaDeath: boolean;

    questions: QuestionUnion[];
    currentQuestion: Question | null;

    startGame: (
        questions: Question[],
        showAnswers: boolean,
        useTimer: boolean,
        shortTimer: boolean,
        enableLives: boolean,
        instaDeath: boolean
    ) => void;
    nextQuestion: () => void;
    failQuestion: () => void;
    guess: (input: string) => boolean;
    markAnswer: (index: number, answer: number) => void;

    timerRemaining: number;
    timerActive: boolean;
    timerId: number | null;
    startTimer: () => void;
    stopTimer: () => void;
};

export const useGameStateStore = create<GameState>((set, get) => ({
    round: 0,
    score: 0,
    rounds: 10,
    useTimer: false,
    shortTimer: false,
    showAnswers: true,
    lives: -1,
    instaDeath: false,

    questions: [],
    currentQuestion: null,

    timerRemaining: 0,
    timerActive: false,
    timerId: null,

    startGame: (questions, showAnswers, useTimer, shortTimer, enableLives, instaDeath) => {
        if (!questions || questions.length === 0) {
            set({
                questions: [],
                currentQuestion: null,
                rounds: 0,
                round: 0,
                score: 0,
            });
            return;
        }

        get().stopTimer();

        const mappedQuestions: QuestionUnion[] = questions.map((q) => ({
            question: q,
            state: {
                answered: false,
                correct: false,
                selected: -1,
                cachedAnswers: shuffle([q.correctAnswer, ...q.incorrectAnswers]),
            },
        }));

        set({
            questions: mappedQuestions,
            round: 0,
            rounds: mappedQuestions.length,
            score: 0,
            currentQuestion: mappedQuestions[0].question,
            showAnswers,
            useTimer,
            shortTimer,
            lives: enableLives ? (instaDeath ? 1 : 3) : -1,
            instaDeath,
        });

        if (useTimer) {
            get().startTimer();
        }
    },

    failQuestion: () => {
        get().stopTimer();

        const { currentQuestion, questions, round, lives } = get();
        if (!currentQuestion) return;

        const newLives = lives !== -1 ? Math.max(0, lives - 1) : -1;
        const updated = questions.map((p, i) =>
            i === round
                ? { ...p, state: { ...p.state, answered: true, correct: false } }
                : p
        );

        set({
            questions: updated,
            lives: newLives,
        });
    },

    guess: (input) => {
        get().stopTimer();

        const { currentQuestion, round, lives } = get();
        if (!currentQuestion) return false;

        const matches = currentQuestion.correctAnswer === input;
        const newLives = lives !== -1 ? (matches ? lives : Math.max(0, lives - 1)) : -1;

        set((s) => ({
            score: s.score + (matches ? 1 : 0),
            lives: newLives,
            questions: s.questions.map((p, i) =>
                i === round
                    ? { ...p, state: { ...p.state, correct: matches, answered: true } }
                    : p
            ),
        }));

        return matches;
    },

    nextQuestion: () => {
        get().stopTimer();

        set((s) => {
            const nextRound = s.round + 1;
            const gameOverBecauseLives = s.lives === 0;
            const reachedEnd = nextRound >= s.questions.length;

            if (gameOverBecauseLives || reachedEnd) {
                return {
                    round: nextRound,
                    currentQuestion: null,
                };
            }

            return {
                round: nextRound,
                currentQuestion: s.questions[nextRound].question,
            };
        });

        const { useTimer, timerActive } = get();
        if (useTimer && !timerActive) {
            get().startTimer();
        }
    },

    markAnswer: (index, answer) => {
        const { questions } = get();
        if (!questions || index < 0 || index >= questions.length) return;

        const updated = questions.slice();
        updated[index] = {
            ...updated[index],
            state: { ...updated[index].state, selected: answer },
        };

        set({ questions: updated });
    },

    startTimer: () => {
        const { useTimer, shortTimer, timerActive } = get();
        if (!useTimer) return;
        if (timerActive) return;

        const duration = shortTimer ? 10 : 30;

        set({
            timerRemaining: duration,
            timerActive: true,
        });

        const id = window.setInterval(() => {
            const { timerRemaining } = get();

            if (timerRemaining <= 1) {
                get().stopTimer();
                get().failQuestion();
                return;
            }

            set({ timerRemaining: timerRemaining - 1 });
        }, 1000);

        set({ timerId: id });
    },

    stopTimer: () => {
        const { timerId } = get();
        if (!timerId) return;

        clearInterval(timerId);

        set({
            timerId: null,
            timerActive: false,
            timerRemaining: 0,
        });
    },
}));
