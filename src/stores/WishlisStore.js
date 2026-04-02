// stores/useWishStore.js
import { create } from "zustand";

export const useWishStore = create((set) => ({
  wishList: [],

  toggleWish: (product) =>
    set((state) => {
      const exists = state.wishList.find((item) => item.id === product.id);

      if (exists) {
        return {
          wishList: state.wishList.filter((item) => item.id !== product.id),
        };
      } else {
        return {
          wishList: [...state.wishList, product],
        };
      }
    }),

  // 단일 삭제
  removeWish: (id) =>
    set((state) => ({
      wishList: state.wishList.filter((item) => item.id !== id),
    })),

  // 여러개 삭제
  removeSelected: (ids) =>
    set((state) => ({
      wishList: state.wishList.filter((item) => !ids.includes(item.id)),
    })),
}));
