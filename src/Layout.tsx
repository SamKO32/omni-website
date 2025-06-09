import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useStore } from './context/StoreContext';
import Navbar from './components/ui/Navbar';
import MenuPanel from './components/ui/MenuPanel';
import CartPanel, { CartItem } from './components/ui/CartPanel';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const { cart, removeFromCart, showCart, setShowCart, menuOpen, setMenuOpen } = useStore();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  useEffect(() => {
    setShowCart(false);
    setMenuOpen(false);
  }, [location.pathname]);
  
  const closePanels = () => {
    setShowCart(false);
    setMenuOpen(false);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
  };

  const cartWithSize: CartItem[] = cart.map(item => ({
    ...item,
    size: item.size ?? 'N/A',
  }));

  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        style={{ left: '220px', top: '100px' }}
      className="fixed z-50 cursor-pointer hover:scale-110 transition-transform duration-200"
      >
        <img
          src="/images/backbutton.png" // <-- your custom cursor/back icon here
          alt="Go Back"
          className="w-20 h-20"
        />
      </div>
      {/* {(showCart || menuOpen) && <div className="fixed inset-0 bg-black opacity-90 z-10" onClick={closePanels}></div>}

      <Navbar
        onMenuClick={() => setMenuOpen(prev => !prev)}
        onCartClick={() => setShowCart(prev => !prev)}
        cartCount={cart.length}
      />

      {menuOpen && (
        <MenuPanel
          close={() => setMenuOpen(false)}
        />
      )}

      {showCart && (
        <CartPanel
          cart={cartWithSize}
          removeFromCart={removeFromCart}
          close={() => setShowCart(false)}
          subtotal={calculateSubtotal()}
        />
      )} */}
      
      {/* <main className={isHomePage ? '' : 'pt-24'}>
        <Outlet />
      </main> */}
      <main>
        <Outlet />
      </main>
      {/* <footer className="text-center text-xs text-white pb-7">
        © 2025, ONTO MY NEXT IDEA
      </footer> */}
    </div>
  );
};

export default Layout;
