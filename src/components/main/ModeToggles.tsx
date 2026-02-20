// import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import BrowseGalleryRoundedIcon from '@mui/icons-material/BrowseGalleryRounded';
import Timer10SelectRoundedIcon from '@mui/icons-material/Timer10SelectRounded';
import Timer3SelectRoundedIcon from '@mui/icons-material/Timer3SelectRounded';
import { StyledToggleButtonGroup } from './StyledToggleButtonGroup';
import WhatshotIcon from '@mui/icons-material/WhatshotRounded';
import FavoriteIcon from '@mui/icons-material/FavoriteRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useThemeStore } from '../../stores/ThemeStore';
import ToggleButton from '@mui/material/ToggleButton';
import { FireComponent } from '../FireComponent';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, type FC } from 'react';
import Box from '@mui/material/Box';
import HardcoreIcon from './Skull';

const ModeToggles: FC<{ toggles: string[], setToggles: (a: string[]) => void }> = ({ toggles, setToggles }) => {
    const { activeTheme, setTheme } = useThemeStore();

    const handleToggles = (
        _event: React.MouseEvent<HTMLElement> | null,
        newFormats: string[],
    ) => {
        if (newFormats.includes('hard')) {
            setTheme('fire');
            setToggles(['hard']);
            return;
        }

        setTheme('default');
        if (newFormats.includes('speeder') && !toggles.includes('speeder')) {
            setToggles(newFormats.filter(v => v === 'speeder' || v === 'showAnswers'));
            return;
        }

        if (!newFormats.includes('timed')) {
            newFormats = newFormats.filter(v => v !== 'short' && v !== 'shorter');
        } else {
            newFormats = newFormats.filter(v => v !== 'speeder');
        }

        if (newFormats.includes('short') && !toggles.includes('short')) {
            newFormats = newFormats.filter(v => v !== 'shorter');
        }

        if (newFormats.includes('shorter') && !toggles.includes('shorter')) {
            newFormats = newFormats.filter(v => v !== 'short');
        }

        if (newFormats.includes('hp') && !toggles.includes('hp')) {
            newFormats = newFormats.filter(v => v !== 'death');
        }

        if (newFormats.includes('death') && !toggles.includes('death')) {
            newFormats = newFormats.filter(v => v !== 'hp');
        }
        setToggles(newFormats);
    };

    useEffect(() => {
        handleToggles(null, toggles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hardcoreMode = toggles.includes('hard');
    const timedMode = toggles.includes('timed');

    return (<Box width='100%' display='flex' justifyContent='center'>
        <StyledToggleButtonGroup
            size='small'
            value={toggles}
            onChange={handleToggles}
            aria-label='toggles'
        >
            <Tooltip title='Show correct answers after each question' arrow>
                <ToggleButton
                    disabled={hardcoreMode}
                    value='showAnswers'
                    aria-label='show answers'>
                    <VisibilityIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title='Timed mode' arrow>
                <ToggleButton
                    disabled={hardcoreMode}
                    value='timed'
                    aria-label='timed'>
                    <BrowseGalleryRoundedIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title='10 Second Timer' arrow>
                <ToggleButton
                    value='short'
                    aria-label='short'
                    disabled={!timedMode || hardcoreMode}>
                    <Timer10SelectRoundedIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title='3 Second Timer' arrow>
                <ToggleButton
                    value='shorter'
                    aria-label='shorter'
                    disabled={!timedMode || hardcoreMode}>
                    <Timer3SelectRoundedIcon />
                </ToggleButton>
            </Tooltip>

            {/* <Tooltip title='Speedrun Mode' arrow>
                                <ToggleButton
                                    value='speeder'
                                    aria-label='speeder'
                                    disabled={toggles.includes('hard')}>
                                    <DirectionsRunRoundedIcon />
                                </ToggleButton>
                            </Tooltip> */}

            <Tooltip title='Lives Mode' arrow>
                <ToggleButton
                    disabled={hardcoreMode}
                    value='hp'
                    aria-label='hp'>
                    <FavoriteIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title='Sudden Death Mode' arrow>
                <ToggleButton
                    disabled={hardcoreMode}
                    value='death'
                    aria-label='death'>
                    <WhatshotIcon color={hardcoreMode ? void 0 : 'error'} />
                </ToggleButton>
            </Tooltip>

            <Tooltip title='Hardcore Mode' arrow>
                <ToggleButton value='hard' aria-label='hard' sx={{ position: 'relative' }}>
                    <FireComponent
                        sx={{ transform: `scale(2)`, width: 24 }}
                        scale={4} position={{ x: 0, y: 0 }} />
                    {activeTheme !== 'fire' && <HardcoreIcon color='error' sx={{ zIndex: 2 }} />}
                </ToggleButton>
            </Tooltip>
        </StyledToggleButtonGroup>
    </Box>);
}

export default ModeToggles;
