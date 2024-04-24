import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Navbar from "../components/navbar";

const Learn = () => {
  const navigate = useNavigate();
  const [lessonNumber, setLessonNumber] = useState(1);
  const [quizNumber, setQuizNumber] = useState(1);

  const handleLessonChange = (event) => {
    setLessonNumber(event.target.value);
  };

  const handleQuizChange = (event) => {
    setQuizNumber(event.target.value);
  };

  const handleLessonGo = () => {
    navigate(`/lesson/${lessonNumber}`);
  };

  const handleQuizGo = () => {
    navigate(`/quiz/${quizNumber}`);
  };

  return (
    <div>
        <Navbar />
      <h1>Learn</h1>
      <p>Learn about the world!</p>
      <select value={lessonNumber} onChange={handleLessonChange}>
        {[...Array(7).keys()].map((number) =>
          <option key={number + 1} value={number + 1}>Lesson {number + 1}</option>
        )}
      </select>
      <button onClick={handleLessonGo}>Go</button>
      <select value={quizNumber} onChange={handleQuizChange}>
        {[...Array(9).keys()].map((number) =>
          <option key={number + 1} value={number + 1}>Quiz {number + 1}</option>
        )}
      </select>
      <button onClick={handleQuizGo}>Go</button>
        <Link to="/grad">
          <button style={{ margin: '10px', padding: '10px' }}>Grad</button>
        </Link>
    </div>
  );
}

export default Learn;