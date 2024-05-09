import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = ({ onToggle, freakMode, toggleFreakMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle(!isOpen);  // Notify the parent about the state change
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onToggle) {
          onToggle(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onToggle]);

  return (
    <nav ref={navbarRef} className="fixed top-0 w-full bg-accent z-10" style={{ height: isOpen ? 'auto' : '50px' }}>
      <div className="flex justify-between items-center p-1">
        <button onClick={toggleMenu} className="text-3xl cursor-pointer pb-1 ml-2 text-neutral-content">
          ☰
        </button>
        <Link to="/" className="text-2xl font-bold text-primary/80 font-sans flex-grow ml-2">
          nit
        </Link>
        <button onClick={toggleFreakMode} className="mr-2 text-neutral-content">
          {freakMode ? 'Exit Freak Mode' : 'Enter Freak Mode 👅'}
        </button>
      </div>
      <ul className={`${isOpen ? 'flex' : 'hidden'} flex-col items-start pl-4 w-full mt-2`}>
        <li>
          <Link to="/learn" className="no-underline text-neutral-content hover:text-neutral-content/70 hover:font-bold py-2 block italic">learn</Link>
        </li>
        <li>
          <Link to="/play" className="no-underline text-neutral-content hover:text-gray-950 hover:font-bold py-2 block italic">play</Link>
        </li>
        <li>
          <Link to="/piano" className="no-underline text-neutral-content hover:text-gray-950 hover:font-bold py-2 block italic">piano (dev)</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;