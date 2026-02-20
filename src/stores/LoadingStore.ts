import { create } from "zustand";

type LoadingStore = {
    open: boolean;
    text: string;
    setText(text: string): void;
    setOpen(open: boolean): void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
    open: false,
    text: "",

    setText(text: string): void {
        set({ text });
    },

    setOpen(open: boolean): void {
        set({ open });
    }
}));
