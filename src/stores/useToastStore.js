import { create } from "zustand";

const useToastStore = create((set) => ({
  isVisible: false,
  message: "",
  type: "success",

  showToast: (message, type = "success") => {
    set({ isVisible: true, message, type });

    setTimeout(() => {
      set({ isVisible: false });
    }, 2000);
  },
}));

export default useToastStore;
