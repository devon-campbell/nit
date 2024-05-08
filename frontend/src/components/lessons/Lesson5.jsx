import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {animated, config, useTransition} from "react-spring";
import DimensionsProvider from "../../utils/DimensionProvider";
import NavbarComponent from "../NavbarComponent";
import eighthNoteSymbol from "../../assets/eighth-note-symbol.jpeg";
import eighthRestSymbol from "../../assets/Eighth-Rest-Symbol.jpg";
import sixteenthNoteSymbol from "../../assets/sixteenth-note-symbol.jpeg";
import sixteenthRestSymbol from "../../assets/Sixteenth-Rest-Symbol.jpg";
import SpacebarComponent from "../SpacebarComponent";

const Lesson41 = () => {
   const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inTransition, setInTransition] = useState(false);
  const steps = useMemo(() => [
      '(Use your keyboard or mouse to navigate)',
      'Making good progress I see! Now that we have some basic notes and rests under our belt, let’s introduce a few more.',
      'After this lesson, you should be able to recognize pretty much any type of note and rest you come across! You won\'t be quizzed on this, but this is good knowledge to have!',
      'As you can probably guess from the name, the eighth note lasts an eighth of the length of a whole note (half of a beat).',
      'On its own, notice that it has a singular flag and when it comes with other eighth notes, it is connected with a SINGULAR bar. This will come in handy later.',
      'If you’ve been following along, you probably guessed that the eighth rest represents a silence that is an eighth of a whole note, or half of a beat.',
      'Notice that it looks like a seven with a dot at the tip!',
      'Okay, so this is where things start to get fun. At this point, you are probably seeing a pattern.',
      'The 16th note is very quick: two make up one eighth note, four make up one quarter note, so on and so forth.',
      'Note that the eighth note representation is similar to that for the eighth note, the only difference being that there are two flags for an individual note, and TWO bars for groups of 16th notes.',
      'With this, what do you think a 32nd note looks like? What about a 64th note?',
      'The 16th rest does not need much explanation: it represents a moment of silence the same length as its counterpart the 16th note.',
      'It bears resemblance to the eighth rest, only with two flags! Imagine how many flags the 128th rest has!'
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
                    {item >=3 && item <= 4 && <img src={eighthNoteSymbol} alt="Eighth Note Symbol"
                                                    style={{paddingTop: '24px', width: '25%'}}/>}
                    {item >=5 && item <= 6 && <img src={eighthRestSymbol} alt="Eighth Rest Symbol"
                                       style={{paddingTop: '24px', width: '25%'}}/>}
                    {item >=7 && item <= 9 && <img src={sixteenthNoteSymbol} alt="Sixteenth Note Symbol"
                                       style={{paddingTop: '24px', width: '25%'}}/>}
                    {item >=10 && item <= 11 && <img src={sixteenthRestSymbol} alt="Sixteenth Rest Symbol"
                                                   style={{paddingTop: '24px', width: '25%'}}/>}
                    <div>
                      {item === 12 && <button onClick={handleNext}>Quiz Me</button>}
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

export default Lesson41;