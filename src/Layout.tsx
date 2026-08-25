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
        // Mobile (default): higher + a little more left. Laptop+ (sm and up): original placement.
        className="fixed left-[13vw] top-[10dvh] z-50 cursor-pointer transition-transform duration-200 hover:scale-110 sm:left-[12vw] sm:top-[12vh]"
      >
        <img src="/images/backbutton.png" alt="Go Back" className="size-14 sm:size-20" />
      </button>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
