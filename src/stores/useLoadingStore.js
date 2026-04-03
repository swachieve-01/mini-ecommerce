import { create } from "zustand";

export const useLoadingStore = create((set) => ({
  loadingCount: 0,
  message: "상품 정보를 불러오고 있어요...",

  startLoading: (msg) =>
    set((state) => ({
      loadingCount: state.loadingCount + 1,
      message: msg || state.message,
    })),

  stopLoading: () =>
    set((state) => ({
      loadingCount: Math.max(0, state.loadingCount - 1),
    })),
}));
