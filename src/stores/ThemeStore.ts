import { FireDarkTheme, FireLightTheme } from "../styling/FireTheme.ts";
import { DarkTheme, LightTheme } from "../styling/DefaultTheme.ts";
import type { Theme } from "@mui/material";
import { create } from "zustand";

type Mode = "light" | "dark";

type ThemeVariant = {
    light: Theme;
    dark: Theme;
};

type ThemeState = {
    themes: Record<string, ThemeVariant>;

    activeTheme: string;
    mode: Mode;

    setTheme: (name: string) => void;
    toggleMode: () => void;
    setMode: (mode: Mode) => void;

    getCurrentTheme: () => Theme;
};

const STORAGE_KEY = "app-theme-state";

const load = () => {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

const save = (data: { activeTheme: string; mode: Mode }) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const useThemeStore = create<ThemeState>((set, get) => {
    const persisted = load();

    return {
        themes: {
            default: {
                light: LightTheme,
                dark: DarkTheme,
            },
            modern: {
                light: FireLightTheme,
                dark: FireDarkTheme,
            },
            fire: {
                light: FireLightTheme,
                dark: FireDarkTheme,
            },
        },

        activeTheme: persisted?.activeTheme ?? "default",
        mode: persisted?.mode ?? "dark",

        setTheme: (name) =>
            set((state) => {
                if (!state.themes[name]) return state;

                save({ activeTheme: name, mode: state.mode });
                return { activeTheme: name };
            }),

        toggleMode: () =>
            set((state) => {
                const next = state.mode === "dark" ? "light" : "dark";

                save({ activeTheme: state.activeTheme, mode: next });
                return { mode: next };
            }),

        setMode: (mode) =>
            set((state) => {
                save({ activeTheme: state.activeTheme, mode });
                return { mode };
            }),

        getCurrentTheme: () => {
            const { themes, activeTheme, mode } = get();
            return themes[activeTheme][mode];
        },
    };
});
