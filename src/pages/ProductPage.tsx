import React, { useState } from 'react';
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

  if (!product) {
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
            <source src="/videos/tron.mp4" type="video/mp4" />
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
          maxWidth: '600px',
          maxHeight: '80vh',
          padding: '2rem',
          overflowY: 'auto',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'transparent',
          borderRadius: '0',
        }}>
          <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>
            Product not found.
          </h1>
        </div>

        {/* TV frame overlay */}
        <TVFrame><></></TVFrame>
      </>
    );
  }

  const images = [product.image, ...(product.extraImages ?? [])];

  const renderInfoText = () => {
    switch (infoTab) {
      case 'details':
        return product.description;
      case 'fit':
        return `FITS TRUE TO SIZE\nMale model IS 5'7 WEARING SIZE LARGE\nFemale model IS 5'8 WEARING SIZE LARGE`;
      case 'shipping':
        return `SHIPS WITHIN 1 WEEK (UNLESS A PRE-ORDER)\nFOR PRE-ORDERS, PLEASE ALLOW 6 - 8 WEEKS FOR PRODUCTION\nCUSTOMS NOTICE: ALL CUSTOMERS OUTSIDE THE UNITED STATES ARE RESPONSIBLE FOR THE CUSTOMS FEES / DUTIES THAT MAY BE CHARGED BY THEIR COUNTRY FOR IMPORT.`;
      default:
        return '';
    }
  };

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
          <source src="/videos/placeholder.mp4" type="video/mp4" />
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
        maxWidth: '600px',
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
        <h1 className="font-custom" style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
          {product.name}
        </h1>
        <p className="font-custom" style={{ color: '#ccc', textAlign: 'center', marginBottom: '1rem' }}>
          {product.price}
        </p>

        {/* Main Image */}
        <img
          src={selectedImage || product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            marginBottom: '1rem',
            borderRadius: '0.5rem',
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'cover',
                border: `2px solid ${selectedImage === img ? 'white' : '#666'}`,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Size Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}>
          {product.sizes.map(size => (
            <button
              key={size}
              className="font-custom"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid white',
                background: selectedSize === size ? 'white' : 'transparent',
                color: selectedSize === size ? 'black' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={!selectedSize}
          onClick={() => {
            addToCart({ ...product, size: selectedSize ?? undefined }); 
            setShowCart(true)
          }}
          className="font-custom"
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            background: selectedSize ? 'white' : '#444',
            color: selectedSize ? 'black' : '#888',
            border: 'none',
            fontWeight: 'bold',
            cursor: selectedSize ? 'pointer' : 'not-allowed',
            marginBottom: '1rem',
          }}
        >
          Add to Cart
        </button>

        {/* Info Toggle Panel */}
        <div style={{
          borderTop: '1px solid #444',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            fontWeight: '500',
          }}>
            <button
              onClick={() => setInfoTab('details')}
              className="font-custom"
              style={{
                textDecoration: infoTab === 'details' ? 'underline' : 'none',
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              DETAILS
            </button>
            <button
              onClick={() => setInfoTab('fit')}
              className="font-custom"
              style={{
                textDecoration: infoTab === 'fit' ? 'underline' : 'none',
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              FIT / SIZING
            </button>
            <button
              onClick={() => setInfoTab('shipping')}
              className="font-custom"
              style={{
                textDecoration: infoTab === 'shipping' ? 'underline' : 'none',
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              SHIPPING
            </button>
          </div>
          <pre 
            className="font-custom"
            style={{
            whiteSpace: 'pre-wrap',
            fontSize: '0.9rem',
            color: '#ccc',
            margin: 0,
          }}>
            {renderInfoText()}
          </pre>
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
