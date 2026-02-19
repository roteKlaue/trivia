export const categories = [
    "music",
    "sport_and_leisure",
    "film_and_tv",
    "arts_and_literature",
    "history",
    "society_and_culture",
    "science",
    "geography",
    "food_and_drink",
    "general_knowledge",
    "all"
] as const;

export type Category = typeof categories[number];
