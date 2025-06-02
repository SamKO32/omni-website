import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onMenuClick, onCartClick, cartCount }: {
  onMenuClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}) => {
  return (
    <nav className="fixed top-0 w-full bg-transparent p-4 flex justify-between items-center text-black z-50">
      <button onClick={onMenuClick} className="hover:text-gray-700">Menu</button>

      <div className="text-2xl font-bold tracking-widest">
        <Link to="/store">
          <img src="/images/O LOGO.png" alt="OMNI Logo" style={{ height: '70px' }} />
        </Link>
      </div>

      <button onClick={onCartClick} className="hover:text-gray-700">
        Cart ({cartCount})
      </button>
    </nav>
  );
};

export default Navbar;
