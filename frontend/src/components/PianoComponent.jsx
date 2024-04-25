import React, { useState } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import fromMidi from 'midi-note';
import 'react-piano/dist/styles.css';
import DimensionsProvider from '../utils/DimensionProvider';
import SoundfontProvider from '../utils/SoundfontProvider';
import { createMusicXML } from '../utils/musicUtils';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const PianoComponent = ({ noteRange, bpm, setBpm }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [playedNotes, setPlayedNotes] = useState([]);

  const handleResize = (bounds) => {
    setDimensions(bounds);
  };

  const handlePlayNote = (midiNumber) => {
    const noteName = fromMidi(midiNumber);
    const startTime = new Date().getTime(); // Record start time in milliseconds
    setPlayedNotes((prevNotes) => [...prevNotes, { name: noteName, startTime }]);
  };

  const handleStopNote = (midiNumber) => {
    const noteName = fromMidi(midiNumber);
    const stopTime = new Date().getTime();
    setPlayedNotes((prevNotes) => prevNotes.map(note =>
      note.name === noteName && !note.duration ? { ...note, duration: (stopTime - note.startTime) / 1000 } : note
    ));
  };

  const handleExport = () => {
    const xmlOutput = createMusicXML(playedNotes.map(note => ({
      ...note,
      bpm: bpm // Ensure bpm is part of each note object for accurate duration calculation
    })));
    console.log(xmlOutput); // For now, just log it or consider downloading it as a file
  };

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
      <div style={{ textAlign: 'center', width: '100%', margin: 'auto' }}>
      <label htmlFor="bpm-select" style={{ fontWeight: 'bold', marginRight: '10px' }}>Select BPM:</label>
      <select id="bpm-select" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} style={{ margin: '10px', padding: '5px' }}>
        <option value={60}>60 BPM</option>
        <option value={80}>80 BPM</option>
        <option value={100}>100 BPM</option>
        <option value={120}>120 BPM</option>
      </select>
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
                              stopNote={(midiNumber) => {
                                stopNote(midiNumber);
                                handleStopNote(midiNumber);
                              }}
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
                      {note.name} ({note.duration ? note.duration + 's' : 'Playing...'})
                  </li>
              ))}
          </ul>
          <button onClick={handleExport}>Export to MusicXML</button>
      </div>
  );
};

export default PianoComponent;
