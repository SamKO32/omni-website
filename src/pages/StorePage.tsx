import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import { dummyProducts } from '../data/products';
import { Link } from 'react-router-dom';
import TVFrame from '../components/ui/TVFrame';
import CartPopup from '../components/ui/CartPopup';

export default function StorePage() {
  const { addToCart } = useStore();
  const [showCart, setShowCart] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  return (
    <>
      {/* Full-screen background video */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <video
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/filler.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Centered, scrollable content */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '1200px',
        maxHeight: '80vh',
        padding: '2rem',
        overflowY: 'auto',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        borderRadius: '0',
      }}
      className='hide-scrollbar'>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {dummyProducts.map((product) => {
            const selectedSize = selectedSizes[product.id];

            return (
              <div key={product.id} className="p-4 bg-transparent rounded-lg">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={hoveredProductId === product.id && product.hoverImage ? product.hoverImage : product.image}
                    alt={product.name}
                    className="w-full max-w-[400px] mx-auto aspect-square object-cover mb-2 transition-transform hover:scale-105"
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  />
                </Link>

                {/* Size selector (commented out as in your original) */}
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
                </div> */}

                <Link to={`/product/${product.id}`}>
                  <h2 className="text-center text-lg font-semibold font-custom text-white hover:underline">{product.name}</h2>
                </Link>
                <p className="text-center text-white font-custom">{product.price}</p>

                {/* Add to cart button (commented out as in your original) */}
                {/* {selectedSize ? (
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
          <button onClick={() => setShowCart(!showCart)}
            className="fixed top-4 right-4 z-40 bg-white font-custom text-black px-4 py-2 rounded-full shadow-lg hover:bg-gray-400 transition"
            style={{
              top:"4vh",
              right:"10vh"
            }}
          >
          🛒 CART
        </button>
        {showCart && <CartPopup onClose={() => setShowCart(false)} />}
      </div>
      


      {/* TV frame overlay */}
      <TVFrame><></></TVFrame>
    </>
  );
}
