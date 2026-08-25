// components/ui/CartPopup.tsx
import React, { useMemo, useState } from "react";
import { CartItem } from "../../context/storeContextValue";
import { useStore } from "../../context/useStore";
import { createShopifyCheckout } from "../../../lib/shopify";

type GroupedCartItem = CartItem & { quantity: number };

// Strips currency formatting ("$" and thousands separators) before parsing —
// a plain .replace('$', '') would silently truncate "$1,200.00" to 1.
function parsePrice(price: string): number {
  return parseFloat(price.replace(/[$,]/g, ""));
}

export default function CartPopup({ onClose }: { onClose: () => void }) {
  const { cart, removeFromCart, addToCart, clearCart } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const groupedItems = useMemo(() => {
    const grouped = cart.reduce(
      (acc, item) => {
        const key = `${item.id}-${item.size ?? "NOSIZE"}`;
        if (!acc[key]) {
          acc[key] = { ...item, quantity: 1 };
        } else {
          acc[key].quantity += 1;
        }
        return acc;
      },
      {} as Record<string, GroupedCartItem>
    );
    return Object.values(grouped);
  }, [cart]);

  const subtotal = useMemo(
    () =>
      groupedItems
        .reduce((total, item) => total + item.quantity * parsePrice(item.price), 0)
        .toFixed(2),
    [groupedItems]
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, item: GroupedCartItem) => {
    const newQuantity = parseInt(e.target.value);
    const currentCount = item.quantity;

    if (isNaN(newQuantity)) return;
    if (newQuantity < 0) return;

    if (newQuantity === 0) {
      for (let i = 0; i < currentCount; i++) {
        removeFromCart(item);
      }
    } else if (newQuantity > currentCount) {
      const diff = newQuantity - currentCount;
      for (let i = 0; i < diff; i++) {
        addToCart(item);
      }
    } else if (newQuantity < currentCount) {
      const diff = currentCount - newQuantity;
      for (let i = 0; i < diff; i++) {
        removeFromCart(item);
      }
    }
  };

  const handleRemoveAll = (item: GroupedCartItem) => {
    for (let i = 0; i < item.quantity; i++) {
      removeFromCart(item);
    }
  };

  const handleCheckout = async () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      const data = await createShopifyCheckout(groupedItems);
      const url = data?.data?.cartLinesAdd?.cart?.checkoutUrl;

      if (!url) {
        console.error("Checkout URL missing:", data);
        setCheckoutError("Something went wrong creating your checkout. Please try again.");
        return;
      }

      // Close the popup and clear the cart together, right after triggering the
      // redirect — closing first means there's nothing left mounted to visibly
      // flash an "empty cart" state while the browser is still leaving the page.
      window.location.href = url;
      onClose();
      clearCart();
    } catch (error) {
      console.error("Error during checkout:", error);
      const message =
        error instanceof Error
          ? error.message
          : "We couldn’t connect to Shopify. Please try again.";
      setCheckoutError(message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div
      className="
    fixed left-1/2 top-1/2 z-50 max-h-[65dvh]
    w-[70vw] max-w-[420px]
    -translate-x-1/2
    -translate-y-1/2 overflow-y-auto rounded-lg border
    border-black bg-white
    p-4 font-custom text-black
    shadow-xl
    sm:p-6
  "
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">CART</h2>
        <button
          onClick={onClose}
          aria-label="Close cart"
          className="text-lg text-gray-600 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {groupedItems.length === 0 ? (
        <p className="text-sm text-gray-600">YOUR CART IS EMPTY</p>
      ) : (
        <ul className="space-y-6">
          {groupedItems.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              <button
                onClick={() => handleRemoveAll(item)}
                aria-label="Remove item"
                className="text-xl text-black hover:text-red-500"
              >
                ✕
              </button>

              <img src={item.image} alt={item.name} className="size-14 rounded object-cover" />

              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs text-gray-600">{item.size ?? "One Size"}</div>
              </div>

              <input
                type="number"
                min={0}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, item)}
                className="w-12 rounded border border-gray-400 px-1 py-0.5 text-center"
              />

              <div className="w-14 text-right text-sm font-semibold">
                ${(item.quantity * parsePrice(item.price)).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {groupedItems.length > 0 && (
        <div className="mt-6">
          <p className="text-right font-semibold">Subtotal: ${subtotal}</p>

          {checkoutError && (
            <p className="mt-2 text-center text-xs text-red-600">{checkoutError}</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="mt-4 w-full rounded-full border border-black px-4 py-2 font-custom shadow-lg transition-transform duration-200 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          >
            {isCheckingOut ? "REDIRECTING..." : "CHECKOUT"}
          </button>
        </div>
      )}
    </div>
  );
}
