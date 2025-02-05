import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { getCourseDetails } from "../../../api/courseApi";
import FeedbackForm from "../../FeedbackPages/CreateFeedback";

const CourseList = ({ courseId }) => {
  const [courseData, setCourseData] = useState('');
  const [currentVideo, setCurrentVideo] = useState();
  const [currentTitle, setCurrentTitle] = useState(null);

  useEffect(() => {
    const fetchDataCourse = async () => {
      try {
        const payload = {
          courseId,
        }
        const { data } = await getCourseDetails(payload);
        console.log(data.courseDetail);
        setCourseData(data.courseDetail);
        setCurrentVideo(data.courseDetail?.thumbnails);
      }
      catch (error) {
        console.error("Error fetching course details:", error);
      }
    }
    fetchDataCourse();
    setCurrentVideo(courseData?.thumbnails);

  }, [courseId])

  return (
    <div>
      <div className="flex p-4">
        {/* Sidebar: Course Sections */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          {courseData?.courseContent?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4">
              <h3 className="text-lg font-semibold text-blue-700">{sectionIndex + 1}. {section.sectionName}</h3>
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
                    {sectionIndex + 1}.{subIndex + 1} {sub.title}
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
            <p className="text-blue-500 w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">Select a lesson to start learning.</p>
          )}
        </div>
      </div>
      <div className="flex p-4 justify-end">
        <FeedbackForm courseId={courseId} />
      </div>
    </div>
  );
};

export default CourseList;
