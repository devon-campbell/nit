import React from 'react';
import { Link } from 'react-router-dom';
import NavbarComponent from "../components/NavbarComponent";

const Learn = () => {
  const sections = [
    {
      title: "fundamentals of sheet music (fundies)",
      content: [
        { lesson: "Lesson 1: Your First Note", quiz: "Quiz 1: The Quarter Note", num: 1 },
        { lesson: "Lesson 2: We're Halfway There", quiz: "Quiz 2: Half Notes", num: 2 },
        { lesson: "Lesson 3: Filling the Holes in Sound", quiz: "Quiz 3: Whole Notes", num: 3 },
        { lesson: "Lesson 4: The Great Eight and Beyond", quiz: "Quiz 4: Intro to the Eighth Note", num: 4}
      ]
    },
    {
      title: "advanced piano and sight reading (ap)",
      content: [
        { lesson: "Lesson 5: Dynamic Duo: Staff and Treble Clef", quiz: "Quiz 5: Quarter Notes on the G Clef", num: 5},
        { lesson: "Lesson 6: Pitch Perfect", quiz: "Quiz 6: Pitch Please", num: 6},
        { lesson: "Lesson 7: 88 Reasons to Learn Sight Reading", quiz: "Quiz 7: All Together Now", num: 7},
      ]
    }
  ];



  return (
    <div>
      <NavbarComponent/>
      <div className={`container mx-auto mt-8`}>
        <div className="mx-auto px-8 mt-8 mb-5 pt-5">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h2 className="text-3xl font-semibold text-neutral-content mb-4 pl-3">{section.title}</h2>
              <div className="space-y-4">
                {section.content.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-base-200 p-4 rounded-lg shadow">
                    <Link to={`/lesson/${item.num}`} className="flex-grow text-lg font-medium text-secondary-content hover:text-info">
                      {item.lesson}
                    </Link>
                    <div className="flex-grow text-right">
                      <Link to={`/quiz/${item.num}`} className="ml-4 text-lg font-medium text-error/70 hover:text-info">
                        {item.quiz}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {idx < sections.length - 1 && (
                <div className="w-full h-1 bg-gray-300 my-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learn;



