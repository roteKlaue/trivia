import type { Question } from "../types/Question";
import { shuffle } from "../functions/shuffle";
import { create } from "zustand";

export type DifficultyMode = "easy" | "medium" | "hard" | "mix";
export type TimerMode = "off" | "normal" | "short" | "ultra";
export type LifeMode = "none" | "lives" | "suddenDeath";
export type AnswerMode = "hidden" | "shown";

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

export type GameConfig = {
    timer: TimerMode;
    lives: LifeMode;
    answers: AnswerMode;
    difficulty: DifficultyMode;
    rounds: number;
};

export const durationMap: Record<TimerMode, number> = {
    off: -1,
    normal: 30,
    short: 10,
    ultra: 3,
};

export const lifeMap: Record<LifeMode, number> = {
    none: -1,
    lives: 3,
    suddenDeath: 1,
};

export type GameState = {
    round: number;
    score: number;
    currentHP: number;
    config: GameConfig;

    questions: QuestionUnion[];
    currentQuestion: Question | null;

    startGame: (
        questions: Question[],
        props: GameConfig
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
    currentHP: 0,

    config: {
        timer: "off",
        lives: "none",
        answers: "shown",
        difficulty: "mix",
        rounds: 10,
    },

    questions: [],
    currentQuestion: null,

    timerRemaining: 0,
    timerActive: false,
    timerId: null,

    startGame: (questions, config) => {
        if (!questions || questions.length === 0) {
            set({
                questions: [],
                config
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
            score: 0,
            currentHP: lifeMap[config.lives],
            currentQuestion: mappedQuestions[0].question,
            config
        });

        if (config.timer !== "off") {
            get().startTimer();
        }
    },

    failQuestion: () => {
        get().stopTimer();

        const { currentQuestion, questions, round, currentHP } = get();
        if (!currentQuestion) return;

        const newLives = currentHP !== -1 ? Math.max(0, currentHP - 1) : -1;
        const updated = questions.map((p, i) =>
            i === round
                ? { ...p, state: { ...p.state, answered: true, correct: false } }
                : p
        );

        set({
            questions: updated,
            currentHP: newLives,
        });
    },

    guess: (input) => {
        get().stopTimer();

        const { currentQuestion, round, currentHP } = get();
        if (!currentQuestion) return false;

        const matches = currentQuestion.correctAnswer === input;
        const newLives = currentHP !== -1 ? (matches ? currentHP : Math.max(0, currentHP - 1)) : -1;

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
            const gameOverBecauseLives = s.currentHP === 0;
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

        const { config, timerActive } = get();
        if (config.timer !== "off" && !timerActive) {
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
        const { config, timerActive } = get();
        if (config.timer === "off") return;
        if (timerActive) return;

        const duration = durationMap[config.timer];

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
