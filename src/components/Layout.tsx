import other from "../assets/music/sonican-quiz-background-loop-thinking-news-275636.mp3";
import musicFile from "../assets/music/sonican-news-loop-tech-quiz-276674.mp3";
import { useSoundPlaybackStore } from "../stores/SoundPlaybackStore.ts";
import { useSoundSettingsStore } from "../stores/SoundSettingsStore.ts";
import SoundProvider from "./SoundProvider.tsx";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import { useEffect } from "react";

const Layout = () => {
    const { currentMusic, playMusic } = useSoundPlaybackStore();
    const { volume, isMuted } = useSoundSettingsStore();
    
    useEffect(() => {
        if (volume > 0 && !isMuted && !currentMusic) {
            playMusic(musicFile);
            playMusic(other, false);
        }
    }, [volume, isMuted]);

    return (<Box display="flex"
        flexDirection="column"
        minHeight="100vh"
        maxHeight={"100vh"}>
        <Navbar />
        <Box component={"main"}
            flex={1}
            padding={2}
            overflow={'auto'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}>
            <Outlet />
        </Box>
        <Footer />
        <SoundProvider />
    </Box>);
}

export default Layout;
