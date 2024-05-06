import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-gray-100">
      <ul className="list-none m-0 p-0 overflow-hidden flex justify-evenly">
        <div className="font-bold text-2xl my-auto">
          nit
        </div>
        <li className="inline">
          <Link to="/" className="no-underline">home</Link>
        </li>
        <li className="inline">
          <Link to="/learn" className="no-underline">learn</Link>
        </li>
        <li className="inline">
          <Link to="/play" className="no-underline text-black">play</Link>
        </li>
        <li className="inline">
          <Link to="/piano" className="no-underline text-black">piano</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
