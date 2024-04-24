import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Start = () => {
  const location = useLocation();
  const { bpm, note, isEndless, bars } = location.state;

  return (
    <div>
      <h1>Start</h1>
      <p>Start with the world!</p>
      <p>BPM: {bpm}</p>
      <p>Note: {note}</p>
      <p>Endless: {isEndless ? 'Yes' : 'No'}</p>
      {!isEndless && <p>Bars: {bars}</p>}
      <Link to="/play">
        <button>Back to Play</button>
      </Link>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
}

export default Start;