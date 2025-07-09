import { create } from "zustand";

import { CartItem } from "@/app/types";

interface ModalStore {
  currentProduct: CartItem | null;
  openModal: (product: CartItem) => void;
  closeModal: () => void;

  //for menu
  isSideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
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

    isSideMenuOpen: false,
    openSideMenu: () => {
      set(() => {
        return { isSideMenuOpen: true };
      });
    },

    closeSideMenu: () => {
      set(() => {
        return { isSideMenuOpen: false };
      });
    },
  };
});

export default useModalStore;
