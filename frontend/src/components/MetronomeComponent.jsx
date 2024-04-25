import React, { useEffect, useRef, useState } from 'react';
import SoundfontProvider from '../utils/SoundfontProvider';

const audioContext = new (window.AudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const MetronomeComponent = ({ bpm}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);
  const playNoteRef = useRef(null);
  const beatRef = useRef(0);


  useEffect(() => {
    if (audioContext.state === 'suspended') {
     audioContext.resume();
  }
    if (isPlaying) {
      // Calculate the interval duration in milliseconds
      const intervalDuration = 60000 / bpm;

      // Start the interval
      intervalRef.current = setInterval(() => {
        if (playNoteRef.current) {
          // Play the metronome sound
          const midiNumber = beatRef.current % 4 === 0 ? 60 : 50; // 60 is the MIDI number for middle C, 50 is a lower note
          playNoteRef.current(midiNumber, audioContext.currentTime);
          beatRef.current += 1;
        }
      }, intervalDuration);
    } else {
      // Stop the interval
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      beatRef.current = 0;
    }

    // Clean up function
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying, bpm, audioContext]);

  const handleToggle = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <SoundfontProvider
      instrumentName="agogo"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote }) => {
        playNoteRef.current = playNote;
        return (
          <div>
            <button onClick={handleToggle} disabled={isLoading} style={{fontSize: '2em', padding: '10px'}}>
              {isPlaying ? 'Stop Metronome' : 'Start Metronome'}
            </button>
          </div>
        );
      }}
    />
  );
};

export default MetronomeComponent;