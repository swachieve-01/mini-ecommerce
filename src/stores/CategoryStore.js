import { create } from "zustand";

//  모바일버전 열닫기 값 다루기
export const useCategoryStore = create((set) => ({
  isOpen: false,
  setOpen: (value) => set({ isOpen: value }),
}));
