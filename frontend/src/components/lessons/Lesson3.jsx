import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {animated, config, useTransition} from "react-spring";
import DimensionsProvider from "../../utils/DimensionProvider";
import wholeNoteSymbol from "../../assets/Whole-note-symbol.svg";
import {MidiNumbers} from "react-piano";
import PianoComponent from "../PianoComponent";


const Lesson3 = () => {
   const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inTransition, setInTransition] = useState(false);
  const steps = useMemo(() => [
      '(Use your keyboard or mouse to navigate)',
      'Let\'s continue slowing things down a bit and talk about Whole Notes.',
        'A whole note is the longest note value in modern music notation.',
        'It typically lasts for four beats, four seconds, four Quarter Notes, or two Half Notes!',
        'In 4/4 time, a whole note takes up an entire measure.',
        'Let\'s do some practice.'

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
          navigate('/quiz/3'); // Navigate to /quiz/1
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
            <h1>Lesson 3: Whole Notes</h1>
            <div style={{width: '100%', height: '10%'}}>
              {transitions((style, item) => (
                <animated.div style={{...style, textAlign: 'center'}}>
                  <>
                    <p className="w-max m-auto">{steps[item]}</p>
                    {item >= 2 && item <= 6 &&
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={wholeNoteSymbol} alt="Note Lengths Diagram" style={{paddingTop: '24px', width: '25%'}}/>
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
            />
      </div>
    </div>
    <button onClick={handlePrevious}
            style={{position: 'absolute', bottom: 0, left: '10px', fontSize: '2em', overflow: 'hidden', padding: '10px'}}>Previous
    </button>
    <button onClick={handleNext}
            style={{position: 'absolute', bottom: 0, right: '10px', fontSize: '2em', overflow: 'hidden', padding: '10px'}}>Next
    </button>
  </div>
);

}

export default Lesson3;