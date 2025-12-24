const CART_KEY = "omni_cart";
const CART_TTL = 3 * 24 * 60 * 60 * 1000; // 3 days

export function saveCart(cart: any[]) {
  const payload = {
    items: cart,
    updatedAt: Date.now(),
  };

  localStorage.setItem(CART_KEY, JSON.stringify(payload));
}

export function loadCart(): any[] {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    const isExpired = Date.now() - parsed.updatedAt > CART_TTL;

    if (isExpired) {
      localStorage.removeItem(CART_KEY);
      return [];
    }

    return parsed.items || [];
  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

export function clearCartStorage() {
  localStorage.removeItem(CART_KEY);
}
