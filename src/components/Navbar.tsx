import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import SoundControll from './SoundControll.tsx';
import { useNavigate } from 'react-router-dom';
import NavbarDrawer from './NavbarDrawer.tsx';
import ModeSwitch from './ModeSwitch.tsx';
import { useState } from 'react';

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
            <AppBar position='static' color='default'>
                <Toolbar>
                    <Box onClick={() => navigator('/trivia')}
                        sx={{ cursor: 'pointer' }}
                        marginLeft={1}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'>
                        <PsychologyAltRoundedIcon />
                        <Typography variant='h6' paddingLeft={1}>Trivia</Typography>
                    </Box>
                    <Box flexGrow={1} height='100%' />
                    <SoundControll />
                    <ModeSwitch />
                    <IconButton>
                        <HelpCenterRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
        <NavbarDrawer open={drawerOpen} setOpen={toggleDrawer} />
    </>);
}

export default Navbar;
