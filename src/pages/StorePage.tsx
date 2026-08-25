import React, { useEffect, useState } from "react";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import CartPopup from "../components/ui/CartPopup";
import { useStore } from "../context/useStore";

export default function StorePage() {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const { showCart, setShowCart } = useStore();

  // Disable scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = showCart ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCart]);

  return (
    <>
      {/* 🛒 Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        // MOBILE (default) vs TABLET + DESKTOP positioning below
        className="fixed right-[13dvw] top-[11.5dvh] z-40 rounded-full bg-white px-3 py-1.5 font-custom text-xs text-black shadow-lg transition-transform duration-200 hover:scale-110 sm:right-[12vw] sm:top-[14.5vh] sm:px-4 sm:py-2 sm:text-sm"
      >
        🛒 CART
      </button>

      {/* Centered, scrollable content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "1200px",
          maxHeight: "80vh",
          padding: "2rem",
          overflowY: "auto",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "transparent",
          borderRadius: "0",
        }}
        className="hide-scrollbar"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {products.map((product) => {
            return (
              <div key={product.id} className="rounded-lg bg-transparent p-4">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={
                      hoveredProductId === product.id && product.hoverImage
                        ? product.hoverImage
                        : product.image
                    }
                    alt={product.name}
                    className="mx-auto mb-2 aspect-square w-full max-w-[400px] object-cover transition-transform hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  />
                </Link>

                <Link to={`/product/${product.id}`}>
                  <h2 className="text-center font-custom text-lg font-semibold text-white hover:underline">
                    {product.name}
                  </h2>
                </Link>
                <p className="text-center font-custom text-white">{product.price}</p>
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
            className="fixed inset-0 z-40 bg-black bg-opacity-60"
            onClick={() => setShowCart(false)}
          />

          {/* 🛒 Cart popup itself */}
          <CartPopup onClose={() => setShowCart(false)} />
        </>
      )}
    </>
  );
}
