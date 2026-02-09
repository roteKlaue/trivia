import type { Question } from "../types/Question";
import { shuffle } from "../functions/shuffle";
import { create } from "zustand";

type QuestionState = {
    answered: boolean;
    correct: boolean;
    cachedAnswers: string[];
    selected: number;
}

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
    showAnwsers: boolean;

    questions: QuestionUnion[];
    currentQuestion: Question | null;

    startGame(questions: Question[], showAnwsers: boolean, useTimer: boolean, shortTimer: boolean): void;
    nextQuestion(): void;
    failQuestion(): void;
    guess(input: string): boolean;
    markAnwser(index: number, anwser: number): void;

    timerRemaining: number;
    timerActive: boolean;
    timerId: number | null;
    startTimer(): void;
    stopTimer(): void;
};

export const useGameStateStore = create<GameState>((set, get) => ({
    round: 0,
    score: 0,
    rounds: 10,
    useTimer: false,
    shortTimer: false,
    showAnwsers: true,
    questions: [],

    currentQuestion: null,
    questionsStates: [],

    startGame(questions, showAnwsers, useTimer, shortTimer) {
        const mappedQuestions: QuestionUnion[] = questions.map(question => ({
            question,
            state: {
                answered: false,
                correct: false,
                selected: -1,
                cachedAnswers: shuffle([question.correctAnswer, ...question.incorrectAnswers])
            }
        }));

        set({
            questions: mappedQuestions,
            round: 0,
            rounds: questions.length,
            score: 0,
            currentQuestion: questions[0],
            showAnwsers,
            useTimer,
            shortTimer
        });

        get().startTimer();
    },

    failQuestion: () => {
        get().stopTimer();

        const { currentQuestion, questions, round } = get();
        if (!currentQuestion) return false;


        set({
            questions: questions.map((p, i) => ({
                ...p, state: {
                    ...p.state,
                    correct: p.state.correct,
                    answered: i === round ? true : p.state.answered,
                }
            }))
        });
    },

    guess: (input) => {
        get().stopTimer();

        const { currentQuestion, questions, round } = get();
        if (!currentQuestion) return false;

        const matches = currentQuestion.correctAnswer === input;

        set((s) => ({
            score: s.score + (matches ? 1 : 0), questions: questions.map((p, i) => ({
                ...p, state: {
                    ...p.state,
                    correct: i === round ? matches : p.state.correct,
                    answered: i === round ? true : p.state.answered,
                }
            }))
        }));


        return matches;
    },

    nextQuestion: () => {
        get().stopTimer();

        set((s) => {
            const nextRound = s.round + 1;

            if (nextRound >= s.questions.length) {
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

        get().startTimer();
    },

    timerRemaining: 0,
    timerActive: false,
    timerId: null,

    markAnwser(index, anwser) {
        const { questions } = get();
        questions[index].state.selected = anwser;
        set({ questions: [...questions] });
    },

    startTimer: () => {
        const { useTimer, shortTimer, timerActive } = get();

        if (!useTimer) return;
        if (timerActive) return;

        const duration = shortTimer ? 10 : 30;

        set({
            timerRemaining: duration,
            timerActive: true
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
            timerRemaining: 0
        });
    }
}));
