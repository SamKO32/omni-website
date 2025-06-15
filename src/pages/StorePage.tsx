import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import { dummyProducts } from '../data/products';
import { Link } from 'react-router-dom';
import TVFrame from '../components/ui/TVFrame';
import CartPopup from '../components/ui/CartPopup';

export default function StorePage() {
  const { addToCart } = useStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [showCart, setShowCart] = useState(false);

  // Disable scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showCart]);

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

      {/* 🛒 Cart Button */}
     <button
        onClick={() => setShowCart(true)}
        style={{
          top: '15vh',
          right: '12vw',
          backgroundColor: 'white',
          color: 'black',
        }}
        className="fixed z-40 font-custom px-4 py-2 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
      >
        🛒 CART
      </button>

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

                <Link to={`/product/${product.id}`}>
                  <h2 className="text-center text-lg font-semibold font-custom text-white hover:underline">{product.name}</h2>
                </Link>
                <p className="text-center text-white font-custom">{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal cart + background */}
      {showCart && (
        <>
          {/* 🔒 Backdrop that disables interaction & closes on click */}
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            onClick={() => setShowCart(false)}
          />

          {/* 🛒 Cart popup itself */}
          <CartPopup onClose={() => setShowCart(false)} />
        </>
      )}

      {/* TV Frame */}
      <TVFrame><></></TVFrame>
    </>
  );
}
