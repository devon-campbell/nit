import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {animated, config, useTransition} from "react-spring";
import DimensionsProvider from "../utils/DimensionProvider";
import Navbar from "./navbar";
import musicStaff from "../assets/music-staff.jpg";
import trebleClefSymbol from "../assets/Treble-Clef-Symbol.jpg";
import SpacebarComponent from "./SpacebarComponent";

const Lesson5 = () => {
   const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inTransition, setInTransition] = useState(false);
  const steps = useMemo(() => [
      '(Use the spacebar, arrow keys, or buttons)',
      'Now let’s add some color to what we’ve learned so far.',
      'We\'ll explore two crucial elements of music notation: the staff and the treble clef. Let\'s dive in!',
      'This is called \"staff.\"',
      'Think of it as the musical canvas, comprising five lines and four spaces. These serve as our playground for placing notes to indicate pitch.',
      'This is the treble clef.',
      'Think of it as our musical compass, guiding us to higher-pitched notes.',
      'When you see it, it generally signals to focus on the higher registers of your instrument or voice.',
      'Together, the staff and treble clef provide a visual roadmap for understanding pitch in music.',
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
          navigate('/quiz/2'); // Navigate to /quiz/1
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
      if (event.code === 'Space' || event.code === 'ArrowRight') {
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

  const handleKeyPress = () => {
    console.log('hi');
  };



  return (
  <div style={{ overflow: 'hidden', maxHeight: '100vh', maxWidth: '100vw' }}>
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
              <Navbar/>
            <h1>Lesson 1: Basic Notes</h1>
            <div style={{width: '100%', height: '10%'}}>
              {transitions((style, item) => (
                <animated.div style={{...style, textAlign: 'center'}}>
                  <>
                    <p style={{margin: 'auto', width: '100%'}}>{steps[item]}</p>
                    {item >=3 && item <= 4 && <img src={musicStaff} alt="Music Staff"
                                                    style={{paddingTop: '24px', width: '25%'}}/>}
                    {item >=5 && item <= 8 && <img src={trebleClefSymbol} alt="Treble Clef Symbol"
                                       style={{paddingTop: '24px', width: '25%'}}/>}
                    <div>
                      {item === 8 && <button onClick={handleNext}>Quiz Me</button>}
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
      width: '90%',
      overflow: 'hidden',
    }}>
      <div style={{width: '50%', height: '10%', paddingLeft: '50vw'}}>
        <SpacebarComponent onKeyPress={handleKeyPress} noteDuration={2000} />
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

export default Lesson5;