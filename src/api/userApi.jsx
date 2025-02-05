
import axiosInstance from "./axiosInstance";

//signup
export const signup = async (userDetail) => {
    return axiosInstance.post('auth/signup', userDetail)
}

//sendotp
export const sendOtpApi = async (payload) => {
    return axiosInstance.post('auth/sendOTP', payload)
}


//login
export const userlogin = async (userDetail) => {
    return axiosInstance.post('auth/login', userDetail);
}

//isLogin 
export const isLogin = async ()=>{
    return axiosInstance.get("auth/isLogin")
}

//logout
export const logoutUser = async ()=>{
    return axiosInstance.post("auth/logout")
}

//changePassword
export const changePasswordApi = async (passwordDetail)=>{
    return axiosInstance.post("auth/changePassword",passwordDetail);
}


//resetPasswordToken
export const resetPassword = async (payload)=>{
    return axiosInstance.post("auth/resetPasswordToken",payload);
}


//resetPassword
export const verifySignaturePassword = async (passwordDetail)=>{
    return axiosInstance.post("auth/resetPassword",passwordDetail);
}
