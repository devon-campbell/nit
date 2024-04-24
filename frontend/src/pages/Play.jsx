import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";

const Play = () => {
  const navigate = useNavigate();
  const [bpm, setBpm] = useState(120);
  const [note, setNote] = useState('Whole');
  const [isEndless, setIsEndless] = useState(false);
  const [bars, setBars] = useState(1);

  const handleBpmChange = (event) => {
    setBpm(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleEndlessChange = (event) => {
    setIsEndless(event.target.checked);
  };

  const handleBarsChange = (event) => {
    setBars(event.target.value);
  };

  const handlePlay = () => {
    navigate('/start', { state: { bpm, note, isEndless, bars } });
  };

  return (
    <div>
      <Navbar />
      <h1>Play</h1>
      <p>Play with the world!</p>
      <input type="number" value={bpm} onChange={handleBpmChange} min="20" max="240" />
      <select value={note} onChange={handleNoteChange}>
        <option value="Whole">Whole</option>
        <option value="Half">Half</option>
        <option value="Quarter">Quarter</option>
        <option value="Eighth">Eighth</option>
        <option value="Sixteenth">Sixteenth</option>
      </select>
      <label>
        <input type="checkbox" checked={isEndless} onChange={handleEndlessChange} />
        Endless?
      </label>
      {!isEndless && (
        <div>
          <label>Number of Bars:</label>
          <input type="number" value={bars} onChange={handleBarsChange} min="1" />
        </div>
      )}
      <button onClick={handlePlay}>Let's Play</button>
    </div>
  );
}

export default Play;