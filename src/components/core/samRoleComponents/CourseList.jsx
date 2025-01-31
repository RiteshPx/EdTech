import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { getCourseDetails } from "../../../api/courseApi";

// const courseData = [
//   {
//     title: "Web Development Course",
//     sections: [
//       {
//         title: "HTML & CSS Basics",
//         subsections: [
//           { title: "Introduction to HTML", videoUrl: "/videos/html.mp4" },
//           { title: "Introduction to CSS", videoUrl: "/videos/css.mp4" },
//         ],
//       },
//       {
//         title: "JavaScript Fundamentals",
//         subsections: [
//           { title: "Variables & Data Types", videoUrl: "/videos/js1.mp4" },
//           { title: "Functions in JavaScript", videoUrl: "/videos/js2.mp4" },
//         ],
//       },
//     ],
//   },
// ];

const CourseList = ({courseId}) => {
  const [ courseData,setCourseData] =useState('');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");

useEffect(()=>{
  const fetchDataCourse=async()=>{
    try{
      const payload ={
        courseId,
      }
      const {data} = await getCourseDetails(payload);
      console.log(data.courseDetail);
      setCourseData(data.courseDetail);
      setCurrentVideo(courseData?.courseContent[0]?.subSection[0]?.videoUrl);
      setCurrentTitle(courseData?.courseContent[0]?.subSection[0]?.title)
    }
    catch(error){
      console.error("Error fetching course details:", error);
    }
  }
  fetchDataCourse();
},[courseId])

  return (
    <div className="flex p-4">
      {/* Sidebar: Course Sections */}
      <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Course Content</h2>
        {courseData?.courseContent?.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            <h3 className="text-lg font-semibold text-blue-700">{sectionIndex+1}. {section.sectionName}</h3>
            <ul className="mt-2">
              {section.subSection?.map((sub, subIndex) => (
                <li
                  key={subIndex}
                  onClick={() => {
                    setCurrentVideo(sub.videoUrl);
                    setCurrentTitle(sub.title);
                  }}
                  className="cursor-pointer p-2 bg-white rounded-md shadow-sm hover:bg-blue-100 transition"
                >
                  {sectionIndex+1}.{subIndex+1} {sub.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Main Content: Video Player */}
      <div className="w-2/3 p-4">
        {currentVideo ? (
          <VideoPlayer videoUrl={currentVideo} title={currentTitle} />
        ) : (
          <p className="text-red-500">Select a lesson to start learning.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
