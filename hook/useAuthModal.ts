import { create } from "zustand";

type AuthState = {
    open: boolean;
    view: "login" | "register" | "resetpassword";
    setOpen: (open: boolean) => void;
    setView: (view: "login" | "register" | "resetpassword") => void;
};

export const useAuthModal = create<AuthState>((set) => ({
    open: false,
    view: "login",
    setOpen: (open) => set({ open }),
    setView: (view) => set({ view }),
}));