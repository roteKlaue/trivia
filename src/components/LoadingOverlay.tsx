import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

type Props = {
    open: boolean;
    text?: string;
};

const LoadingOverlay = ({ open, text = "Loading..." }: Props) => {
    if (!open) return null;

    return (
        <Backdrop
            open
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1,
                color: "#fff",
                backdropFilter: "blur(4px)",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <CircularProgress size={60} thickness={4} />
            <Box>
                <Typography>{text}</Typography>
            </Box>
        </Backdrop>
    );
};

export default LoadingOverlay;
