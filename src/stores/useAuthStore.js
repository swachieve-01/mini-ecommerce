import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  // 새로고침해도 로그인이 풀리지 않음 (persist)
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      isAuthenticated: false,
      hasHydrated: false,
      setHasHydrated: (val) => set({ hasHydrated: val }), // 상태 변경 함수 추가
      // 실시간 상태 동기화
      login: (data) =>
        set({
          token: data.token,
          userInfo: data.userInfo,
          isAuthenticated: true,
        }),
      logout: () =>
        set({ token: null, userInfo: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    },
  ),
);

export default useAuthStore;
