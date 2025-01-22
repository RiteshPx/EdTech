import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:4000/api/v1/auth',
    withCredentials: true, // Include cookies in requests
});

//signup
export const signup = async (userDetail) => {
    return API.post('/signup', userDetail)
}

//sendotp
export const sendOtp = async (email) => {
    return API.post('/sendOTP', email)
}

//login
export const userlogin = async (userDetail) => {
    return API.post('/login', userDetail);
}

//isLogin 
export const isLogin = async ()=>{
    return API.get("/isLogin")
}

//logout
export const logoutUser = async ()=>{
    return API.post("/logout")
}

//changePassword
export const changePasswordApi = async (passwordDetail)=>{
    return API.post("/changePassword",passwordDetail);
}


//resetPasswordToken
export const resetPassword = async (payload)=>{
    return API.post("/resetPasswordToken",payload);
}


//resetPassword
export const verifySignaturePassword = async (passwordDetail)=>{
    return API.post("/resetPassword",passwordDetail);
}
