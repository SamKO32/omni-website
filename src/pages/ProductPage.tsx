import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { dummyProducts } from '../data/products';
import TVFrame from '../components/ui/TVFrame';
import CartPopup from '../components/ui/CartPopup';

export default function ProductPage() {
  const { id } = useParams();
  const product = dummyProducts.find(p => p.id === parseInt(id ?? '0'));
  const { addToCart } = useStore();
  const [showCart, setShowCart] = useState(false);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [infoTab, setInfoTab] = useState<'details' | 'fit' | 'shipping'>('details');

  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCart]);

  if (!product) {
    return (
      <>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
          <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/videos/tron.mp4" type="video/mp4" />
          </video>
        </div>

        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '90%', maxWidth: '600px', maxHeight: '80vh',
          padding: '2rem', overflowY: 'auto', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: 'transparent'
        }}>
          <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>
            Product not found.
          </h1>
        </div>

        <TVFrame><></></TVFrame>
      </>
    );
  }

  const images = [product.image, ...(product.extraImages ?? [])];

  const renderInfoText = () => {
    switch (infoTab) {
      case 'details': return product.description;
      case 'fit': return `FITS TRUE TO SIZE\nMale model IS 5'7 WEARING SIZE LARGE\nFemale model IS 5'8 WEARING SIZE LARGE`;
      case 'shipping': return `SHIPS WITHIN 1 WEEK (UNLESS A PRE-ORDER)\nFOR PRE-ORDERS, PLEASE ALLOW 6 - 8 WEEKS FOR PRODUCTION\nCUSTOMS NOTICE: ALL CUSTOMERS OUTSIDE THE UNITED STATES ARE RESPONSIBLE FOR THE CUSTOMS FEES / DUTIES THAT MAY BE CHARGED BY THEIR COUNTRY FOR IMPORT.`;
      default: return '';
    }
  };

  return (
    <>
      {/* Background Video */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
        <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/videos/placeholder.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '90%', maxWidth: '600px', maxHeight: '80vh',
        padding: '2rem', overflowY: 'auto', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        backgroundColor: 'transparent'
      }}
        className='hide-scrollbar'
      >
        <h1 className="font-custom text-white text-2xl font-bold text-center mb-4">{product.name}</h1>
        <p className="font-custom text-gray-300 text-center mb-4">{product.price}</p>

        <img
          src={selectedImage || product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded mb-4"
        />

        <div className="flex justify-center gap-2 mb-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumb ${i}`}
              className={`w-12 h-12 object-cover border ${selectedImage === img ? 'border-white' : 'border-gray-600'} rounded cursor-pointer`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {product.sizes.map(size => (
            <button
              key={size}
              className="w-10 h-10 rounded-full border font-custom flex items-center justify-center"
              style={{
                background: selectedSize === size ? 'white' : 'transparent',
                color: selectedSize === size ? 'black' : 'white',
                borderColor: 'white'
              }}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          disabled={!selectedSize}
          onClick={() => {
            addToCart({ ...product, size: selectedSize ?? undefined });
            setShowCart(true);
          }}
          className="font-custom w-full py-3 rounded font-bold mb-4"
          style={{
            background: selectedSize ? 'white' : '#444',
            color: selectedSize ? 'black' : '#888',
            cursor: selectedSize ? 'pointer' : 'not-allowed',
            border: 'none'
          }}
        >
          Add to Cart
        </button>

        <div className="border-t border-gray-600 pt-4 pb-10">
          <div className="flex justify-center gap-6 text-sm font-medium mb-3 font-custom">
            {['details', 'fit', 'shipping'].map(tab => (
              <button
                key={tab}
                onClick={() => setInfoTab(tab as any)}
                style={{ textDecoration: infoTab === tab ? 'underline' : 'none', color: 'white' }}
                className="bg-transparent border-none cursor-pointer"
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <pre className="text-sm text-gray-300 font-custom whitespace-pre-wrap">{renderInfoText()}</pre>
        </div>
      </div>

      {/* 🛒 Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        style={{
          top: '15vh',
          right: '12vw',
        }}
        className="fixed z-40 bg-white text-black font-custom px-4 py-2 rounded-full shadow-lg hover:bg-gray-400 transition"
      >
        🛒 CART
      </button>

      {/* 🔒 Backdrop + Cart Popup */}
      {showCart && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            onClick={() => setShowCart(false)}
          />
          <CartPopup onClose={() => setShowCart(false)} />
        </>
      )}

      {/* TV Frame Overlay */}
      <TVFrame><></></TVFrame>
    </>
  );
}
