import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import CartPopup from '../components/ui/CartPopup';

type InfoTab = 'details' | 'fit' | 'shipping';
const TABS: InfoTab[] = ['details', 'fit', 'shipping'];

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id ?? '0'));
  const { addToCart } = useStore();
  const [showCart, setShowCart] = useState(false);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [infoTab, setInfoTab] = useState<InfoTab>('details');

  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showCart]);

  if (!product) {
    return (
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}>
        <h1 className="font-custom text-white text-2xl font-bold text-center">Product not found.</h1>
      </div>
    );
  }

  const images = [product.image, ...(product.extraImages ?? [])];

  const renderInfoText = () => {
    switch (infoTab) {
      case 'details':  return product.description;
      case 'fit':      return `True to size.\nModel is 5'7, wearing Large.`;
      case 'shipping': return `Ships within 1 week.\nPre-orders allow 6–8 weeks for production.\nInternational orders may be subject to customs fees.`;
      default:         return '';
    }
  };

  return (
    <>
      {/* Two-column layout */}
      <div
        className="hide-scrollbar"
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '88%',
          maxWidth: '860px',
          maxHeight: '80vh',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'row',
          gap: '1.5rem',
          overflow: 'hidden',
        }}
      >
        {/* LEFT — image + thumbnails */}
        <div style={{
          flex: '0 0 48%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          minWidth: 0,
        }}>
          <img
            src={selectedImage || product.image}
            alt={product.name}
            style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: '0.375rem' }}
          />
          <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb ${i}`}
                onClick={() => setSelectedImage(img)}
                style={{
                  width: '2.75rem', height: '2.75rem',
                  objectFit: 'cover', borderRadius: '0.25rem',
                  cursor: 'pointer',
                  border: `1px solid ${selectedImage === img ? 'white' : '#4b5563'}`,
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — product info */}
        <div
          className="hide-scrollbar"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.75rem',
            overflowY: 'auto',
            minWidth: 0,
          }}
        >
          <div>
            <h1 className="font-custom text-white text-xl font-bold text-center">{product.name}</h1>
            <p className="font-custom text-gray-300 text-center text-sm">{product.price}</p>
          </div>

          {/* Size selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {(product.sizes ?? []).map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className="font-custom"
                style={{
                  width: '2.5rem', height: '2.5rem',
                  borderRadius: '50%',
                  border: '1px solid white',
                  background: selectedSize === size ? 'white' : 'transparent',
                  color: selectedSize === size ? 'black' : 'white',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart */}
          <button
            disabled={!selectedSize}
            onClick={() => {
              const selectedVariant = product.variants?.find(v => v.size === selectedSize);
              if (!selectedVariant) return;
              addToCart({ ...product, size: selectedSize!, variantId: selectedVariant.variantId });
              setShowCart(true);
            }}
            className="font-custom font-bold"
            style={{
              width: '100%',
              padding: '0.6rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: selectedSize ? 'white' : '#444',
              color: selectedSize ? 'black' : '#888',
              cursor: selectedSize ? 'pointer' : 'not-allowed',
              fontSize: '0.875rem',
            }}
          >
            Add to Cart
          </button>

          {/* Info tabs */}
          <div style={{ borderTop: '1px solid #4b5563', paddingTop: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginBottom: '0.625rem' }}>
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setInfoTab(tab)}
                  className="font-custom bg-transparent border-none cursor-pointer"
                  style={{
                    color: 'white',
                    fontSize: '0.75rem',
                    textDecoration: infoTab === tab ? 'underline' : 'none',
                  }}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <pre className="text-xs text-gray-300 font-custom whitespace-pre-wrap text-center leading-relaxed">
              {renderInfoText()}
            </pre>
          </div>
        </div>
      </div>

      {/* Cart button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed z-40 font-custom rounded-full shadow-lg transition-transform duration-200 hover:scale-110 top-[11.5dvh] right-[13dvw] px-3 py-1.5 text-xs sm:top-[14.5vh] sm:right-[12vw] sm:px-4 sm:py-2 sm:text-sm bg-white text-black"
      >
        🛒 CART
      </button>

      {showCart && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 z-40" onClick={() => setShowCart(false)} />
          <CartPopup onClose={() => setShowCart(false)} />
        </>
      )}
    </>
  );
}
