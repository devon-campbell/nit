import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: '#f8f9fa' }}>

      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, overflow: 'hidden', display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5em', top: '10px' }}>
        nit
      </div>
        <li style={{ display: 'inline' }}><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>home</Link></li>
        <li style={{ display: 'inline' }}><Link to="/learn" style={{ textDecoration: 'none', color: 'black' }}>learn</Link></li>
        <li style={{ display: 'inline' }}><Link to="/play" style={{ textDecoration: 'none', color: 'black' }}>play</Link></li>
        <li style={{ display: 'inline' }}><Link to="/piano" style={{ textDecoration: 'none', color: 'black' }}>piano</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;