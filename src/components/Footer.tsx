import { Box, Typography } from "@mui/material";
import FooterLink from "./FooterLink.tsx";
import { type FC } from "react";

const Footer: FC = () => {
    return (
        <Box component="footer"
            flexGrow={0}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                flex: 0
            }}>
            <Box display="flex"
                gap={2}
                flex={1}>
            </Box>

            <Typography variant="body2"
                align="center"
                flex={1}>
                © roteKlaue 2022-{new Date(Date.now()).getFullYear()}. All rights reserved.
            </Typography>

            <Box display="flex"
                gap={2}
                flex={1}
                justifyContent={"right"}>
                <FooterLink text={"Impressum"} to={"/impressum"} />
            </Box>
        </Box>
    );
};

export default Footer;
