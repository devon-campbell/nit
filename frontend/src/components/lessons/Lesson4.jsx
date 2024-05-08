import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {animated, config, useTransition} from "react-spring";
import DimensionsProvider from "../../utils/DimensionProvider";
import NavbarComponent from "../NavbarComponent";
import quarterRestSymbol from "../../assets/quarter-rest-symbol.jpeg";
import halfRestSymbol from "../../assets/Half-Rest-Symbol.jpg";
import wholeRestSymbol from "../../assets/Whole-Rest-Symbol.jpeg";
import SpacebarComponent from "../SpacebarComponent";

const Lesson4 = () => {
   const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inTransition, setInTransition] = useState(false);
  const steps = useMemo(() => [
      '(Use your keyboard or mouse to navigate)',
      'Now that we have a basic understanding of the components of music that makes sound, let’s learn about the parts that are silent.',
      'In Lessons 2 \& 3, we delved into the world of notes and learned how different durations create rhythm and melody.',
      'But what about the moments of silence in music?',
      'Just as notes have their lengths, rests provide essential pauses and moments of silence within a piece.',
      'Let\'s discover the counterparts to our note durations: rests.',
      'Rests are symbols in music notation that indicate periods of silence. Just like notes, rests come in various lengths, each corresponding to a specific duration.',
      'Similar to its quarter note counterpart, the quarter rest represents one beat of silence.',
      'Similar to its half note counterpart, the half rest represents two beats of silence.',
      'Similar to its whole note counterpart, the whole rest represents four beats of silence. To differentiate between this and the half rest, we can say \"whole hangs heavy\" since it hangs from the upper line!',
      'Let\'s practice putting everything we\'ve learned together!'
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
              <NavbarComponent/>
            <h1>Lesson 1: Basic Notes</h1>
            <div style={{width: '100%', height: '10%'}}>
              {transitions((style, item) => (
                <animated.div style={{...style, textAlign: 'center'}}>
                  <>
                    <p style={{margin: 'auto', width: '100%'}}>{steps[item]}</p>
                    {item === 7 && <img src={quarterRestSymbol} alt="Quarter Rest Symbol"
                                                    style={{paddingTop: '24px', width: '25%'}}/>}
                    {item === 8 && <img src={halfRestSymbol} alt="Half Rest Symbol"
                                       style={{paddingTop: '24px', width: '25%'}}/>}
                    {item === 9 && <img src={wholeRestSymbol} alt="Whole Rest Symbol"
                                       style={{paddingTop: '24px', width: '25%'}}/>}
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

export default Lesson4;