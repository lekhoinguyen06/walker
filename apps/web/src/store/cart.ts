import { CardProp } from '@/types/card';
import { create } from 'zustand';

export type CartItem = CardProp

export type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (item) =>
    set((state) => ({ items: state.items.filter((i) => i.title !== item.title) })),
}));