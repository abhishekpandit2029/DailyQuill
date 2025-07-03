import { create } from "zustand";

interface AuthState {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  name: "",
  email: "",
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  reset: () => set({ name: "", email: "" }),
}));
