import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        style={{ left: '12vw', top: '12vh' }}
      className="fixed z-50 cursor-pointer hover:scale-110 transition-transform duration-200"
      >
        <img
          src="/images/backbutton.png"
          alt="Go Back"
          className="w-20 h-20"
        />
      </div>
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
