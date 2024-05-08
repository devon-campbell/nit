import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle(!isOpen);  // Notify the parent about the state change
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-100 z-10" style={{ height: isOpen ? 'auto' : '50px' }}>
      <div className="flex justify-between items-center p-1">
        <button onClick={toggleMenu} className="text-3xl cursor-pointer pb-1 ml-2">
          ☰
        </button>
        <Link to="/" className="text-2xl font-bold text-gray-800 font-sans flex-grow ml-2">
          nit
        </Link>
      </div>
      <ul className={`${isOpen ? 'flex' : 'hidden'} flex-col items-start pl-4 w-full mt-2`}>
        <li>
          <Link to="/learn" className="no-underline text-gray-500 hover:text-gray-800 py-2 block">learn</Link>
        </li>
        <li>
          <Link to="/play" className="no-underline text-gray-500 hover:text-gray-800 py-2 block">play</Link>
        </li>
        <li>
          <Link to="/piano" className="no-underline text-gray-500 hover:text-gray-800 py-2 block">piano</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
