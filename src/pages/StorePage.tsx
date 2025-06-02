import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';

const dummyProducts = [
  { id: 1, name: 'TIME F*CKS TEE', price: '$30', image: '/images/TIME F* FRONT.png', hoverImage: '/images/TIME F* BACK.png' },
  { id: 2, name: 'PSP TEE', price: '$30', image: '/images/PSP TEE.png', hoverImage: '/images/imageloading.png' },
  { id: 3, name: 'NASA HOODIE', price: '$80', image: '/images/NASA HOODIE FRONT.png', hoverImage: '/images/NASA HOODIE BACK.png' },
  { id: 4, name: 'MEMBER HOODIE', price: '$50', image: '/images/2035 HOODIE FRONT.png', hoverImage: '/images/2035 HOODIE BACK.png' },
  { id: 5, name: 'O DUTCH JERSEY', price: '$65', image: '/images/O DUTCH JERSEY.png', hoverImage: '/images/imageloading.png' },
  { id: 6, name: 'TORTURE BEANIE', price: '$17', image: '/images/TORTURE_BEANIE_FRONT.png', hoverImage: '/images/TORTURE_BEANIE_BACK.png' },
  { id: 7, name: 'WWW BEANIE', price: '$20', image: '/images/WWW.OMNI.COM BEANIE OUTER.png', hoverImage: '/images/WWW.OMNI.COM INSIDE.png' },
  { id: 8, name: 'DENIM SPACE TROUSERS', price: '$125', image: '/images/SPACE TROUSERS FRONT.png', hoverImage: '/images/SPACE TROUSERS BACK.png' },
];

export default function StorePage() {
  const { addToCart } = useStore();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  return (
    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 min-h-screen bg-white text-black">
      {dummyProducts.map((product) => {
        const selectedSize = selectedSizes[product.id];
        return (
          <div key={product.id} className="p-4 bg-white">
            <img
              src={hoveredProductId === product.id && product.hoverImage ? product.hoverImage : product.image}
              alt={product.name}
              className="w-full aspect-square object-cover mb-2"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            />
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
            <h2 className="text-center text-lg font-semibold text-black">{product.name}</h2>
            <p className="text-center text-gray-600">{product.price}</p>
            {selectedSize ? (
              <Button className="mt-2 w-full bg-black text-white hover:bg-gray-900" onClick={() => addToCart({ ...product, size: selectedSize })}>
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
