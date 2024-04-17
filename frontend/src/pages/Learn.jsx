import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Navbar from "../components/navbar"; // useNavigate replaces useHistory

const Learn = () => {
  const navigate = useNavigate(); // useNavigate replaces useHistory
  const [lessonNumber, setLessonNumber] = useState(1);
  const [quizNumber, setQuizNumber] = useState(1);

  const handleLessonChange = (event) => {
    setLessonNumber(event.target.value);
    navigate(`/lesson/${event.target.value}`); // navigate replaces history.push
  };

  const handleQuizChange = (event) => {
    setQuizNumber(event.target.value);
    navigate(`/quiz/${event.target.value}`); // navigate replaces history.push
  };

  return (
    <div>
        <Navbar />
      <h1>Learn</h1>
      <p>Learn about the world!</p>
      <select value={lessonNumber} onChange={handleLessonChange}>
        {/* Replace 5 with the actual number of lessons */}
        {[...Array(7).keys()].map((number) =>
          <option key={number + 1} value={number + 1}>Lesson {number + 1}</option>
        )}
      </select>
      <select value={quizNumber} onChange={handleQuizChange}>
        {/* Replace 5 with the actual number of quizzes */}
        {[...Array(9).keys()].map((number) =>
          <option key={number + 1} value={number + 1}>Quiz {number + 1}</option>
        )}
      </select>
        <Link to="/grad">
          <button style={{ margin: '10px', padding: '10px' }}>Grad</button>
        </Link>
    </div>
  );
}

export default Learn;