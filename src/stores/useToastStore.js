import { create } from "zustand";

const useToastStore = create((set) => ({
  isVisible: false,
  message: "",
  type: "success",

  showToast: (message, type = "success") => {
    set({ isVisible: true, message, type });

    setTimeout(() => {
      set({ isVisible: false });
    }, 600);
  },
}));

export default useToastStore;
