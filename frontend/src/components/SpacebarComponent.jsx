import React, { useEffect, useRef, useState } from 'react';
import { Piano, MidiNumbers } from 'react-piano';
import SoundfontProvider from '../utils/SoundfontProvider';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const SpacebarComponent = ({ onKeyPress }) => {
  const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('c3'),
  };

  const [activeNotes, setActiveNotes] = useState([]);
  const playNoteRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space' && playNoteRef.current) {

        playNoteRef.current(MidiNumbers.fromNote('c3'));
        setActiveNotes([MidiNumbers.fromNote('c3')]);
        onKeyPress(); // Call the onKeyPress prop when the spacebar is pressed
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);

  return (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => {
        playNoteRef.current = playNote;
        return (
            <div style={{}}>
                <Piano
            noteRange={noteRange}
            width={75}
            playNote={playNote}
            stopNote={stopNote}
            disabled={isLoading}
            activeNotes={activeNotes}
          />
            </div>
        );
      }}
    />
  );
};

export default SpacebarComponent;