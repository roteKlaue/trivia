import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import SoundControll from './SoundControll.tsx';
import { useNavigate } from 'react-router-dom';
import NavbarDrawer from './NavbarDrawer.tsx';
import ModeSwitch from './ModeSwitch.tsx';
import { useState } from 'react';
import { FireBackground } from './FireComponent.tsx';

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
                        position="relative"
                        justifyContent='center'
                        alignItems='center'>
                        <FireBackground
                            sx={{
                                top: 12,
                                left: 19,
                                width: 36,
                                height: 36,
                                opacity: 0.6,
                            }}
                            scale={2.5}
                        />
                        <PsychologyAltRoundedIcon sx={{ zIndex:3 }} />
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
