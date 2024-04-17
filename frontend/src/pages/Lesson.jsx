import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";
import LessonOne from '../components/LessonOne';

const Lesson = () => {
  let { id } = useParams();

  if(id === "1"){
      return <LessonOne />
  }

  return (
    <div>
        <Navbar />
      <h1>Lesson {id}</h1>
      <p>This is the content for lesson {id}.</p>
    </div>
  );
}

export default Lesson;