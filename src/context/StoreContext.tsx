// context/StoreContext.tsx
import React, { createContext, useContext, useState } from "react";

export type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  description?: string;
  extraImages?: string[];
  sizes?: string[];
  variants?: { size: string; variantId: string }[];
};

export type CartItem = Product & {
  size: string;
  variantId: string;
};

type RemoveFromCartArg = CartItem;

type StoreContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (arg: RemoveFromCartArg) => void;
  clearCart: () => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (match: CartItem) => {
  setCart(prev =>
    prev.filter(item =>
      !(item.id === match.id && item.size === match.size && item.variantId === match.variantId)
    )
  );
};

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
};
