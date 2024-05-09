import {useLocation, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import PianoComponent from "../components/PianoComponent";
import SheetMusicComponent from "../components/SheetMusicComponent";
import MetronomeComponent from "../components/MetronomeComponent";
import {MidiNumbers} from "react-piano";
import {calculateNoteDuration} from '../utils/musicUtils';

const Start = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bpm, longestNote, isEndless, bars } = location.state;
  
  const [musicXML, setMusicXML] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [finishedPlaying, setFinishedPlaying] = useState(false);
  const [playedMusicWithEvaluations, setPlayedMusicWithEvaluations] = useState(null);
  const [playedNotes, setPlayedNotes] = useState([]);

  // Define fetchMusicXML outside of useEffect
  const fetchMusicXML = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/get-quiz-musicxml/999?bars=${bars}&longestNote=${longestNote.toLowerCase()}`);
      const data = await response.text();
      setMusicXML(data);
    } catch (error) {
      console.error("Error fetching the music XML: ", error);
    }
    setIsLoading(false);
  };

  // Call fetchMusicXML on component mount or when bars or longestNote changes
  useEffect(() => {
    fetchMusicXML();
  }, [bars, longestNote]); // Only depend on bars and longestNote

  const handleReset = () => {
    setIsLoading(true);
    setFinishedPlaying(false);
    setPlayedMusicWithEvaluations(null);
    setPlayedNotes([]);
    // Call fetchMusicXML here
    fetchMusicXML();
  };

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
    <div style={{ padding: '20px' }} className={`bg-base-300`}>
      <h1>Quiz 5 - Music Practice</h1>
      {isLoading ? (
        <p>Loading sheet music...</p>
      ) : (
        !finishedPlaying ? (
          <React.Fragment>
            <SheetMusicComponent xml={musicXML}/>
            <div style={{ marginTop: '20px', marginBottom: '10px' }}>
              <MetronomeComponent bpm={bpm} setBpm={bpm}/>
            </div>
            <div style={{position: 'absolute', bottom: '50px', width: '50%', display: 'flex', justifyContent: 'center'}}
            className={`center-with-large-left-margin-piano max-w-lg max-h-lg mx-auto`}>
              <PianoComponent
                  noteRange={{ first: MidiNumbers.fromNote('c4'), last: MidiNumbers.fromNote('f5') }}
                  bpm={bpm}
                  setBpm={bpm}
                  maxNumOfNotes={8}
                  onFinishedPlaying={handleFinishedPlaying}
                  onNotesUpdate={setPlayedNotes}
                  playedNotes={playedNotes}
                  setPlayedNotes={setPlayedNotes}
              />
            </div>

            <button onClick={() => handleSubmit()}
              style={{backgroundColor: 'gray', color: 'white', padding: '10px', margin: '10px'}}>Submit!
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {playedMusicWithEvaluations ? (
              <React.Fragment>
                <SheetMusicComponent xml={musicXML}/>
                <SheetMusicComponent xml={playedMusicWithEvaluations}/>
              </React.Fragment>
            ) : (
              <p>Loading your results...</p>
            )}
            <button 
              onClick={handleReset}
              style={{
                fontSize: '16px',
                padding: '10px 20px',
                marginTop: '20px',
                backgroundColor: '#4CAF50', // Green color
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'} // Darker green on hover
              onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              From the top
              <br />
              <span style={{ fontSize: '12px' }}>Play again with the same settings</span>
            </button>

          <button 
            onClick={() => navigate(-1)}
            style={{
              fontSize: '16px',
              padding: '10px 20px',
              marginTop: '20px',
              marginLeft: '10px', // Add spacing between the buttons
              backgroundColor: '#008CBA', // Blue color
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#007ba7'} // Darker blue on hover
            onMouseOut={(e) => e.target.style.backgroundColor = '#008CBA'}
          >
            Customize new settings
          </button>

          </React.Fragment>
        )
      )}
    </div>
  );
}

export default Start;
