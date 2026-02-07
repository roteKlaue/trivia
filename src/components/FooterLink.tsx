import { Button, Link as MuiLink, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { type FC, useState } from "react";

const FooterLink: FC<{ text: string, to: string }> = ({ to, text }) => {
    const [hover, setHover] = useState(false);

    return (<Button color={"inherit"}>
        <MuiLink
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            component="span"

            style={{
                position: "relative",
                paddingBottom: "2px",
                textDecoration: "none",
                color: "inherit"
            }}>

            <RouterLink
                style={{
                    textDecoration: "none",
                    color: "inherit"
                }}
                to={to}>
                <Typography variant="body2" component="span">
                    {text.toUpperCase()}
                </Typography>
                <span
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "2px",
                        width: "100%",
                        backgroundColor: "currentColor",
                        transform: hover ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.5s ease-in-out",
                    }}
                />
            </RouterLink>
        </MuiLink>
    </Button>);
}

export default FooterLink;