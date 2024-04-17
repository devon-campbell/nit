import React, {useState, useEffect, useCallback, useMemo} from 'react';
import { useTransition, animated, config } from 'react-spring';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from "./navbar";
import noteLengthsDiagram from '../assets/note-lengths-diagram.jpg';
import quarterNoteSymbol from '../assets/quarter-note-symbol.jpg';

const LessonOne = () => {
    const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inTransition, setInTransition] = useState(false);
  const steps = useMemo(() => ['(Use the spacebar, arrow keys, or buttons)',
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', placeContent: 'center', placeSelf: 'center', alignItems: 'center', justifyContent: 'center', height: '33vh', position: 'relative', textAlign: 'center' }}>
      <Navbar />
      <h1>Lesson 1: Basic Notes</h1>
      <div style={{width: '100%' }}>
        {transitions((style, item) => (
          <animated.div style={{ ...style, textAlign: 'center' }}>
            <>
              <p style={{ margin: 'auto', width: '100%' }}>{steps[item]}</p>
              {item >= 2 && item <= 6 && <img src={noteLengthsDiagram} alt="Note Lengths Diagram" style={{paddingTop: '24px'}}/>}
                {item >= 7 && <img src={quarterNoteSymbol} alt="Quarter Note Symbol" style={{paddingTop: '24px'}}/>}
                <div>
                    {item === 10 && <button onClick={handleNext}>Quiz Me</button>}
                </div>
            </>
          </animated.div>
        ))}
      </div>
      <button onClick={handlePrevious} style={{ position: 'absolute', bottom: 0, left: 0 }}>Previous</button>
      <button onClick={handleNext} style={{ position: 'absolute', bottom: 0, right: 0 }}>Next</button>
    </div>
  );
}

export default LessonOne;