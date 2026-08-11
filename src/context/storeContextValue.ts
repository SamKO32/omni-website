import { createContext } from "react";

export type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  description?: string;
  extraImages?: string[];
  hoverImage?: string;
  sizes?: string[];
  variants?: { size: string; variantId: string }[];
};

export type CartItem = Product & {
  size: string;
  variantId: string;
};

export type StoreContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (match: CartItem) => void;
  clearCart: () => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
};

export const StoreContext = createContext<StoreContextType | undefined>(undefined);
