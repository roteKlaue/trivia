import { create } from "zustand";
import type { Question } from "../types/Question";

export type GameState = {
    round: number;
    score: number;
    rounds: number;

    questions: Question[];
    currentQuestion: Question | null;

    startGame(questions: Question[]): void;
    nextQuestion(): void;
    guess(input: string): boolean;
};

export const useGameStateStore = create<GameState>((set, get) => ({
    round: 0,
    score: 0,
    rounds: 0,

    questions: [],
    currentQuestion: null,

    startGame(questions) {
        set({
            questions,
            round: 0,
            rounds: questions.length,
            score: 0,
            currentQuestion: questions[0],
        });
    },

    guess: (input) => {
        const { currentQuestion } = get();
        if (!currentQuestion) return false;

        const matches = currentQuestion.correctAnswer === input;

        if (matches) {
            set((s) => ({ score: s.score + 1 }));
        }

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
                currentQuestion: s.questions[nextRound],
            };
        });
    },
}));
