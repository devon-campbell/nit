import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";
import QuizOne from '../components/QuizOne';

const quizComponents = {
  "1": QuizOne,
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