import axios from "axios";
import axiosInstance from './axiosInstance'


//updateProfile
export const updateProfile = async (userDetail) => {
    return axiosInstance.put('/updateProfile', userDetail)
}

//delte account
export const deleteAccount = async () => {
    return axiosInstance.delete('/deleteAccount', )
}
