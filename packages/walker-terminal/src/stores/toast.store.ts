import { create } from "zustand";

type ToastType = {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
};

type ToastStoreType = {
  toast: ToastType | null;
  addToast: (toast: ToastType) => void;
  removeToast: () => void;
};

export const useToastStore = create<ToastStoreType>((set, get) => ({
  toast: null,
  addToast: (toast) => {
    set(() => ({
      toast,
    }));

    if (toast.duration) {
      setTimeout(() => {
        get().removeToast();
      }, toast.duration);
    }
  },
  removeToast: () => {
    set(() => ({
      toast: null,
    }));
  },
}));

export function addToast(toast: ToastType) {
  useToastStore.getState().addToast(toast);
}

export function removeToast() {
  useToastStore.getState().removeToast();
}
