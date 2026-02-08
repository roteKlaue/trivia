import { create } from "zustand";

type SoundSettingsStore = {
    isMuted: boolean;
    volume: number;
    setVolume(volume: number): void;
    toggleMute(): void;
}

export const useSoundSettingsStore = create<SoundSettingsStore>((set) => ({
    isMuted: true,
    volume: 100,

    setVolume: (volume: number) => {
        set({
            volume,
            isMuted: false,
        });
    },

    toggleMute() {
        set(old => ({
            isMuted: !old.isMuted,
        }))
    }
}));
