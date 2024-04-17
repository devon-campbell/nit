import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";

const Lesson = () => {
  let { id } = useParams();

  return (
    <div>
        <Navbar />
      <h1>Lesson {id}</h1>
      <p>This is the content for lesson {id}.</p>
    </div>
  );
}

export default Lesson;