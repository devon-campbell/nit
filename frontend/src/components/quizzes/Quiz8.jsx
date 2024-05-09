import React, { useEffect, useState } from 'react';
import PianoComponent from "../PianoComponent";
import SheetMusicComponent from "../SheetMusicComponent";
import MetronomeComponent from "../MetronomeComponent";
import { MidiNumbers } from "react-piano";
import { calculateNoteDuration } from '../../utils/musicUtils';
import {useNavigate} from "react-router-dom";

const Quiz8 = () => {
    return (
        <div>
            <h1>Quiz 6</h1>
            <p>This is the content for quiz 8.</p>
        </div>
    );
}

export default Quiz8;