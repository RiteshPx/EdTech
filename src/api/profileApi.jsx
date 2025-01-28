import axios from "axios";
axios.defaults.withCredentials = true;
const Backend_Url = process.env.REACT_APP_API_BASE_URL


const API = axios.create({
    baseURL: `${Backend_Url}/api/v1/Profile`,
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
