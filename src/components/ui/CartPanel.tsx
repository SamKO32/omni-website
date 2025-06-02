import React from 'react';
import { Button } from '../../components/ui/button';

export interface CartItem {
  image: string;
  name: string;
  size: string;
  price: string;
}

interface CartPanelProps {
  cart: CartItem[];
  removeFromCart: (index: number) => void;
  close: () => void;
  subtotal: string;
}

const CartPanel: React.FC<CartPanelProps> = ({ cart, removeFromCart, close, subtotal }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white text-black shadow-xl p-6 z-50 flex flex-col pt-16">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Your Cart</h3>
        <button className="text-black hover:underline" onClick={close}>Close</button>
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4 flex-1 overflow-y-auto">
          {cart.map((item, index) => (
            <li key={index} className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <p className="text-sm">{item.price}</p>
              </div>
              <button onClick={() => removeFromCart(index)} className="text-black hover:underline">Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="font-semibold">Subtotal: ${subtotal}</p>
          <Button className="mt-2 w-full bg-black text-white hover:bg-gray-900">Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default CartPanel;
