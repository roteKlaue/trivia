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
    styled,
    toggleButtonGroupClasses
} from "@mui/material";
import BrowseGalleryRoundedIcon from '@mui/icons-material/BrowseGalleryRounded';
import { useGameStateStore } from "../stores/GameStateStore";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { fetchQuestions } from "../functions/loadQuestions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Difficulty } from "../types/Difficulty";
import type { Category } from "../types/Category";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useSnackbar } from "notistack";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        margin: theme.spacing(0.5),
        border: 0,
        borderRadius: theme.shape.borderRadius,
        [`&.${toggleButtonGroupClasses.disabled}`]: {
            border: 0,
        },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
        marginLeft: -1,
        borderLeft: '1px solid transparent',
    },
}));

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
    const [difficulty, setDifficulty] = useState<Difficulty | "mix">("easy");
    const { startGame, showAnwsers, useTimer, rounds } = useGameStateStore();
    const [category, setCategory] = useState<Category>("general_knowledge");
    const [toggles, setToggles] = useState<string[]>(() =>
        [showAnwsers && "showAnswers", useTimer && "timed"].filter(Boolean) as string[]
    );
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [amount, setAmount] = useState<number>(rounds);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useDocumentTitle("Trivia");

    const handleToggles = (
        _event: React.MouseEvent<HTMLElement>,
        newFormats: string[],
    ) => {
        setToggles(newFormats);
    };

    const handleSubmit = async () => {
        if (loading) return;

        setLoading(true);

        try {
            closeSnackbar();
            const questions = await fetchQuestions(difficulty, category, amount);
            startGame(
                questions,
                toggles.includes("timed"),
                toggles.includes("showAnswers")
            );
            navigate("/trivia/game");
        } catch {
            enqueueSnackbar("Error retrieving questions!", { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <Box display="flex" justifyContent="center">
            <Paper elevation={4} sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" gap={3} width={400}>
                    <Typography textAlign={"center"} variant="h4">Trivia</Typography>
                    <Tooltip title="Choose the topic of the questions" arrow>
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
                    </Tooltip>

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

                    <Tooltip title="Number of questions in this quiz (5–30)" arrow>
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
                                    if (typeof value !== "number") return;
                                    setAmount(value);
                                }}
                            />
                        </Box>
                    </Tooltip>

                    <Box sx={{ width: "100%" }} display={"flex"} justifyContent={"center"}>
                        <StyledToggleButtonGroup
                            size="small"
                            value={toggles}
                            onChange={handleToggles}
                            aria-label="toggles"
                        >
                            <Tooltip title="Show correct answers after each question" arrow>
                                <ToggleButton value="showAnswers" aria-label="show answers">
                                    <VisibilityIcon />
                                </ToggleButton>
                            </Tooltip>

                            <Tooltip title="Timed mode" arrow>
                                <ToggleButton value="timed" aria-label="timed">
                                    <BrowseGalleryRoundedIcon />
                                </ToggleButton>
                            </Tooltip>
                        </StyledToggleButtonGroup>
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
