import React, { useEffect, useState } from 'react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import CartPopup from '../components/ui/CartPopup';
import { useStore } from '../context/useStore';

export default function StorePage() {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const { showCart, setShowCart } = useStore();

  // Disable scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showCart]);

  return (
    <>

      {/* 🛒 Cart Button */}
     <button
        onClick={() => setShowCart(true)}
        className="
          fixed z-40 font-custom rounded-full shadow-lg
          transition-transform duration-200 hover:scale-110

          /* MOBILE (default) */
          top-[11.5dvh] right-[13dvw]
          px-3 py-1.5 text-xs

          /* TABLET + DESKTOP */
          sm:top-[14.5vh] sm:right-[12vw]
          sm:px-4 sm:py-2 sm:text-sm

          bg-white text-black
        "
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
          {products.map((product) => {

            return (
              <div key={product.id} className="p-4 bg-transparent rounded-lg">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={hoveredProductId === product.id && product.hoverImage ? product.hoverImage : product.image}
                    alt={product.name}
                    className="w-full max-w-[400px] mx-auto aspect-square object-cover mb-2 transition-transform hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
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

    </>
  );
}
