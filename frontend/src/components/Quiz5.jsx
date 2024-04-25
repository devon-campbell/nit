import React, { useEffect, useState } from 'react';
import PianoComponent from "./PianoComponent";
import SheetMusicComponent from "./SheetMusicComponent";
import MetronomeComponent from "./MetronomeComponent";
import { MidiNumbers } from "react-piano";

const Quiz5 = () => {
  const [musicXML, setMusicXML] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bpm, setBpm] = useState(80);

  const fetchMusicXML = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/gen_q5');
      const data = await response.text();
      setMusicXML(data);
    } catch (error) {
      console.error("Error fetching the music XML: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMusicXML();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quiz 5 - Music Practice</h1>
      {isLoading ? (
        <p>Loading sheet music...</p>
      ) : (
        musicXML && <SheetMusicComponent xml={musicXML}/>
      )}
      <div style={{ marginTop: '20px', marginBottom: '10px' }}>
        <MetronomeComponent bpm={bpm} setBpm={setBpm}/>
      </div>
      <PianoComponent noteRange={{ first: MidiNumbers.fromNote('c3'), last: MidiNumbers.fromNote('f4') }} bpm={bpm} setBpm={setBpm}/>
    </div>
  );
}

export default Quiz5;
