import { create } from "zustand";
export interface Store {
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  isAdmin:
    typeof window !== "undefined" && localStorage.getItem("user") === "admin",
  setAdmin: (isAdmin: boolean) => set(() => ({ isAdmin })),
}));
