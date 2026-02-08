import { Box, Typography } from "@mui/material";
import { type FC } from "react";
import FooterLink from "./FooterLink";

const Footer: FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: { xs: 0, sm: 2 },
                padding: { xs: 0, sm: 2 },
                backgroundColor: 'background.paper',
            }}
        >
            <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
            ></Box>

            <Typography
                variant="body2"
                textAlign="center"
                sx={{ flexShrink: 0 }}
            >
                © roteKlaue 2022-{new Date().getFullYear()}. All rights reserved.
            </Typography>

            <Box
                display="flex"
                gap={2}
                justifyContent={{ xs: 'center', sm: 'flex-end' }}
                flexWrap="wrap"
            >
                <FooterLink text="Credits" to="/trivia/credits" />
            </Box>
        </Box>
    );
};

export default Footer;
