import React,{useState} from 'react'
import { changePasswordApi } from '../../../api/userApi';
import { toast } from 'react-toastify';

export const PasswordChange = ({setShowChangePassword}) => {
    const [passwordForm, setPasswordForm] = useState({
        password :"",
        newPassword:"",
        confirmNewPassword:""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm({ ...passwordForm, [name]: value });
    };
    const handleChangePassword = async(e) => {
        e.preventDefault();
        if(passwordForm.newPassword!==passwordForm.confirmNewPassword){
            toast.warn("New password and confirm password not match !")
            return;
        }
        try {
            const {data}= await changePasswordApi(passwordForm);
            console.log(data);
            setShowChangePassword(false);
            toast.success('Password changed successfully!');
        } catch (error) {
            console.log(error);
            const errorMessage =
                            error.response?.data?.message ||
                            "An unexpected error occurred. Please try again.";
                        toast.error(errorMessage);
        }
    };
    return (
        <div>
            <form onSubmit={handleChangePassword} className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h3>
                <input
                    type="password"
                    placeholder="Current Password"
                    name="password"
                    onChange={handleInputChange}
                    value={passwordForm.password}
                    className="w-full border p-2 rounded mb-3"
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border p-2 rounded mb-3"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordForm.confirmNewPassword}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded mb-4"
                    name="confirmNewPassword"
                    required
                />
                <div className='flex'>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600" >
                        Update Password
                    </button>
                    <button onClick={() => setShowChangePassword(false)} className="w-1/3 ml-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600" >
                        Back
                    </button>
                </div>
            </form>


        </div>
    )
}
