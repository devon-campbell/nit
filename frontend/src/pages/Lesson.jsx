import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";
import LessonOne from '../components/LessonOne';
import LessonTwo from "../components/LessonTwo";

const lessonComponents = {
  "1": LessonOne,
  "2": LessonTwo,
};

const Lesson = () => {
  let { id } = useParams();
  const LessonComponent = lessonComponents[id];

  return (
    <div>
      <Navbar />
      {LessonComponent ? <LessonComponent /> : <p>This is the content for lesson {id}.</p>}
    </div>
  );
}

export default Lesson;