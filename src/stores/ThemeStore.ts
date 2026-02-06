import { create } from "zustand";

type ThemeState = {
    isDarkMode: boolean;
    toggleTheme: () => void;
    setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    isDarkMode: (() => {
        const saved = localStorage.getItem("isDarkMode");
        return saved ? JSON.parse(saved) : true;
    })(),
    toggleTheme: () =>
        set((state) => {
            const newMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", JSON.stringify(newMode));
            return { isDarkMode: newMode };
        }),
    setDarkMode: (value: boolean) => {
        localStorage.setItem("isDarkMode", JSON.stringify(value));
        set({ isDarkMode: value });
    },
}));
