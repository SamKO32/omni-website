import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import { dummyProducts } from '../data/products';
import { Link } from 'react-router-dom';

export default function StorePage() {
  const { addToCart } = useStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  return (
    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 min-h-screen bg-white text-black">
      {dummyProducts.map((product) => {
        const selectedSize = selectedSizes[product.id];

        return (
          <div key={product.id} className="p-4 bg-white">
            <Link to={`/product/${product.id}`}>
              <img
                src={hoveredProductId === product.id && product.hoverImage ? product.hoverImage : product.image}
                alt={product.name}
                className="w-full aspect-square object-cover mb-2 transition-transform hover:scale-105"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              />
            </Link>

            <div className="flex justify-center space-x-2 mb-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className={`border rounded px-2 py-1 text-sm ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                  onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))}
                >
                  {size}
                </button>
              ))}
            </div>

            <Link to={`/product/${product.id}`}>
              <h2 className="text-center text-lg font-semibold text-black hover:underline">{product.name}</h2>
            </Link>
            <p className="text-center text-gray-600">{product.price}</p>

            {selectedSize ? (
              <Button
                className="mt-2 w-full bg-black text-white hover:bg-gray-900"
                onClick={() => addToCart({ ...product, size: selectedSize })}
              >
                Add to Cart
              </Button>
            ) : (
              <p className="mt-2 text-center text-sm text-gray-400">Select Size</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
