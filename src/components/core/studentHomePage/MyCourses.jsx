import React from 'react';

const MyCourses = () => {
  const courses = [
    { title: 'History of graphic design', progress: 25 },
    { title: 'App Design Course', progress: 50 },
    { title: 'Digital Painting', progress: 75 },
  ];

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-bold text-lg mb-4">My Courses</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index} className="mb-2">
            {course.title} - {course.progress}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCourses;
