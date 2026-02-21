import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { pageDefs, type PageDef } from './HelpConst';
import DialogTitle from '@mui/material/DialogTitle';
import { type FC, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OverviewPage from './OverviewPage';
import HardcorePage from './HardcorePage';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LivesPage from './LivesPage';
import TimedPage from './TimedPage';

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
};

const HelpPanel: FC<Props> = ({ open, setOpen }) => {
    const [index, setIndex] = useState(0);

    const pages: PageDef[] = useMemo(() =>
        pageDefs.map(def => ({
            ...def,
            element:
                def.id === 'overview'
                    ? <OverviewPage setIndex={setIndex} />
                    : def.id === 'timed'
                        ? <TimedPage />
                        : def.id === 'lives'
                            ? <LivesPage />
                            : <HardcorePage />
        })),
        [setIndex]);

    const page = pages[index];

    const prev = () => setIndex(i => Math.max(0, i - 1));
    const next = () => setIndex(i => Math.min(pages.length - 1, i + 1));

    const handleClose = () => {
        setOpen(false);
        setIndex(0);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle sx={{ p: 1 }}>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <IconButton disabled={index === 0} onClick={prev}>
                        <ArrowBackIcon />
                    </IconButton>

                    <Stack direction='row' alignItems={'center'}>
                        {page.icon}
                        <Typography variant='h6' marginLeft={1}>
                            {page.label}
                        </Typography>
                    </Stack>

                    <IconButton disabled={index === pages.length - 1} onClick={next}>
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                {page.element}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} variant='contained'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default HelpPanel;
