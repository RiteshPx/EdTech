import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:4000/api/v1/Profile',
    withCredentials: true, // Include cookies in requests
});

//updateProfile
export const updateProfile = async (userDetail) => {
    return API.put('/updateProfile', userDetail)
}

//delte account
export const deleteAccount = async () => {
    return API.delete('/deleteAccount', )
}
