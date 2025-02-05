
import axiosInstance from './axiosInstance'


//updateProfile
export const updateProfile = async (userDetail) => {
    return axiosInstance.put('/profile/updateProfile', userDetail)
}

//delte account
export const deleteAccount = async () => {
    return axiosInstance.delete('/profile/deleteAccount', )
}
