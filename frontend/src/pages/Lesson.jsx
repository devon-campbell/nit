import React from 'react';
import { useParams } from 'react-router-dom';
import NavbarComponent from "../components/NavbarComponent";
import Lesson1 from '../components/lessons/Lesson1';
import Lesson2 from "../components/lessons/Lesson2";
import Lesson3 from "../components/lessons/Lesson3";
import Lesson4 from "../components/lessons/Lesson4";
import Lesson5 from "../components/lessons/Lesson5";
import Lesson6 from "../components/lessons/Lesson6";

const lessonComponents = {
  "1": Lesson1,
  "2": Lesson2,
  "3": Lesson3,
  "4": Lesson4,
  "5": Lesson5,
    "6": Lesson6
};

const Lesson = () => {
  let { id } = useParams();
  const LessonComponent = lessonComponents[id];

  return (
    <div>
      <NavbarComponent />
      <div className="" style={{ marginTop: '60px' }}> {/* Adjust the marginTop value based on the height of your NavbarComponent */}
        {LessonComponent ? <LessonComponent /> : <p>This is the content for lesson {id}.</p>}
      </div>
    </div>
  );
}

export default Lesson;