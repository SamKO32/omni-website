// components/ui/CartPopup.tsx
import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function CartPopup({ onClose }: { onClose: () => void }) {
  const { cart, removeFromCart } = useStore();

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0)
      .toFixed(2);
  };

  return (
    <div className="fixed top-24 right-4 w-80 max-h-[70vh] bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-lg z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold font-custom">CART</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500">✕</button>
      </div>
      {cart.length === 0 ? (
        <p className="text-sm text-gray-300 font-custom">YOUR CART IS EMPTY</p>
      ) : (
        <ul className="space-y-2 font-custom">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between text-sm font-custom">
              <div>
                {item.name} - {item.size ?? 'One Size'}
              </div>
              <div className="flex gap-2 items-center">
                <span>{item.price}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="mt-4 text-right">
          <p className="font-semibold font-custom">Subtotal: ${calculateSubtotal()}</p>
        </div>
      )}
    </div>
  );
}
