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
    showAnwsers: boolean;

    questions: QuestionUnion[];
    currentQuestion: Question | null;

    startGame(questions: Question[], useTimer: boolean, showAnwsers: boolean): void;
    nextQuestion(): void;
    guess(input: string): boolean;
    markAnwser(index: number, anwser: number): void;
};

export const useGameStateStore = create<GameState>((set, get) => ({
    round: 0,
    score: 0,
    rounds: 10,
    useTimer: false,
    showAnwsers: true,
    questions: [],

    currentQuestion: null,
    questionsStates: [],

    startGame(questions, useTimer, showAnwsers) {
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
        });
    },

    guess: (input) => {
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
    },

    markAnwser(index, anwser) {
        const { questions } = get();
        questions[index].state.selected = anwser;
        set({ questions: [...questions] });
    }
}));
