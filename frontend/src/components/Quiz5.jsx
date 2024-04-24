import React, { useEffect, useState } from 'react';
import PianoComponent from "./PianoComponent";
import SheetMusicComponent from "./SheetMusicComponent";
import MetronomeComponent from "./MetronomeComponent";
import {MidiNumbers} from "react-piano";


const Quiz5 = () => {
  const [musicXML, setMusicXML] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMusicXML = async () => {
    setIsLoading(true);
    try {
      // Replace the URL with the actual endpoint where your Flask app is hosted
      const response = await fetch('http://localhost:8000/gen_q5');
      const data = await response.text();
      setMusicXML(data);
    } catch (error) {
      console.error("Error fetching the music XML: ", error);
      // Handle error case here, possibly set some error state to show in UI
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMusicXML();
  }, []); // Empty array ensures this effect only runs once on mount

  return (
    <div>
      <h1>Quiz 5</h1>
      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        musicXML && <SheetMusicComponent xml={musicXML}/>
      )}
      <PianoComponent noteRange={{
          first: MidiNumbers.fromNote('c3'),
          last: MidiNumbers.fromNote('f4'),
      }}/>
    </div>
  );
}

export default Quiz5;
