import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        aria-label="Go back"
        onClick={() => navigate(-1)}
        className="
          fixed z-50 cursor-pointer
          transition-transform duration-200 hover:scale-110

          /* Mobile (default): higher + a little more left */
          left-[13vw] top-[10dvh]

          /* Laptop+ (sm and up): your original placement */
          sm:left-[12vw] sm:top-[12vh]
        "
      >
        <img
          src="/images/backbutton.png"
          alt="Go Back"
          className="w-14 h-14 sm:w-20 sm:h-20"
        />
      </button>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
