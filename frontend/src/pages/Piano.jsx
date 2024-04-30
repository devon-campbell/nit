import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar";
import PianoComponent from "../components/PianoComponent";
import SheetMusicComponent from "../components/SheetMusicComponent";
import {MidiNumbers} from "react-piano";

const Piano = () => {
  const [musicXML, setMusicXML] = useState(null);
  const musicXMLUrl = 'http://localhost:8000/get-music';

  useEffect(() => {
    fetch(musicXMLUrl)
      .then(response => response.text())
      .then(data => setMusicXML(data));
  }, [musicXMLUrl]);

  return (
    <div>
      <Navbar />
      <h1>Learn</h1>
      <p>Learn the piano!</p>
      {musicXML && <SheetMusicComponent xml={musicXML}/>}
      <PianoComponent noteRange={{
          first: MidiNumbers.fromNote('c4'),
          last: MidiNumbers.fromNote('f5'),
      }}/>
    </div>
  );
}

export default Piano;