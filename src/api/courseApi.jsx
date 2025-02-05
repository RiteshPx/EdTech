
import axiosInstance from './axiosInstance'


//showAllCourse
export const showAllCourse = async () => {
    return axiosInstance.get('/showAllCourse');
}

//getSingle course details
export const getCourseDetails = async (payload) => {
    return axiosInstance.post('/getCourseDetails', payload);
}

// showAllCategory
export const showAllCategoryApi =async()=>{
    return axiosInstance.get('/showAllCategory')
}

//createCategory
export const createCategoryApi =async(payload)=>{
    return axiosInstance.post('/createCategory',payload)
}

//create Course
export const createCourseApi= async(payload)=>{
    return axiosInstance.post('/createCourse',payload);
}


//create Section
export const createSectionApi= async(payload)=>{
    return axiosInstance.post('/createSection',payload);
}


//create SubSection
export const createSubSectionApi= async(payload)=>{
    return axiosInstance.post('/createSubSection',payload);
}

//publish Course
export const publishCourseApi= async(payload)=>{
    return axiosInstance.post('/publishCourse',payload);
}


//createRatingAndReview
export const createRatingAndReviewApi= async(payload)=>{
    return axiosInstance.post('/createRating',payload);
}

//getAllRatingAndReview
export const getAllRatingAndReviewApi= async()=>{
    return axiosInstance.get('/getAllRatingAndReview');
}
//averageRatingAndReview
export const averageRatingAndReviewApi= async()=>{
    return axiosInstance.get('/averageRatingAndReview');
}

