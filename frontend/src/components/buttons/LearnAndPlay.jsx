import React from 'react';
import { Link } from 'react-router-dom';
import learnImg from '../../assets/sponge-learn.jpeg';
import playImg from '../../assets/sponge-play.jpeg';

const LearnAndPlayButtons = () => {

  return (
    <div className="flex justify-center space-x-4">
      <Link to="/learn" className="block w-64 h-64 border-4 border-gray-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <img src={learnImg} alt="Learn" className="w-full h-3/4 object-cover" />
        <p className="bg-gray-100 text-center text-xl font-bold py-2 h-1/4 hover:bg-gray-300 transition-colors cursor-pointer">learn sheet music!</p>
      </Link>
      <Link to="/play" className="block w-64 h-64 border-4 border-gray-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <img src={playImg} alt="Play" className="w-full h-3/4 object-cover" />
        <p className="bg-gray-100 text-center text-xl font-bold py-2 h-1/4 hover:bg-gray-300 hover:border-gray-300 transition-colors cursor-pointer">play sheet music!</p>
      </Link>
    </div>
  );
}

export default LearnAndPlayButtons;
