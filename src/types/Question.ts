import type { Difficulty } from "./Difficulty";
import type { Category } from "./Category";

export type Question = {
    readonly id: string;
    readonly category: Category;
    readonly tags: string[];
    readonly difficulty: Difficulty;
    readonly isNiche: boolean;
    readonly question: { text: string };
    readonly correctAnswer: string;
    readonly incorrectAnswers: [string, string, string];
};
