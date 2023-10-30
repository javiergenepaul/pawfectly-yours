import { create } from "zustand";

interface LoadingStoreState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingStoreState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
