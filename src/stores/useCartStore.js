import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // 1. 상품 담기 (기존 기능 + 중복 체크 로직 포함)
      addToCart: (item) =>
        set((state) => {
          const isExist = state.cart.find(
            (cartItem) => cartItem.id === item.id,
          );
          if (isExist) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              ),
            };
          }
          return { cart: [...state.cart, { ...item, checked: false }] };
        }),

      // 2. 개별 상품 삭제
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // 3. 개별 아이템 체크 토글
      toggleItemCheck: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item,
          ),
        })),

      // 4. 전체 선택/해제
      toggleAllCheck: (isAllChecked) =>
        set((state) => ({
          cart: state.cart.map((item) => ({ ...item, checked: !isAllChecked })),
        })),

      // 5. 선택 삭제
      removeSelected: () =>
        set((state) => ({
          cart: state.cart.filter((item) => !item.checked),
        })),

      // 6. 수량 업데이트 (증가/감소)
      updateQuantity: (id, newQty) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item,
          ),
        })),
    }),
    { name: "cart-storage" },
  ),
);
