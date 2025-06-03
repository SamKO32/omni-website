import React from 'react';
import { Link } from 'react-router-dom';

interface MenuPanelProps {
  close: () => void;
}

const MenuPanel: React.FC<MenuPanelProps> = ({ close }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-80 bg-white text-black shadow-xl p-6 z-50 flex flex-col pt-16">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">MENU</h3>
        <button className="text-black hover:underline" onClick={close}>
          Close
        </button>
      </div>
      <div className="mb-6">
        <ul className="space-y-2">
          <li>
            <Link to="/store" onClick={close}>HOME</Link>
          </li>
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
            <Link to="/privacy" onClick={close}>PRIVACY POLICY</Link>
          </li>
          <li>
            <Link to="/faq" onClick={close}>FAQ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuPanel;
