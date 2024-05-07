import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";
import Quiz1 from '../components/Quiz1';
import Quiz55 from '../components/Quiz55';
import Quiz2 from "../components/Quiz2";

const quizComponents = {
  "1": Quiz1,
  "2": Quiz2,
  "10": Quiz55,
  // map all other quiz components
};

const Quiz = () => {
  let { id } = useParams();
  const QuizComponent = quizComponents[id];

  return (
    <div>
      <Navbar />
      {QuizComponent ? <QuizComponent /> : <p>This is the content for quiz {id}.</p>}
    </div>
  );
}

export default Quiz;