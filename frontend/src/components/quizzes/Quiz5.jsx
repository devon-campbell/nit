import React, { useEffect, useState } from 'react';
import PianoComponent from "../PianoComponent";
import SheetMusicComponent from "../SheetMusicComponent";
import MetronomeComponent from "../MetronomeComponent";
import { MidiNumbers } from "react-piano";
import { calculateNoteDuration } from '../../utils/musicUtils';
import {useNavigate} from "react-router-dom";

const Quiz5 = () => {
  const navigate = useNavigate();
  const [musicXML, setMusicXML] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bpm, setBpm] = useState(80);
  const [finishedPlaying, setFinishedPlaying] = useState(false);
  const [playedMusicWithEvaluations, setPlayedMusicWithEvaluations] = useState(null);
  const [playedNotes, setPlayedNotes] = useState([]);

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
    console.log(playedNotes);
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
          setPlayedMusicWithEvaluations(responseJSON.user_notes_annotated_as_xml);

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

  const handleSubmit = () => {
  handleFinishedPlaying(playedNotes);
}

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quiz 3 - Whole Note Quiz</h1>
      {isLoading ? (
        <p>Loading sheet music...</p>
      ) : (
        !finishedPlaying ? (
            <React.Fragment>
              <SheetMusicComponent xml={musicXML}/>
              <div style={{marginTop: '20px', marginBottom: '10px'}}>
                <MetronomeComponent bpm={bpm} setBpm={setBpm}/>
              </div>
              <PianoComponent
                  noteRange={{first: MidiNumbers.fromNote('c4'), last: MidiNumbers.fromNote('c4')}}
                  bpm={bpm}
                  setBpm={setBpm}
                  maxNumOfNotes={16}
                  onFinishedPlaying={handleFinishedPlaying}
                  oneNote={true}
                  isLesson={false}
                  onNotesUpdate={setPlayedNotes}
              />
              <button onClick={() => handleSubmit()}
                      style={{backgroundColor: 'gray', color: 'white', padding: '10px', margin: '10px'}}>Submit!
              </button>
            </React.Fragment>
        ) : (
            <React.Fragment>
              {/* Render the new sheet music components here */}
              {playedMusicWithEvaluations ? (
                  <React.Fragment>
                    <SheetMusicComponent xml={musicXML}/>
                <SheetMusicComponent xml={playedMusicWithEvaluations}/>
                <div style={{textAlign: 'left', marginTop: '20px'}}>
                  <h2>Great Job!</h2>
                  <button onClick={() => navigate('/lesson/6')}
                          style={{backgroundColor: 'green', color: 'white', padding: '10px', margin: '10px'}}>Next
                    Lesson
                  </button>
                  <h2>Let's Practice Some More!</h2>
                  <button onClick={() => window.location.reload()}
                          style={{backgroundColor: 'red', color: 'white', padding: '10px', margin: '10px'}}>Try Again
                  </button>
                  <h2></h2>
                  <button onClick={() => navigate('/learn')}
                          style={{backgroundColor: 'gray', color: 'white', padding: '10px', margin: '10px'}}>Back to
                    Lesson Map
                  </button>
                </div>
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