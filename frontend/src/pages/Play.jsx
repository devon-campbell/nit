import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";
<img src={require("../assets/buffJellyFishing.gif")} alt="Fun GIF" className="mb-4"/>


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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Let's Play!</h1>
        <p className="text-gray-700 mb-4 text-center">Customize your playing settings:</p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            BPM (Beats Per Minute)
          </label>
          <input type="number" value={bpm} onChange={handleBpmChange} min="20" max="240" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Note Duration
          </label>
          <select value={note} onChange={handleNoteChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value="Whole">Whole</option>
            <option value="Half">Half</option>
            <option value="Quarter">Quarter</option>
            <option value="Eighth">Eighth</option>
            <option value="Sixteenth">Sixteenth</option>
          </select>
        </div>
        <div className="mb-4 flex items-center">
          <input type="checkbox" checked={isEndless} onChange={handleEndlessChange}
            className="mr-2 leading-tight" />
          <span className="text-sm text-gray-700">
            Endless Mode?
          </span>
        </div>
        {!isEndless && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Number of Bars
            </label>
            <input type="number" value={bars} onChange={handleBarsChange} min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        )}
        <button onClick={handlePlay} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-300">
          Let's Play
        </button>
      </div>
    </div>
  );
}

export default Play;
