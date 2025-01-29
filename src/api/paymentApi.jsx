import axios from "axios";
axios.defaults.withCredentials = true;

const Backend_Url = process.env.REACT_APP_API_BASE_URL


const API = axios.create({
    baseURL: `${Backend_Url}/api/v1/payment`,
    withCredentials: true, // Include cookies in requests
});

export const capturePayment = async (courseID) => {
    return API.post('/capturePayment',courseID);
}

//bY webHook 
// export const verifySignature = async (response) => {
//     return API.post('/verifySignature',response);
// }

//  verifyPayment
export const verifyPaymentApi = async (response) => {
    return API.post('/verifyPayment',response);
}