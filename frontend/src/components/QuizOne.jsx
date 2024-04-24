import React, { useEffect, useState } from 'react';
import MetronomeComponent from "./MetronomeComponent";
import SpacebarComponent from "./SpacebarComponent";
import SheetMusicComponent from "./SheetMusicComponent";

const audioContext = new (window.AudioContext)();

const QuizOne = () => {
  const [musicXML, setMusicXML] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [pressTimes, setPressTimes] = useState([]);
  const [results, setResults] = useState(null);
    const [firstPressTime, setFirstPressTime] = useState(null);
      const [bpm, setBpm] = useState(60); // Add a new state variable for BPM



  const musicXMLUrl = 'http://localhost:8000/get-music';

  useEffect(() => {
    fetch(musicXMLUrl)
      .then(response => response.text())
      .then(data => setMusicXML(data));
  }, [musicXMLUrl]);

  const handleStart = async () => {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    setIsStarted(true);
  };

   const handleBpmChange = (event) => {
    setBpm(event.target.value);
  };

  const handleSpacebarPress = () => {
    const pressTime = audioContext.currentTime * 1000; // Convert to milliseconds
    setPressTimes((prevPressTimes) => [...prevPressTimes, pressTime]);

    // If it's the first press, set firstPressTime
    if (pressTimes.length === 0) {
      setFirstPressTime(pressTime);
    }

    // After 32 notes are played, calculate the results
    if (pressTimes.length >= 8) {
      const results = pressTimes.map((pressTime, index) => {
        // Calculate the relative press time and the expected beat time
        const relativePressTime = pressTime - firstPressTime;
        const beatTime = index * 60000 / bpm; // 60000 / bpm gives the duration of one beat in milliseconds

        // If the relative press time is within 100ms of the beat time, it's considered on time
        return {
          isOnTime: Math.abs(relativePressTime - beatTime) <= 100,
          pressTime: relativePressTime,
        };
      });
      setResults(results);
    }
  };

  return (
    <div>
      <h1>Quiz 1</h1>
      <p>This is the content for quiz 1.</p>
        <div>
            <label htmlFor="bpm">BPM:</label>
            <input id="bpm" type="number" value={bpm} onChange={handleBpmChange}/>
            <button onClick={handleStart}>Start</button>
            {musicXML && <SheetMusicComponent xml={musicXML}/>}
            {isStarted && (
                <>
                    <MetronomeComponent bpm={bpm} audioContext={audioContext}/>
                    <p>Play along with the metronome. Press the spacebar on each beat.</p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        width: '90%',
                    }}>
                        <div style={{width: '50%', height: '10%', paddingLeft: '50vw'}}>
                            <SpacebarComponent onKeyPress={handleSpacebarPress}/>
                        </div>
                    </div>
                    {results && results.map((result, index) => (
                        <p key={index}>
                            Note {index + 1}: {result.isOnTime ? 'On time' : 'Off time'}, press
                            time: {result.pressTime} ms
                        </p>
                    ))}
                </>
            )}
        </div>
    </div>
  );
}

export default QuizOne;