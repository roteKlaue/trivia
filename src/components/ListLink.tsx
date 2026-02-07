import { ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { type FC } from "react";

const ListLink: FC<{ to: string; text: string }> = ({ to, text }) => {
    const navigate = useNavigate();

    return (
        <ListItem
            component="button"
            onClick={() => navigate(to)}
            sx={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "text.primary",
                "&:hover": {
                    backgroundColor: "action.hover",
                },
            }}
        >
            <ListItemText
                primary={
                    <Typography color="inherit" variant="body1">
                        {text}
                    </Typography>
                }
            />
        </ListItem>
    );
};

export default ListLink;
