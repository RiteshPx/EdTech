import React from 'react';

export const CourseCard = ({ elem, currentCard, setCurrentCard }) => {
  const updateCourseCard = (name) => {
    setCurrentCard(name);
  };

  return (
    <div
      className={`py-4 px-4 align-middle font-black w-80 mb-7 rounded-lg shadow-md transition-transform transform ${
        currentCard === elem.name ? 'bg-yellow-100 scale-105' : 'bg-white'
      }`}
      style={{ width: '320px' }} // Fixed width
      onClick={() => updateCourseCard(elem.name)}
    >
      <div className="font-extrabold text-zinc-900 text-xl mb-2">
        {elem.name}
      </div>
      <div className="text-zinc-500 text-wrap overflow-hidden">
        {elem.description}
      </div>
    </div>
  );
};
