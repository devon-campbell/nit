import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";
import Lesson1 from '../components/Lesson1';
import Lesson2 from "../components/Lesson2";
import Lesson3 from "../components/Lesson3";
import Lesson4 from "../components/Lesson4";

const lessonComponents = {
  "1": Lesson1,
  "2": Lesson2,
  "3": Lesson3,
  "4": Lesson4,
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