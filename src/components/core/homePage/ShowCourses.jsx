import React, { useState } from 'react';
import coursesData from '../../../data/courses';
import { Highlight } from './Highlight';
import { CourseCard } from './CourseCard';

export const ShowCourses = () => {

    const tagsName = [
        "Web Development",
        "Data Science",
        "Digital Marketing",
        "Cybersecurity",
        "Artificial Intelligence"
    ]

    const [currentTab, setCurrentTab] = useState(tagsName[0]);
    const [courses, setCourse] = useState(coursesData[0].modules);
    const [currentCard, setCurrentCard] = useState(coursesData[0].modules[0].name);

    const setMyCard = (val) => {

        setCurrentTab(val);
        const result = coursesData.filter((cours) => cours.tag === val);
        const module = result[0].modules;
        setCourse(module)
        setCurrentCard((result[0].modules[0].name))
    }

    return (
        <div className=' bg-lime-900 py-10 px-20'>
            < div className='text-2xl text-center font-semibold mt-3'>
                <div >Unlock the <Highlight text={"power of code"} /></div>
                <p className='text-xl mt-2'>learning to build anything , you can imagine</p>
                <div className=' rounded-full mt-6 flex gap-5 bg-slate-600 text-xl'>
                    {
                        tagsName.map((element, index) => {
                            return (
                                <div className={`px-3 rounded-full py-2 ${currentTab === element ? "bg-slate-400 text-black" : "bg-slate-600"}`} key={index}
                                    onClick={() => setMyCard(element)}>
                                    {element}
                                </div>
                            )
                        })
                    }
                </div>
            </div >
            <div className='flex gap-4 mt-5 text-wrap'>
                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard elem={element} 
                            key={index}
                             currentCard={currentCard}
                             setCurrentCard={setCurrentCard}
                             />
                        )
                    })
                }
            </div>

        </div>
    )
}
