import React, { useEffect, useState } from 'react';
import PianoComponent from "./PianoComponent";
import SheetMusicComponent from "./SheetMusicComponent";
import MetronomeComponent from "./MetronomeComponent";
import { MidiNumbers } from "react-piano";
import { calculateNoteDuration } from '../utils/musicUtils';

const Quiz5 = () => {
  const [musicXML, setMusicXML] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bpm, setBpm] = useState(80);
  const [finishedPlaying, setFinishedPlaying] = useState(false);
  const [sheetMusicWithDiffs, setSheetMusicWithDiffs] = useState(null);
  const [playedMusicWithDiffs, setPlayedMusicWithDiffs] = useState(null);

  useEffect(() => {
    const fetchMusicXML = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/get-quiz-musicxml/5');
        const data = await response.text();
        setMusicXML(data);
      } catch (error) {
        console.error("Error fetching the music XML: ", error);
      }
      setIsLoading(false);
    };

    // Check if musicXML is null before fetching
    if (!musicXML) {
      fetchMusicXML();
    }
  }, [musicXML]); // Include musicXML in the dependencies array

  const handleFinishedPlaying = (playedNotes) => {
    /** Send the notes to backend, get back two new musicXML files, one for original sheet music and one for user's
        played notes —- both with colored diff annotations */
    setFinishedPlaying(true);
        
    const getDiffedMusicFiles = async () => {
      const playedNotesExpanded = playedNotes.map(note => {
        const { type, divisions } = calculateNoteDuration(note.duration, bpm);
        const { startTime, duration, ...rest} = note;
        return { ...rest, type, divisions };
      })
    
      try {
        const formData = new FormData();

        // musicXML is a MusicXML string
        const musicXMLBlob = new Blob([musicXML], { type: 'application/xml' });
        // playedNotesExpanded is an array of note objects
        const playedNotesBlob = new Blob([JSON.stringify(playedNotesExpanded)], { type: 'application/json' });

        formData.append('sheetMusic', musicXMLBlob, 'sheetMusic.musicxml');
        formData.append('playedNotes', playedNotesBlob, 'playedNotes.json');
    
        const response = await fetch('http://localhost:8000/evaluate-user-playing', {
          method: 'POST',
          body: formData
        });
    
        if (response.ok) {
          // Get back two musicXML files with diff annotations
          const responseJSON = await response.json();
          console.log(responseJSON.message);
        } else {
          // Handle failure
          console.log("Failed to get diffed music files")
        }
      } catch (error) {
        // Handle error
        console.log("Error occurred while submitting original and played music files: ", error)
      }
    };
    getDiffedMusicFiles();
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quiz 5 - Music Practice</h1>
      {isLoading ? (
        <p>Loading sheet music...</p>
      ) : (
        !finishedPlaying ? (
          <React.Fragment>
            <SheetMusicComponent xml={musicXML}/>
            <div style={{ marginTop: '20px', marginBottom: '10px' }}>
              <MetronomeComponent bpm={bpm} setBpm={setBpm}/>
            </div>
            <PianoComponent
              noteRange={{ first: MidiNumbers.fromNote('c4'), last: MidiNumbers.fromNote('f5') }}
              bpm={bpm}
              setBpm={setBpm}
              maxNumOfNotes={16}
              onFinishedPlaying={handleFinishedPlaying}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Render the new sheet music components here */}
            {sheetMusicWithDiffs && playedMusicWithDiffs ? (
              <React.Fragment>
                <SheetMusicComponent xml={sheetMusicWithDiffs}/>
                <SheetMusicComponent xml={playedMusicWithDiffs}/>
              </React.Fragment>
            ) : (
              <p>Loading your results...</p>
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
}

export default Quiz5;
