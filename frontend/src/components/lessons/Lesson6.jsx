import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {animated, config, useTransition} from "react-spring";
import DimensionsProvider from "../../utils/DimensionProvider";
import middleC from "../../assets/middle-c.jpeg";
import trebleClefNotes from "../../assets/Treble-Clef-Notes.jpg";
import trebleClefLedgerLines from "../../assets/Treble-Clef-Ledger-Lines.jpg";
import {MidiNumbers} from "react-piano";
import PianoComponent from "../PianoComponent";

const Lesson6 = () => {
    const navigate = useNavigate();
    const [musicXML, setMusicXML] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStep] = useState(0);
    const [inTransition, setInTransition] = useState(false);
    const steps = useMemo(() => [
        '(Use your spacebar or mouse to navigate)',
        'Hey hey! It\'s time to level up! Let\'s learn how we can learn to read the pitches from the treble staff!',
        'Just like English has an alphabet, music is the same. The only difference is that the musical alphabet is restricted to ABCDEFG.',
        'What you see here is called "middle C."',
        'It can be thought of a well-know reference point for other notes.',
        'With this, we can easily map the notes on the staff to the other pitches.',
        'To remember the notes on the lines from bottom to top, we can use the mnemonic "Every Good Boy Does Fine." (EGBDF)',
        'To remember the notes in the spaces from bottom to top, we can simply remember "FACE"',
        'In order to really hammer this in, we recommend you get a lot of practice in!',
        'Additionally, since the musical alphabet wraps around, we can figure out notes beyond the staff!',
        'These are the lower and higher notes.',
        'The extra lines beyond the staff are called "ledger lines".',
        'Take a good look at this! You\'ll be able to practice soon!',
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
                            <h1>Lesson 6: Pitch Perfect</h1>
                            <h2>Try Playing the Sheet Music!</h2>
                            <div style={{width: '100%', height: '10%'}}>
                                {transitions((style, item) => (
                                    <animated.div style={{...style, textAlign: 'center'}}>
                                        <>
                                            <p style={{margin: 'auto', width: '100%'}}>{steps[item]}</p>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                {item >= 3 && item <= 5 && <img src={middleC} alt="Middle C"
                                                                                style={{paddingTop: '24px', width: '25%'}}/>}
                                                {item >= 6 && item <= 9 && <img src={trebleClefNotes} alt="Treble Clef Notes"
                                                                                style={{paddingTop: '24px', width: '50%'}}/>}
                                                {item >= 10 && <img src={trebleClefLedgerLines} alt="Treble Clef Ledger Lines"
                                                                                style={{paddingTop: '24px', width: '50%'}}/>}
                                            </div>
                                        </>
                                    </animated.div>
                                ))}
                            </div>
                        </div>
                    )}
                </DimensionsProvider>
            </div>

            <div style={{position: 'absolute', bottom: '50px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                <PianoComponent
                    noteRange={{first: MidiNumbers.fromNote('c5'), last: MidiNumbers.fromNote('c6')}}
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