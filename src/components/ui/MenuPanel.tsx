import React from 'react';
import { Link } from 'react-router-dom';

interface MenuPanelProps {
  close: () => void;
}

const MenuPanel: React.FC<MenuPanelProps> = ({ close }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-80 bg-white text-black shadow-xl p-6 z-50 flex flex-col pt-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">MENU</h3>
        <button className="text-black hover:underline" onClick={close}>
          Close
        </button>
      </div>

      {/* Top Links */}
      <ul className="space-y-2">
        <li>
          <Link to="/store" onClick={close}>SHOP</Link>
        </li>
        <li>
          <Link to="/listen" onClick={close}>LISTEN</Link>
        </li>
      </ul>

      {/* Bottom Links */}
      <ul className="space-y-2 mt-auto">
        <li>
          <Link to="/contact" onClick={close}>CONTACT</Link>
        </li>
        <li>
          <a
            href="https://discord.gg/aVAwQEaU"
            target="_blank"
            rel="noopener noreferrer"
          >
            DISCORD
          </a>
        </li>
        <li>
          <Link to="/faq" onClick={close}>FAQ / TERMS</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuPanel;
