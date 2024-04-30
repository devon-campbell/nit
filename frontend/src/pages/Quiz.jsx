import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";
import Quiz1 from '../components/Quiz1';
import Quiz5 from '../components/Quiz5';

const quizComponents = {
  "1": Quiz1,
  "5": Quiz5,
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