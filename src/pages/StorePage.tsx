import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import { dummyProducts } from '../data/products';
import { Link } from 'react-router-dom';
import TVFrame from '../components/ui/TVFrame';

export default function StorePage() {
  const { addToCart } = useStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  return (
    <TVFrame>
    <div className="pt-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-0 p-4 min-h-screen bg-black text-white">
      {dummyProducts.map((product) => {
        const selectedSize = selectedSizes[product.id];

        return (
          <div key={product.id} className="p-4 bg-black">
            <Link to={`/product/${product.id}`}>
              <img
                src={hoveredProductId === product.id && product.hoverImage ? product.hoverImage : product.image}
                alt={product.name}
                className="w-full max-w-[450px] mx-auto aspect-square object-cover mb-1 transition-transform hover:scale-105"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              />
            </Link>

            {/* <div className="flex justify-center space-x-2 mb-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                  onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))}
                >
                  {size}
                </button>
              ))}
            </div>

            <Link to={`/product/${product.id}`}>
              <h2 className="text-center text-lg font-semibold text-white hover:underline">{product.name}</h2>
            </Link>
            <p className="text-center text-gray-600">{product.price}</p>

            {selectedSize ? (
              <Button
                className="mt-2 w-full bg-gray-800 text-white hover:bg-gray-900"
                onClick={() => addToCart({ ...product, size: selectedSize })}
              >
                Add to Cart
              </Button>
            ) : (
              <p className="mt-2 text-center text-sm text-gray-400">Select Size</p>
            )} */}
          </div>
        );
      })}
    </div>
    </TVFrame>
  );
}
