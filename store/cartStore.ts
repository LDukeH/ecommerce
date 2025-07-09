import { create } from "zustand";

import { CartItem } from "@/app/types";

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  deleteFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => {
  return {
    cart: [],
    addToCart: (item: CartItem) => {
      set((state: CartStore) => {
        const existingItemIndex = state.cart.findIndex(
          (i: CartItem) => i.name === item.name
        );

        console.log(existingItemIndex);

        if (existingItemIndex == -1) {
          return { cart: [...state.cart, item] };
        }

        const updatedCart = [...state.cart];

        updatedCart[existingItemIndex].quantity! += item.quantity!;

        return { cart: updatedCart };
      });
    },

    deleteFromCart: (item: CartItem) => {
      set((state: CartStore) => {
        const updatedCart = state.cart.filter(
          (i: CartItem) => i.name !== item.name
        );
        return { cart: updatedCart };
      });
    },

    clearCart: () => {
      set(() => {
        return { cart: [] };
      });
    },
  };
});

export default useCartStore;
