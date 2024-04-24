import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
      <div>
          <div style={{ fontWeight: 'bold', fontSize: '1.5em', position: 'absolute', left: '10px', top: '10px' }}>
        nit
      </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Link to="/learn">
          <button style={{ margin: '10px', padding: '10px' }}>Learn</button>
        </Link>
        <Link to="/play">
          <button style={{ margin: '10px', padding: '10px' }}>Play</button>
        </Link>
    </div>
      </div>
  );
}

export default Home;