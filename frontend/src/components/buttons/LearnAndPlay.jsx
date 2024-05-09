import React from 'react';
import { Link } from 'react-router-dom';
import learnImg from '../../assets/KeyKeyLearn.jpg';
import playImg from '../../assets/KeyKeyPlay.jpg';

const LearnAndPlayButtons = () => {

  return (
    <div className="flex justify-center space-x-4 h-full">
      <Link to="/learn" className="block w-80 h-80  border-secondary shadow-md hover:shadow-lg hover:opacity-70 transition-shadow cursor-pointer">
        <img src={learnImg} alt="Learn" className="w-full h-full object-cover" />
        <p className="bg-accent text-center text-xl text-neutral-content font-bold py-2 h-1/4 transition-colors cursor-pointer w-full">learn sheet music!</p>
      </Link>
      <Link to="/play" className="block w-80 h-80  border-secondary shadow-md hover:shadow-lg hover:opacity-70 transition-shadow cursor-pointer">
        <img src={playImg} alt="Play" className="w-full h-full object-cover" />
        <p className="bg-accent text-center text-neutral-content text-xl font-bold py-2 h-1/4 transition-colors cursor-pointer" >play sheet music!</p>
      </Link>
    </div>
  );
}

export default LearnAndPlayButtons;
