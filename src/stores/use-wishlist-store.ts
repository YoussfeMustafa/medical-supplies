import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product.types";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({ items: [...get().items, product] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((p) => p.id !== productId) });
      },
      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cureline_wishlist_storage",
    }
  )
);
