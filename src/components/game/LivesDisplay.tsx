import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useGameStateStore, lifeMap } from '../../stores/GameStateStore';
import FavoriteIcon from '@mui/icons-material/FavoriteRounded';
import { Box, Typography } from '@mui/material';

const LivesDisplay = () => {
    const { config, currentHP } = useGameStateStore();
    if (config.lives === 'none') return (<></>);

    return ((<Box display='flex' alignItems='center'>
        <Typography sx={{ marginRight: '1em' }}>Lives Left:</Typography>
        {Array.from({ length: lifeMap[config.lives] }).map((_, i) => (i < currentHP) ? <FavoriteIcon key={i} /> : <FavoriteBorderIcon key={i} />)}
    </Box>))
}

export default LivesDisplay;
