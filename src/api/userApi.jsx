import axios from "axios";
const Backend_Url = process.env.REACT_APP_API_BASE_URL
axios.defaults.withCredentials = true;

const API = axios.create({
    baseURL: `${Backend_Url}/api/v1/auth`,
    withCredentials: true, // Include cookies in requests
});

//signup
export const signup = async (userDetail) => {
    return API.post('/signup', userDetail)
}

//sendotp
export const sendOtpApi = async (payload) => {
    return API.post('/sendOTP', payload)
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
