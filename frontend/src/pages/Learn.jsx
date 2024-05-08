
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/navbar";

const Learn = () => {
  const sections = [
    {
      title: "fundamentals",
      content: [
        { lesson: "Lesson 1: Basic Notes", quiz: "Quiz 1: Basic Notes" },
        { lesson: "Lesson 2: Rests", quiz: "Quiz 2: Rests" },
        { lesson: "Lesson 3: More Notes and Rests", quiz: "Quiz 3: Advanced Notes and Rests" },
      ]
    },
    {
      title: "advanced",
      content: [
        { lesson: "Lesson 4: Introduction to Staff and Treble Clef", quiz: "Quiz 4: Staff and Treble Clef" },
        { lesson: "Lesson 5: Introduction to Pitches", quiz: "Quiz 5: Pitches" },
      ]
    },
  ];

  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };

  return (
    <div>
      <Navbar onToggle={setIsNavbarExpanded} />
      <div className={`container mx-auto ${isNavbarExpanded ? 'mt-100' : 'mt-8'}`}>
        <h1 className=" text-3xl font-bold text-gray-800 mt-8 mb-5 pt-5">lesson map</h1>
        <div className="mx-auto px-8">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h2 className="text-3xl font-semibold text-gray-600 mb-4 pl-3">{section.title}</h2>
              <div className="space-y-4">
                {section.content.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                    <Link to={`/lesson/${index + 1}`} className="flex-grow text-lg font-medium text-blue-700 hover:text-blue-900">
                      {item.lesson}
                    </Link>
                    <div className="flex-grow text-right">
                      <Link to={`/quiz/${index + 1}`} className="ml-4 text-lg font-medium text-green-700 hover:text-green-900">
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



