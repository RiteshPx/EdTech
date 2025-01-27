import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:4000/api/v1/course',
    withCredentials: true, // Include cookies in requests
});

//showAllCourse
export const showAllCourse = async () => {
    return API.get('/showAllCourse');
}

//getSingle course details
export const getCourseDetails = async (payload) => {
    return API.post('/getCourseDetails', payload);
}

// showAllCategory
export const showAllCategoryApi =async()=>{
    return API.get('/showAllCategory')
}

//createCategory
export const createCategoryApi =async(payload)=>{
    return API.post('/createCategory',payload)
}

//create Course
export const createCourseApi= async(payload)=>{
    return API.post('/createCourse',payload);
}


//create Section
export const createSectionApi= async(payload)=>{
    return API.post('/createSection',payload);
}


//create SubSection
export const createSubSectionApi= async(payload)=>{
    return API.post('/createSubSection',payload);
}

//publish Course
export const publishCourseApi= async(payload)=>{
    return API.post('/publishCourse',payload);
}