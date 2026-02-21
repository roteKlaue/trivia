import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const Credits = () => {
    const navigate = useNavigate();
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='flex-start'
            flexDirection='column'
            p={4}
            gap={3}
            sx={{ maxWidth: 600, margin: '0 auto' }}
        >
            <Typography variant='h4' gutterBottom>
                Credits
            </Typography>

            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant='h6'>Sound Effects</Typography>
                <Typography variant='body1'>
                    Provided by{' '}
                    <Link href='https://pixabay.com/users/universfield-28281460/' target='_blank' rel='noopener'>
                        universfield
                    </Link>{' '}
                    via <Link href='https://pixabay.com/' target='_blank' rel='noopener'>
                        Pixabay
                    </Link>.
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    License: Pixabay Content License. Free to use, modify, and adapt. Attribution is appreciated but not required.{' '}
                    <Link href='https://pixabay.com/service/license/' target='_blank' rel='noopener'>
                        Full License
                    </Link>
                    .
                </Typography>
            </Paper>

            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant='h6'>Background Music</Typography>
                <Typography variant='body1'>
                    Provided by{' '}
                    <Link href='https://pixabay.com/users/sonican-38947841/' target='_blank' rel='noopener'>
                        sonican
                    </Link>{' '}
                    via <Link href='https://pixabay.com/' target='_blank' rel='noopener'>
                        Pixabay
                    </Link>.
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    License: Pixabay Content License. Free to use, modify, and adapt. Attribution is appreciated but not required.{' '}
                    <Link href='https://pixabay.com/service/license/' target='_blank' rel='noopener'>
                        Full License
                    </Link>
                    .
                </Typography>
            </Paper>

            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant='h6'>Trivia Questions</Typography>
                <Typography variant='body1'>
                    Provided by{' '}
                    <Link href='https://the-trivia-api.com/' target='_blank' rel='noopener'>
                        The Trivia API
                    </Link>
                    .
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    License: Creative Commons Attribution-NonCommercial 4.0 International License. Free for non-commercial use. Credit is required.{' '}
                    <Link href='https://creativecommons.org/licenses/by-nc/4.0/' target='_blank' rel='noopener'>
                        Full License
                    </Link>
                    .
                </Typography>
            </Paper>


            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                width={'100%'}>
                <Button variant='contained' onClick={() => navigate(-1)}>Back</Button>
            </Box>
        </Box>
    );
};

export default Credits;
