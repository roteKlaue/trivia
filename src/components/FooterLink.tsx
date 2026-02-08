import { Box, Button, Link as MuiLink, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { type FC, useState } from "react";

const FooterLink: FC<{ text: string, to: string }> = ({ to, text }) => {
    const [hover, setHover] = useState(false);
    const nav = useNavigate();

    return (<Button color={"inherit"}>
        <MuiLink
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => nav(to)}
            component="span"

            style={{
                position: "relative",
                paddingBottom: "2px",
                textDecoration: "none",
                color: "inherit"
            }}>

            <span>
                <Typography variant="body2" component="span">
                    {text.toUpperCase()}
                </Typography>

                <Box
                    component="span"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: 2,
                        width: "100%",
                        bgcolor: "currentColor",
                        transform: hover ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.5s ease-in-out",
                    }}
                />
            </span>
        </MuiLink>
    </Button>);
}

export default FooterLink;
