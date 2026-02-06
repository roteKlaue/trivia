import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
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
                    <Typography onClick={() => navigator("/")}
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            cursor: "pointer"
                        }}>Trivia</Typography>
                    <ModeSwitch />
                </Toolbar>
            </AppBar>
        </Box>
        <NavbarDrawer open={drawerOpen} setOpen={toggleDrawer} />
    </>);
}

export default Navbar;
