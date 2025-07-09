import { create } from "zustand";

import { CartItem } from "@/app/types";

interface ModalStore {
  currentProduct: CartItem | null;
  openModal: (product: CartItem) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => {
  return {
    currentProduct: null,

    openModal: (product: CartItem) => {
      set(() => {
        return { currentProduct: product };
      });
    },

    closeModal: () => {
      set(() => {
        return { currentProduct: null };
      });
    },
  };
});

export default useModalStore;
