// components/ui/CartPopup.tsx
import React, { useEffect, useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function CartPopup({ onClose }: { onClose: () => void }) {
  const { cart, removeFromCart, addToCart } = useStore();
  const [groupedItems, setGroupedItems] = useState<any[]>([]);

  useEffect(() => {
    const grouped = cart.reduce((acc, item) => {
      const key = `${item.id}-${item.size ?? 'NOSIZE'}`;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 1 };
      } else {
        acc[key].quantity += 1;
      }
      return acc;
    }, {} as Record<string, any>);

    setGroupedItems(Object.values(grouped));
  }, [cart]);

  const calculateSubtotal = () => {
    return groupedItems
      .reduce(
        (total, item) =>
          total + item.quantity * parseFloat(item.price.replace('$', '')),
        0
      )
      .toFixed(2);
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: any
  ) => {
    const newQuantity = parseInt(e.target.value);
    const currentCount = item.quantity;

    if (isNaN(newQuantity)) return;

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

  const handleRemoveAll = (item: any) => {
    for (let i = 0; i < item.quantity; i++) {
      removeFromCart(item);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] max-h-[80vh] bg-white border border-black text-black p-6 rounded-lg shadow-xl z-50 overflow-y-auto font-custom">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">CART</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-lg">
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
                className="text-black text-xl hover:text-red-500"
              >
                ✕
              </button>

              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded"
              />

              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs text-gray-600">{item.size ?? 'One Size'}</div>
              </div>

              <input
                type="number"
                min={0}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, item)}
                className="w-12 text-center border border-gray-400 rounded px-1 py-0.5"
              />

              <div className="text-right font-semibold w-14 text-sm">
                ${(item.quantity * parseFloat(item.price.replace('$', ''))).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {groupedItems.length > 0 && (
        <div className="mt-6 text-right">
          <p className="font-semibold">Subtotal: ${calculateSubtotal()}</p>
        </div>
      )}
    </div>
  );
}
