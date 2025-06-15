// context/StoreContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  size?: string;
};

type RemoveFromCartArg = number | Product;

type StoreContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (arg: RemoveFromCartArg) => void;
  clearCart: () => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (arg: RemoveFromCartArg) => {
    setCart((prev) => {
      if (typeof arg === 'number') {
        const index = prev.findIndex((item) => item.id === arg);
        if (index !== -1) {
          const newCart = [...prev];
          newCart.splice(index, 1);
          return newCart;
        }
        return prev;
      } else {
        const index = prev.findIndex((item) =>
          item.id === arg.id &&
          (item.size ?? 'NOSIZE') === (arg.size ?? 'NOSIZE')
        );
        if (index !== -1) {
          const newCart = [...prev];
          newCart.splice(index, 1);
          return newCart;
        }
        return prev;
      }
    });
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
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
