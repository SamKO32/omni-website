// context/StoreContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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

type StoreContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (match: CartItem) => void;
  clearCart: () => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
};

const CART_STORAGE_KEY = "omni_cart_v1";
const CART_TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

type StoredCartPayload = {
  version: 1;
  updatedAt: number; // epoch ms
  cart: CartItem[];
};

function safeParseJSON<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const payload = safeParseJSON<StoredCartPayload>(raw);

    // Backwards compat: if you previously stored just an array, support it.
    if (Array.isArray(payload as any)) return payload as any as CartItem[];

    if (!payload || payload.version !== 1) return [];

    // TTL check
    const now = Date.now();
    if (typeof payload.updatedAt !== "number" || now - payload.updatedAt > CART_TTL_MS) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }

    return Array.isArray(payload.cart) ? payload.cart : [];
  } catch {
    // private mode / storage blocked / quota exceeded
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  if (typeof window === "undefined") return;

  const payload: StoredCartPayload = {
    version: 1,
    updatedAt: Date.now(),
    cart,
  };

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore (private mode / storage full)
  }
}

function clearCartStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch {
    // ignore
  }
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  // hydrate once on first render
  const [cart, setCart] = useState<CartItem[]>(() => loadCartFromStorage());
  const [showCart, setShowCart] = useState(false);

  // persist whenever cart changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (match: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.id === match.id &&
          item.size === match.size &&
          item.variantId === match.variantId
      );
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };

  const clearCart = () => {
    setCart([]);
    clearCartStorage();
  };

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      showCart,
      setShowCart,
    }),
    [cart, showCart]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
};
