import type { Difficulty } from "../types/Difficulty";
import type { Category } from "../types/Category";
import type { Question } from "../types/Question";
import axios from "axios";

export const fetchQuestions = async (
    difficulty: Difficulty | "mix",
    category: Category,
    limit: number
): Promise<Question[]> => {
    if (limit <= 0) return [];

    const params = new URLSearchParams({
        limit: String(limit),
    });

    if (difficulty !== "mix") {
        params.append("difficulty", difficulty);
    }

    if (category !== "all") {
        params.append("categories", category);
    }

    try {
        const { data } = await axios.get<Question[]>(
            `https://the-trivia-api.com/api/questions?${params}`, { timeout: 5000 }
        );

        return data;
    } catch (err) {
        console.error("Failed to fetch trivia questions:", err);
        throw err;
    }
};
