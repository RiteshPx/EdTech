
import axiosInstance from "./axiosInstance";

//signup
export const signup = async (userDetail) => {
    return axiosInstance.post('/signup', userDetail)
}

//sendotp
export const sendOtpApi = async (payload) => {
    return axiosInstance.post('/sendOTP', payload)
}


//login
export const userlogin = async (userDetail) => {
    return axiosInstance.post('/login', userDetail);
}

//isLogin 
export const isLogin = async ()=>{
    return axiosInstance.get("/isLogin")
}

//logout
export const logoutUser = async ()=>{
    return axiosInstance.post("/logout")
}

//changePassword
export const changePasswordApi = async (passwordDetail)=>{
    return axiosInstance.post("/changePassword",passwordDetail);
}


//resetPasswordToken
export const resetPassword = async (payload)=>{
    return axiosInstance.post("/resetPasswordToken",payload);
}


//resetPassword
export const verifySignaturePassword = async (passwordDetail)=>{
    return axiosInstance.post("/resetPassword",passwordDetail);
}
