import { create } from "zustand";

type SoundPlaybackStore = {
    sfxQueue: string[];
    musicQueue: string[];
    currentMusic?: string;
    loopMusic?: boolean;

    playMusic: (src: string, replace?: boolean) => void;
    enqueueMusic: (src: string) => void;
    nextMusic: () => void;
    stopMusic: () => void;

    playSfx: (src: string) => void;
    popSfx: () => string | undefined;
    clearSfxChannel: () => void;
};

export const useSoundPlaybackStore = create<SoundPlaybackStore>((set, get) => ({
    sfxQueue: [],
    musicQueue: [],
    currentMusic: undefined,
    loopMusic: true,

    playMusic: (src, replace = true) => {
        if (!src) return;

        if (replace) {
            set({ currentMusic: src, musicQueue: [] });
            return;
        }

        get().enqueueMusic(src);
    },

    enqueueMusic: (src) => {
        if (!src) return;

        set((s) => ({
            musicQueue: [...s.musicQueue, src]
        }));
    },

    nextMusic: () => {
        const { musicQueue, loopMusic } = get();
        if (!musicQueue.length) {
            set({ currentMusic: undefined });
            return;
        }

        const [next, ...rest] = musicQueue;

        set({
            currentMusic: next,
            musicQueue: loopMusic ? [...rest, next] : rest
        });
    },

    stopMusic: () =>
        set({
            currentMusic: undefined,
            musicQueue: []
        }),


    playSfx: (src) => {
        if (!src) return;

        set((s) => ({
            sfxQueue: [...s.sfxQueue, src]
        }));
    },

    popSfx: () => {
        const { sfxQueue } = get();
        if (!sfxQueue.length) return undefined;

        const [first, ...rest] = sfxQueue;

        set({ sfxQueue: rest });

        return first;
    },

    clearSfxChannel: () => set({ sfxQueue: [] })
}));
