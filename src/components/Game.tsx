import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestoreIcon from '@mui/icons-material/Restore';
import { useState } from "react";

const Game = () => {
    const [value, setValue] = useState(0);
    
    return (<>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
    </>);
};

export default Game;


export const QuizSettingsForm = () => {
    const [category, setCategory] = useState<Category>("general_knowledge");
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");
    const [amount, setAmount] = useState<number>(10);

    const handleSubmit = () => {
        console.log({ category, difficulty, amount });
        // do something with values
    };

    return (
        
    );
};