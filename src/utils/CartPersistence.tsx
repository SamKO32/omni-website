// src/utils/CartPersistence.ts
import type { CartItem } from "../context/StoreContext";

const CART_KEY = "omni_cart";
const CART_TTL = 3 * 24 * 60 * 60 * 1000; // 3 days

type CartStoragePayload = {
  items: CartItem[];
  updatedAt: number;
};

export function saveCart(cart: CartItem[]) {
  const payload: CartStoragePayload = {
    items: cart,
    updatedAt: Date.now(),
  };

  localStorage.setItem(CART_KEY, JSON.stringify(payload));
}

export function loadCart(): CartItem[] {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];

  try {
    const parsed: CartStoragePayload = JSON.parse(raw);

    const isExpired = Date.now() - parsed.updatedAt > CART_TTL;
    if (isExpired) {
      localStorage.removeItem(CART_KEY);
      return [];
    }

    return parsed.items ?? [];
  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

export function clearCartStorage() {
  localStorage.removeItem(CART_KEY);
}
