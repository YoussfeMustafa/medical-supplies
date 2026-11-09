import { create } from "zustand";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface UIStore {
  searchModalOpen: boolean;
  mobileNavOpen: boolean;
  activeQuickViewSlug: string | null;
  toasts: ToastMessage[];

  setSearchModalOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setActiveQuickViewSlug: (slug: string | null) => void;
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  searchModalOpen: false,
  mobileNavOpen: false,
  activeQuickViewSlug: null,
  toasts: [],

  setSearchModalOpen: (open) => set({ searchModalOpen: open }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setActiveQuickViewSlug: (slug) => set({ activeQuickViewSlug: slug }),

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { ...toast, id };
    set({ toasts: [...get().toasts, newToast] });

    const duration = toast.duration || 4000;
    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },

  removeToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },
}));
