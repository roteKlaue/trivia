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
import BrowseGalleryRoundedIcon from '@mui/icons-material/BrowseGalleryRounded';
import Timer10SelectRoundedIcon from '@mui/icons-material/Timer10SelectRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import Timer3SelectRoundedIcon from '@mui/icons-material/Timer3SelectRounded';
import { useGameStateStore, type GameConfig } from "../stores/GameStateStore";
import { StyledToggleButtonGroup } from "./StyledToggleButtonGroup";
import WhatshotIcon from "@mui/icons-material/WhatshotRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import { categories, type Category } from "../types/Category";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { fetchQuestions } from "../functions/loadQuestions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Difficulty } from "../types/Difficulty";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import Tooltip from "@mui/material/Tooltip";
import { useSnackbar } from "notistack";
import HardcoreIcon from "./Skull";
import { useState } from "react";

const difficulties: (Difficulty | "mix")[] = ["easy", "medium", "hard", "mix"];

const MainMenu = () => {
    const { startGame, config } = useGameStateStore();
    const [difficulty, setDifficulty] = useState<Difficulty | "mix">("easy");
    const [category, setCategory] = useState<Category>("general_knowledge");
    const [toggles, setToggles] = useState<string[]>(() => [
        config.answers && "showAnswers",
        config.timer !== "off" && "timed",
        config.timer === "short" && "short",
        config.timer === "ultra" && "shorter",
        config.lives === "lives" && "hp",
        config.lives === "suddenDeath" && "death"
    ].filter(Boolean) as string[]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [amount, setAmount] = useState<number>(config.rounds);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useDocumentTitle("Trivia");

    const handleToggles = (
        _event: React.MouseEvent<HTMLElement>,
        newFormats: string[],
    ) => {
        if (newFormats.includes("hard")) {
            setToggles(["hard"]);
            return;
        }

        if (newFormats.includes("speeder") && !toggles.includes("speeder")) {
            setToggles(newFormats.filter(v => v === "speeder" || v === "showAnswers"));
            return;
        }

        if (!newFormats.includes("timed")) {
            newFormats = newFormats.filter(v => v !== "short" && v !== "shorter");
        }

        if (newFormats.includes("short") && !toggles.includes("short")) {
            newFormats = newFormats.filter(v => v !== "shorter");
        }

        if (newFormats.includes("shorter") && !toggles.includes("shorter")) {
            newFormats = newFormats.filter(v => v !== "short");
        }

        if (newFormats.includes("hp") && !toggles.includes("hp")) {
            newFormats = newFormats.filter(v => v !== "death");
        }

        if (newFormats.includes("death") && !toggles.includes("death")) {
            newFormats = newFormats.filter(v => v !== "hp");
        }
        setToggles(newFormats);
    };

    const handleSubmit = async () => {
        if (loading) return;

        setLoading(true);

        const config: GameConfig = {
            difficulty,
            rounds: amount,
            timer: toggles.includes("shorter")
                ? "ultra"
                : toggles.includes("short")
                    ? "short"
                    : toggles.includes("timed")
                        ? "normal"
                        : "off",

            lives: toggles.includes("death")
                ? "suddenDeath"
                : toggles.includes("hp")
                    ? "lives"
                    : "none",

            answers: toggles.includes("showAnswers") ? "shown" : "hidden",
        };

        try {
            closeSnackbar();
            const questions = await fetchQuestions(difficulty, category, amount);
            startGame(
                questions,
                config
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
                                disabled={toggles.includes("hard")}
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
                            disabled={toggles.includes("hard")}
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
                                disabled={toggles.includes("hard")}
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
                                <ToggleButton
                                    disabled={toggles.includes("hard")}
                                    value="showAnswers"
                                    aria-label="show answers">
                                    <VisibilityIcon />
                                </ToggleButton>
                            </Tooltip>

                            <Tooltip title="Timed mode" arrow>
                                <ToggleButton
                                    disabled={toggles.includes("hard")}
                                    value="timed"
                                    aria-label="timed">
                                    <BrowseGalleryRoundedIcon />
                                </ToggleButton>
                            </Tooltip>

                            <Tooltip title="10 Second Timer" arrow>
                                <ToggleButton
                                    value="short"
                                    aria-label="short"
                                    disabled={!toggles.includes("timed") || toggles.includes("hard")}>
                                    <Timer10SelectRoundedIcon />
                                </ToggleButton>
                            </Tooltip>

                            <Tooltip title="3 Second Timer" arrow>
                                <ToggleButton
                                    value="shorter"
                                    aria-label="shorter"
                                    disabled={!toggles.includes("timed") || toggles.includes("hard")}>
                                    <Timer3SelectRoundedIcon />
                                </ToggleButton>
                            </Tooltip>

                            <Tooltip title="Speedrun Mode" arrow>
                                <ToggleButton
                                    value="speeder"
                                    aria-label="speeder"
                                    disabled={toggles.includes("hard")}>
                                    <DirectionsRunRoundedIcon />
                                </ToggleButton>
                            </Tooltip>

                            <Tooltip title="Lives Mode" arrow>
                                <ToggleButton
                                    disabled={toggles.includes("hard")}
                                    value="hp"
                                    aria-label="hp">
                                    <FavoriteIcon />
                                </ToggleButton>
                            </Tooltip>

                            <Tooltip title="Sudden Death Mode" arrow>
                                <ToggleButton
                                    disabled={toggles.includes("hard")}
                                    value="death"
                                    aria-label="death">
                                    <WhatshotIcon color={toggles.includes("hard") ? void 0 : "error"} />
                                </ToggleButton>
                            </Tooltip>

                            <Tooltip title="Hardcore Mode" arrow>
                                <ToggleButton value="hard" aria-label="hard">
                                    <HardcoreIcon color="error" />
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
