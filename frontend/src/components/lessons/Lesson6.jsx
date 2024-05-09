import React, {useCallback, useEffect, useMemo, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {animated, config, useTransition} from "react-spring";
import DimensionsProvider from "../../utils/DimensionProvider";
import musicStaff from "../../assets/music-staff.jpg";
import trebleClefSymbol from "../../assets/Treble-Clef-Symbol.jpg";
import {MidiNumbers} from "react-piano";
import PianoComponent from "../PianoComponent";
import SheetMusicComponent from "../SheetMusicComponent";

const Lesson6 = () => {
   const navigate = useNavigate();
     const [musicXML, setMusicXML] = useState(null);
       const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [inTransition, setInTransition] = useState(false);
  const steps = useMemo(() => [
      '(Use your keyboard or mouse to navigate)',
      'Now let’s add some color to what we’ve learned so far.',
      'We\'ll explore two crucial elements of music notation: the staff and the treble clef. Let\'s dive in!',
      'This is called \"staff.\"',
      'Think of it as the musical canvas, comprising five lines and four spaces. These serve as our playground for placing notes to indicate pitch.',
      'This is the treble clef.',
      'Think of it as our musical compass, guiding us to higher-pitched notes.',
      'When you see it, it generally signals to focus on the higher registers of your instrument or voice.',
      'Together, the staff and treble clef provide a visual roadmap for understanding pitch in music.',
      'Let\'s practice using the music in front of you!.',
      'Without worrying about pitch and what consider the four keys in front of you and this piece of sheet music',
      'This would be played as:',
      'D, S, A, S, D, F, S, F (Press space to continue)',
      'Now for a quiz!',
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
          navigate('/quiz/6'); // Navigate to /quiz/1
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
      const fetchMusicXML = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/get-lesson-6-example');
        const data = await response.text();
        setMusicXML(data);
      } catch (error) {
        console.error("Error fetching the music XML: ", error);
      }
      setIsLoading(false);
    };
      fetchMusicXML();
  const handleKeyDown = (event) => {
    // If the user is on step 12, ignore the keys A, S, D, F
    if (step === 12 && ['KeyA', 'KeyS', 'KeyD', 'KeyF'].includes(event.code)) {
      return;
    }

      if (event.code === 'KeyA' || event.code === 'KeyS' || event.code === 'KeyD' ||  event.code === 'KeyF' || event.code === 'ArrowRight' || event.code === 'Space') {
      handleNext();
    } else if (event.code === 'ArrowLeft') {
      handlePrevious();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [handleNext, handlePrevious, step]);

  return (
      <div style={{overflow:'hidden', maxHeight: '100vh', maxWidth: '100vw'}}>
        <div style={{position: 'relative', height: '90vh'}}> {/* Set height to 100vh to fill the screen */}
          <DimensionsProvider onResize={({containerWidth, containerHeight}) => {
          }}>
            {({containerWidth, containerHeight}) => (
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
                    <h1>Lesson 5: Staff and Treble Clef</h1>
                    <h2>Try Playing the Sheet Music!</h2>
                    <div style={{width: '100%', height: '10%'}}>
                        {transitions((style, item) => (
                            <animated.div style={{...style, textAlign: 'center'}}>
                                <>
                                    <p style={{margin: 'auto', width: '100%'}}>{steps[item]}</p>
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        {item >= 3 && item <= 4 && <img src={musicStaff} alt="Music Staff"
                                                                        style={{paddingTop: '24px', width: '25%'}}/>}
                                        {item >= 5 && item <= 7 && <img src={trebleClefSymbol} alt="Treble Clef Symbol"
                                                                        style={{paddingTop: '24px', width: '15%'}}/>}

                                    </div>
                                </>
                            </animated.div>
                        ))}
                    </div>
                </div>
            )}
          </DimensionsProvider>
        </div>


          <div style={{ position: 'absolute', bottom: '400px', width: '100%', textAlign: 'center' }}>
              <SheetMusicComponent xml={musicXML}/>
          </div>

          <div style={{position: 'absolute', bottom: '50px', width: '50%', display: 'flex', justifyContent: 'center'}}>
          <PianoComponent
              noteRange={{first: MidiNumbers.fromNote('c5'), last: MidiNumbers.fromNote('f5')}}
              oneNote={false}
              isLesson={true}
          />
        </div>

        <button onClick={handlePrevious}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '10px',
                  fontSize: '2em',
                  overflow: 'hidden',
                  padding: '10px'
                }}>Previous
        </button>
        <button onClick={handleNext}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: '10px',
                  fontSize: '2em',
                  overflow: 'hidden',
                  padding: '10px'
                }}>Next
        </button>
      </div>
  );

}

export default Lesson6;