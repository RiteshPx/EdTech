import axios from "axios";
axios.defaults.withCredentials = true;
const Backend_Url = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({
    baseURL: `${Backend_Url}/api/v1/course`,
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


//createRatingAndReview
export const createRatingAndReviewApi= async(payload)=>{
    return API.post('/createRating',payload);
}

//getAllRatingAndReview
export const getAllRatingAndReviewApi= async()=>{
    return API.get('/getAllRatingAndReview');
}
//averageRatingAndReview
export const averageRatingAndReviewApi= async()=>{
    return API.get('/averageRatingAndReview');
}

