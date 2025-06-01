import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Button } from './components/ui/button';
import React from 'react';


function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="h-screen w-screen relative bg-black">
      <Canvas className="absolute top-0 left-0 h-full w-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[100, 100, 64, 64]} />
          <meshStandardMaterial color="#3a0ca3" wireframe={true} />
        </mesh>

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <mesh rotation={[0.4, 0.4, 0]} position={[0, 2, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#f72585" wireframe />
        </mesh>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.0} />
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center">
        <Button className="text-white text-xl p-6 bg-pink-600 hover:bg-pink-700" onClick={onEnter}>
          Enter Store
        </Button>
      </div>
    </div>
  );
}

function ContactPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white p-8">
      <button className="mb-4 text-pink-500 hover:underline" onClick={onBack}>← Back</button>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>For inquiries, collaborations, or support, reach out to us at <a href="mailto:contact@omni.com" className="text-pink-400 hover:underline">contact@omni.com</a>.</p>
    </div>
  );
}

function ProfilePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white p-8">
      <button className="mb-4 text-pink-500 hover:underline" onClick={onBack}>← Back</button>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p>This is your profile page. Add account settings and order history here in the future.</p>
    </div>
  );
}

function StorePage({ onBack, onContact, onProfile }: { onBack: () => void, onContact: () => void, onProfile: () => void }) {
  const [cart, setCart] = useState<{ id: number; name: string; price: string }[]>([]);

  const dummyProducts = [
    {
      id: 1,
      name: 'Time F*cks Tee',
      price: '$29.99',
      image: '/images/TIME F* FRONT.png'
    },
    {
      id: 2,
      name: 'PSP Tee',
      price: '$29.99',
      image: '/images/PSP TEE.png'
    },
    {
      id: 3,
      name: 'NASA Hoodie',
      price: '$99.99',
      image: '/images/NASA HOODIE FRONT.png'
    },
    {
      id: 4,
      name: '2035 Hoodie',
      price: '$39.99',
      image: '/images/2035 HOODIE FRONT.png'
    //   frontImage: '/images/2035 HOODIE FRONT.png',
    //   backImage: '/images/2035 HOODIE BACK.png'
    }
  ];

  const addToCart = (product: { id: number; name: string; price: string }) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      <nav className="w-full bg-black bg-opacity-80 p-4 flex justify-between items-center text-white">
        <div className="flex gap-6">
          <button onClick={onBack} className="hover:text-pink-500">Home</button>
          <button className="hover:text-pink-500">Shop</button>
          <button onClick={onContact} className="hover:text-pink-500">Contact</button>
        </div>
        <div className="text-2xl font-bold tracking-widest">OMNI</div>
        <div className="flex gap-4">
          <button onClick={onProfile} className="hover:text-pink-500">Profile</button>
          <button className="hover:text-pink-500">Cart ({cart.length})</button>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {dummyProducts.map(product => (
          <div key={product.id} className="border border-gray-700 rounded-xl p-4 shadow-md bg-gray-900 hover:shadow-pink-500/50 transition-shadow">
            {product.frontImage && product.backImage ? (
              <div className="flex gap-2 mb-4">
                <img
                  src={product.frontImage}
                  alt={product.name + ' Front'}
                  className="w-1/2 h-64 object-contain bg-white rounded transform transition-transform duration-300 hover:scale-110"
                />
                <img
                  src={product.backImage}
                  alt={product.name + ' Back'}
                  className="w-1/2 h-64 object-contain bg-white rounded transform transition-transform duration-300 hover:scale-110"
                />
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain mb-4 bg-white rounded transform transition-transform duration-300 hover:scale-110"
              />
            )}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg text-gray-300">{product.price}</p>
            <Button
              className="mt-2 w-full bg-pink-600 text-white hover:bg-pink-700"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-xl shadow-lg max-w-xs w-full">
          <h3 className="font-bold text-lg mb-2">Cart</h3>
          <ul className="text-sm space-y-1 max-h-48 overflow-y-auto">
            {cart.map((item, index) => (
              <li key={index}>{item.name} - {item.price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<'landing' | 'store' | 'contact' | 'profile'>('landing');

  return (
    <main className="overflow-hidden relative min-h-screen w-full">
      {page === 'landing' && <LandingPage onEnter={() => setPage('store')} />}
      {page === 'store' && (
        <StorePage
          onBack={() => setPage('landing')}
          onContact={() => setPage('contact')}
          onProfile={() => setPage('profile')}
        />
      )}
      {page === 'contact' && <ContactPage onBack={() => setPage('store')} />}
      {page === 'profile' && <ProfilePage onBack={() => setPage('store')} />}
    </main>
  );
}