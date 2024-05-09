import React from 'react';
import { useParams } from 'react-router-dom';
import NavbarComponent from "../components/NavbarComponent";
import Quiz1 from '../components/quizzes/Quiz1';
import Quiz55 from '../components/quizzes/Quiz55';
import Quiz2 from "../components/quizzes/Quiz2";
import Quiz3 from "../components/quizzes/Quiz3";
import Quiz4 from "../components/quizzes/Quiz4";
import Quiz5 from "../components/quizzes/Quiz5";
import Quiz6 from "../components/quizzes/Quiz6";
import Quiz7 from "../components/quizzes/Quiz7";
import Quiz8 from "../components/quizzes/Quiz8";

const quizComponents = {
  "1": Quiz1,
  "2": Quiz2,
  "3": Quiz3,
  "4": Quiz5,
  "5": Quiz5,
  "6": Quiz6,
  "7": Quiz7,
  "8": Quiz8,
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