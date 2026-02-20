import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';
import { useLoadingStore } from '../../stores/LoadingStore';

const LoadingOverlay = () => {
    const { open, text } = useLoadingStore();
    if (!open) return null;

    return (
        <Backdrop open
            color='#fff'
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1,
                backdropFilter: 'blur(4px)',
                flexDirection: 'column',
                gap: 2,
            }}>
            <CircularProgress size={60} thickness={4} />
            <Box>
                <Typography>{text}</Typography>
            </Box>
        </Backdrop>
    );
};

export default LoadingOverlay;
