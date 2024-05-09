import React from 'react';
import LearnAndPlayButtons from '../components/buttons/LearnAndPlay.jsx';
import NavbarComponent from "../components/NavbarComponent";

const Home = () => {
  return (
      <div>
            <NavbarComponent/>
          <div className="container mx-auto p-4">
            <LearnAndPlayButtons />
          </div>
      </div>
  );
}

export default Home;
