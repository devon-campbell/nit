import React, { useEffect, useState } from 'react';
import NavbarComponent from "../components/NavbarComponent";
import PianoComponent from "../components/PianoComponent";
import SheetMusicComponent from "../components/SheetMusicComponent";
import {MidiNumbers} from "react-piano";
import { Link } from 'react-router-dom'; // Import the Link component

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
      <NavbarComponent />
      <h1>Learn</h1>
      <p>Learn the piano!</p>
      {musicXML && <SheetMusicComponent xml={musicXML}/>}
      <PianoComponent noteRange={{
          first: MidiNumbers.fromNote('c4'),
          last: MidiNumbers.fromNote('f5'),
      }} oneNote={false} isLesson={false}/>
      <Link to="/quiz/55" className=" text-3xl font-bold text-gray-800 border-2 rounded text-center bg-gray-300">Dev Quiz</Link>
    </div>
  );
}

export default Piano;