import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:4000/api/v1/payment',
    withCredentials: true, // Include cookies in requests
});

export const capturePayment = async (courseID) => {
    return API.post('/capturePayment',courseID);
}


export const verifySignature = async (response) => {
    return API.post('/verifySignature',response);
}