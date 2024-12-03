import axios from "axios";

const API = axios.create({baseURL:'http://localhost:4000/api/v1/auth'});

//signup
export const signup =async(userDetail)=>{
    return API.post('/signup',userDetail)
}

//sendotp
export const sendOtp =async(email)=>{
    return API.post('/sendOTP',email)
}

//login
export const login =async(userDetail)=>{
    return API.post('/login',userDetail);
}