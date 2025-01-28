import axios from "axios";
const Backend_Url = process.env.REACT_APP_API_BASE_URL


const API = axios.create({
    baseURL: `${Backend_Url}/api/v1/payment`,
    withCredentials: true, // Include cookies in requests
});

export const capturePayment = async (courseID) => {
    return API.post('/capturePayment',courseID);
}


export const verifySignature = async (response) => {
    return API.post('/verifySignature',response);
}