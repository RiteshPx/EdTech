import axiosInstance from './axiosInstance'

export const capturePayment = async (courseID) => {
    return axiosInstance.post('/capturePayment',courseID);
}

//bY webHook 
// export const verifySignature = async (response) => {
//     return axiosInstance.post('/verifySignature',response);
// }

//  verifyPayment
export const verifyPaymentApi = async (response) => {
    return axiosInstance.post('/verifyPayment',response);
}