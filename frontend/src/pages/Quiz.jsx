import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";

const Quiz = () => {
  let { id } = useParams();

  if(id === "8") {
      id = "0, the special quiz to skip sight reading";
  }else if(id === "9") {
      id = "00, the special quiz to skip piano playing";
  }

  return (
    <div>
        <Navbar />
      <h1>Quiz {id}</h1>
      <p>This is the content for quiz {id}.</p>
    </div>
  );
}

export default Quiz;