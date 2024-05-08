import React from 'react';
import { useParams } from 'react-router-dom';
import NavbarComponent from "../components/NavbarComponent";
import Quiz1 from '../components/quizzes/Quiz1';
import Quiz55 from '../components/quizzes/Quiz55';
import Quiz2 from "../components/quizzes/Quiz2";

const quizComponents = {
  "1": Quiz1,
  "2": Quiz2,
  "55": Quiz55,
  // map all other quiz components
};

const Quiz = () => {
  let { id } = useParams();
  const QuizComponent = quizComponents[id];

  return (
    <div>
      <NavbarComponent />
      {QuizComponent ? <QuizComponent /> : <p>This should be the content for quiz {id}.</p>}
    </div>
  );
}

export default Quiz;