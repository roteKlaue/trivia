import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useGameStateStore } from "../stores/GameStateStore";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { fetchQuestions } from "../functions/loadQuestions";
import type { Difficulty } from "../types/Difficulty";
import type { Category } from "../types/Category";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
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
    const [difficulty, setDifficulty] = useState<Difficulty | "mix">("easy");
    const [amount, setAmount] = useState<number>(10);
    const [loading, setLoading] = useState(false);
    const { startGame } = useGameStateStore();
    const navigate = useNavigate();
    useDocumentTitle("Trivia");

    const handleSubmit = async () => {
        setLoading(true);
        const questions = await fetchQuestions(difficulty, category, amount);
        startGame(questions);
        navigate("/trivia/game");
    };

    return (<>
        <Box display="flex" justifyContent="center">
            <Paper elevation={4} sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" gap={3} width={400}>
                    <Typography textAlign={"center"} variant="h4">Trivia</Typography>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value as Category)}
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <Typography sx={{ mb: 1 }}>Difficulty</Typography>

                        <ToggleButtonGroup
                            exclusive
                            fullWidth
                            value={difficulty}
                            onChange={(_, value) => {
                                if (!value) return;
                                setDifficulty(value as Difficulty | "mix");
                            }}
                            sx={{
                                "& .MuiToggleButtonGroup-grouped": {
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    px: 2,
                                },
                            }}
                        >
                            {difficulties.map((diff) => (
                                <ToggleButton key={diff} value={diff}>
                                    {diff}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </FormControl>


                    <Box>
                        <Typography gutterBottom>
                            Amount: {amount}
                        </Typography>

                        <Slider
                            value={amount}
                            min={5}
                            max={30}
                            step={1}
                            marks
                            valueLabelDisplay="auto"
                            onChange={(_, value) => {
                                if (typeof value !== "number") return; // guard
                                setAmount(value);
                            }}
                        />
                    </Box>

                    <Button variant="contained" onClick={handleSubmit}>
                        Start Quiz
                    </Button>
                </Box>
            </Paper>
        </Box>


        <LoadingOverlay
            open={loading}
            text="Preparing questions..."
        />
    </>);
};

export default MainMenu;
