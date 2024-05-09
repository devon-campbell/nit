import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {animated, config, useTransition} from 'react-spring';
import {useNavigate} from 'react-router-dom'; // Import useNavigate
import noteLengthsDiagram from '../../assets/note-lengths-diagram.jpg';
import quarterNoteSymbol from '../../assets/quarter-note-symbol.svg';
import DimensionsProvider from "../../utils/DimensionProvider";
import PianoComponent from "../PianoComponent";
import {MidiNumbers} from 'react-piano';

const Lesson1 = () => {
    const navigate = useNavigate();
  const [playedNotes, setPlayedNotes] = useState([]);
  const [step, setStep] = useState(0);
  const [inTransition, setInTransition] = useState(false);
  const steps = useMemo(() => ['(Use your keyboard or mouse to navigate)',
                          'Before we get into the fun stuff, we must first understand some terminology and ideas',
                          'Firstly, sight-reading is the art of reading and performing music at first sight, without prior rehearsal',
                          'Think about reading a book aloud for the first time, but with musical notes instead of words',
                          'In this lesson, we\'ll focus on the basic building blocks of music notation: notes',
                          'A note is a symbol that represents a sound',
                          'By mastering the rhythm and duration of quarter, half, and whole notes, you\'ll lay a solid foundation for sight-reading',
      'The quarter note is like the heartbeat of music',
      ' It generally represents one beat, or a quarter of a whole note\'s duration',
      'In fact, most music we listen to revolves around the idea of a quarter note',
      'When you see a quarter note, think of it as lasting for one count, or one beat, let\'s practice tapping along to get a feel for the rhythm of the quarter note',
  ], []);

  const transitions = useTransition(step, {
    keys: item => item,
    from: { opacity: 0, position: 'absolute', textAlign: 'start', width: '100%'},
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
    onStart: () => setInTransition(true),
    onRest: () => setInTransition(false),
  });

  const handleNext = useCallback(() => {
    if (!inTransition) {
      setStep((prevStep) => {
        const nextStep = (prevStep + 1) % steps.length;
        if (nextStep === 0) { // If nextStep is 0, we've looped back to the start
          navigate('/quiz/1'); // Navigate to /quiz/1
        }
        return nextStep;
      });
    }
  }, [inTransition, steps, navigate]);

  const handlePrevious = useCallback(() => {
    if (!inTransition) {
      setStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
    }
  }, [inTransition, steps]);

  useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.code === 'KeyA' || event.code === 'ArrowRight') {
      handleNext();
    } else if (event.code === 'ArrowLeft') {
      handlePrevious();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [handleNext, handlePrevious]);

  return (
  <div style={{maxHeight: '100vh', maxWidth: '100vw' }}>
      <div style={{ position: 'relative', height: '90vh'}}> {/* Set height to 100vh to fill the screen */}
        <DimensionsProvider onResize={({ containerWidth, containerHeight }) => {}}>
          {({ containerWidth, containerHeight }) => (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              position: 'relative',
              top: '0',
              left: '0',
              textAlign: 'center',
              width: '100%', /* Set width to 100% of the parent */
            }}>
            <h1>Lesson 1: Quarter Notes</h1>
            <div style={{width: '100%', height: '10%'}}>
              {transitions((style, item) => (
                <animated.div style={{...style, textAlign: 'center'}}>
                  <>
                    <p className="w-max m-auto">{steps[item]}</p>
                    {item >= 2 && item <= 6 &&
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={noteLengthsDiagram} alt="Note Lengths Diagram" style={{paddingTop: '24px', width: '25%'}}/>
                      </div>
                    }
                    {item >= 7 &&
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={quarterNoteSymbol} alt="Quarter Note Symbol" style={{paddingTop: '24px', width: '5%'}}/>
                      </div>
                    }
                    <div>
                      {item === 10 && <button onClick={handleNext}>Quiz Me</button>}
                    </div>
                  </>
                </animated.div>
              ))}
            </div>
          </div>
        )}
      </DimensionsProvider>
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: '20px',
      width: '100%',
      overflow: 'hidden',
    }}>
      <div>
        <PianoComponent
              noteRange={{ first: MidiNumbers.fromNote('c4'), last: MidiNumbers.fromNote('c4') }}
              oneNote={true}
              isLesson={true}
              playedNotes={playedNotes}
              setPlayedNotes={setPlayedNotes}
            />
      </div>
    </div>
    <button onClick={handlePrevious}
            className={`border border-gray-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-200`}
            style={{position: 'absolute', bottom: 0, left: '10px', fontSize: '2em', overflow: 'hidden', padding: '10px'}}>Previous
    </button>
    <button onClick={handleNext}
            className={`border border-gray-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-200`}
            style={{position: 'absolute', bottom: 0, right: '10px', fontSize: '2em', overflow: 'hidden', padding: '10px'}}>Next
    </button>
  </div>
);
}

export default Lesson1;