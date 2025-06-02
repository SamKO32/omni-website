import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import React, { useState } from 'react';
import { dummyProducts } from '../data/products';

export default function ProductPage() {
  const { id } = useParams();
  const product = dummyProducts.find(p => p.id === parseInt(id ?? '0'));
  const { addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) return <div className="p-6">Product not found.</div>;

  return (
    <div className="pt-24 p-6 max-w-3xl mx-auto text-black">
      <img src={product.image} alt={product.name} className="w-full mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.price}</p>

      <div className="flex space-x-2 mb-4">
        {['S', 'M', 'L', 'XL'].map(size => (
          <button
            key={size}
            className={`border rounded px-3 py-1 ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {selectedSize ? (
        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
          onClick={() => addToCart({ ...product, size: selectedSize })}
        >
          Add to Cart
        </button>
      ) : (
        <p className="text-gray-500">Please select a size</p>
      )}
    </div>
  );
}

