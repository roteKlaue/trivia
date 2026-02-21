import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { type FC } from 'react';

const ListLink: FC<{ to: string; text: string }> = ({ to, text }) => {
    const navigate = useNavigate();

    return (<ListItem
        component='button'
        onClick={() => navigate(to)}
        color='text.primary'
        sx={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'action.hover',
            },
        }}>
        <ListItemText primary={
            <Typography color='inherit' variant='body1'>
                {text}
            </Typography>
        } />
    </ListItem>);
};

export default ListLink;
