import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {animated, config, useTransition} from "react-spring";
import DimensionsProvider from "../../utils/DimensionProvider";
import labeledKeys from "../../assets/labeled_keys.jpg";
import {MidiNumbers} from "react-piano";
import PianoComponent from "../PianoComponent";

const Lesson7 = () => {
    const navigate = useNavigate();
    const [playedNotes, setPlayedNotes] = useState([]);
    const [musicXML, setMusicXML] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStep] = useState(0);
    const [inTransition, setInTransition] = useState(false);
    const steps = useMemo(() => [
        '(Use your spacebar or mouse to navigate)',
        'Look at you! It\'s time to put it all together!',
        'Now that you hopefully have a good grasp of recognizing the notes on the staff, it\'s time to map them to the keys on the piano.',
        'On your screen, you should see piano with some keys.',
        'Note that there are 8 white keys and 5 black keys in between. We won\'t worry about the black keys for now.',
        'Naming the white keys from left to right, they are CDEFGABC. Note how the musical alphabet wraps around at G an starts at A again!',
        'This is called an "octave" because there are 8 main white notes.',
        'For now, the leftmost key, which we said was C, is "middle C".',
        'With this, can you figure out the mappings of the other notes?',
        'Here is a labeling. It\'s time to practice and master this!',
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
                            <h1>Lesson 7: 88 Reasons to Learn Sight Reading</h1>
                            <h2>Try Playing the Sheet Music!</h2>
                            <div style={{width: '100%', height: '10%'}}>
                                {transitions((style, item) => (
                                    <animated.div style={{...style, textAlign: 'center'}}>
                                        <>
                                            <p style={{margin: 'auto', width: '100%'}}>{steps[item]}</p>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                {item >= 9 && <img src={labeledKeys} alt="Labeled Keys"
                                                                                style={{paddingTop: '24px', width: '25%'}}/>}

                                            </div>
                                        </>
                                    </animated.div>
                                ))}
                            </div>
                        </div>
                    )}
                </DimensionsProvider>
            </div>

            <div style={{position: 'absolute', bottom: '50px', width: '50%', display: 'flex', justifyContent: 'center'}}>
                <PianoComponent
                    noteRange={{first: MidiNumbers.fromNote('c5'), last: MidiNumbers.fromNote('c6')}}
                    oneNote={false}
                    isLesson={true}
                    playedNotes={playedNotes}
                    setPlayedNotes={setPlayedNotes}
                />
            </div>

            <button onClick={handlePrevious}
                    className={`border border-gray-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-200`}
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
                    className={`border border-gray-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-200`}
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

export default Lesson7;