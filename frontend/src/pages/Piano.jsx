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
          <NavbarComponent/>
          <div className={`justify-center items-center`}><p>Learn the piano!</p></div>
          <div className={'center-with-large-left-margin-piano max-w-lg max-h-lg mx-auto'}>
              {musicXML && <SheetMusicComponent xml={musicXML}/>}
              <PianoComponent noteRange={{
                  first: MidiNumbers.fromNote('c4'),
                  last: MidiNumbers.fromNote('f5'),
              }} oneNote={false} isLesson={false}/>
          </div>


      </div>
  );
}

export default Piano;