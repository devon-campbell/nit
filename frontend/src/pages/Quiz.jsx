import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import NavbarComponent from "../components/NavbarComponent";

import PianoComponent from "../components/PianoComponent";
import SheetMusicComponent from "../components/SheetMusicComponent";
import MetronomeComponent from "../components/MetronomeComponent";
import { MidiNumbers } from "react-piano";
import { calculateNoteDuration } from '../utils/musicUtils';
import {useNavigate} from "react-router-dom";

const quizPianoRanges = {
  1: ['c4', 'c4'],
  2: ['c4', 'c4'],
  3: ['c4', 'c4'],
  4: ['c4', 'c4'],
  5: ['c4', 'c4'],
  6: ['c5', 'f5'],
  7: ['c4', 'f5'],
  8: ['c4', 'f5'],
};

const Quiz = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [musicXML, setMusicXML] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bpm, setBpm] = useState(80);
  const [finishedPlaying, setFinishedPlaying] = useState(false);
  const [playedMusicWithEvaluations, setPlayedMusicWithEvaluations] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [playedNotes, setPlayedNotes] = useState([]);

  useEffect(() => {
    const fetchMusicXML = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/get-quiz-musicxml/${id}`);
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

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleFinishedPlayingButton = () => {
    handleFinishedPlaying(playedNotes);
    setFinishedPlaying(true);
  }

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

  return (
    <div>
      <NavbarComponent />
      <div className="flex justify-center">
        <div>
          <div className="text-4xl font-semibold mt-8">Quiz {id}</div>
        </div>
      </div>
      {quizStarted && !finishedPlaying && <MetronomeComponent bpm={bpm}/>}
      {isLoading ? (
        <p>Loading sheet music...</p>
      ) : (
        !finishedPlaying ? (
          <React.Fragment>
            <div>
              <div className={`center-with-large-left-margin-sheetmusic-${id}`}>
                <SheetMusicComponent xml={musicXML} />
              </div>
            </div>
            {quizStarted ? ( // If quizStarted is true, render the piano component
            <React.Fragment>
              <div className={
                (quizPianoRanges[id][0] === quizPianoRanges[id][1]) ? 
                  "center-with-large-left-margin-one-pianokey max-w-lg max-h-lg mx-auto" :
                (quizPianoRanges[id][0] === 'c5' && quizPianoRanges[id][1] === 'f5') ?
                  "center-with-large-left-margin-four-pianokeys max-w-lg max-h-lg mx-auto" :
                  "center-with-large-left-margin-piano max-w-lg max-h-lg mx-auto"
                }>
                <PianoComponent
                  noteRange={{ first: MidiNumbers.fromNote(quizPianoRanges[id][0]), last: MidiNumbers.fromNote(quizPianoRanges[id][1]) }}
                  bpm={bpm}
                  setBpm={setBpm}
                  maxNumOfNotes={16}
                  onFinishedPlaying={handleFinishedPlaying}
                  oneNote={quizPianoRanges[id][0] === quizPianoRanges[id][1]? true : false}
                  playedNotes={playedNotes}
                  setPlayedNotes={setPlayedNotes}
                />
              </div>
              <div className="mt-8 flex justify-center">
                <button onClick={handleFinishedPlayingButton} className="border border-gray-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-200">I'm done!</button>
              </div>
            </React.Fragment>
            ) : ( // If quizStarted is false, render the metronome, label, and button
              <div className="flex justify-center">
                <div className="border border-gray-500 rounded p-4 mb-2 inline-block">
                  <div className="grid place-items-center w-52">
                    <div className="mb-2">
                      <label htmlFor="bpm-select">Select BPM:</label>
                    </div>
                    <div className="mb-4">
                      <select id="bpm-select" className="text-md px-2 block appearance-none w-full bg-white border border-gray-500 rounded py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-600" value={bpm} onChange={(e) => setBpm(Number(e.target.value))}>
                        <option value={60}>60 BPM</option>
                        <option value={80}>80 BPM</option>
                        <option value={100}>100 BPM</option>
                        <option value={120}>120 BPM</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-center">
                    <button onClick={handleStartQuiz} className="border border-gray-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-200">Start</button>
                    {quizStarted && <MetronomeComponent bpm={bpm}/>}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Render the new sheet music components here */}
            {playedMusicWithEvaluations ? (
              <React.Fragment>
                <div className="mt-4 flex justify-center">
                  <h2 className="text-2xl">Your results:</h2>
                </div>
                <SheetMusicComponent xml={musicXML}/>
                <SheetMusicComponent xml={playedMusicWithEvaluations}/>
                <div className="flex justify-center mt-2">
                  <div className="mb-4">
                    <button onClick={() => navigate('/lesson/2')} className="border border-gray-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-200">
                      Next Lesson
                    </button>
                  </div>
                  <div className="mb-4">
                    <button onClick={() => window.location.reload()} className="border border-gray-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-200">
                      Try Again
                    </button>
                  </div>
                  <div className="mb-4">
                    <h2></h2>
                    <button onClick={() => navigate('/learn')} className="border border-gray-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-200">
                      Back to Lesson Map
                    </button>
                  </div>
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

export default Quiz;