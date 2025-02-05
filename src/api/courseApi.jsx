
import axiosInstance from './axiosInstance'


//showAllCourse
export const showAllCourse = async () => {
    return axiosInstance.get('/course/showAllCourse');
}

//getSingle course details
export const getCourseDetails = async (payload) => {
    return axiosInstance.post('/course/getCourseDetails', payload);
}

// showAllCategory
export const showAllCategoryApi =async()=>{
    return axiosInstance.get('/course/showAllCategory')
}

//createCategory
export const createCategoryApi =async(payload)=>{
    return axiosInstance.post('/course/createCategory',payload)
}

//create Course
export const createCourseApi= async(payload)=>{
    return axiosInstance.post('/course/createCourse',payload);
}


//create Section
export const createSectionApi= async(payload)=>{
    return axiosInstance.post('/course/createSection',payload);
}


//create SubSection
export const createSubSectionApi= async(payload)=>{
    return axiosInstance.post('/course/createSubSection',payload);
}

//publish Course
export const publishCourseApi= async(payload)=>{
    return axiosInstance.post('/course/publishCourse',payload);
}


//createRatingAndReview
export const createRatingAndReviewApi= async(payload)=>{
    return axiosInstance.post('/course/createRating',payload);
}

//getAllRatingAndReview
export const getAllRatingAndReviewApi= async()=>{
    return axiosInstance.get('/course/getAllRatingAndReview');
}
//averageRatingAndReview
export const averageRatingAndReviewApi= async()=>{
    return axiosInstance.get('/course/averageRatingAndReview');
}

