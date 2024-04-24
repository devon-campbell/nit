// This page should congratulate the user on completing all of the lessons
// and quizzes and have a link to go to /play

import React from 'react';
import Navbar from "../components/navbar";
import {Link} from "react-router-dom";

const Grad = () => {
    return (
        <div>
            <Navbar />
        <h1>Congratulations!</h1>
        <p>You have completed all of the lessons and quizzes.</p>
        <p>Now you can play with the world!</p>
            <Link to="/play">
          <button style={{ margin: '10px', padding: '10px' }}>Play</button>
        </Link>
        </div>
    );
}

export default Grad;