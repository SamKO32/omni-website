import { useState } from 'react';
import { Button } from './components/ui/button';
import React from 'react';

function ContactPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <button className="mb-4 text-black hover:underline" onClick={onBack}>← Back</button>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>
        For inquiries, collaborations, or support, reach out to us at{' '}
        <a href="mailto:contact@omni.com" className="text-black hover:underline">
          contact@omni.com
        </a>.
      </p>
    </div>
  );
}

function PlaceholderPage({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (input === 'OMNIADMIN') {
      setError('');
      onUnlock();
    } else {
      setError('Incorrect passcode. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 flex flex-col items-center justify-center">
    <img src="/images/O LOGO.png" alt="OMNI Logo" style={{ height: '70px' }} />
      <p className="mb-6">Under construction. Enter admin passcode for access.</p>
      <input
        type="password"
        placeholder="Enter passcode"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 mb-2 w-64 text-black"
      />
      <Button onClick={handleSubmit} className="bg-black text-white w-64">Enter</Button>
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}

function StorePage({
  onBack,
  onContact,
  onPrivacy,
  onFAQ,
}: {
  onBack: () => void;
  onContact: () => void;
  onPrivacy: () => void;
  onFAQ: () => void;
}) {
  const [cart, setCart] = useState<{ id: number; name: string; price: string; image: string; size?: string }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  const dummyProducts = [
    { id: 1, name: 'TIME F*CKS TEE', price: '$29.99', image: '/images/TIME F* FRONT.png', hoverImage: '/images/TIME F* BACK.png' },
    { id: 2, name: 'PSP TEE', price: '$29.99', image: '/images/PSP TEE.png', hoverImage: '/images/imageloading.png' },
    { id: 3, name: 'NASA HOODIE', price: '$99.99', image: '/images/NASA HOODIE FRONT.png', hoverImage: '/images/NASA HOODIE BACK.png' },
    { id: 4, name: 'MEMBER HOODIE', price: '$39.99', image: '/images/2035 HOODIE FRONT.png', hoverImage: '/images/2035 HOODIE BACK.png' },
    { id: 5, name: 'O DUTCH JERSEY', price: '$29.99', image: '/images/O DUTCH JERSEY.png', hoverImage: '/images/imageloading.png' },
    { id: 6, name: 'TORTURE BEANIE', price: '$29.99', image: '/images/TORTURE_BEANIE_FRONT.png', hoverImage: '/images/TORTURE_BEANIE_BACK.png' },
    { id: 7, name: 'WWW BEANIE', price: '$99.99', image: '/images/WWW.OMNI.COM BEANIE OUTER.png', hoverImage: '/images/WWW.OMNI.COM INSIDE.png' },
    { id: 8, name: 'DENIM SPACE TROUSERS', price: '$39.99', image: '/images/O SPACE TROUSERS.png', hoverImage: '/images/imageloading.png' },
  ];

  const addToCart = (product: { id: number; name: string; price: string; image: string }) => {
    setCart((prev) => [...prev, { ...product, size: selectedSizes[product.id] }]);
    setShowCart(true);
    setMenuOpen(false);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
  };

  const closePanels = () => {
    setShowCart(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setShowCart(false);
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-black relative">
      {(showCart || menuOpen) && (
        <div className="fixed inset-0 bg-black opacity-80 z-10" onClick={closePanels}></div>
      )}
      <nav className="fixed top-0 w-full bg-transparent p-4 flex justify-between items-center text-black z-50">
        <button onClick={toggleMenu} className="hover:text-gray-700">Menu</button>
        <div className="text-2xl font-bold tracking-widest">
          <img src="/images/O LOGO.png" alt="OMNI Logo" style={{ height: '70px' }} />
        </div>
        <button onClick={toggleCart} className="hover:text-gray-700">Cart ({cart.length})</button>
      </nav>

      {menuOpen && (
        <div className="fixed top-0 left-0 h-full w-80 bg-white text-black shadow-xl p-6 z-50 flex flex-col pt-16">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Menu</h3>
            <button className="text-black hover:underline" onClick={() => setMenuOpen(false)}>Close</button>
          </div>
          <div className="mb-6">
            <p className="font-bold mb-2">Shop</p>
            <ul className="space-y-2">
              <li><button onClick={onBack}>Shop All</button></li>
              <li><button>Shirts</button></li>
              <li><button>Pants</button></li>
              <li><button>Accessories</button></li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-2">Info</p>
            <ul className="space-y-2">
              <li><button onClick={onContact}>Contact</button></li>
              <li><a href="https://discord.gg/omni" target="_blank" rel="noopener noreferrer" className="text-left w-full block text-black hover:text-black">Discord</a></li>
              <li><button onClick={onPrivacy}>Privacy Policy</button></li>
              <li><button onClick={onFAQ}>FAQ</button></li>
            </ul>
          </div>
        </div>
      )}

      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
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
                    className={`border rounded px-2 py-1 text-sm ${
                      selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                    onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <h2 className="text-center text-lg font-semibold text-black">{product.name}</h2>
              <p className="text-center text-gray-600">{product.price}</p>
              {selectedSize ? (
                <Button
                  className="mt-2 w-full bg-black text-white hover:bg-gray-900"
                  onClick={() => addToCart(product)}
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

      {showCart && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white text-black shadow-xl p-6 z-50 flex flex-col pt-16">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Your Cart</h3>
            <button className="text-black hover:underline" onClick={() => setShowCart(false)}>Close</button>
          </div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-4 flex-1 overflow-y-auto">
              {cart.map((item, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm">{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-black hover:underline">Remove</button>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <p className="font-semibold">Subtotal: ${calculateSubtotal()}</p>
              <Button className="mt-2 w-full bg-black text-white hover:bg-gray-900">Checkout</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<'placeholder' | 'store' | 'contact' | 'privacy' | 'faq'>('placeholder');

  return (
    <>
      {page === 'placeholder' && <PlaceholderPage onUnlock={() => setPage('store')} />}
      {page === 'store' && (
        <StorePage
          onBack={() => {}}
          onContact={() => setPage('contact')}
          onPrivacy={() => setPage('privacy')}
          onFAQ={() => setPage('faq')}
        />
      )}
      {page === 'contact' && <ContactPage onBack={() => setPage('store')} />}
      {page === 'privacy' && <PlaceholderPage onUnlock={() => setPage('store')} />}
      {page === 'faq' && <PlaceholderPage onUnlock={() => setPage('store')} />}
    </>
  );
}
