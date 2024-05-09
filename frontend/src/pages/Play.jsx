import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from "../components/NavbarComponent";

const Play = () => {
  const navigate = useNavigate();
  const [bpm, setBpm] = useState(120);
  const [longestNote, setNote] = useState('Whole');
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
    navigate('/start', { state: { bpm, longestNote, isEndless, bars } });
  };

  const surpriseMe = () => {
    const randomBpm = Math.floor(Math.random() * (240 - 20 + 1)) + 20;
    const noteOptions = ['Whole', 'Half', 'Quarter'];
    const randomNote = noteOptions[Math.floor(Math.random() * noteOptions.length)];
    const randomIsEndless = 0;
    const randomBars = Math.floor(Math.random() * 6) + 1;

    setBpm(randomBpm);
    setNote(randomNote);
    setIsEndless(randomIsEndless);
    setBars(randomBars);

    navigate('/start', { state: { bpm: randomBpm, longestNote: randomNote, isEndless: randomIsEndless, bars: randomBars } });
  };

  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 bg-base-300 shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">Let's Play!</h1>
          <p className="text-base-content mb-4 text-center">Customize your playing settings:</p>
          <div className="mb-4">
            <label className="block text-base-content text-sm font-bold mb-2">
              BPM (Beats Per Minute)
            </label>
            <input type="number" value={bpm} onChange={handleBpmChange} min="20" max="240" 
              className="shadow input input-bordered input-primary w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-base-content text-sm font-bold mb-2">
              Longest Note Duration
            </label>
            <select value={longestNote} onChange={handleNoteChange} className="select select-bordered select-primary w-full">
              <option value="Whole">Whole</option>
              <option value="Half">Half</option>
              <option value="Quarter">Quarter</option>
            </select>
          </div>
          {!isEndless && (
            <div className="mb-4">
              <label className="block text-base-content text-sm font-bold mb-2">
                Number of Bars
              </label>
              <input type="number" value={bars} onChange={handleBarsChange} min="1"
                className="input input-bordered input-primary w-full" />
            </div>
          )}
          <button onClick={handlePlay} className="btn btn-primary w-full">
            Let's Play
          </button>
          <button onClick={surpriseMe} className="btn btn-accent mt-4 w-full">
            Surprise Me!
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default Play;
