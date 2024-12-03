import React from 'react'

export const CourseCard = ({elem,currentCard,setCurrentCard}) => {
  const updateCourseCard=(name)=>{
 setCurrentCard(name);
  }
  return (
    <div className={`py-4 px-4 align-middle font-black w-80 mb-7 ${currentCard===elem.name ?"bg-yellow-100" : "bg-white"}`}onClick={()=>updateCourseCard(elem.name)}>
        <div className='font-extrabold text-zinc-900'>
            {elem.name}
        </div>
        <div className='text-zinc-500 text-wrap'>
            {elem.description}{elem.description}{elem.description}
        </div>
    </div>
  )
}
