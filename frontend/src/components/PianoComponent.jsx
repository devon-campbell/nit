import React, { useState } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import fromMidi from 'midi-note';
import 'react-piano/dist/styles.css';
import DimensionsProvider from '../utils/DimensionProvider';
import SoundfontProvider from '../utils/SoundfontProvider';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const PianoComponent = ({ noteRange }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [playedNotes, setPlayedNotes] = useState([]);

  const handleResize = (bounds) => {
    setDimensions(bounds);
  };

  const handlePlayNote = (midiNumber) => {
    const noteName = fromMidi(midiNumber);
    setPlayedNotes((prevNotes) => [...prevNotes, noteName]);
  };

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });



  return (
      <div style={{textAlign: 'center', width: '100%', margin: 'auto'}}>
          <DimensionsProvider onResize={handleResize}>
              {({containerWidth}) => (
                  <SoundfontProvider
                      instrumentName="acoustic_grand_piano"
                      audioContext={audioContext}
                      hostname={soundfontHostname}
                      render={({isLoading, playNote, stopNote}) => (
                              <Piano
                              noteRange={noteRange}
                              width={containerWidth / 2}
                              playNote={(midiNumber) => {
                                  playNote(midiNumber);
                                  handlePlayNote(midiNumber);
                              }}
                              stopNote={stopNote}
                              disabled={isLoading}
                              keyboardShortcuts={keyboardShortcuts}
                          />
                      )}
                  />
              )}
          </DimensionsProvider>
          <h2>Played Notes:</h2>
          <ul style={{display: 'flex', flexWrap: 'wrap', padding: 0, justifyContent: 'center', listStyleType: 'none'}}>
              {playedNotes.map((note, index) => (
                  <li key={index} style={{marginRight: '10px'}}>
                      {note}
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default PianoComponent;