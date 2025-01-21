import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:4000/api/v1/course',
    withCredentials: true, // Include cookies in requests
});

//showAllCourse
export const showAllCourse = async () => {
    return API.get('/showAllCourse');
}

export const getCourseDetails = async (payload) => {
    return API.post('/getCourseDetails', payload);
}
