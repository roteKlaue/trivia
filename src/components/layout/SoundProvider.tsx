import { useSoundSettingsStore } from "../../stores/SoundSettingsStore";
import { useSoundPlaybackStore } from "../../stores/SoundPlaybackStore";
import { useEffect, useRef } from "react";

const DUCK_MULTIPLIER = 0.35;

const SoundProvider = () => {
    const { currentMusic, nextMusic, sfxQueue, clearSfxChannel } = useSoundPlaybackStore();
    const { isMuted, volume } = useSoundSettingsStore();

    const musicRef = useRef<HTMLAudioElement | null>(null);
    const cacheRef = useRef<Map<string, HTMLAudioElement>>(new Map());
    const activeSfxRef = useRef(0);

    const baseVolume = isMuted ? 0 : volume / 100;

    const getCached = (src: string) => {
        let audio = cacheRef.current.get(src);
        if (audio) return audio;

        audio = new Audio(src);
        audio.preload = "auto";
        cacheRef.current.set(src, audio);
        return audio;
    };

    const updateMusicVolume = () => {
        if (!musicRef.current) return;

        musicRef.current.volume =
            activeSfxRef.current > 0 ? baseVolume * DUCK_MULTIPLIER : baseVolume;
    };

    useEffect(() => {
        updateMusicVolume();

        if (!musicRef.current) return;

        if (baseVolume === 0) musicRef.current.pause();
        else musicRef.current.play().catch(() => {});
    }, [baseVolume]);

    useEffect(() => {
        if (!musicRef.current) return;

        if (!currentMusic) {
            musicRef.current.pause();
            return;
        }

        musicRef.current.src = currentMusic;
        musicRef.current.loop = true;
        musicRef.current.play().catch(() => {});

        const onEnded = () => {
            nextMusic();
        };

        musicRef.current.addEventListener("ended", onEnded);
        return () => musicRef.current?.removeEventListener("ended", onEnded);
    }, [currentMusic, nextMusic]);

    useEffect(() => {
        if (!sfxQueue.length) return;

        sfxQueue.forEach((src) => {
            const base = getCached(src);
            const audio = base.cloneNode(true) as HTMLAudioElement;

            audio.volume = baseVolume;
            audio.currentTime = 0;

            activeSfxRef.current++;
            updateMusicVolume();

            audio.play().catch(() => {});

            audio.onended = () => {
                activeSfxRef.current--;
                updateMusicVolume();
            };
        });

        clearSfxChannel();
    }, [sfxQueue, baseVolume, clearSfxChannel]);

    return <audio ref={musicRef} />;
};

export default SoundProvider;
