import { useSoundSettingsStore } from "../../stores/SoundSettingsStore";
import { Box, IconButton, Slider, Tooltip } from "@mui/material";
import VolumeDown from "@mui/icons-material/VolumeDownRounded";
import VolumeMute from "@mui/icons-material/VolumeMuteRounded";
import VolumeOff from "@mui/icons-material/VolumeOffRounded";
import VolumeUp from "@mui/icons-material/VolumeUpRounded";

const SoundControll = () => {
    const { volume, setVolume, toggleMute, isMuted } = useSoundSettingsStore();

    const handleSlider = (_: Event, value: number | number[]) => {
        if (Array.isArray(value)) return;
        setVolume(value);
    };

    const getIcon = () => {
        if (isMuted || volume === 0) return <VolumeOff />;
        if (volume < 30) return <VolumeMute />;
        if (volume < 70) return <VolumeDown />;
        return <VolumeUp />;
    };

    return (<Box
        display="flex"
        alignItems="center"
        sx={{
            gap: 1,
            "& .volume-slider": {
                width: 0,
                transition: "width 180ms ease",
            },
            "&:hover .volume-slider": {
                width: 120,
            },
            "& .MuiSlider-thumb": {
                opacity: 0,
                transition: "opacity 120ms ease",
            },
            "&:hover .MuiSlider-thumb": {
                opacity: 1,
            },
        }}
    >
        <Slider
            className="volume-slider"
            value={isMuted ? 0 : volume}
            min={0}
            max={100}
            onChange={handleSlider}
            size="small"
        />

        <Tooltip title={(isMuted || volume == 0) ? "Unmute" : "Mute"} arrow>
            <IconButton onClick={() => {
                if (volume === 0 && isMuted) {
                    toggleMute();
                    setVolume(20);
                } else {
                    toggleMute();
                }
            }}>
                {getIcon()}
            </IconButton>
        </Tooltip>
    </Box>);
};

export default SoundControll;
