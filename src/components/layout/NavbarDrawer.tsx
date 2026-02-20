import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
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
