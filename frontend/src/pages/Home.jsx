import React from 'react';
import LearnAndPlayButtons from '../components/buttons/LearnAndPlay.jsx';  // Assuming the component is in the same directory

const Home = () => {
  return (
      <div>
          <div className="title text-4xl font-bold text-left text-gray-800 font-sans my-4 mx-4">
            nit
          </div>
          <div className="container mx-auto p-4">
            <LearnAndPlayButtons />
          </div>
      </div>
  );
}

export default Home;
