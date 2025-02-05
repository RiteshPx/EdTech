import axiosInstance from './axiosInstance'

//capture payment
export const capturePayment = async (courseID) => {
    return axiosInstance.post('/payment/capturePayment',courseID);
}

//bY webHook 
// export const verifySignature = async (response) => {
//     return axiosInstance.post('/verifySignature',response);
// }

//  verifyPayment
export const verifyPaymentApi = async (response) => {
    return axiosInstance.post('/payment/verifyPayment',response);
}