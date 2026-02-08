import errorSfx from "../assets/soundeffects/universfield-error-08-206492.mp3";
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import { useSoundPlaybackStore } from '../stores/SoundPlaybackStore';
import { IconButton } from '@mui/material';

const TempButton = () => {
    const { playSfx } = useSoundPlaybackStore();

    const play = () => playSfx(errorSfx);

    return (<>
        {/* <IconButton onClick={play}>
            <BugReportRoundedIcon />
        </IconButton> */}
    </>);
}

export default TempButton;