import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavbarDrawer from "./NavbarDrawer.tsx";
import ModeSwitch from "./ModeSwitch.tsx";
import { useState } from "react";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigator = useNavigate();

    const toggleDrawer = (open: boolean) => () => {
        const delay = open ? 150 : 100;

        setTimeout(() => {
            setDrawerOpen(open);
        }, delay);
    };

    return (<>
        <Box flex={0}>
            <AppBar position="static" color={'default'}>
                <Toolbar>
                    <QuestionMarkRoundedIcon />
                    <Typography onClick={() => navigator("/trivia")}
                        variant="h6"
                        sx={{
                            marginLeft: 1,
                            cursor: "pointer"
                        }}>Trivia</Typography>
                    <Box sx={{ flexGrow: 1, height: "100%" }} />
                    <ModeSwitch />
                </Toolbar>
            </AppBar>
        </Box>
        <NavbarDrawer open={drawerOpen} setOpen={toggleDrawer} />
    </>);
}

export default Navbar;
