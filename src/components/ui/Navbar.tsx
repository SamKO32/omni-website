import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({
  onMenuClick,
  onCartClick,
  cartCount,
}: {
  onMenuClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}) => {
  return (
    <nav className="fixed top-0 w-full bg-transparent p-4 flex justify-between items-center text-white z-50 mt-6">
      {/* Left */}
      <button onClick={onMenuClick} className="hover:text-gray-700 ml-10">
        MENU
      </button>

      {/* Center Logo - absolute and spaced from top */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/home">
          <img
            src="/images/O WORLD BONE square.png"
            alt="OMNI Logo"
            className="h-[100px]"
          />
        </Link>
      </div>

      {/* Right */}
      <button onClick={onCartClick} className="hover:text-gray-700 mr-10">
        CART ({cartCount})
      </button>
    </nav>
  );
};

export default Navbar;
