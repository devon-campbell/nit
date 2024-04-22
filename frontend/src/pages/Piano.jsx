import React from 'react';
import Navbar from "../components/navbar";
import PianoComponent from "../components/PianoComponent";

const Piano = () => {
  return (
    <div>
      <Navbar />
      <h1>Learn</h1>
      <p>Learn the piano!</p>
      <PianoComponent />
    </div>
  );
}
export default Piano;