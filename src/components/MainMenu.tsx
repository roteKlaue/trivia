import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import type { Difficulty } from "../types/Difficulty";
import type { Category } from "../types/Category";
import { useState } from "react";

const categories: Category[] = [
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
];
const difficulties: (Difficulty | "mix")[] = ["easy", "medium", "hard", "mix"];

const MainMenu = () => {
    const [category, setCategory] = useState<Category>("general_knowledge");
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");
    const [amount, setAmount] = useState<number>(10);

    const handleSubmit = () => {
        console.log({ category, difficulty, amount });
        // do something with values
    };

    return (<Box display="flex" flexDirection="column" gap={2} width={300}>
        <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value as Category)}
            >
                {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                        {cat.replace(/_/g, " ").toUpperCase()}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
                value={difficulty}
                label="Difficulty"
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
                {difficulties.map((diff) => (
                    <MenuItem key={diff} value={diff}>
                        {diff.toUpperCase()}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <TextField
            label="Amount"
            type="number"
            inputProps={{ min: 5, max: 30 }}
            value={amount}
            onChange={(e) => setAmount(Math.max(5, Math.min(30, Number(e.target.value))))}
            fullWidth
        />

        <Button variant="contained" onClick={handleSubmit}>
            Start Quiz
        </Button>
    </Box>);
};

export default MainMenu;
