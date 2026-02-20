import { Divider, Drawer, List, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ListLink from './ListLink.tsx';
import { type FC } from 'react';

const NavbarDrawer: FC<{ open: boolean, setOpen: (_: boolean) => () => void }> = ({ open, setOpen }) => {
    const navigator = useNavigate();

    return (<Drawer sx={{ flex: 0 }} 
        anchor='left'
        open={open}
        onClose={setOpen(false)}>
        <List sx={{ width: 250 }}
            role='presentation'
            onClick={setOpen(false)}
            onKeyDown={setOpen(false)}>
            <ListItemButton onClick={setOpen(false)}>
                <ListItemIcon>
                    <CloseIcon />
                </ListItemIcon>
                <Typography onClick={() => navigator('/')} variant='h6'>roteKlaue</Typography>
            </ListItemButton>
            <Divider />
            <ListLink text='Home' to='/' />
            <ListLink text='About Me' to='/about' />
            <ListLink text='Impressum' to='/impressum' />
        </List>
    </Drawer>);
}

export default NavbarDrawer;
